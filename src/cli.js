import { getConfig } from "./config.js";
import { createPaymentIntent } from "./stellar.js";
import { requirePaymentOrDemo } from "./payment-gate.js";
import { fetchIssueContext } from "./github.js";
import { analyzeContext } from "./analyzer.js";

const command = process.argv[2] || "help";
const issueUrl = process.argv[3];
const proofOrMemo = process.argv[4];
const config = getConfig();

try {
  if (command === "intent") {
    requireIssueUrl(issueUrl);
    print(createPaymentIntent(issueUrl, config));
  } else if (command === "analyze") {
    requireIssueUrl(issueUrl);
    const gate = await requirePaymentOrDemo({
      issueUrl,
      paymentProof: proofOrMemo === "demo-paid" ? proofOrMemo : "",
      memo: proofOrMemo !== "demo-paid" ? proofOrMemo : "",
      config
    });
    if (!gate.paid) {
      print(gate);
      process.exitCode = 2;
    } else {
      const context = await fetchIssueContext(issueUrl, config);
      print({
        payment: gate.receipt,
        analysis: analyzeContext(context)
      });
    }
  } else {
    usage();
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

function requireIssueUrl(value) {
  if (!value) throw new Error("Missing GitHub issue URL.");
}

function print(value) {
  console.log(JSON.stringify(value, null, 2));
}

function usage() {
  console.log(`Stellar BountyPay Scout

Commands:
  node src/cli.js intent <github-issue-url>
  node src/cli.js analyze <github-issue-url> demo-paid
  node src/cli.js analyze <github-issue-url> <stellar-payment-memo>
`);
}
