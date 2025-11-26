## Onchain Builder Proof · 30-Feature Delivery Plan

### 1. Objectives
- Ship 30 net-new, user-facing capabilities that deepen capture, collaboration, insights, and automation.
- Keep each drop deployable independently while sharing common scaffolding (context, API routes, contract helpers).
- Maintain performance (no >200 ms layout shifts) and uphold onchain integrity by centralizing contract interactions.

### 2. Release Waves
| Wave | Theme | Features (IDs) | Target |
| --- | --- | --- | --- |
| W1 | Capture & Evidence | F01–F10 | Weeks 1–2 |
| W2 | Collaboration & Teams | F11–F17 | Weeks 3–4 |
| W3 | Insights & Rewards | F18–F24 | Weeks 5–6 |
| W4 | Automation & Distribution | F25–F30 | Weeks 7–8 |
| W5 | Onchain Assurance (Wave Θ) | F31–F60 | Weeks 9–14 |
| W6 | Sentinel Cascade Continuity | F61–F90 | Weeks 15–20 |
| W7 | Aurora Wave · Ethereum Control Plane | F151–F180 | Weeks 21–26 |

### 3. Shared Prerequisites
1. **Context Upgrade** (`context/index.tsx`): multi-wallet support, cached analytics, notification stream.
2. **Common UI Kit** (`components/common/*`): Card, Modal, Tabs, Timeline, KanbanColumn.
3. **API Route Templates** (`app/api/_templates`): REST + streaming handlers with `@tanstack/react-query` hooks.
4. **Contract Extension Stub** (`contracts/BuilderProof.sol` & ABI): placeholder methods for batch mint, reward vaults, reviews.
5. **Testing Harness**: mock wagmi provider + Storybook-like `app/sandbox` pages.

### 4. Feature Specs

#### Delivery Status
- ✅ F01 · AI Achievement Draft Assistant
- ✅ F02 · Adaptive Template Builder
- ✅ F03 · Achievement Evidence Locker
- ✅ F04 · GitHub Auto-Proof Importer
- ✅ F05 · CI/CD Deployment Sync
- ✅ F06 · Wakatime Activity Sync
- ✅ F07 · Habit Streak Coach
- ✅ F08 · Milestone Roadmaps
- ✅ F09 · Impact KPI Dashboard
- ✅ F10 · Cross-Chain Mirror View
- ✅ F11 · Multi-Wallet Aggregator

#### F01 · AI Achievement Draft Assistant
- **UI**: `components/ai/AchievementDraftAssistant.tsx` modal from creation flow.
- **API**: `app/api/ai-draft/route.ts` (OpenAI/Reown adapter).
- **Data**: seeds prompt with last 3 achievements via `lib/utils.ts`.
- **Acceptance**: Draft suggestion appears <3 s, editable, no auto-submit.

#### F02 · Adaptive Template Builder
- Drag/drop composer in `components/templates/TemplateBuilder.tsx`.
- Persisted locally via `lib/localTemplates.ts` (IndexedDB fallback).
- Template library section on `app/dashboard/page.tsx`.

#### F03 · Achievement Evidence Locker
- Attachment panel storing IPFS hashes + URLs in `components/achievements/EvidenceLocker.tsx`.
- Helper `lib/ipfs.ts` wrapping pinning service.
- Contract field `evidenceRoot` hashed client-side.

#### F04 · GitHub Auto-Proof Importer
- OAuth button (NextAuth or custom) on creation page.
- API cron `app/api/github/route.ts` pulling recent commits/deploys.
- Maps to draft achievements; manual approval required.

#### F05 · CI/CD Deployment Sync
- Webhook endpoints `app/api/webhooks/vercel|netlify/route.ts`.
- Contract method `logDeploymentProof(commitHash, txHash)`.
- Dashboard card showing last deployment proof.

#### F06 · Wakatime Activity Sync
- API `app/api/wakatime/route.ts` storing activity snapshots.
- Insight widget `components/insights/WakatimeSummary.tsx`.
- Supports manual refresh + daily cron.

#### F07 · Habit Streak Coach
- Hook `hooks/useStreakForecast.ts` analyzing timestamps.
- Widget on dashboard with predictive tips and risk alerts.

#### F08 · Milestone Roadmaps
- `components/roadmap/MilestoneRoadmap.tsx` timeline grouped by OKRs.
- Data model stored off-chain (Supabase / local) with onchain anchors for completions.

#### F09 · Impact KPI Dashboard
- Dashboard tab summarizing reach, engagement, reward metrics.
- Uses consolidated analytics query in `lib/analytics.ts`.

#### F10 · Cross-Chain Mirror View
- `hooks/useCrossChainPosts.ts` batching `useReadContracts` for L2s.
- UI toggle on achievement detail page.

#### F11 · Multi-Wallet Aggregator
- Extend context to store multiple addresses and aggregated stats.
- Settings panel `components/settings/WalletAggregator.tsx`.

#### F12 · Gas Optimizer Tips
- Pre-flight modal estimating gas via `viem` `estimateGas`.
- Suggests batching or off-peak windows; logs diffs.

#### F13 · Achievement Bundles
- UI composer to mint batches.
- Contract addition `mintBatch(Achievement[] memory payloads)`.
- Batch review screen with validation.

#### F14 · Live Collaboration Rooms
- Realtime editing via WebRTC/Pusher channel.
- `components/collab/CollabRoomPanel.tsx`.
- Permission checks backed by contract roles.

#### F15 · Mentorship Matcher
- Matching algorithm `lib/matchmaking.ts`.
- Suggestion card on dashboard; CTA to connect.

#### F16 · Squad Sprint Board
- Kanban board `components/squads/SprintBoard.tsx`.
- Persists to Supabase table `squad_sprints`; tasks link to onchain proof IDs.

#### F17 · Threaded Comments & Mentions
- Update comment components to support parentId, @mentions (regex + highlight).
- Notifications for mentions via websocket channel.

#### F18 · Reaction Palette & Mood Insights
- Emoji picker storing reaction aggregates off-chain, anchor hash onchain.
- Analytics card summarizing sentiment trends.

#### F19 · Tip Splitting & Revenue Share
- UI to specify collaborator percentages.
- Contract payout mapping + withdrawal flow.

#### F20 · Reward Vaults
- Time-locked vault interface `components/rewards/RewardVaultCard.tsx`.
- Contract method `createRewardVault(recipient, amount, unlockTime)`.

#### F21 · Governance Snapshot Mirror
- Integrate Snapshot API for view/sign.
- Component `components/governance/SnapshotMirror.tsx`.

#### F22 · Compliance Attestation Forms
- Dynamic form JSON schema stored onchain.
- Component `components/compliance/AttestationCard.tsx`.

#### F23 · Evidence Review Workflows
- Reviewer queue `components/review/ReviewQueue.tsx`.
- Contract events for approvals/rejections.

#### F24 · Real-Time Notification Center
- Websocket hub `app/api/notifications/pusher/route.ts`.
- UI drawer `components/notifications/Center.tsx`.

#### F25 · Public Webhooks & API Keys
- Developer settings issuing scoped keys stored in Supabase.
- Webhook ingestion `app/api/webhooks/[id]/route.ts`.

#### F26 · Scheduled Publishing & Auto-Sharing
- Scheduler UI storing `scheduledAt`.
- Background worker triggers mint + social share (Twitter/LinkedIn APIs).

#### F27 · Digest Emails & Push
- Weekly digest generator (Resend/Sendgrid) + push notifications.
- Preferences stored in settings contract or Supabase.

#### F28 · Embeddable Achievement Gallery
- Generates iframe snippets; static route `app/embed/[username]/page.tsx`.

#### F29 · Profile Layout Builder
- Drag/drop layout editing with persisted JSON schema.
- Applies to dashboard profile view.

#### F30 · Offline Capture & Sync Queue
- PWA service worker caching drafts in IndexedDB.
- Sync queue component showing pending uploads.

### Wave Θ · Onchain Feature Expansion (F31–F60)

Wave Θ stitches thirty additional resilience, compliance, and automation primitives directly into BuilderProof. Each capability ships behind a dedicated feature flag (see `lib/featureFlags.ts`) and reuses the shared onchain logging patterns introduced earlier. The summary below maps every ID to its core surface; detailed specs follow.

| ID | Feature | Theme | Primary Surface |
| --- | --- | --- | --- |
| F31 | Achievement Hotfix Stream | Operational Resilience | `components/onchain/AchievementHotfixStream.tsx` |
| F32 | Achievement Safelist Registry | Trust & Safety | `components/onchain/AchievementSafelistRegistry.tsx` |
| F33 | Achievement Stress Test | Operability | `components/onchain/AchievementStressTest.tsx` |
| F34 | Achievement Adaptive Escrow Trees | Treasury Automation | `components/onchain/AchievementAdaptiveEscrowTrees.tsx` |
| F35 | Achievement Attestation Relay Mesh | Evidence Intake | `components/onchain/AchievementAttestationRelayMesh.tsx` |
| F36 | Achievement Sovereign Workspace Clones | Workflow Isolation | `components/onchain/AchievementSovereignWorkspaceClones.tsx` |
| F37 | Achievement Multi-Tenant KPI Map | Program Analytics | `components/onchain/AchievementMultiTenantKpiMap.tsx` |
| F38 | Achievement Parameter Guardrails | Guardrails | `components/onchain/AchievementParameterGuardrails.tsx` |
| F39 | Achievement Evidence Diff Visualizer | Evidence Quality | `components/onchain/AchievementEvidenceDiffVisualizer.tsx` |
| F40 | Achievement Integrity Backfill Engine | Historical Coverage | `components/onchain/AchievementIntegrityBackfillEngine.tsx` |
| F41 | Achievement Cross-Domain Intent Router | Interop | `components/onchain/AchievementCrossDomainIntentRouter.tsx` |
| F42 | Achievement Recovery Guardian Council | Governance | `components/onchain/AchievementRecoveryGuardianCouncil.tsx` |
| F43 | Achievement Deterministic Batch Reactor | Automation | `components/onchain/AchievementDeterministicBatchReactor.tsx` |
| F44 | Achievement ZK KPI Oracle | Privacy-Preserving Insights | `components/onchain/AchievementZkKpiOracle.tsx` |
| F45 | Achievement Liquid Backlog Underwriter | Funding | `components/onchain/AchievementLiquidBacklogUnderwriter.tsx` |
| F46 | Achievement Reward Cliff Simulator | Compensation | `components/onchain/AchievementRewardCliffSimulator.tsx` |
| F47 | Achievement Governance Heartbeat Monitor | Governance | `components/onchain/AchievementGovernanceHeartbeatMonitor.tsx` |
| F48 | Achievement Streak Anchor Vaults | Habits | `components/onchain/AchievementStreakAnchorVaults.tsx` |
| F49 | Achievement Censorship Escape Hatch | Continuity | `components/onchain/AchievementCensorshipEscapeHatch.tsx` |
| F50 | Achievement Impact Weight Notary | Reputation | `components/onchain/AchievementImpactWeightNotary.tsx` |
| F51 | Achievement Delegated Witness Swarms | Verification | `components/onchain/AchievementDelegatedWitnessSwarms.tsx` |
| F52 | Achievement Treasury Drift Sentinel | Treasury | `components/onchain/AchievementTreasuryDriftSentinel.tsx` |
| F53 | Achievement Programmatic Bonus Streams | Rewards | `components/onchain/AchievementProgrammaticBonusStreams.tsx` |
| F54 | Achievement Ethics Disclosure Ledger | Compliance | `components/onchain/AchievementEthicsDisclosureLedger.tsx` |
| F55 | Achievement Autopruned Evidence Trees | Evidence Quality | `components/onchain/AchievementAutoprunedEvidenceTrees.tsx` |
| F56 | Achievement Failure Mode Sandbox | Resilience | `components/onchain/AchievementFailureModeSandbox.tsx` |
| F57 | Achievement SLA Escrow Monitor | Service Guarantees | `components/onchain/AchievementSlaEscrowMonitor.tsx` |
| F58 | Achievement Re-entry Timelock Guard | Dispute Controls | `components/onchain/AchievementReentryTimelockGuard.tsx` |
| F59 | Achievement Omnichain Inbox Router | Interop | `components/onchain/AchievementOmnichainInboxRouter.tsx` |
| F60 | Achievement Adaptive Reputation Bonds | Reputation | `components/onchain/AchievementAdaptiveReputationBonds.tsx` |

#### F31 · Achievement Hotfix Stream
- **UI**: `components/onchain/AchievementHotfixStream.tsx` card collects hotfix version, incident summary, deployment hash, and reviewer acks.
- **Contract**: Reuses `addComment` with structured payload `HOTFIX:{version}:{issue}:{deployment}` so BaseScan entries show intent.
- **Telemetry**: Links to `OperationalResilienceSuite` so guardians can view latest hotfix timeline on dashboard.
- **Acceptance**: Builder can log a hotfix in <30 s, and the card surfaces status once the transaction confirms.

#### F32 · Achievement Safelist Registry
- **UI**: `components/onchain/AchievementSafelistRegistry.tsx` dropdown for entry type (address, contract, domain, IP) plus rationale.
- **Contract**: `createPost` records human-readable safelist event; downstream services parse lines prefixed with `SAFE:`.
- **Data**: Additional copy to Supabase table `safelist_mirror` ensures API gateway can enforce allowlists.
- **Acceptance**: Attempting to submit invalid addresses triggers inline validation; each confirmed entry links to BaseScan.

#### F33 · Achievement Stress Test
- **UI**: `components/onchain/AchievementStressTest.tsx` collects scenario scope, peak metrics, mitigations.
- **Contract**: `createPost` entry anchors test results; optional IPFS CID for raw metrics.
- **Ops Hooks**: Emits `stressTestLogged` client event so oncall dashboards highlight the latest run.
- **Acceptance**: At least one stress test per sprint can be recorded, and card labels pass/fail automatically from input.

#### F34 · Achievement Adaptive Escrow Trees
- **UI**: `components/onchain/AchievementAdaptiveEscrowTrees.tsx` builder codes milestone lineage, split strategy, and Merkle root pointer.
- **Contract**: `createPost` logs the topology while future `contracts/BuilderProof.sol` upgrade reads hashed leaves for automated payouts.
- **Data**: Optionally mirrors to `lib/constants.ts` so front-end can visualize the tree via d3 chart on treasury page.
- **Acceptance**: Upload shows computed Merkle root and warns if text fields are blank; serialized schema passes JSON schema validation.

#### F35 · Achievement Attestation Relay Mesh
- **UI**: `components/onchain/AchievementAttestationRelayMesh.tsx` collects attestor address, hash, notes.
- **Contract**: `createPost` posts `ATTEST_RELAY` payload; watchers verify `secp256k1` signatures off-chain.
- **Integrations**: Accepts Lens, Farcaster, or EAS references; stored as multi-line record for parsing.
- **Acceptance**: Submission rejected if attestor address invalid; record automatically tags associated achievement.

#### F36 · Achievement Sovereign Workspace Clones
- **UI**: `components/onchain/AchievementSovereignWorkspaceClones.tsx` logs workspace label, sync cadence, diff hash.
- **Contract**: `createPost` anchors clones; long-term path to `workspaceCloneSynced(bytes32 hash)` contract event.
- **Data**: Dashboard clone list surfaces diffs; uses `lib/analytics.ts` to show drift risk.
- **Acceptance**: After logging, clone appears in UI with countdown to next sync; invalid diff hash blocked.

#### F37 · Achievement Multi-Tenant KPI Map
- **UI**: `components/onchain/AchievementMultiTenantKpiMap.tsx` layering builder/squad/program metrics.
- **Contract**: `createPost` payload includes `KPI_LAYER:{scope}:{metric}:{value}` for deterministic parsing.
- **Analytics**: `lib/analytics.ts` merges multi-layer data to show aggregated KPIs per organization.
- **Acceptance**: KPIs render on dashboard heatmap with color-coded tiers; duplicates prevented per 24 h window.

#### F38 · Achievement Parameter Guardrails
- **UI**: `components/onchain/AchievementParameterGuardrails.tsx` sets allowed min/max, response strategy.
- **Contract**: `addComment` attaches guardrail to specific achievement ID for easy retrieval.
- **Automation**: Future lambda reads guardrails before executing contract writes to avoid invalid parameters.
- **Acceptance**: Attempting to set max < min yields validation error; guardrail list shows enforcement status.

#### F39 · Achievement Evidence Diff Visualizer
- **UI**: `components/onchain/AchievementEvidenceDiffVisualizer.tsx` stores baseline/candidate hashes plus summary.
- **Contract**: `addComment` saves `EVIDENCE_DIFF` payload; hashed attachments pinned through `lib/ipfs.ts`.
- **UX**: Diff viewer toggles between versions; hashed metadata ensures tamper evidence.
- **Acceptance**: Submission fails unless both hashes follow CID/hex format; viewer shows relative size change.

#### F40 · Achievement Integrity Backfill Engine
- **UI**: `components/onchain/AchievementIntegrityBackfillEngine.tsx` records backlog era, source system, root hash.
- **Contract**: `createPost` entry ensures historical achievements gain onchain anchors.
- **Pipelines**: Server job reads `backfillEra` and backfills missing posts from CSV/IPFS dumps.
- **Acceptance**: Each backfill run emits timeline entry and marks coverage % within analytics view.

#### F41 · Achievement Cross-Domain Intent Router
- **UI**: `components/onchain/AchievementCrossDomainIntentRouter.tsx` collects origin/destination/summary.
- **Contract**: `createPost` logs `INTENT_ROUTE`; bridging service watches for entries to orchestrate flows.
- **Interops**: Document includes settlement proof link; fosters multi-chain transparency.
- **Acceptance**: UI surfaces quick links to both transaction hashes and warns if origin equals destination.

#### F42 · Achievement Recovery Guardian Council
- **UI**: `components/onchain/AchievementRecoveryGuardianCouncil.tsx` registers guardian label, address, action window.
- **Contract**: `addComment` attaches guardian metadata to achievement; future contract upgrade will enforce roles.
- **Governance**: Notification center pings guardians when pause authority invoked.
- **Acceptance**: Duplicate guardian addresses blocked; UI shows quorum and active status.

#### F43 · Achievement Deterministic Batch Reactor
- **UI**: `components/onchain/AchievementDeterministicBatchReactor.tsx` logs batch label, job count, trace hash.
- **Contract**: `createPost` stores machine-readable trace header; pairs with `app/api/batch-reactor/log`.
- **Automation**: Background job replays deterministic runs and compares to recorded hash to detect drift.
- **Acceptance**: Batch runs flagged if trace mismatch; card shows last run timestamp and health.

#### F44 · Achievement ZK KPI Oracle
- **UI**: `components/onchain/AchievementZkKpiOracle.tsx` captures KPI channel, proof CID, confidence band.
- **Contract**: `createPost` entry includes `ZK_PROOF:{channel}:{cid}:{band}` for verifiers.
- **Privacy**: Proof files stored via EAS/Ethereum storage; only aggregated metrics revealed.
- **Acceptance**: Without CID submission fails; UI displays verification badge when circuit check passes.

#### F45 · Achievement Liquid Backlog Underwriter
- **UI**: `components/onchain/AchievementLiquidBacklogUnderwriter.tsx` logs backlog item, bonded liquidity, expiry.
- **Contract**: `createPost` used initially; follow-on contract `underwriteBacklog(bytes32 itemId, uint256 amount)` planned.
- **Finance**: Treasury dashboard shows active underwriting pools and slashing risk.
- **Acceptance**: Card enforces currency formatting; autop warning when expiry < current block time.

#### F46 · Achievement Reward Cliff Simulator
- **UI**: `components/onchain/AchievementRewardCliffSimulator.tsx` allows grant label, cliff date, simulation hash.
- **Contract**: `createPost` anchors simulation outcomes; hashed JSON explains payout schedule.
- **Analytics**: Integrates with `lib/analytics.ts` to project monthly unlocks.
- **Acceptance**: UI displays Gantt preview; invalid ISO dates blocked.

#### F47 · Achievement Governance Heartbeat Monitor
- **UI**: `components/onchain/AchievementGovernanceHeartbeatMonitor.tsx` collects governance body, interval, last validated timestamp.
- **Contract**: `createPost` logs `GOV_HEARTBEAT` entries for auditability.
- **Automation**: Reminder service notifies when heartbeat overdue; ensures DAOs keep cadence.
- **Acceptance**: When interval exceeded, dashboard shows red badge; acking with new heartbeat clears alert.

#### F48 · Achievement Streak Anchor Vaults
- **UI**: `components/onchain/AchievementStreakAnchorVaults.tsx` logs streak name, anchor weight, decay rate.
- **Contract**: `addComment` attaches `STREAK_ANCHOR` data to achievement ID; later used by `StreakTracker`.
- **Mechanics**: Weighted anchors degrade if reporting stops; watchers compute net streak health.
- **Acceptance**: Input enforces numeric weight; watchers display degrade timeline.

#### F49 · Achievement Censorship Escape Hatch
- **UI**: `components/onchain/AchievementCensorshipEscapeHatch.tsx` records mirror chain, exit route, relay status.
- **Contract**: `createPost` logs fallback instructions; includes alt RPC endpoints.
- **Infra**: CLI script reads latest escape hatch and configures fallback relays automatically.
- **Acceptance**: Each record shows tested timestamp; warnings when status older than 72 h.

#### F50 · Achievement Impact Weight Notary
- **UI**: `components/onchain/AchievementImpactWeightNotary.tsx` collects impact area, computed weight, reviewer handle.
- **Contract**: `addComment` binds weight to achievement; used by ranking algorithms.
- **Reputation**: Deduplicates by (achievementId, reviewer) to avoid spam.
- **Acceptance**: Weighted score surfaces in profile; duplicates blocked with inline message.

#### F51 · Achievement Delegated Witness Swarms
- **UI**: `components/onchain/AchievementDelegatedWitnessSwarms.tsx` captures swarm name, delegate address, duty window.
- **Contract**: `addComment` logs watchers; extends to multi-sig witness contract later.
- **Ops**: Notification service alerts swarm members ahead of duty window start.
- **Acceptance**: Address validation enforced; timeline lists active swarms and coverage.

#### F52 · Achievement Treasury Drift Sentinel
- **UI**: `components/onchain/AchievementTreasuryDriftSentinel.tsx` inputs budget line, planned spend, actual spend.
- **Contract**: `createPost` logs `TREASURY_DRIFT`; difference computed client-side and highlighted.
- **Analytics**: `lib/analytics.ts` chart extends to show drift envelopes over time.
- **Acceptance**: If drift > configured threshold, UI surfaces alert and recommended actions.

#### F53 · Achievement Programmatic Bonus Streams
- **UI**: `components/onchain/AchievementProgrammaticBonusStreams.tsx` configures stream label, KPI window, bonus amount.
- **Contract**: `createPost` anchors config; follow-up contract method will trigger streaming payouts on KPI close.
- **Automation**: Worker reads config and schedules payouts via Superfluid or custom payment router.
- **Acceptance**: UI shows countdown to window close and indicates when payout triggered.

#### F54 · Achievement Ethics Disclosure Ledger
- **UI**: `components/onchain/AchievementEthicsDisclosureLedger.tsx` logs disclosure topic, evidence link, signature hash.
- **Contract**: `createPost` entry ensures compliance statements immutable.
- **Compliance**: Links to public disclosure pages for audit.
- **Acceptance**: URL validation required; once signed, profile shows disclosure badge.

#### F55 · Achievement Autopruned Evidence Trees
- **UI**: `components/onchain/AchievementAutoprunedEvidenceTrees.tsx` records tree identifier, nodes pruned, proof hash.
- **Contract**: `addComment` logs pruning event plus deletion proof.
- **Storage**: Service worker ensures pruned nodes acknowledged by reviewers.
- **Acceptance**: Proof hash mandatory; UI displays before/after size and ensures nodes pruned <= original count.

#### F56 · Achievement Failure Mode Sandbox
- **UI**: `components/onchain/AchievementFailureModeSandbox.tsx` records scenario name, blast radius, recovery time.
- **Contract**: `createPost` anchors scenario evidence; optional IPFS pointer to postmortem.
- **Ops**: Link to `OperationalResilienceSuite` for quick playback.
- **Acceptance**: Dashboard timeline highlights latest sandbox drill; missing recovery time blocked.

#### F57 · Achievement SLA Escrow Monitor
- **UI**: `components/onchain/AchievementSlaEscrowMonitor.tsx` collects service name, SLA threshold, breach response.
- **Contract**: `addComment` logs `SLA_ESCROW` entry referencing escrow account ID.
- **Automation**: When uptime < threshold, script initiates slash via scheduled transaction.
- **Acceptance**: UI marks SLA as healthy/breached; required fields enforced.

#### F58 · Achievement Re-entry Timelock Guard
- **UI**: `components/onchain/AchievementReentryTimelockGuard.tsx` captures timelock label, cooldown seconds, unlock policy.
- **Contract**: `addComment` ties guard to achievement; future contract ensures functions respect cooldown.
- **Governance**: Panel shows countdown timers and unlock voters.
- **Acceptance**: Cooldown must be >= 1 hour; else inline error.

#### F59 · Achievement Omnichain Inbox Router
- **UI**: `components/onchain/AchievementOmnichainInboxRouter.tsx` logs source chain, payload ID, replay vector.
- **Contract**: `createPost` records inbound packet metadata and fosters replay protection.
- **Interop**: Router microservice reads entries to hydrate cross-chain feed.
- **Acceptance**: Submission fails without payload ID; UI surfaces chain logo + link to tx.

#### F60 · Achievement Adaptive Reputation Bonds
- **UI**: `components/onchain/AchievementAdaptiveReputationBonds.tsx` records bond label, current & target weights.
- **Contract**: `addComment` attaches bond metadata; future `adjustReputationBond` contract to enforce weights.
- **Reputation**: Dashboard shows how weights shift after governance votes.
- **Acceptance**: Input enforces 0–1 weight range; slider preview updates instantly.

### Wave Σ · Sentinel Cascade Continuity Enhancers (F61–F90)

Sentinel Cascade layers another thirty continuity and assurance primitives on top of Wave Θ. Each capability is paired with a dedicated onchain module (planned under `components/onchain/*`) and is meant to harden runtime operations, custody, and governance flows. Like prior waves, every feature is wrapped in a feature flag and inherits the shared contract helper scaffolding.

| ID | Feature | Theme | Primary Surface |
| --- | --- | --- | --- |
| F61 | Achievement Sentinel Consensus Mirror | Finality Assurance | `components/onchain/AchievementSentinelConsensusMirror.tsx` |
| F62 | Achievement Predictive Failover Graph | Infra Forecasting | `components/onchain/AchievementPredictiveFailoverGraph.tsx` |
| F63 | Achievement Intent Delay Vault | Transaction Safety | `components/onchain/AchievementIntentDelayVault.tsx` |
| F64 | Achievement Guardian Bond Escrow | Guardian Incentives | `components/onchain/AchievementGuardianBondEscrow.tsx` |
| F65 | Achievement Custody Chain Sequencer | Evidence Custody | `components/onchain/AchievementCustodyChainSequencer.tsx` |
| F66 | Achievement Encryption Envelope Ledger | Crypto Hygiene | `components/onchain/AchievementEncryptionEnvelopeLedger.tsx` |
| F67 | Achievement Device Trust Fabric | Device Integrity | `components/onchain/AchievementDeviceTrustFabric.tsx` |
| F68 | Achievement Rate Limit Beacon | Throughput Governance | `components/onchain/AchievementRateLimitBeacon.tsx` |
| F69 | Achievement Post-Quantum Attestor | PQ Assurance | `components/onchain/AchievementPostQuantumAttestor.tsx` |
| F70 | Achievement Rolling Proof Continuity | Telemetry Coverage | `components/onchain/AchievementRollingProofContinuity.tsx` |
| F71 | Achievement Rollforward Repair Kit | Recovery Automation | `components/onchain/AchievementRollforwardRepairKit.tsx` |
| F72 | Achievement Multihop Reward Director | Reward Routing | `components/onchain/AchievementMultihopRewardDirector.tsx` |
| F73 | Achievement Gas Refund Router | Cost Accounting | `components/onchain/AchievementGasRefundRouter.tsx` |
| F74 | Achievement Sovereign Executor Ledger | Executor Governance | `components/onchain/AchievementSovereignExecutorLedger.tsx` |
| F75 | Achievement Guardian Drift Radar | Guardian Monitoring | `components/onchain/AchievementGuardianDriftRadar.tsx` |
| F76 | Achievement Integrity Beacon Switchboard | Integrity Broadcast | `components/onchain/AchievementIntegrityBeaconSwitchboard.tsx` |
| F77 | Achievement Audit Replay Shuttle | Auditability | `components/onchain/AchievementAuditReplayShuttle.tsx` |
| F78 | Achievement Evidence Compression Lab | Storage Efficiency | `components/onchain/AchievementEvidenceCompressionLab.tsx` |
| F79 | Achievement Reviewer Signal Token | Reviewer Incentives | `components/onchain/AchievementReviewerSignalToken.tsx` |
| F80 | Achievement Bridge Timeout Escrow | Bridge Safety | `components/onchain/AchievementBridgeTimeoutEscrow.tsx` |
| F81 | Achievement Unlock Condition Graph | Dependency Modeling | `components/onchain/AchievementUnlockConditionGraph.tsx` |
| F82 | Achievement Execution Circuit Notebook | Execution Governance | `components/onchain/AchievementExecutionCircuitNotebook.tsx` |
| F83 | Achievement Mempool Mirror Chain | Transaction Observability | `components/onchain/AchievementMempoolMirrorChain.tsx` |
| F84 | Achievement Multi-Party Dust Settlement | Treasury Ops | `components/onchain/AchievementMultiPartyDustSettlement.tsx` |
| F85 | Achievement Vault Warmup Scheduler | Vault Safety | `components/onchain/AchievementVaultWarmupScheduler.tsx` |
| F86 | Achievement Config Lint Oracle | Config Quality | `components/onchain/AchievementConfigLintOracle.tsx` |
| F87 | Achievement Carbon Impact Proofset | Sustainability | `components/onchain/AchievementCarbonImpactProofset.tsx` |
| F88 | Achievement Adaptive Recovery Tree | Recovery Planning | `components/onchain/AchievementAdaptiveRecoveryTree.tsx` |
| F89 | Achievement Warrant Canary Register | Legal Transparency | `components/onchain/AchievementWarrantCanaryRegister.tsx` |
| F90 | Achievement Privacy Envelope Switch | Privacy Controls | `components/onchain/AchievementPrivacyEnvelopeSwitch.tsx` |

#### F61 · Achievement Sentinel Consensus Mirror
- **UI**: `components/onchain/AchievementSentinelConsensusMirror.tsx` lets operators log validator votes, finality slots, and drift indicators.
- **Contract**: `createPost` stores consensus snapshots tagged `CONSENSUS_MIRROR` for downstream auditors.
- **Acceptance**: Dashboard warns when mirrored quorum diverges from onchain finality longer than configurable threshold.

#### F62 · Achievement Predictive Failover Graph
- **UI**: Graph composer collects dependency nodes, risk weights, and predicted failover routes.
- **Contract**: `createPost` persists serialized dependency graphs for deterministic playback.
- **Acceptance**: Each upload shows top three failover suggestions and flags missing redundancy.

#### F63 · Achievement Intent Delay Vault
- **UI**: Allows reviewers to assign programmable hold windows to risky intents plus override notes.
- **Contract**: `addComment` ties delay policy to the specific achievement/intent ID.
- **Acceptance**: Hold status is displayed on mint flow; manual overrides require guardian signature.

#### F64 · Achievement Guardian Bond Escrow
- **UI**: Captures guardian address, bond amount, and SLA terms.
- **Contract**: `createPost` anchors escrow metadata pending future `guardianBondEscrow` contract.
- **Acceptance**: UI highlights when SLA breaches trigger recommended slashing workflow.

#### F65 · Achievement Custody Chain Sequencer
- **UI**: Stepper interface records custody hops for evidence or artifacts.
- **Contract**: `createPost` stores immutable custody manifest for compliance review.
- **Acceptance**: Sequencer ensures no hop is left undefined before submission.

#### F66 · Achievement Encryption Envelope Ledger
- **UI**: Form records encryption suite, rotation cadence, and signer fingerprint.
- **Contract**: `addComment` logs `ENCRYPTION_ENVELOPE` entries.
- **Acceptance**: Submission blocked unless fingerprint hash is provided.

#### F67 · Achievement Device Trust Fabric
- **UI**: Collects device attestation hash, geo hint, and session scope.
- **Contract**: `createPost` records trust fabric event referencing Reown sessions.
- **Acceptance**: Device flagged if attestation missing or geo mismatch occurs.

#### F68 · Achievement Rate Limit Beacon
- **UI**: Streams current throttle budgets and reason codes.
- **Contract**: `addComment` publishes `RATE_LIMIT` payload that automation agents consume.
- **Acceptance**: Dashboard surfaces beacon TTL countdown to avoid stale throttles.

#### F69 · Achievement Post-Quantum Attestor
- **UI**: Allows uploading PQ proof transcript references and verifier metadata.
- **Contract**: `createPost` stores PQ attestation anchors for future circuits.
- **Acceptance**: PQ mode only considered active once verifier list populated.

#### F70 · Achievement Rolling Proof Continuity
- **UI**: Configures overlapping proof windows and evidence intervals.
- **Contract**: `addComment` logs coverage guarantees with `ROLLING_PROOF` tag.
- **Acceptance**: Alerts trigger when coverage overlap would fall below threshold.

#### F71 · Achievement Rollforward Repair Kit
- **UI**: Captures deterministic repair scripts, hash, and target state.
- **Contract**: `createPost` logs `ROLLFORWARD_REPAIR` payload for reproducibility.
- **Acceptance**: Submission requires both script hash and human-readable summary.

#### F72 · Achievement Multihop Reward Director
- **UI**: Tree editor defines reward paths, fallback recipients, and reason codes.
- **Contract**: `createPost` stores reward routing manifest.
- **Acceptance**: Weighted splits must sum to 100%; validation enforced client-side.

#### F73 · Achievement Gas Refund Router
- **UI**: Records sponsor, refund percent, spender attestation hash.
- **Contract**: `addComment` logs refund instructions per transaction set.
- **Acceptance**: Only addresses with proper format accepted; else UI warns.

#### F74 · Achievement Sovereign Executor Ledger
- **UI**: Lists custom executors, scope, reviewers, and hashes of the code bundle.
- **Contract**: `createPost` anchors ledger entries for executors before they run.
- **Acceptance**: Executors missing reviewer signature flagged.

#### F75 · Achievement Guardian Drift Radar
- **UI**: Displays guardian heartbeat metrics and drift classifications.
- **Contract**: `addComment` stores drift radar snapshots for accountability.
- **Acceptance**: Guardian marked inactive after configurable heartbeat misses.

#### F76 · Achievement Integrity Beacon Switchboard
- **UI**: Allows operators to define beacon sources and fan-out destinations with receipts.
- **Contract**: `createPost` logs switchboard state plus storage proofs.
- **Acceptance**: Submission requires at least one destination plus receipt hash.

#### F77 · Achievement Audit Replay Shuttle
- **UI**: Captures dataset pointer, replay instructions, and auditor handle.
- **Contract**: `createPost` anchors `AUDIT_REPLAY` payloads.
- **Acceptance**: UI highlights when dataset hash mismatches previously logged value.

#### F78 · Achievement Evidence Compression Lab
- **UI**: Records compression recipe, ratio, and verifier binary hash.
- **Contract**: `addComment` stores `EVIDENCE_COMPRESSION` metadata.
- **Acceptance**: Ratio display warns when compression exceeds configurable threshold.

#### F79 · Achievement Reviewer Signal Token
- **UI**: Configures reviewer identity, signal weight, and rationale.
- **Contract**: `createPost` logs signal token issuance; later version to mint ERC-1155.
- **Acceptance**: Duplicate signal per reviewer/achievement blocked.

#### F80 · Achievement Bridge Timeout Escrow
- **UI**: Records bridge route, timeout, witness list, and escrow policy.
- **Contract**: `createPost` persists `BRIDGE_TIMEOUT` entry for watchers.
- **Acceptance**: Timeout must exceed minimum; else inline error is shown.

#### F81 · Achievement Unlock Condition Graph
- **UI**: Graph editor models dependency edges and unlock proofs.
- **Contract**: `addComment` stores serialized DAG for automations.
- **Acceptance**: Graph validated for cycles before allowing submission.

#### F82 · Achievement Execution Circuit Notebook
- **UI**: Markdown + schema editor for execution circuit steps and reviewers.
- **Contract**: `createPost` logs notebooks hashed for version control.
- **Acceptance**: Notebook needs both steps and reviewer list before saving.

#### F83 · Achievement Mempool Mirror Chain
- **UI**: Captures mempool filter criteria, hash pointers, and retention policy.
- **Contract**: `createPost` anchors mempool mirror metadata.
- **Acceptance**: Filter expression validated to avoid blank catch-alls.

#### F84 · Achievement Multi-Party Dust Settlement
- **UI**: Aggregates micro-payments, scheduling pulses, and recipient list.
- **Contract**: `createPost` logs settlement manifest for treasury automation.
- **Acceptance**: Totals computed in UI to ensure pulses exceed minimum threshold.

#### F85 · Achievement Vault Warmup Scheduler
- **UI**: Configures warmup scripts, sign-off checklist, and activation timestamp.
- **Contract**: `addComment` logs `VAULT_WARMUP` entries for compliance.
- **Acceptance**: Activation date must be in future; else UI blocks submission.

#### F86 · Achievement Config Lint Oracle
- **UI**: Records lint policy version, scope, and pass/fail verdict.
- **Contract**: `createPost` stores config lint results.
- **Acceptance**: Requires evidence link for failed runs before logging.

#### F87 · Achievement Carbon Impact Proofset
- **UI**: Collects carbon footprint, registry link, and retired offset hash.
- **Contract**: `addComment` logs sustainability metadata.
- **Acceptance**: Displays warnings if footprint omitted or offsets missing.

#### F88 · Achievement Adaptive Recovery Tree
- **UI**: Tree builder maps branching recovery paths with guardian roles.
- **Contract**: `createPost` anchors tree descriptors.
- **Acceptance**: Each branch must have exit condition; validated client-side.

#### F89 · Achievement Warrant Canary Register
- **UI**: Logs statement hash, expiry, and status (alive/triggered).
- **Contract**: `addComment` records canary updates immutably.
- **Acceptance**: Status automatically flips to expired when timestamp passes.

#### F90 · Achievement Privacy Envelope Switch
- **UI**: Toggle interface to switch between public/partner/sealed envelopes with approvals.
- **Contract**: `addComment` logs envelope state plus approver addresses.
- **Acceptance**: Multi-sig approvals enforced before sealed envelope activates.

### Wave Ω · Aegis Matrix Resilience Catalysts (F91–F120)

Aegis Matrix layers thirty resilience-focused capabilities that let BuilderProof self-heal in the face of ledger drift, congestion, or governance contention. Every feature rides the shared feature flags inside `lib/featureFlags.ts`, leans on the Aegis sandbox (`app/sandbox/aegis-matrix`), and records deterministic payloads via the `createPost`/`addComment` helpers so downstream automations can trust the state.

| ID | Feature | Theme | Primary Surface |
| --- | --- | --- | --- |
| F91 | Achievement Eventual Consistency Ledger | Ledger Assurance | `components/onchain/AchievementEventualConsistencyLedger.tsx` |
| F92 | Achievement Intent Insurance Syndicate | Risk Financing | `components/onchain/AchievementIntentInsuranceSyndicate.tsx` |
| F93 | Achievement Guardian Collective Bargain | Guardian Governance | `components/onchain/AchievementGuardianCollectiveBargain.tsx` |
| F94 | Achievement Contractor Proof Hub | Vendor Trust | `components/onchain/AchievementContractorProofHub.tsx` |
| F95 | Achievement Telemetry Vaccination Labs | Telemetry Hygiene | `components/onchain/AchievementTelemetryVaccinationLabs.tsx` |
| F96 | Achievement Adaptive Failover Router | Routing Resilience | `components/onchain/AchievementAdaptiveFailoverRouter.tsx` |
| F97 | Achievement Rolling Service Pledges | Service Assurance | `components/onchain/AchievementRollingServicePledges.tsx` |
| F98 | Achievement Observability Mint | Observability Coverage | `components/onchain/AchievementObservabilityMint.tsx` |
| F99 | Achievement Autonomous Lifeline Agents | Autonomous Ops | `components/onchain/AchievementAutonomousLifelineAgents.tsx` |
| F100 | Achievement Integrity Snapshot Carousel | Snapshot Continuity | `components/onchain/AchievementIntegritySnapshotCarousel.tsx` |
| F101 | Achievement Service Credit Escrow | Remediation Finance | `components/onchain/AchievementServiceCreditEscrow.tsx` |
| F102 | Achievement Congestion Triage Deck | Congestion Control | `components/onchain/AchievementCongestionTriageDeck.tsx` |
| F103 | Achievement Multi-Risk Scoreboard | Risk Analytics | `components/onchain/AchievementMultiRiskScoreboard.tsx` |
| F104 | Achievement Parameterized Relief Bonds | Liquidity Safety Nets | `components/onchain/AchievementParameterizedReliefBonds.tsx` |
| F105 | Achievement Attested Troubleshooting Trees | Support Readiness | `components/onchain/AchievementAttestedTroubleshootingTrees.tsx` |
| F106 | Achievement Disaster Rehearsal Ledger | Incident Rehearsal | `components/onchain/AchievementDisasterRehearsalLedger.tsx` |
| F107 | Achievement Axial Response Mesh | Cross-Team Response | `components/onchain/AchievementAxialResponseMesh.tsx` |
| F108 | Achievement Evidence Redaction Vault | Privacy Controls | `components/onchain/AchievementEvidenceRedactionVault.tsx` |
| F109 | Achievement Sovereign Fallback Federation | Sovereign Ops | `components/onchain/AchievementSovereignFallbackFederation.tsx` |
| F110 | Achievement Multi-Governance Harmonizer | Governance Alignment | `components/onchain/AchievementMultiGovernanceHarmonizer.tsx` |
| F111 | Achievement KPI Shock Absorber | Analytics Smoothing | `components/onchain/AchievementKpiShockAbsorber.tsx` |
| F112 | Achievement Treasury Cushion Router | Treasury Automation | `components/onchain/AchievementTreasuryCushionRouter.tsx` |
| F113 | Achievement Bidirectional Impact Relay | Telemetry Continuity | `components/onchain/AchievementBidirectionalImpactRelay.tsx` |
| F114 | Achievement Global Quiet Hours Timeline | Operations Guardrails | `components/onchain/AchievementGlobalQuietHoursTimeline.tsx` |
| F115 | Achievement Builder Empathy Graph | People Analytics | `components/onchain/AchievementBuilderEmpathyGraph.tsx` |
| F116 | Achievement Disaster Mutual Aid Pool | Resource Pooling | `components/onchain/AchievementDisasterMutualAidPool.tsx` |
| F117 | Achievement Compliance Scenario Studio | Compliance Simulation | `components/onchain/AchievementComplianceScenarioStudio.tsx` |
| F118 | Achievement Failover Bond Marketplace | Failover Liquidity | `components/onchain/AchievementFailoverBondMarketplace.tsx` |
| F119 | Achievement Progressive Mint Covenant | Issuance Controls | `components/onchain/AchievementProgressiveMintCovenant.tsx` |
| F120 | Achievement Sovereign Policy Codex | Policy Management | `components/onchain/AchievementSovereignPolicyCodex.tsx` |

#### F91 · Achievement Eventual Consistency Ledger
- **UI**: Ledger module logs source/target ledgers, drift window, reconciler hash, and reviewer notes.
- **Contract**: `createPost` stores `CONSISTENCY_LEDGER` payloads with block heights so auditors can replay convergence timelines.
- **Automation**: Reconciliation cron compares declared drift windows with `lib/analytics.ts` deltas and escalates when variance exceeds tolerance.
- **Acceptance**: Entry rejected if reconciliation hash missing or drift window smaller than recorded block delta.

#### F92 · Achievement Intent Insurance Syndicate
- **UI**: Syndicate builder captures insured intent ID, bonded pool amount, payout caps, and oracle feed.
- **Contract**: `addComment` logs `INTENT_SYNDICATE` metadata, referencing escrow vault IDs for claim enforcement.
- **Finance**: Treasury worker listens for breach signals and automatically drafts payout transactions referencing the syndicate record.
- **Acceptance**: Coverage ratio must exceed minimum configured in settings; otherwise UI blocks submission.

#### F93 · Achievement Guardian Collective Bargain
- **UI**: Collective bargain editor records guardian roster, duties, compensation rails, and renewal epoch.
- **Contract**: `createPost` persists `GUARDIAN_BARGAIN` payloads so governance proposals can reference obligations.
- **Governance**: Reminder service pings guardians 14 days before renewal to refresh signatures if duties change.
- **Acceptance**: Duplicate guardian entries blocked and quorum threshold must be >= majority before save.

#### F94 · Achievement Contractor Proof Hub
- **UI**: Proof hub form captures contractor identity, deliverable scope, proof CID, and escalation owner.
- **Contract**: `addComment` logs `CONTRACTOR_PROOF` entries tying deliverables to hashed statements of work.
- **Data**: Mirrors to Supabase table `contractor_proofs` so ops teams can search deliverables by vendor or status.
- **Acceptance**: Submission requires both contractor handle and proof CID; otherwise inline error prevents logging.

#### F95 · Achievement Telemetry Vaccination Labs
- **UI**: Lab console stores dataset hash, validation recipe, reviewer signature, and expiry date.
- **Contract**: `createPost` records `TELEMETRY_VACCINE` payloads for downstream telemetry gating.
- **Automation**: CI workflow replays the recipe and attaches pass/fail CIDs; failures auto-flag dataset as quarantined.
- **Acceptance**: Entries missing reviewer signature or dataset hash are rejected; UI warns when validation expired.

#### F96 · Achievement Adaptive Failover Router
- **UI**: Router composer defines destination lanes, health thresholds, and fallback ordering.
- **Contract**: `createPost` logs `FAILOVER_ROUTER` payloads that automation services consult before rerouting.
- **Runtime**: `app/api/runtime/failover` caches latest router config and ensures reroutes emit event logs.
- **Acceptance**: Config requires at least two destinations and disallows duplicate ordering numbers.

#### F97 · Achievement Rolling Service Pledges
- **UI**: Pledge wizard collects service scope, pledge duration, enforcement window, and reviewer acknowledgments.
- **Contract**: `addComment` stores `SERVICE_PLEDGE` entries attached to achievement IDs.
- **Monitoring**: Scheduler cross-references uptime telemetry and automatically logs breach incidents referencing pledge ID.
- **Acceptance**: Enforcement window must be >= pledge duration and at least one reviewer ack required.

#### F98 · Achievement Observability Mint
- **UI**: Observability panel captures coverage metrics (logs/traces/metrics), sample density, and evidence CID.
- **Contract**: `createPost` records `OBS_MINT` payloads to track observability posture over time.
- **Analytics**: `lib/analytics.ts` surfaces minted coverage badges to highlight policy compliance across achievements.
- **Acceptance**: Coverage percentages must sum ≤ 100%; missing evidence CID blocks submission.

#### F99 · Achievement Autonomous Lifeline Agents
- **UI**: Registry logs agent scope, key fingerprint, escalation authority, and expiry timestamp.
- **Contract**: `addComment` logs `LIFELINE_AGENT` metadata allowed to run emergency automations.
- **Automation**: Scheduler only triggers lifeline workflows when active agent entry exists with unexpired key.
- **Acceptance**: Entries missing fingerprint or expiry are rejected; UI warns when expiry < 7 days.

#### F100 · Achievement Integrity Snapshot Carousel
- **UI**: Carousel setup lists snapshot cadence, storage targets, manifest hash, and checksum status.
- **Contract**: `createPost` stores `SNAPSHOT_CAROUSEL` payload pointing to IPFS manifest.
- **Storage**: `lib/storage.ts` validates uploads reached at least two storage planes before marking snapshot healthy.
- **Acceptance**: Submission blocked without manifest hash; UI shows countdown until next scheduled snapshot.

#### F101 · Achievement Service Credit Escrow
- **UI**: Escrow form records counterparty, credit amount, trigger condition, and payout wallet.
- **Contract**: `addComment` logs `SERVICE_CREDIT_ESCROW` entries referencing treasury escrow account IDs.
- **Finance**: Treasury automation listens for trigger conditions and dispatches payouts referencing this entry.
- **Acceptance**: Credit amount must be >0 and payout wallet must pass checksum validation.

#### F102 · Achievement Congestion Triage Deck
- **UI**: Deck builder orders workloads with severity tags, unlock signals, and runbook links.
- **Contract**: `createPost` anchors `CONGESTION_TRIAGE` payloads so automation respects priority ordering.
- **Ops Hooks**: `OperationalResilienceSuite` consumes deck entries to visualize queue depth across squads.
- **Acceptance**: Submission requires at least three tiers and unique unlock signal per tier.

#### F103 · Achievement Multi-Risk Scoreboard
- **UI**: Scoreboard interface captures category weights, real-time scores, and reviewer overrides.
- **Contract**: `addComment` stores `RISK_SCOREBOARD` payloads hashed for deterministic ordering.
- **Analytics**: KPI dashboard overlays scoreboard data to color-code achievements.
- **Acceptance**: Category weights must total 100%; duplicates blocked.

#### F104 · Achievement Parameterized Relief Bonds
- **UI**: Bond composer defines trigger metric, bond size, depletion curve, and treasury source.
- **Contract**: `createPost` logs `RELIEF_BOND` metadata until automated redemption contract ships.
- **Treasury**: Worker references depletion curve to schedule payouts via `lib/treasury.ts`.
- **Acceptance**: Entry requires trigger metric + positive bond size; UI surfaces estimated runway post-submit.

#### F105 · Achievement Attested Troubleshooting Trees
- **UI**: Tree builder captures decision nodes, remediation steps, and attesting reviewer signatures.
- **Contract**: `addComment` stores `TROUBLESHOOT_TREE` payloads pointing to hashed JSON.
- **Docs**: `docs/runbooks.md` auto-links latest tree per achievement for oncall use.
- **Acceptance**: All branches must end in terminal action; validation rejects cycles.

#### F106 · Achievement Disaster Rehearsal Ledger
- **UI**: Ledger entry records scenario name, participants, results, and follow-up tickets.
- **Contract**: `createPost` records `DISASTER_REHEARSAL` payload for immutable rehearsal tracking.
- **Automation**: Reminder cron auto-schedules next rehearsal based on cadence field.
- **Acceptance**: Requires at least one participant and positive cadence interval to save.

#### F107 · Achievement Axial Response Mesh
- **UI**: Mesh designer maps clusters, responsibilities, acknowledgement proofs, and escalation channels.
- **Contract**: `addComment` logs `AXIAL_RESPONSE` metadata for cross-team accountability.
- **Notifications**: Webhook fan-out notifies cluster owners whenever mesh is activated.
- **Acceptance**: Requires ≥2 clusters and unique acknowledgement proof per cluster.

#### F108 · Achievement Evidence Redaction Vault
- **UI**: Vault screen records redaction reason, hash pointer to full evidence, and reviewer approval.
- **Contract**: `createPost` stores `REDACTION_VAULT` entries linking sealed and redacted artifacts.
- **Storage**: `lib/storage.ts` verifies sealed artifact exists before marking redaction complete.
- **Acceptance**: Entries without reviewer approval or hash pointer rejected.

#### F109 · Achievement Sovereign Fallback Federation
- **UI**: Federation builder captures participating sovereign nodes, readiness attestations, and failover order.
- **Contract**: `addComment` logs `FALLBACK_FEDERATION` payload so automation can follow attested sequence.
- **Ops**: Health monitor pings each node and records heartbeats aligned with the federation entry.
- **Acceptance**: Requires ≥3 nodes with readiness hashes; duplicates blocked.

#### F110 · Achievement Multi-Governance Harmonizer
- **UI**: Harmonizer panel maps overlapping governance sources, quorum targets, and bridging proofs.
- **Contract**: `createPost` stores `GOV_HARMONIZER` payload referenced by governance dashboards.
- **Governance**: Drift detector alerts when quorums diverge beyond allowed delta.
- **Acceptance**: Needs at least two governance feeds and unique quorum IDs per entry.

#### F111 · Achievement KPI Shock Absorber
- **UI**: Shock absorber editor defines smoothing formula, lookback window, and oracle references.
- **Contract**: `addComment` logs `KPI_SHOCK` metadata enabling analytics to show raw vs smoothed views.
- **Analytics**: Dashboard toggles display to compare absorber outputs with raw KPIs.
- **Acceptance**: Lookback window must be >= smoothing interval and at least one oracle reference required.

#### F112 · Achievement Treasury Cushion Router
- **UI**: Router ties cushion pools to achievements with trigger bands and payout destinations.
- **Contract**: `createPost` stores `TREASURY_CUSHION` payloads referencing treasury pool IDs.
- **Finance**: Treasury automation routes liquidity when triggers fire, citing entry ID for audit.
- **Acceptance**: Requires at least one trigger band and valid payout destination.

#### F113 · Achievement Bidirectional Impact Relay
- **UI**: Relay builder defines upstream/downstream feeds, sampling cadence, and checksum hash.
- **Contract**: `addComment` logs `IMPACT_RELAY` entries preserving telemetry parity proofs.
- **Data**: Stream processor compares feeds and raises alerts when drift exceeds tolerance.
- **Acceptance**: Cadence must be ≥ 1 minute and checksum mandatory.

#### F114 · Achievement Global Quiet Hours Timeline
- **UI**: Scheduler records quiet windows, impacted scopes, and override approvers.
- **Contract**: `createPost` stores `QUIET_HOURS` payload consumed by automation guardrails.
- **Ops**: `lib/scheduler.ts` blocks risky workflows during recorded quiet hours.
- **Acceptance**: Requires timezone-normalized start/end; overlapping quiet windows produce inline warning but still log with reviewer sign-off.

#### F115 · Achievement Builder Empathy Graph
- **UI**: Empathy graph captures wellbeing indicators, sentiment tags, and consent toggle.
- **Contract**: `addComment` stores `EMPATHY_GRAPH` payload with anonymized hash references.
- **Analytics**: Aggregated insights surface to program leads without exposing raw entries.
- **Acceptance**: Entry rejected unless consent toggle checked and severity tag supplied.

#### F116 · Achievement Disaster Mutual Aid Pool
- **UI**: Pool manager records participating DAOs, pledged resources, unlock triggers, and repayment rules.
- **Contract**: `createPost` logs `MUTUAL_AID_POOL` metadata so drawdowns can be audited.
- **Automation**: Aid dispatcher references pool entries when incidents log via `OperationalResilienceSuite`.
- **Acceptance**: Requires unlock trigger + repayment rule; missing either blocks submission.

#### F117 · Achievement Compliance Scenario Studio
- **UI**: Scenario builder captures policy variant, test scope, verdict, and reviewer signature.
- **Contract**: `addComment` stores `COMPLIANCE_SCENARIO` payload for regulator review.
- **Automation**: CI harness can trigger scenario studio via API, attaching verdict CIDs automatically.
- **Acceptance**: Entries lacking verdict or signature rejected.

#### F118 · Achievement Failover Bond Marketplace
- **UI**: Marketplace logs provider address, coverage scope, SLA, and bond amount.
- **Contract**: `createPost` stores `FAILOVER_BOND` entries linking to escrow IDs.
- **Treasury**: Matching engine debits bond into escrow when failover contract approved.
- **Acceptance**: Bond amount must exceed configured minimum and address must pass checksum validation.

#### F119 · Achievement Progressive Mint Covenant
- **UI**: Covenant editor defines checkpoint list, quorum rules, and mint thresholds.
- **Contract**: `addComment` logs `MINT_COVENANT` payload gating high-risk mint actions.
- **Automation**: Mint flow checks covenant compliance before final signature.
- **Acceptance**: Requires ≥2 checkpoints with strictly ascending thresholds; duplicates blocked.

#### F120 · Achievement Sovereign Policy Codex
- **UI**: Codex manager records policy pack version, approvers, revocations, and jurisdiction metadata.
- **Contract**: `createPost` stores `SOVEREIGN_CODEX` payload referencing IPFS docs.
- **Governance**: Diff service compares codex hashes and raises alerts when unapproved policy drifts occur.
- **Acceptance**: Entry must include at least one approver and jurisdiction; otherwise save disabled.

### Wave Λ · Aurora Ethereum Control Plane (F151–F180)

Aurora Wave layers thirty Ethereum-first controls that harden intent routing, treasury automation, and guardian accountability. Each capability ties into the shared feature-flag framework (`lib/featureFlags.ts`) and references the detailed specs captured inside `docs/onchain-feature-expansion.md#aurora-wave--ethereum-control-plane`.

| ID | Feature | Owner | Status | Primary Surface |
| --- | --- | --- | --- | --- |
| F151 | Achievement EigenRestake Shield | ChainOps Guild | Spec Ready | `components/onchain/AchievementEigenRestakeShield.tsx` |
| F152 | Achievement Intent Sequencer Guard | BuilderOps Squad | Discovery | `components/onchain/AchievementIntentSequencerGuard.tsx` |
| F153 | Achievement MEV Amnesty Escrow | Treasury Collective | Spec Ready | `components/onchain/AchievementMevAmnestyEscrow.tsx` |
| F154 | Achievement Slot Commitment Ledger | Protocol Insights | Spec Ready | `components/onchain/AchievementSlotCommitmentLedger.tsx` |
| F155 | Achievement L2 Settlement Mirror | Interop Crew | Discovery | `components/onchain/AchievementL2SettlementMirror.tsx` |
| F156 | Achievement Account-Abstraction Circuit | Automation Studio | In Research | `components/onchain/AchievementAccountAbstractionCircuit.tsx` |
| F157 | Achievement Deterministic Pre-Confirm Vaults | Reliability Guild | Spec Ready | `components/onchain/AchievementDeterministicPreconfirmVaults.tsx` |
| F158 | Achievement Intent Baton Relay | Collaboration Pod | Discovery | `components/onchain/AchievementIntentBatonRelay.tsx` |
| F159 | Achievement Guardian Ragequit Pool | Guardian Council | Spec Ready | `components/onchain/AchievementGuardianRagequitPool.tsx` |
| F160 | Achievement Operator Slippage Sentinel | Treasury Risk | Discovery | `components/onchain/AchievementOperatorSlippageSentinel.tsx` |
| F161 | Achievement Cross-Rollup Witness Hub | Interop Crew | Spec Ready | `components/onchain/AchievementCrossRollupWitnessHub.tsx` |
| F162 | Achievement Deterministic Gas Oracle | Data Plane | Spec Ready | `components/onchain/AchievementDeterministicGasOracle.tsx` |
| F163 | Achievement Partial Withdrawal Router | Treasury Collective | Discovery | `components/onchain/AchievementPartialWithdrawalRouter.tsx` |
| F164 | Achievement Sovereign RPC Quorum | Infra Guild | Spec Ready | `components/onchain/AchievementSovereignRpcQuorum.tsx` |
| F165 | Achievement zkSync State Syncer | L2 Team | Discovery | `components/onchain/AchievementZkSyncStateSyncer.tsx` |
| F166 | Achievement Intent Merkle Journal | Compliance Studio | Spec Ready | `components/onchain/AchievementIntentMerkleJournal.tsx` |
| F167 | Achievement Deadline Arbitration Bridge | Governance Pod | Discovery | `components/onchain/AchievementDeadlineArbitrationBridge.tsx` |
| F168 | Achievement Multi-Asset Proof Router | Treasury Collective | Spec Ready | `components/onchain/AchievementMultiAssetProofRouter.tsx` |
| F169 | Achievement Verification Credit Ledger | Auditor Guild | Discovery | `components/onchain/AchievementVerificationCreditLedger.tsx` |
| F170 | Achievement Guardian Vault Timelock | Guardian Council | Spec Ready | `components/onchain/AchievementGuardianVaultTimelock.tsx` |
| F171 | Achievement Execution Capsule | Automation Studio | Discovery | `components/onchain/AchievementExecutionCapsule.tsx` |
| F172 | Achievement Risk-Weighted Vault Matrix | Treasury Risk | Spec Ready | `components/onchain/AchievementRiskWeightedVaultMatrix.tsx` |
| F173 | Achievement Asset Trace Matrix | Treasury Risk | Discovery | `components/onchain/AchievementAssetTraceMatrix.tsx` |
| F174 | Achievement Compliance Anchor Chain | Compliance Studio | Spec Ready | `components/onchain/AchievementComplianceAnchorChain.tsx` |
| F175 | Achievement Offchain Evidence Hashline | Evidence Pod | Spec Ready | `components/onchain/AchievementOffchainEvidenceHashline.tsx` |
| F176 | Achievement Guardian Multisig Assembler | Guardian Council | Discovery | `components/onchain/AchievementGuardianMultisigAssembler.tsx` |
| F177 | Achievement Intent Suspension Switch | Governance Pod | Discovery | `components/onchain/AchievementIntentSuspensionSwitch.tsx` |
| F178 | Achievement Resilience Score Beacon | Reliability Guild | Spec Ready | `components/onchain/AchievementResilienceScoreBeacon.tsx` |
| F179 | Achievement Payout Circuit Breaker | Treasury Collective | Discovery | `components/onchain/AchievementPayoutCircuitBreaker.tsx` |
| F180 | Achievement Data Availability Vault | Data Plane | Spec Ready | `components/onchain/AchievementDataAvailabilityVault.tsx` |

#### F151 · Achievement EigenRestake Shield
- **Goal**: Pin EigenLayer restake attestations to each achievement, exposing slashable stakes when remediation windows are breached.
- **Surfaces**: Contract event + dashboard guardian view, wired through `featureFlags.achievementEigenRestakeShield`.
- **Acceptance**: Reown guardians can inspect restake exposure per achievement and simulate slash outcome before execution.

#### F152 · Achievement Intent Sequencer Guard
- **Goal**: Capture deterministic sequencing receipts for bundled intents, including slot, block, and builder checkpoint hashes.
- **Surfaces**: Intent composer UI plus contract helper that stores `SEQ_GUARD` payloads for later verification.
- **Acceptance**: Submission blocked unless slot and block anchors progress monotonically for the same builder batch.

#### F153 · Achievement MEV Amnesty Escrow
- **Goal**: Escrow MEV restitution funds tied to exploited achievements until affected parties countersign payout receipts.
- **Surfaces**: Treasury dashboard module and new contract struct to track escrow policy metadata.
- **Acceptance**: Funds cannot exit escrow without quorum signatures plus matching incident reference hash.

#### F154 · Achievement Slot Commitment Ledger
- **Goal**: Record slot-level commitments proving which validators attested a milestone window.
- **Surfaces**: Ledger UI inside analytics plus `slotCommitmentLogged` event for downstream monitoring.
- **Acceptance**: At least two validator signatures required before ledger entry finalizes.

#### F155 · Achievement L2 Settlement Mirror
- **Goal**: Mirror L2 settlement proofs (Optimism/Base/Arbitrum) with challenge window receipts to gate automation unlocks.
- **Surfaces**: Interop screen, contract payload storing `L2_MIRROR` metadata, and BaseScan deep links.
- **Acceptance**: Automation unlock is blocked if challenge window is still active.

#### F156 · Achievement Account-Abstraction Circuit
- **Goal**: Persist ERC-4337 session scopes, paymaster attestations, and policy hashes backing automation wallets.
- **Surfaces**: Settings modal plus `AccountAbstractionCircuit` struct in contract storing scope/policy metadata.
- **Acceptance**: Wallet scopes expire automatically when policy hash changes unless renewed onchain.

#### F157 · Achievement Deterministic Pre-Confirm Vaults
- **Goal**: Store pre-confirmation signatures, expiry timestamps, and fallback intents that guarantee deterministic completion.
- **Surfaces**: Vault setup UI and `PreconfirmVault` struct with events for watchers.
- **Acceptance**: Submission rejected if fallback intent omitted or expiry less than 2 slots.

#### F158 · Achievement Intent Baton Relay
- **Goal**: Relay intents between squads with notarized baton metadata while preserving accountability.
- **Surfaces**: Dashboard baton timeline plus contract event `IntentBatonRelayed`.
- **Acceptance**: Receiving squad must acknowledge baton within defined SLA or baton auto-reverts.

#### F159 · Achievement Guardian Ragequit Pool
- **Goal**: Bond guardian capital and enforce ragequit exits that require attested replacements before unlocking stakes.
- **Surfaces**: Guardian admin page plus `RagequitPool` struct storing bonded amount and replacement address.
- **Acceptance**: Ragequit attempts fail until new guardian is registered and acknowledged.

#### F160 · Achievement Operator Slippage Sentinel
- **Goal**: Track operator-executed swaps, comparing declared vs. actual slippage, and logging breaches.
- **Surfaces**: Treasury risk dashboard + `SlippageSentinel` records inside contract.
- **Acceptance**: Breach alerts fire when deviation exceeds policy threshold and link to remediation checklist.

#### F161 · Achievement Cross-Rollup Witness Hub
- **Goal**: Register witness quorum proofs across rollups and settlement layers for evidence continuity.
- **Surfaces**: Witness registry UI plus `WitnessHubEntry` struct referencing rollup IDs.
- **Acceptance**: Entries require at least three witness signatures with matching root hash.

#### F162 · Achievement Deterministic Gas Oracle
- **Goal**: Capture gas oracle readings, variance envelopes, and reviewer approvals per proof submission.
- **Surfaces**: Gas inspector UI + contract mapping storing `gasBase`, `gasTip`, `variance`.
- **Acceptance**: Variance > policy threshold blocks transaction broadcast until re-approved.

#### F163 · Achievement Partial Withdrawal Router
- **Goal**: Route partial treasury withdrawals across epochs with attested unlock checkpoints.
- **Surfaces**: Treasury console + `PartialWithdrawal` struct referencing multi-epoch approvals.
- **Acceptance**: Router enforces sequential unlocks; skipping an epoch triggers manual review.

#### F164 · Achievement Sovereign RPC Quorum
- **Goal**: Record quorum-approved RPC endpoints with heartbeat proofs for each achievement scope.
- **Surfaces**: Infra settings + contract storage for endpoint URIs and heartbeat TTL.
- **Acceptance**: Endpoints lacking heartbeat inside TTL are auto-deactivated and flagged.

#### F165 · Achievement zkSync State Syncer
- **Goal**: Anchor zkSync Lite/Era state root proofs aligned to achievement checkpoints.
- **Surfaces**: Interop UI + `ZkSyncSync` struct storing root hash, batch ID, and proof CID.
- **Acceptance**: Sync attempts rejected if batch ID regresses relative to previous entry.

#### F166 · Achievement Intent Merkle Journal
- **Goal**: Maintain rolling Merkle journals of intents plus evidence metadata for audit playback.
- **Surfaces**: Audit console + contract-managed `MerkleJournal` root and chunk pointers.
- **Acceptance**: Journal submissions must include branch proof verifying new root extension.

#### F167 · Achievement Deadline Arbitration Bridge
- **Goal**: Encode arbitration workflows with quorum verdict hashes whenever deadlines slip.
- **Surfaces**: Governance panel + contract event `DeadlineArbitrated`.
- **Acceptance**: Arbitration requires quorum >= configured threshold; else status remains pending.

#### F168 · Achievement Multi-Asset Proof Router
- **Goal**: Map ERC-20/721/1155 asset proofs plus settlement policy metadata per achievement.
- **Surfaces**: Treasury UI + `AssetProofRoute` struct storing asset type, policy hash, release log.
- **Acceptance**: Router rejects payload if asset type unsupported or policy hash missing.

#### F169 · Achievement Verification Credit Ledger
- **Goal**: Track verifier credits burned per achievement to meter scarce audit resources.
- **Surfaces**: Auditor ledger UI + contract counter storing credits per verifier.
- **Acceptance**: Credits cannot go negative; attempts to overdraw revert with reason.

#### F170 · Achievement Guardian Vault Timelock
- **Goal**: Enforce guardian-managed timelocks before sensitive contract mutations execute.
- **Surfaces**: Vault admin + `GuardianTimelock` struct storing delay, guardians, and release hash.
- **Acceptance**: Timelock release requires majority guardian signatures referencing the same hash.

#### F171 · Achievement Execution Capsule
- **Goal**: Package deterministic execution capsules with calldata hashes and replay guards.
- **Surfaces**: Automation composer + contract mapping storing capsule metadata.
- **Acceptance**: Capsule submissions must include replay guard ID; duplicates rejected.

#### F172 · Achievement Risk-Weighted Vault Matrix
- **Goal**: Score vault exposures per achievement along with mitigation artifacts and reviewer approvals.
- **Surfaces**: Risk dashboard + struct storing exposure tiers, mitigation CID, reviewer address.
- **Acceptance**: Matrix rows missing reviewer signature cannot transition to “approved.”

#### F173 · Achievement Asset Trace Matrix
- **Goal**: Trace asset provenance hops with hashed receipts to prove treasury intent congruence.
- **Surfaces**: Trace explorer + `AssetTrace` entries storing hop list and receipt hash.
- **Acceptance**: Hop chain must remain acyclic; cycles rejected at submission.

#### F174 · Achievement Compliance Anchor Chain
- **Goal**: Chain compliance attestations (KYC/KYB) plus revocation proofs and jurisdiction metadata.
- **Surfaces**: Compliance console + `ComplianceAnchor` struct referencing revocation registry.
- **Acceptance**: Jurisdiction tag required; missing tags block anchor creation.

#### F175 · Achievement Offchain Evidence Hashline
- **Goal**: Anchor offchain bundle hashes, verifier signatures, and expiry timers for sealed archives.
- **Surfaces**: Evidence locker UI + contract storage for hash, verifier, expiry.
- **Acceptance**: Expired entries must be renewed before data is referenced downstream.

#### F176 · Achievement Guardian Multisig Assembler
- **Goal**: Register guardian multisig compositions, rotations, and quorum drift monitors.
- **Surfaces**: Guardian admin UI + `GuardianMultisig` struct storing members and quorum.
- **Acceptance**: Rotations require majority acknowledgement before taking effect.

#### F177 · Achievement Intent Suspension Switch
- **Goal**: Allow reviewers to flip suspension flags that halt automation until clearance.
- **Surfaces**: Governance console + contract boolean `intentSuspended`.
- **Acceptance**: Suspension requires reason code; clearing switch logs reviewer hash.

#### F178 · Achievement Resilience Score Beacon
- **Goal**: Publish resilience score oracles from telemetry feeds with refresh cadence proofs.
- **Surfaces**: Analytics UI + `ResilienceScore` struct storing score and proof CID.
- **Acceptance**: Scores older than SLA auto-expire and trigger alert.

#### F179 · Achievement Payout Circuit Breaker
- **Goal**: Auto-pause payouts when KPI thresholds breach policy, awaiting quorum restart.
- **Surfaces**: Treasury UI + `PayoutCircuitBreaker` struct referencing KPI signal and policy hash.
- **Acceptance**: Restart requires quorum approval referencing the same incident hash.

#### F180 · Achievement Data Availability Vault
- **Goal**: Commit data-availability proofs (EIP-4844 blobs, Celestia shares) tying external data to achievements.
- **Surfaces**: Data pipeline UI + `DataAvailabilityCommitment` struct storing blob references.
- **Acceptance**: Submission fails without blob version hash and expiry metadata.

### 5. Delivery Checklist Per Feature
1. UX mock in Figma (or sandbox page) approved.
2. Contract changes audited + ABI regenerated.
3. API route & hook covered by integration tests.
4. UI snapshot tests + manual wallet QA.
5. Feature flag / gradual rollout via `lib/featureFlags.ts`.

### 6. Dependencies & Risks
- Contract size/complexity: consider modular facets if bytecode grows.
- External integrations (GitHub, Wakatime, Snapshot) require secrets & rate limits.
- Notifications/webhooks need background worker or edge function hosting.
- Offline/PWA demands HTTPS + service-worker build config updates.

### 7. Next Actions
1. Stand up prerequisite scaffolding (context, UI kit, API templates).
2. Draft contract upgrade proposal + test suite.
3. Create tickets per feature with DoD referencing sections above.
4. Align rollout calendar with marketing/comm timelines.

