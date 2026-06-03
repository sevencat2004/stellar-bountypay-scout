import { createHash } from "node:crypto";

export function createMemo(issueUrl, now = new Date()) {
  const day = now.toISOString().slice(0, 10);
  const hash = createHash("sha256").update(`${issueUrl}:${day}`).digest("hex").slice(0, 16);
  return `bps-${hash}`;
}

export function createPaymentIntent(issueUrl, config) {
  const memo = createMemo(issueUrl);
  const account = config.destinationAccount || "CONFIGURE_STELLAR_DESTINATION_ACCOUNT";
  const horizonAccountUrl = `${config.horizonUrl}/accounts/${encodeURIComponent(account)}`;
  const friendbotUrl = config.network.friendbotUrl
    ? `${config.network.friendbotUrl}?addr=${encodeURIComponent(account)}`
    : null;

  return {
    status: "payment_required",
    network: config.network.name,
    networkPassphrase: config.network.passphrase,
    horizonUrl: config.horizonUrl,
    destinationAccount: account,
    amount: config.paymentAmount,
    asset: config.paymentAsset,
    memo,
    issueUrl,
    horizonAccountUrl,
    friendbotUrl,
    instructions: [
      "Send the exact amount to the destination account on the stated Stellar network.",
      "Include the memo exactly as shown.",
      "Then retry analysis with the same memo, or use paymentProof=demo-paid for local demo mode."
    ]
  };
}

export async function verifyPaymentByMemo({ memo, config, minAmount }) {
  if (!memo) {
    return { verified: false, reason: "Missing payment memo." };
  }
  if (!config.destinationAccount) {
    return { verified: false, reason: "STELLAR_DESTINATION_ACCOUNT is not configured." };
  }

  const paymentsUrl = `${config.horizonUrl}/accounts/${encodeURIComponent(config.destinationAccount)}/payments?limit=100&order=desc`;
  const paymentsResponse = await fetchJson(paymentsUrl);
  const records = paymentsResponse?._embedded?.records || [];
  const wantedAmount = Number(minAmount || config.paymentAmount);

  for (const payment of records) {
    if (payment.type !== "payment") continue;
    if (payment.to !== config.destinationAccount) continue;
    if (!assetMatches(payment, config.paymentAsset)) continue;
    if (Number(payment.amount || 0) < wantedAmount) continue;
    const transactionUrl = payment?._links?.transaction?.href;
    if (!transactionUrl) continue;
    const transaction = await fetchJson(transactionUrl);
    if (transaction.memo === memo) {
      return {
        verified: true,
        memo,
        amount: payment.amount,
        asset: config.paymentAsset,
        transactionHash: payment.transaction_hash,
        createdAt: payment.created_at
      };
    }
  }

  return {
    verified: false,
    reason: "No recent matching Stellar payment was found for the destination, amount, asset, and memo."
  };
}

function assetMatches(payment, expectedAsset) {
  if (expectedAsset === "XLM") return payment.asset_type === "native";
  return payment.asset_code === expectedAsset;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "stellar-bountypay-scout"
    }
  });
  if (!response.ok) {
    throw new Error(`Horizon request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
