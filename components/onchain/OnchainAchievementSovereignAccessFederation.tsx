'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementSovereignAccessFederation(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Sovereign Access Federation"
      subtitle="Federate access control across sovereign boundaries"
      accent="slate"
      ctaLabel="Create Federation"
      payloadPrefix="SOV_ACCESS_FED"
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
          key: 'accessProtocol',
          label: 'Access Protocol',
          type: 'select',
          options: [
            { label: 'OAuth2', value: 'oauth2' },
            { label: 'SAML', value: 'saml' },
            { label: 'Custom', value: 'custom' },
          ],
          required: true,
        },
        {
          key: 'trustLevel',
          label: 'Trust Level',
          type: 'select',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          required: true,
        },
        {
          key: 'federationPolicy',
          label: 'Federation Policy',
          type: 'textarea',
          placeholder: 'Access federation rules and trust boundaries',
        },
      ]}
    />
  )
}

