# Demo Script

## Goal

Show that Stellar BountyPay Scout uses a Stellar-style payment intent to gate useful GitHub bounty analysis.

## Demo Flow

1. Start the server.

```powershell
npm.cmd run serve
```

2. Open the dashboard.

```text
http://localhost:8791
```

3. Use this issue URL:

```text
https://github.com/gyroflow/gyroflow/issues/742
```

4. Click `Create Stellar intent`.

Expected result:

- Network is `testnet`.
- Asset is `XLM`.
- Amount is configured from `.env`.
- Memo starts with `bps-`.
- Horizon account link is shown.
- Friendbot link is shown when testnet is selected.

5. Run analysis with local demo proof:

```text
demo-paid
```

Expected result:

- Payment is accepted in demo mode.
- No funds move.
- The GitHub analysis returns a decision.
- For the Gyroflow example, the likely decision is `SKIP` because the issue is crowded and has multiple related open pull requests.

## Command-Line Demo

Create intent:

```powershell
node src/cli.js intent https://github.com/gyroflow/gyroflow/issues/742
```

Analyze with local proof:

```powershell
node src/cli.js analyze https://github.com/gyroflow/gyroflow/issues/742 demo-paid
```

## Real Testnet Payment Demo

This requires a public Stellar testnet receiving account.

1. Set `STELLAR_DESTINATION_ACCOUNT` in `.env`.
2. Fund the account with Friendbot if needed.
3. Create an intent.
4. Send the configured amount on testnet with the exact memo.
5. Call `/analyze` with:

```json
{
  "issueUrl": "https://github.com/gyroflow/gyroflow/issues/742",
  "memo": "bps-..."
}
```

Expected result:

- The app checks recent Horizon payments.
- It follows transaction links to verify the memo.
- Paid analysis unlocks when the memo, destination, amount, and asset match.

## Safety Note

The app never asks for a secret key. Testnet payments should be sent from a wallet or external tool.
