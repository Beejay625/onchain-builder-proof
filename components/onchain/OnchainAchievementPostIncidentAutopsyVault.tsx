'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementPostIncidentAutopsyVault(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Post-Incident Autopsy Vault"
      subtitle="Anchor postmortem evidence"
      accent="cyan"
      ctaLabel="Seal Autopsy Entry"
      payloadPrefix="AUTOPSY_VAULT"
      fields={[
        {
        key: 'scope',
        label: 'Scope',
        type: 'text',
        placeholder: 'RPC failover, payout delay',
        required: true,
        },
        {
        key: 'evidenceCid',
        label: 'Evidence CID',
        type: 'text',
        placeholder: 'bafy...',
        required: true,
        },
        {
        key: 'owner',
        label: 'Remediation Owner',
        type: 'text',
        placeholder: 'ops@builder',
        required: true,
        },
        {
        key: 'summary',
        label: 'Autopsy Summary',
        type: 'textarea',
        placeholder: 'Key learnings and blockers',
        required: true,
        },
      ]}
    />
  )
}
