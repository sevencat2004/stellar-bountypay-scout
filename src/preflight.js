import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const REQUIRED_FILES = [
  "README.md",
  "SCF_SUBMISSION.md",
  "docs/SCF_FORM_ANSWERS.md",
  "docs/DEMO_SCRIPT.md",
  "docs/MILESTONES.md",
  "package.json",
  "src/stellar.js",
  "src/payment-gate.js",
  "src/github.js",
  "src/analyzer.js",
  "src/server.js",
  "public/index.html"
];

const checks = [];

function pass(name, details = "") {
  checks.push({ ok: true, name, details });
}

function fail(name, details = "") {
  checks.push({ ok: false, name, details });
}

function command(commandName, args, options = {}) {
  return execFileSync(commandName, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options
  }).trim();
}

for (const file of REQUIRED_FILES) {
  if (existsSync(file)) pass(`required file: ${file}`);
  else fail(`required file: ${file}`, "missing");
}

try {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  if (packageJson.scripts?.test && packageJson.scripts?.serve && packageJson.scripts?.preflight) {
    pass("package scripts", "test, serve, and preflight are present");
  } else {
    fail("package scripts", "expected test, serve, and preflight scripts");
  }
} catch (error) {
  fail("package.json", error.message);
}

const allText = REQUIRED_FILES
  .filter((file) => existsSync(file))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

if (/seed phrase|private key|secret key/i.test(allText)) {
  pass("secret safety copy", "docs warn users not to share private material");
} else {
  fail("secret safety copy", "missing private-key safety language");
}

if (/STELLAR_DESTINATION_ACCOUNT/.test(readFileSync(".env.example", "utf8"))) {
  pass("environment template", "public destination account is configurable");
} else {
  fail("environment template", "missing STELLAR_DESTINATION_ACCOUNT");
}

try {
  const status = command("git", ["status", "--short", "--branch"]);
  if (status.startsWith("## main...origin/main")) pass("git branch", status.split(/\r?\n/)[0]);
  else fail("git branch", status.split(/\r?\n/)[0]);
  if (status.split(/\r?\n/).length === 1) pass("git working tree", "clean");
  else fail("git working tree", "uncommitted changes present");
} catch (error) {
  fail("git status", error.message);
}

try {
  const repo = JSON.parse(command("gh", [
    "repo",
    "view",
    "sevencat2004/stellar-bountypay-scout",
    "--json",
    "nameWithOwner,url,visibility,defaultBranchRef"
  ]));
  if (repo.visibility === "PUBLIC" && repo.defaultBranchRef?.name === "main") {
    pass("github repository", `${repo.url} is PUBLIC on main`);
  } else {
    fail("github repository", JSON.stringify(repo));
  }
} catch (error) {
  fail("github repository", `gh verification failed: ${error.message}`);
}

try {
  const result = command("node", ["src/self-test.js"]);
  if (result.includes("self-test passed")) pass("self-test", result);
  else fail("self-test", result);
} catch (error) {
  fail("self-test", error.message);
}

const failed = checks.filter((check) => !check.ok);
for (const check of checks) {
  const marker = check.ok ? "PASS" : "FAIL";
  console.log(`${marker} ${check.name}${check.details ? ` - ${check.details}` : ""}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} preflight check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log("\nAll SCF preflight checks passed.");
}
