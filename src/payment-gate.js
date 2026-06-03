import { createPaymentIntent, verifyPaymentByMemo } from "./stellar.js";

export async function requirePaymentOrDemo({ issueUrl, paymentProof, memo, config }) {
  if (paymentProof === "demo-paid") {
    return {
      paid: true,
      mode: "demo",
      receipt: {
        verified: true,
        reason: "Local demo proof accepted. No funds moved."
      }
    };
  }

  if (memo) {
    const receipt = await verifyPaymentByMemo({ memo, config });
    if (receipt.verified) {
      return { paid: true, mode: "stellar", receipt };
    }
    return {
      paid: false,
      statusCode: 402,
      paymentIntent: createPaymentIntent(issueUrl, config),
      receipt
    };
  }

  return {
    paid: false,
    statusCode: 402,
    paymentIntent: createPaymentIntent(issueUrl, config)
  };
}
