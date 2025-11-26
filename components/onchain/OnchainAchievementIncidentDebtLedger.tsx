'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementIncidentDebtLedger(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Incident Debt Ledger"
      subtitle="Tie debts to owners"
      accent="orange"
      ctaLabel="Log Incident Debt"
      payloadPrefix="DEBT_LEDGER"
      fields={[
        {
          key: 'debtItem',
          label: 'Debt Item',
          type: 'text',
          placeholder: 'Rebuild doc tooling',
          required: true,
        },
        {
          key: 'owner',
          label: 'Owner',
          type: 'text',
          placeholder: 'squad/owner',
          required: true,
        },
        {
          key: 'dueDate',
          label: 'Due Date',
          type: 'text',
          placeholder: '2025-02-01',
          required: true,
        },
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'In Progress', value: 'in_progress' },
            { label: 'Done', value: 'done' },
          ],
          required: true,
        },
      ]}
    />
  )
}
