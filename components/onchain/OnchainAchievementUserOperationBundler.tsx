'use client'

import HeliosMeshComposer, { HeliosMeshFeatureProps } from './HeliosMeshComposer'

export default function OnchainAchievementUserOperationBundler(props: HeliosMeshFeatureProps) {
  return (
    <HeliosMeshComposer
      {...props}
      title="User Operation Bundler"
      subtitle="Bundles user operations for ERC-4337 account abstraction"
      accent="cyan"
      ctaLabel="Deploy Bundler"
      payloadPrefix="USER_OP_BUNDLER"
      fields={[
        {
          key: 'bundlerId',
          label: 'Bundler Identifier',
          type: 'text',
          placeholder: 'bundler-001',
          required: true,
        },
        {
          key: 'bundleSize',
          label: 'Bundle Size',
          type: 'number',
          placeholder: '10',
          required: true,
        },
        {
          key: 'bundlingStrategy',
          label: 'Bundling Strategy',
          type: 'select',
          options: [
            { label: 'Time-Based', value: 'time_based' },
            { label: 'Size-Based', value: 'size_based' },
            { label: 'Gas-Based', value: 'gas_based' },
          ],
          required: true,
        },
        {
          key: 'maxGasPrice',
          label: 'Max Gas Price (gwei)',
          type: 'number',
          placeholder: '100',
          required: true,
        },
        {
          key: 'bundlerPolicy',
          label: 'Bundler Policy',
          type: 'textarea',
          placeholder: 'Bundler rules and strategy parameters',
        },
      ]}
    />
  )
}

