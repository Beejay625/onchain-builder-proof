'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

type FieldType = 'text' | 'textarea' | 'select' | 'number'

export interface HeliosFieldConfig {
  key: string
  label: string
  type: FieldType
  placeholder?: string
  options?: { label: string; value: string }[]
  required?: boolean
}

export interface HeliosMeshFeatureProps {
  achievementId: bigint
}

interface HeliosMeshComposerProps extends HeliosMeshFeatureProps {
  title: string
  subtitle: string
  accent?: string
  ctaLabel: string
  payloadPrefix: string
  fields: HeliosFieldConfig[]
}

export default function HeliosMeshComposer({
  achievementId,
  title,
  subtitle,
  accent = 'orange',
  ctaLabel,
  payloadPrefix,
  fields,
}: HeliosMeshComposerProps) {
  const { address, isConnected } = useAccount()
  const buildInitialValues = () =>
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        field.type === 'select' ? field.options?.[0]?.value ?? '' : '',
      ]),
    )
  const [values, setValues] = useState<Record<string, string>>(() => buildInitialValues())
  const { writeContract, data: hash, isPending } = useWriteContract()
  const {
    isLoading: isConfirming,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isSuccess) {
      setValues(buildInitialValues())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const isFormValid = useMemo(
    () =>
      fields.every((field) => {
        if (!field.required) return true
        return Boolean(values[field.key]?.trim())
      }),
    [fields, values],
  )

  const sanitizedValue = (value: string) => value.replace(/\s+/g, ' ').trim()

  const handleSubmit = () => {
    if (!isConnected || !address || !isFormValid) return

    const body = fields
      .map((field) => `${field.key}:${sanitizedValue(values[field.key] ?? '') || 'n/a'}`)
      .join('|')
    const payload = `${payloadPrefix}:${body}:ts:${Date.now()}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  const renderField = (field: HeliosFieldConfig) => {
    const commonLabel = (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
        {field.required ? ' *' : ''}
      </label>
    )

    if (field.type === 'textarea') {
      return (
        <div key={field.key}>
          {commonLabel}
          <textarea
            value={values[field.key] ?? ''}
            onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
            placeholder={field.placeholder}
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
      )
    }

    if (field.type === 'select') {
      return (
        <div key={field.key}>
          {commonLabel}
          <select
            value={values[field.key] ?? ''}
            onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )
    }

    return (
      <div key={field.key}>
        {commonLabel}
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          value={values[field.key] ?? ''}
          onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
          placeholder={field.placeholder}
          className="w-full rounded-lg border border-gray-300 p-2 text-sm"
        />
      </div>
    )
  }

  return (
    <AppCard title={title} subtitle={subtitle} accent={accent}>
      <div className="space-y-4">
        {fields.map((field) => renderField(field))}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || !isConnected || isPending || isConfirming}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting…' : ctaLabel}
        </button>
        {isSuccess && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
            ✅ Logged to Helios mesh onchain
          </div>
        )}
        {isError && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
            ⚠️ Transaction failed — double-check your wallet confirmation.
          </div>
        )}
      </div>
    </AppCard>
  )
}

