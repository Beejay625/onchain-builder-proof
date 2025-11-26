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

