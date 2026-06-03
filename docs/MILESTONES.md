# Milestones And Budget

Suggested SCF request: 25,000 XLM.

The exact request can be adjusted before final submission.

## Milestone 1: Public MVP

Budget: 5,000 XLM

Deliverables:

- Public GitHub repository.
- CLI and HTTP demo.
- Local dashboard.
- Stellar testnet payment intent generation.
- Horizon memo payment verification.
- GitHub bounty analysis engine.
- README and demo script.

Acceptance evidence:

- `npm.cmd test` passes.
- `/intent` returns a Stellar payment intent.
- `/analyze` returns HTTP 402 without proof.
- `/analyze` returns a decision with `demo-paid`.

## Milestone 2: Wallet And Asset Support

Budget: 6,000 XLM

Deliverables:

- Freighter-oriented user instructions.
- USDC-on-Stellar payment intent support.
- Payment status polling.
- Better receipt display.
- Clear testnet-to-mainnet configuration guide.

Acceptance evidence:

- XLM and USDC intent examples.
- Testnet payment verification walkthrough.
- Updated dashboard payment status view.

## Milestone 3: Builder Workflow

Budget: 7,000 XLM

Deliverables:

- Saved bounty evaluations.
- Comparison view for multiple opportunities.
- Milestone and payout tracking fields.
- Exportable decision packet for bounty work.

Acceptance evidence:

- User can compare at least three bounty opportunities.
- User can export a decision summary.
- Dashboard persists local evaluation history.

## Milestone 4: Mainnet-Ready Launch

Budget: 7,000 XLM

Deliverables:

- Deployment documentation.
- Production configuration hardening.
- Abuse controls and rate limits.
- Hosted demo.
- Mainnet-ready environment guide.

Acceptance evidence:

- Hosted demo URL.
- Mainnet configuration checklist.
- Documented operational limits and safety model.

## Why This Budget Is Conservative

The MVP is already started locally. The requested funding is focused on hardening, wallet support, asset support, hosted deployment, and a polished builder workflow rather than basic prototyping.
