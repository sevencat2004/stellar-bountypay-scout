import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getConfig } from "./config.js";
import { createPaymentIntent } from "./stellar.js";
import { requirePaymentOrDemo } from "./payment-gate.js";
import { fetchIssueContext } from "./github.js";
import { analyzeContext } from "./analyzer.js";

const config = getConfig();
const rootDir = join(fileURLToPath(new URL("..", import.meta.url)), "public");

const server = createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/health") {
      return json(response, 200, { ok: true, app: "stellar-bountypay-scout" });
    }
    if (request.method === "GET" && request.url?.startsWith("/intent")) {
      const url = new URL(request.url, `http://${request.headers.host}`);
      const issueUrl = url.searchParams.get("issueUrl");
      if (!issueUrl) return json(response, 400, { error: "Missing issueUrl." });
      return json(response, 200, createPaymentIntent(issueUrl, config));
    }
    if (request.method === "POST" && request.url === "/analyze") {
      const body = await readJson(request);
      const issueUrl = body.issueUrl;
      if (!issueUrl) return json(response, 400, { error: "Missing issueUrl." });
      const gate = await requirePaymentOrDemo({
        issueUrl,
        paymentProof: body.paymentProof || "",
        memo: body.memo || "",
        config
      });
      if (!gate.paid) return json(response, 402, gate);
      const context = await fetchIssueContext(issueUrl, config);
      return json(response, 200, {
        payment: gate.receipt,
        analysis: analyzeContext(context)
      });
    }
    if (request.method === "GET") {
      return serveStatic(request, response);
    }
    return json(response, 404, { error: "Not found." });
  } catch (error) {
    return json(response, 500, { error: error.message });
  }
});

server.listen(config.port, () => {
  console.log(`Stellar BountyPay Scout listening on http://localhost:${config.port}`);
});

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8") || "{}";
  return JSON.parse(raw);
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = pathname.replace(/^\/+/, "").replace(/\.\./g, "");
  const filePath = join(rootDir, safePath);
  try {
    const data = await readFile(filePath);
    response.writeHead(200, { "Content-Type": contentType(filePath) });
    response.end(data);
  } catch {
    json(response, 404, { error: "Not found." });
  }
}

function json(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body, null, 2));
}

function contentType(filePath) {
  switch (extname(filePath)) {
    case ".html": return "text/html; charset=utf-8";
    case ".css": return "text/css; charset=utf-8";
    case ".js": return "text/javascript; charset=utf-8";
    default: return "text/plain; charset=utf-8";
  }
}
