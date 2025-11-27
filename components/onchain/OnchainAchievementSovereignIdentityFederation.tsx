'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignIdentityFederation(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Identity Federation"
      subtitle="Federate identities across sovereign boundaries"
      accent="green"
      ctaLabel="Create Federation"
      payloadPrefix="SOV_ID_FED"
      fields={[
        {
          key: 'federationId',
          label: 'Federation Identifier',
          type: 'text',
          placeholder: 'fed-001',
          required: true,
        },
        {
          key: 'participantSovereignties',
          label: 'Participant Sovereignties',
          type: 'textarea',
          placeholder: 'sovereignty1,sovereignty2,sovereignty3',
          required: true,
        },
        {
          key: 'identityStandard',
          label: 'Identity Standard',
          type: 'select',
          options: [
            { label: 'DID', value: 'did' },
            { label: 'Verifiable Credentials', value: 'vc' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'federationProtocol',
          label: 'Federation Protocol',
          type: 'select',
          options: [
            { label: 'OIDC', value: 'oidc' },
            { label: 'SAML', value: 'saml' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'trustFramework',
          label: 'Trust Framework',
          type: 'textarea',
          placeholder: 'Trust framework and verification rules',
        },
      ]}
    />
  )
}

