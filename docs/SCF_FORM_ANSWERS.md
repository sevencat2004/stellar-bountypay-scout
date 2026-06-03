# SCF Form Answer Draft

## Project Name

Stellar BountyPay Scout

## Short Description

Stellar BountyPay Scout is a payment-gated bounty intelligence tool that uses Stellar testnet payment intents and Horizon memo verification to unlock deep GitHub bounty risk analysis for open-source builders.

## What Problem Are You Solving?

Open-source bounty hunters frequently spend time on tasks that are not practically collectible. A bounty may be stale, already assigned, crowded by duplicate pull requests, unclear about payout, or tied to non-cash rewards. This creates wasted work for developers and lower-quality submissions for maintainers.

Stellar BountyPay Scout helps developers make a payment-backed go/no-go decision before implementation begins.

## Why Stellar?

Stellar is a strong fit because the core workflow needs low-cost, fast, verifiable payments. The MVP uses Stellar as the unlock layer:

- A user requests a deep bounty analysis.
- The app creates a Stellar payment intent with amount, asset, destination, network, and memo.
- The user sends a payment externally.
- The app verifies the payment through Horizon by checking the transaction memo.
- The paid analysis is unlocked without requiring the app to custody private keys.

This is a practical Stellar payment workflow for developer tooling, not a generic AI wrapper.

## Current Status

The local MVP is implemented with:

- CLI payment intent generation.
- HTTP API and local dashboard.
- Stellar testnet payment intent format.
- Horizon-based memo payment verification.
- Local demo payment proof mode.
- GitHub issue and repository risk analysis.
- SCF submission draft and demo instructions.

## Technical Architecture

- `src/stellar.js`: creates Stellar payment intents and verifies Horizon payments by memo.
- `src/payment-gate.js`: gates paid analysis behind demo proof or verified Stellar payment.
- `src/github.js`: fetches issue, repository, comments, and related open pull requests.
- `src/analyzer.js`: scores payout probability, competition, assignment, repository health, and bounty clarity.
- `src/server.js`: exposes `/intent`, `/analyze`, `/health`, and serves the dashboard.
- `public/`: browser demo UI.

No private key is required in the MVP. Only a public destination account is configured.

## Target Users

- Open-source developers who pursue paid GitHub bounty issues.
- Maintainers who want higher-quality bounty submissions.
- Stellar builders exploring payment-gated developer tools.
- Grant and bounty scouts who need repeatable decision evidence.

## Milestone Plan

### Milestone 1: Public MVP

Deliver a public GitHub repo, local dashboard, CLI, HTTP API, Stellar testnet payment intent generation, Horizon memo verification, and bounty analysis engine.

### Milestone 2: Wallet and Asset Support

Add Freighter-friendly usage instructions, USDC-on-Stellar intent support, clearer payment receipt display, and improved payment polling.

### Milestone 3: Builder Workflow

Add saved evaluations, comparison views, milestone payout tracking, and exportable review packets for bounty decisions.

### Milestone 4: Mainnet-Ready Launch

Harden configuration, add deployment docs, add rate limiting and abuse controls, launch a hosted demo, and switch from testnet-only demo to mainnet-ready operation.

## Funding Request

Suggested request: 25,000 XLM.

Rationale: the MVP is already started. The funding request is for production hardening, wallet support, USDC support, hosted deployment, user testing, and mainnet-ready launch work.

## Repository URL

https://github.com/sevencat2004/stellar-bountypay-scout

## Demo URL

Local demo:

```text
http://localhost:8791
```

Public demo: pending deployment.

## Team

Solo builder with Codex-assisted implementation.

## User-Side Information Needed

- Submitter legal/display name.
- Email.
- Country/region.
- Public Stellar wallet address.
- GitHub repository URL after publication.
- Any requested SCF profile/team fields.

Do not provide seed phrases, secret keys, or private recovery material.
