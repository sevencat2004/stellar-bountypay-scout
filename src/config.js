import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const NETWORKS = {
  testnet: {
    name: "testnet",
    passphrase: "Test SDF Network ; September 2015",
    horizonUrl: "https://horizon-testnet.stellar.org",
    friendbotUrl: "https://friendbot.stellar.org"
  },
  mainnet: {
    name: "mainnet",
    passphrase: "Public Global Stellar Network ; September 2015",
    horizonUrl: "https://horizon.stellar.org",
    friendbotUrl: null
  }
};

export function loadEnvFile(cwd = process.cwd()) {
  const envPath = join(cwd, ".env");
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

export function getConfig() {
  loadEnvFile();
  const networkName = (process.env.STELLAR_NETWORK || "testnet").toLowerCase();
  const network = NETWORKS[networkName] || NETWORKS.testnet;
  return {
    network,
    horizonUrl: process.env.STELLAR_HORIZON_URL || network.horizonUrl,
    destinationAccount: process.env.STELLAR_DESTINATION_ACCOUNT || "",
    paymentAsset: process.env.STELLAR_PAYMENT_ASSET || "XLM",
    paymentAmount: process.env.STELLAR_PAYMENT_AMOUNT || "1.0000000",
    githubToken: process.env.GITHUB_TOKEN || "",
    port: Number(process.env.PORT || 8791)
  };
}
