export function parseGitHubIssueUrl(issueUrl) {
  const match = String(issueUrl).match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)(?:[/?#].*)?$/);
  if (!match) {
    throw new Error("Expected a GitHub issue URL like https://github.com/owner/repo/issues/123");
  }
  return {
    owner: match[1],
    repo: match[2],
    issueNumber: Number(match[3])
  };
}

export async function fetchIssueContext(issueUrl, config) {
  const { owner, repo, issueNumber } = parseGitHubIssueUrl(issueUrl);
  const headers = {
    "User-Agent": "stellar-bountypay-scout",
    Accept: "application/vnd.github+json"
  };
  if (config.githubToken) headers.Authorization = `Bearer ${config.githubToken}`;

  const [issue, repository, comments, relatedPulls] = await Promise.all([
    githubJson(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`, headers),
    githubJson(`https://api.github.com/repos/${owner}/${repo}`, headers),
    githubJson(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments?per_page=100`, headers),
    searchRelatedPulls({ owner, repo, issueNumber, title: "", headers })
  ]);

  const pulls = await searchRelatedPulls({ owner, repo, issueNumber, title: issue.title, headers });
  return {
    issueUrl,
    owner,
    repo,
    issueNumber,
    issue,
    repository,
    comments,
    relatedPulls: mergePulls(relatedPulls.items || [], pulls.items || [])
  };
}

async function searchRelatedPulls({ owner, repo, issueNumber, title, headers }) {
  const titleTerms = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 4)
    .slice(0, 4)
    .join(" ");
  const query = [`repo:${owner}/${repo}`, "is:pr", "is:open", `${issueNumber}`];
  if (titleTerms) query.push(titleTerms);
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query.join(" "))}&per_page=20`;
  return githubJson(url, headers);
}

function mergePulls(a, b) {
  const seen = new Map();
  for (const item of [...a, ...b]) {
    seen.set(item.html_url, item);
  }
  return [...seen.values()];
}

async function githubJson(url, headers) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
