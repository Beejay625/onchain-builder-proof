'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementAetherContinuityLedger(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Aether Continuity Ledger"
      subtitle="Ledger for tracking aether network continuity"
      accent="emerald"
      ctaLabel="Record Continuity"
      payloadPrefix="AETHER_CONTINUITY"
      fields={[
        {
          key: 'ledgerId',
          label: 'Ledger Identifier',
          type: 'text',
          placeholder: 'ledger-001',
          required: true,
        },
        {
          key: 'continuityType',
          label: 'Continuity Type',
          type: 'select',
          options: [
            { label: 'State', value: 'state' },
            { label: 'Execution', value: 'execution' },
            { label: 'Data', value: 'data' },
            { label: 'Identity', value: 'identity' },
          ],
          required: true,
        },
        {
          key: 'checkpointInterval',
          label: 'Checkpoint Interval (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'continuityProof',
          label: 'Continuity Proof Hash',
          type: 'text',
          placeholder: '0x...',
          required: true,
        },
        {
          key: 'ledgerPolicy',
          label: 'Ledger Policy',
          type: 'textarea',
          placeholder: 'Continuity ledger rules and checkpoint parameters',
        },
      ]}
    />
  )
}

