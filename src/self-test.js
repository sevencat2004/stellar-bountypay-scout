import assert from "node:assert/strict";
import { createMemo, createPaymentIntent } from "./stellar.js";
import { analyzeFixture } from "./analyzer.js";

const issueUrl = "https://github.com/example/project/issues/42";
const config = {
  network: {
    name: "testnet",
    passphrase: "Test SDF Network ; September 2015",
    friendbotUrl: "https://friendbot.stellar.org"
  },
  horizonUrl: "https://horizon-testnet.stellar.org",
  destinationAccount: "GDESTINATION",
  paymentAmount: "1.0000000",
  paymentAsset: "XLM"
};

const memo = createMemo(issueUrl, new Date("2026-06-03T00:00:00Z"));
assert.match(memo, /^bps-[a-f0-9]{16}$/);

const intent = createPaymentIntent(issueUrl, config);
assert.equal(intent.destinationAccount, "GDESTINATION");
assert.equal(intent.asset, "XLM");
assert.equal(intent.network, "testnet");

const analysis = analyzeFixture({
  owner: "example",
  repo: "project",
  issue: {
    state: "open",
    title: "[Bounty $500] Add payment dashboard",
    body: "Paid bounty with clear payout.",
    labels: [{ name: "$500" }],
    assignees: [],
    html_url: issueUrl
  },
  repository: {
    archived: false,
    pushed_at: new Date().toISOString(),
    stargazers_count: 100,
    open_issues_count: 10
  },
  comments: [],
  relatedPulls: []
});
assert.equal(analysis.decision, "START");

const crowded = analyzeFixture({
  owner: "SecureBananaLabs",
  repo: "bug-bounty",
  issue: {
    state: "open",
    title: "[Bounty $700] Noisy task",
    body: "/bounty $700",
    labels: [{ name: "$700" }],
    assignees: [],
    html_url: issueUrl
  },
  repository: {
    archived: false,
    pushed_at: new Date().toISOString(),
    stargazers_count: 10,
    open_issues_count: 3000
  },
  comments: Array.from({ length: 80 }, (_, index) => ({ id: index })),
  relatedPulls: Array.from({ length: 5 }, (_, index) => ({ html_url: `https://github.com/pull/${index}` }))
});
assert.equal(crowded.decision, "SKIP");

console.log("self-test passed");
