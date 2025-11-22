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

