const form = document.querySelector("#analyze-form");
const intentButton = document.querySelector("#intent-button");
const clearButton = document.querySelector("#clear-button");
const output = document.querySelector("#output");

intentButton.addEventListener("click", async () => {
  const issueUrl = document.querySelector("#issueUrl").value.trim();
  show("Creating Stellar payment intent...");
  const response = await fetch(`/intent?issueUrl=${encodeURIComponent(issueUrl)}`);
  show(await response.json());
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const issueUrl = document.querySelector("#issueUrl").value.trim();
  const proof = document.querySelector("#paymentProof").value.trim();
  const body = { issueUrl };
  if (proof === "demo-paid") body.paymentProof = proof;
  else if (proof) body.memo = proof;

  show("Running analysis...");
  const response = await fetch("/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  show(await response.json());
});

clearButton.addEventListener("click", () => show("Ready."));

function show(value) {
  output.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}
