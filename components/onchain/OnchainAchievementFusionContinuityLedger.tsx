'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementFusionContinuityLedger(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Fusion Continuity Ledger"
      subtitle="Ledger for tracking fusion continuity"
      accent="emerald"
      ctaLabel="Record Continuity"
      payloadPrefix="FUSION_CONTINUITY"
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
          key: 'sourceDomain',
          label: 'Source Domain',
          type: 'text',
          placeholder: 'domain1',
          required: true,
        },
        {
          key: 'targetDomain',
          label: 'Target Domain',
          type: 'text',
          placeholder: 'domain2',
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
          key: 'checkpointInterval',
          label: 'Checkpoint Interval (seconds)',
          type: 'number',
          placeholder: '300',
          required: true,
        },
        {
          key: 'continuityMetadata',
          label: 'Continuity Metadata',
          type: 'textarea',
          placeholder: 'Additional continuity information',
        },
      ]}
    />
  )
}

