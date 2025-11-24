'use client'

import { useMemo, useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AutonomousAssuranceSuiteProps {
  achievementId: bigint
}

type AssuranceFeature = {
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

const assuranceFeatures: AssuranceFeature[] = [
  {
    key: 'adaptiveGasHedging',
    title: '⚙️ Adaptive Gas Hedging',
    description: 'Prove hedged gas positions that stabilize Base fees for proofs.',
    primaryLabel: 'Hedge window',
    secondaryLabel: 'Coverage amount',
  },
  {
    key: 'crossRollupReceiptSync',
    title: '🛰️ Cross-Rollup Receipt Sync',
    description: 'Sync OP Stack receipt hashes into BuilderProof timeline.',
    primaryLabel: 'Source rollup',
    secondaryLabel: 'Receipt root / proof',
  },
  {
    key: 'intentOrchestrator',
    title: '🧠 Intent Orchestrator',
    description: 'Capture multi-step intent graphs for Talenty + Reown flows.',
    primaryLabel: 'Intent graph name',
    secondaryLabel: 'Execution summary',
  },
  {
    key: 'reownTrustAnchors',
    title: '🛡 Reown Trust Anchors',
    description: 'Stamp Reown sessions with device class + recovery posture.',
    primaryLabel: 'Session device',
    secondaryLabel: 'Integrity notes',
  },
  {
    key: 'onchainExpenseProofs',
    title: '🧾 Onchain Expense Proofs',
    description: 'Attach signed expense breakdowns per achievement.',
    primaryLabel: 'Expense bundle',
    secondaryLabel: 'Verification hash / URL',
  },
  {
    key: 'artifactContinuity',
    title: '🔄 Artifact Continuity Hashes',
    description: 'Chain artifact hashes so reviewers can verify provenance.',
    primaryLabel: 'Artifact scope',
    secondaryLabel: 'Continuity hash',
  },
  {
    key: 'deterministicBuildAnchors',
    title: '🧬 Deterministic Build Anchors',
    description: 'Store reproducible build configs + derivations.',
    primaryLabel: 'Build ID',
    secondaryLabel: 'Derivation hash',
  },
  {
    key: 'multiSigSessionEscrow',
    title: '🤝 Multi-Sig Session Escrow',
    description: 'Require guardian co-signatures before sensitive actions.',
    primaryLabel: 'Escrow scope',
    secondaryLabel: 'Guardian quorum',
  },
  {
    key: 'builderIdentityGraph',
    title: '🧱 Builder Identity Graph',
    description: 'Maintain DID-linked identity edges with revocation notes.',
    primaryLabel: 'Identity link',
    secondaryLabel: 'Status / notes',
  },
  {
    key: 'telemetryOracleMesh',
    title: '📡 Telemetry Oracle Mesh',
    description: 'Stream latency/error signals from oracle providers.',
    primaryLabel: 'Oracle source',
    secondaryLabel: 'Signal summary',
  },
  {
    key: 'launchReadinessLiveness',
    title: '🚀 Launch Readiness Liveness',
    description: 'Publish liveness checks and reviewer sign-off.',
    primaryLabel: 'Release tag',
    secondaryLabel: 'Liveness verdict',
  },
  {
    key: 'deploymentCapsuleVault',
    title: '📦 Deployment Capsule Vault',
    description: 'Save IPFS capsules for binaries, configs, docs.',
    primaryLabel: 'Capsule name',
    secondaryLabel: 'CID / checksum',
  },
  {
    key: 'secretlessJobCircuits',
    title: '🔐 Secretless Job Circuits',
    description: 'Document MPC/TEE automations executed without raw secrets.',
    primaryLabel: 'Automation name',
    secondaryLabel: 'Circuit provider',
  },
  {
    key: 'autopilotRetroClaims',
    title: '🔁 Autopilot Retro Claims',
    description: 'Auto-trigger retro funding claims when KPIs hit.',
    primaryLabel: 'KPI target',
    secondaryLabel: 'Claim tx / oracle proof',
  },
  {
    key: 'budgetDriftAuditor',
    title: '🧮 Budget Drift Auditor',
    description: 'Compare planned vs. actual spend envelopes.',
    primaryLabel: 'Initiative',
    secondaryLabel: 'Drift amount',
  },
  {
    key: 'maintenanceWorklogNodes',
    title: '🛠 Maintenance Worklog Nodes',
    description: 'Hash maintenance worklogs tied to payouts.',
    primaryLabel: 'Worklog ID',
    secondaryLabel: 'Verifier / reviewer',
  },
  {
    key: 'chaosExperimentJournal',
    title: '🧪 Chaos Experiment Journal',
    description: 'Record blast radius, mitigations, and postmortems.',
    primaryLabel: 'Experiment name',
    secondaryLabel: 'Result summary',
  },
  {
    key: 'kpiBondMarketplace',
    title: '📊 KPI Bond Marketplace',
    description: 'Issue KPI-tied bonds referencing metric feeds.',
    primaryLabel: 'Bond ID',
    secondaryLabel: 'Settlement oracle',
  },
  {
    key: 'teamSlaEscrow',
    title: '🤝 Team SLA Escrow',
    description: 'Escrow deliverable SLAs with slip penalties.',
    primaryLabel: 'SLA name',
    secondaryLabel: 'Escrow tx hash',
  },
  {
    key: 'licenseComplianceTrace',
    title: '📜 License Compliance Trace',
    description: 'Track open-source obligations + alerts.',
    primaryLabel: 'License / package',
    secondaryLabel: 'Compliance status',
  },
  {
    key: 'roadmapTimelockGuard',
    title: '🧭 Roadmap Timelock Guard',
    description: 'Apply timelocks to roadmap commitments.',
    primaryLabel: 'Roadmap item',
    secondaryLabel: 'Unlock condition',
  },
  {
    key: 'inboxToOnchainBridge',
    title: '📥 Inbox-to-Onchain Bridge',
    description: 'Convert verified emails/cal invites to notarized events.',
    primaryLabel: 'Source identifier',
    secondaryLabel: 'Parsed payload hash',
  },
  {
    key: 'partialSnapshotVoting',
    title: '🗳 Partial Snapshot Voting',
    description: 'Support partial-result attestations for long votes.',
    primaryLabel: 'Proposal ID',
    secondaryLabel: 'Partial result',
  },
  {
    key: 'dependencyRiskWeights',
    title: '🧷 Dependency Risk Weights',
    description: 'Publish dependency inventories with CVSS weights.',
    primaryLabel: 'Dependency name',
    secondaryLabel: 'Risk weight / owner',
  },
  {
    key: 'disasterTabletopLedger',
    title: '🌀 Disaster Tabletop Ledger',
    description: 'Store tabletop outcomes, responders, follow-ups.',
    primaryLabel: 'Tabletop scenario',
    secondaryLabel: 'Outcome summary',
  },
  {
    key: 'stablecoinFlowMeter',
    title: '🪙 Stablecoin Flow Meter',
    description: 'Visualize inflow/outflow thresholds with alerts.',
    primaryLabel: 'Flow scope',
    secondaryLabel: 'Net flow',
  },
  {
    key: 'taxLotProofs',
    title: '🧾 Tax Lot Proofs',
    description: 'Generate FIFO/LIFO proofs for treasury tokens.',
    primaryLabel: 'Asset / lot',
    secondaryLabel: 'Proof reference',
  },
  {
    key: 'impactStakingGarden',
    title: '🌱 Impact Staking Garden',
    description: 'Stake public-goods tokens unlocked by milestones.',
    primaryLabel: 'Garden ID',
    secondaryLabel: 'Locked amount',
  },
  {
    key: 'modularRollupHooks',
    title: '🧩 Modular Rollup Hooks',
    description: 'Register hook manifests for automation rails.',
    primaryLabel: 'Hook name',
    secondaryLabel: 'Manifest CID',
  },
  {
    key: 'mobileReownAnchors',
    title: '📱 Mobile Reown Session Anchors',
    description: 'Capture device integrity + geo attestations.',
    primaryLabel: 'Device fingerprint',
    secondaryLabel: 'Geo / integrity proof',
  },
]

export default function AutonomousAssuranceSuite({ achievementId }: AutonomousAssuranceSuiteProps) {
  const { isConnected } = useAccount()
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [formState, setFormState] = useState<Record<string, { primary: string; secondary: string; extra: string }>>({})
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const featureStates = useMemo(() => {
    const next: Record<string, { primary: string; secondary: string; extra: string }> = {}
    assuranceFeatures.forEach((feature) => {
      next[feature.key] = formState[feature.key] ?? { primary: '', secondary: '', extra: '' }
    })
    return next
  }, [formState])

  if (!isFeatureEnabled('autonomousAssuranceSuite')) {
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

  const handleSubmit = (feature: AssuranceFeature) => {
    const state = featureStates[feature.key]
    if (!isConnected || !state.primary.trim()) {
      return
    }
    setActiveFeature(feature.key)

    const lines = [
      feature.title.replace(/^[^ ]+ /, ''),
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
      {assuranceFeatures.map((feature) => {
        const fields = featureStates[feature.key]
        return (
          <AppCard key={feature.key} title={feature.title} subtitle={feature.description} accent="purple">
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
                className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
              >
                {isFeaturePending(feature.key) ? 'Anchoring...' : 'Anchor Assurance Evidence'}
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
                    ? '✅ Assurance evidence recorded onchain'
                    : `⚠️ ${featureError(feature.key)?.message ?? 'Failed to anchor evidence'}`}
                </div>
              )}
            </div>
          </AppCard>
        )
      })}
    </div>
  )
}


