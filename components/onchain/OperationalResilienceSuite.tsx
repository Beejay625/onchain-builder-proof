'use client'

import { useMemo, useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface OperationalResilienceSuiteProps {
  achievementId: bigint
}

type ResilienceFeature = {
  key: string
  title: string
  description: string
  primaryLabel: string
  secondaryLabel?: string
  extraLabel?: string
  placeholders?: {
    primary?: string
    secondary?: string
    extra?: string
  }
}

const resilienceFeatures: ResilienceFeature[] = [
  {
    key: 'guardianRotation',
    title: '🛡 Guardian Rotation Log',
    description: 'Capture guardian rotations, quorum changes, and custody notes.',
    primaryLabel: 'Rotation window',
    secondaryLabel: 'Guardian set details',
    placeholders: { primary: '2025-11-01 → 2026-01-01', secondary: '5-of-8, hardware keys upgraded' },
  },
  {
    key: 'keyCeremony',
    title: '🔑 Key Ceremony Ledger',
    description: 'Record evidence of key ceremonies, venues, and auditors.',
    primaryLabel: 'Ceremony date',
    secondaryLabel: 'Ceremony location / auditor',
    extraLabel: 'Hash or reference',
  },
  {
    key: 'circuitBreaker',
    title: '🚨 Circuit Breaker Console',
    description: 'Note circuit breaker thresholds and activation context.',
    primaryLabel: 'Trigger condition',
    secondaryLabel: 'Outcome / state',
  },
  {
    key: 'settlementRetry',
    title: '🔁 Settlement Retry Tracker',
    description: 'Track failed onchain settlements and retries.',
    primaryLabel: 'Failed tx hash',
    secondaryLabel: 'Retry tx hash',
    extraLabel: 'Resolution notes',
  },
  {
    key: 'configAnchor',
    title: '⚙️ Config Anchor Register',
    description: 'Publish config hashes for reproducible deployments.',
    primaryLabel: 'Config scope',
    secondaryLabel: 'CID / hash',
  },
  {
    key: 'disasterDrill',
    title: '🌀 Disaster Drill Ledger',
    description: 'Log tabletop drills, owners, and follow-up tasks.',
    primaryLabel: 'Drill scenario',
    secondaryLabel: 'Key takeaway',
  },
  {
    key: 'failoverSimulation',
    title: '🛰 Failover Simulation Log',
    description: 'Record results from failover simulations or chaos games.',
    primaryLabel: 'Simulation description',
    secondaryLabel: 'Pass / fail summary',
  },
  {
    key: 'postmortemVault',
    title: '📜 Postmortem Vault',
    description: 'Anchor signed postmortem links for posterity.',
    primaryLabel: 'Incident ID',
    secondaryLabel: 'Postmortem URL',
  },
  {
    key: 'hotfixStream',
    title: '⚡ Hotfix Stream',
    description: 'Document hotfix releases with risk approvals.',
    primaryLabel: 'Hotfix tag',
    secondaryLabel: 'Approver / reviewer',
  },
  {
    key: 'stressTest',
    title: '💥 Stress Test Evidence',
    description: 'Store latest stress test metrics or results.',
    primaryLabel: 'Test scope',
    secondaryLabel: 'Peak metric / outcome',
  },
  {
    key: 'safelistRegistry',
    title: '✅ Safelist Registry',
    description: 'List current contract or API safelist entries.',
    primaryLabel: 'Safelist scope',
    secondaryLabel: 'Entry added / removed',
  },
  {
    key: 'escalationMatrix',
    title: '📞 Escalation Matrix',
    description: 'Summarize escalation paths and SLO timers.',
    primaryLabel: 'Escalation tier',
    secondaryLabel: 'Response window / contact',
  },
  {
    key: 'recoveryRunbook',
    title: '🔁 Recovery Runbook Check',
    description: 'Log successful runbook rehearsals.',
    primaryLabel: 'Runbook name',
    secondaryLabel: 'Reviewer / timestamp',
  },
  {
    key: 'liquidityBuffer',
    title: '💧 Liquidity Buffer Pulse',
    description: 'Track treasury or reward liquidity buffers.',
    primaryLabel: 'Buffer name',
    secondaryLabel: 'Days of runway',
  },
  {
    key: 'storageAttestor',
    title: '🗄 Storage Attestor',
    description: 'Prove storage provider attestations or audits.',
    primaryLabel: 'Provider',
    secondaryLabel: 'Attestation hash or URL',
  },
  {
    key: 'observabilityBeacon',
    title: '📡 Observability Beacon',
    description: 'Stream unified observability status snapshots.',
    primaryLabel: 'Beacon timestamp',
    secondaryLabel: 'Status summary',
  },
  {
    key: 'latencyBudget',
    title: '🎯 Latency Budget Guard',
    description: 'Validate service latency budgets per release.',
    primaryLabel: 'Service / route',
    secondaryLabel: 'Observed vs. budget',
  },
  {
    key: 'downtimeLedger',
    title: '📉 Downtime Ledger',
    description: 'Record downtime minutes, impact, and compensations.',
    primaryLabel: 'Downtime window',
    secondaryLabel: 'Impact / remediation',
  },
  {
    key: 'impactRunway',
    title: '🪙 Impact Runway',
    description: 'Share impact runway metrics for grants and treasury.',
    primaryLabel: 'Initiative',
    secondaryLabel: 'Remaining budget / runway',
  },
  {
    key: 'riskPlaybook',
    title: '📘 Risk Playbook',
    description: 'Attach refreshed risk playbooks and owners.',
    primaryLabel: 'Risk area',
    secondaryLabel: 'Owner + mitigation status',
  },
  {
    key: 'dependencyDrift',
    title: '🌐 Dependency Drift',
    description: 'Track dependency drifts and mitigations.',
    primaryLabel: 'Dependency',
    secondaryLabel: 'Drift summary',
  },
  {
    key: 'guardianEscrow',
    title: '🤝 Guardian Escrow',
    description: 'Log escrow guarantees backing guardian commitments.',
    primaryLabel: 'Escrow provider',
    secondaryLabel: 'Coverage amount',
  },
  {
    key: 'custodyPolicy',
    title: '🏦 Custody Policy Snapshot',
    description: 'Share custody policy revisions and enforcement dates.',
    primaryLabel: 'Policy version',
    secondaryLabel: 'Effective date',
  },
  {
    key: 'signingPolicy',
    title: '✍️ Signing Policy Digest',
    description: 'Record signing policy updates and acknowledgements.',
    primaryLabel: 'Policy scope',
    secondaryLabel: 'Approver / witness',
  },
  {
    key: 'sequencerInsurance',
    title: '🛡 Sequencer Insurance',
    description: 'Post coverage proofs for sequencer availability insurance.',
    primaryLabel: 'Carrier',
    secondaryLabel: 'Coverage limit',
  },
  {
    key: 'telemetrySlo',
    title: '📈 Telemetry SLO Pulse',
    description: 'Log telemetry SLOs and whether they were met.',
    primaryLabel: 'SLO name',
    secondaryLabel: 'Status / measurement',
  },
  {
    key: 'deploymentSafeguard',
    title: '🧱 Deployment Safeguard',
    description: 'Show staged deployment safeguards or approvals.',
    primaryLabel: 'Release tag',
    secondaryLabel: 'Safeguard description',
  },
]

export default function OperationalResilienceSuite({ achievementId }: OperationalResilienceSuiteProps) {
  const { isConnected } = useAccount()
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [formState, setFormState] = useState<Record<string, { primary: string; secondary: string; extra: string }>>({})
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const featureStates = useMemo(() => {
    const state: Record<string, { primary: string; secondary: string; extra: string }> = {}
    resilienceFeatures.forEach((feature) => {
      state[feature.key] = formState[feature.key] ?? { primary: '', secondary: '', extra: '' }
    })
    return state
  }, [formState])

  if (!isFeatureEnabled('operationalResilienceSuite')) {
    return null
  }

  const updateField = (featureKey: string, field: 'primary' | 'secondary' | 'extra', value: string) => {
    setFormState((prev) => ({
      ...prev,
      [featureKey]: {
        primary: field === 'primary' ? value : prev[featureKey]?.primary ?? '',
        secondary: field === 'secondary' ? value : prev[featureKey]?.secondary ?? '',
        extra: field === 'extra' ? value : prev[featureKey]?.extra ?? '',
      },
    }))
  }

  const handleSubmit = (feature: ResilienceFeature) => {
    const state = featureStates[feature.key]
    if (!isConnected || !state?.primary.trim()) {
      return
    }

    setActiveFeature(feature.key)

    const lines = [
      feature.title.replace(/^[^ ]+ /, ''), // remove emoji for compactness
      `Achievement: #${achievementId.toString()}`,
      `${feature.primaryLabel}: ${state.primary}`,
      feature.secondaryLabel && state.secondary ? `${feature.secondaryLabel}: ${state.secondary}` : null,
      feature.extraLabel && state.extra ? `${feature.extraLabel}: ${state.extra}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [lines],
    })
  }

  const isFeaturePending = (featureKey: string) => activeFeature === featureKey && (isPending || isConfirming)
  const didFeatureSucceed = (featureKey: string) => activeFeature === featureKey && isSuccess
  const featureError = (featureKey: string) => (activeFeature === featureKey ? error : null)

  return (
    <div className="space-y-6">
      {resilienceFeatures.map((feature) => {
        const fields = featureStates[feature.key]
        return (
          <AppCard key={feature.key} title={feature.title} subtitle={feature.description} accent="default">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{feature.primaryLabel}</label>
                  <input
                    type="text"
                    value={fields.primary}
                    onChange={(e) => updateField(feature.key, 'primary', e.target.value)}
                    placeholder={feature.placeholders?.primary}
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  />
                </div>
                {feature.secondaryLabel && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">{feature.secondaryLabel}</label>
                    <input
                      type="text"
                      value={fields.secondary}
                      onChange={(e) => updateField(feature.key, 'secondary', e.target.value)}
                      placeholder={feature.placeholders?.secondary}
                      className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                    />
                  </div>
                )}
              </div>
              {feature.extraLabel && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{feature.extraLabel}</label>
                  <input
                    type="text"
                    value={fields.extra}
                    onChange={(e) => updateField(feature.key, 'extra', e.target.value)}
                    placeholder={feature.placeholders?.extra}
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  />
                </div>
              )}
              <button
                onClick={() => handleSubmit(feature)}
                disabled={!isConnected || !fields.primary.trim() || isFeaturePending(feature.key)}
                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:bg-gray-400"
              >
                {isFeaturePending(feature.key) ? 'Recording...' : 'Record Evidence Onchain'}
              </button>
              {(didFeatureSucceed(feature.key) || featureError(feature.key)) && (
                <div
                  className={`rounded-lg border p-3 text-sm ${
                    didFeatureSucceed(feature.key)
                      ? 'border-green-200 bg-green-50 text-green-700'
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {didFeatureSucceed(feature.key)
                    ? '✅ Evidence captured onchain'
                    : `⚠️ ${featureError(feature.key)?.message ?? 'Unable to record evidence'}`}
                </div>
              )}
            </div>
          </AppCard>
        )
      })}
    </div>
  )
}




