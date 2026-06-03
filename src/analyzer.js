const NOISY_REPOS = new Set([
  "SecureBananaLabs/bug-bounty",
  "UnsafeLabs/Bounty-Hunters",
  "Scottcjn/rustchain-bounties",
  "mergeos-bounties/mergeos"
]);

const TOKEN_ONLY_WORDS = ["points", "leaderboard", "gssoc", "rtc", "mrwk", "token only"];

export function analyzeContext(context) {
  const fullName = `${context.owner}/${context.repo}`;
  const issue = context.issue;
  const repo = context.repository;
  const comments = context.comments || [];
  const relatedPulls = context.relatedPulls || [];
  const body = `${issue.title || ""}\n${issue.body || ""}`.toLowerCase();
  const labels = (issue.labels || []).map((label) => label.name || "");
  let score = 50;
  const reasons = [];
  const risks = [];

  if (issue.state !== "open") {
    score -= 100;
    risks.push("Issue is not open.");
  }
  if (repo.archived) {
    score -= 100;
    risks.push("Repository is archived.");
  }
  if ((issue.assignees || []).length > 0) {
    score -= 60;
    risks.push(`Issue is assigned to ${issue.assignees.map((a) => a.login).join(", ")}.`);
  }
  if (NOISY_REPOS.has(fullName)) {
    score -= 70;
    risks.push("Repository is a known noisy or low-probability bounty pool.");
  }
  if (comments.length > 30) {
    score -= 35;
    risks.push(`Crowded comment thread: ${comments.length} comments.`);
  } else if (comments.length > 10) {
    score -= 15;
    risks.push(`Some visible competition: ${comments.length} comments.`);
  }
  if (relatedPulls.length > 0) {
    score -= Math.min(60, relatedPulls.length * 15);
    risks.push(`${relatedPulls.length} open pull request(s) may overlap with this issue.`);
  }
  if (TOKEN_ONLY_WORDS.some((word) => body.includes(word))) {
    score -= 55;
    risks.push("Reward wording suggests points, contest status, or token-only payout risk.");
  }
  if (body.includes("/bounty") || body.includes("paid bounty") || labels.some((label) => label.includes("$"))) {
    score += 20;
    reasons.push("Bounty wording or amount label is visible.");
  }
  if (body.includes("kyc") || body.includes("wallet") || body.includes("payout")) {
    score += 8;
    reasons.push("Payout or account requirements are mentioned explicitly.");
  }
  if (repo.pushed_at && Date.now() - Date.parse(repo.pushed_at) < 1000 * 60 * 60 * 24 * 45) {
    score += 10;
    reasons.push("Repository was pushed recently.");
  }

  const amount = extractAmount(`${issue.title || ""} ${issue.body || ""} ${labels.join(" ")}`);
  if (amount) reasons.push(`Detected amount signal: ${amount}.`);
  if (!amount && !body.includes("/bounty")) {
    score -= 15;
    risks.push("No clear cash amount was detected.");
  }

  const decision = score >= 60 ? "START" : score >= 25 ? "INSPECT" : "SKIP";
  return {
    decision,
    score,
    amount,
    summary: `${decision}: score ${score}; ${risks[0] || reasons[0] || "no major blocker detected"}`,
    reasons,
    risks,
    issue: {
      title: issue.title,
      url: issue.html_url,
      state: issue.state,
      assignees: (issue.assignees || []).map((a) => a.login),
      labels,
      comments: comments.length
    },
    repository: {
      fullName,
      archived: repo.archived,
      pushedAt: repo.pushed_at,
      stars: repo.stargazers_count,
      openIssues: repo.open_issues_count
    },
    competition: {
      relatedOpenPullRequests: relatedPulls.map((pull) => ({
        title: pull.title,
        url: pull.html_url,
        updatedAt: pull.updated_at
      }))
    }
  };
}

export function analyzeFixture(context) {
  return analyzeContext(context);
}

function extractAmount(text) {
  const match = String(text).match(/(?:\$|usd\s*)(\d{1,3}(?:,\d{3})*|\d+)(?:\s*(?:usd|usdc|xlm))?/i);
  if (!match) return null;
  return match[0].trim();
}
