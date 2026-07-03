export const SECRET_AUTH_PROOF_EXAMPLE_SOURCE = `const proof = {
  message:
    "example.com wants you to prove your signing key:\\n\\nnonce: k8f3m2x9\\nexp: 1719667500",
  signature: {
    value: "0x4f9c2b1a…",
  },
  pubKey: {
    algorithm: "secp256k1",
    source: "ethereum",
    value: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    encoding: "hex",
  },
};`;

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const PRE_STYLE =
  'margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;';

export function secretAuthProofDemo() {
  return `<h2>SecretAuthProof</h2>
<div class="block"><pre style="${PRE_STYLE}">${escapeHtml(SECRET_AUTH_PROOF_EXAMPLE_SOURCE)}</pre></div>`;
}
