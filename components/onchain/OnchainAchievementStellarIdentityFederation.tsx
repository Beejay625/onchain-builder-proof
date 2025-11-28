'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementStellarIdentityFederation(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="Stellar Identity Federation"
      subtitle="Federate identities across stellar networks"
      accent="green"
      ctaLabel="Create Federation"
      payloadPrefix="STELLAR_ID_FED"
      fields={[
        {
          key: 'federationId',
          label: 'Federation Identifier',
          type: 'text',
          placeholder: 'fed-001',
          required: true,
        },
        {
          key: 'participantNetworks',
          label: 'Participant Networks',
          type: 'textarea',
          placeholder: 'network1,network2,network3',
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
          key: 'federationPolicy',
          label: 'Federation Policy',
          type: 'textarea',
          placeholder: 'Identity federation rules and protocol parameters',
        },
      ]}
    />
  )
}

