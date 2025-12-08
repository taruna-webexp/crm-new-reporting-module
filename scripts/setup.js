const { exec } = require("child_process");

console.log("📦 Starting dependency installation...\n");

exec("npm install", (err, stdout, stderr) => {
  if (!err) {
    console.log("✅ Installation completed successfully!");
    return;
  }

  console.log("\n❌ Installation failed. Analyzing errors...\n");

  const errorOutput = stdout + stderr;

  // ---- Detect deprecated packages ----
  const deprecatedMatch = errorOutput.match(/npm WARN deprecated ([^:]+)/g);
  if (deprecatedMatch) {
    console.log("⚠️ Deprecated dependencies found:");
    deprecatedMatch.forEach(dep => console.log("  - " + dep.replace("npm WARN deprecated ", "")));

    console.log(`
👉 Suggested fix:
- Update these packages to the latest compatible versions.
- OR remove/replace them if they are no longer maintained.
`);
  }

  // ---- Detect peer dependency conflicts ----
  const peerMismatch = errorOutput.match(/ERESOLVE.*?peer.*?dependency/si);
  if (peerMismatch) {
    console.log(`
⚠️ Peer dependency version conflict detected.

👉 This usually means:
- One of your libraries requires a different version of another library.
- For example: React 17 vs React 18 mismatch.

Suggested actions:
1. Check which package caused conflict in the log above.
2. Update your package.json to use compatible versions.
3. OR run:

   npm install --legacy-peer-deps

`);
  }

  // ---- Missing or invalid dependency ----
  const notFound = errorOutput.match(/not found: ([^ ]+)/);
  if (notFound) {
    console.log(`
⚠️ A required dependency was not found:

Missing: ${notFound[1]}

👉 Fix:
- Ensure the package name is correct in package.json.
- If it's private, check that registry auth is set.
`);
  }

  // ---- Show fallback solution ----
  console.log(`
=====================================================
💡 GENERAL FIX (if you just want it to install):
Run:

   npm install --legacy-peer-deps

=====================================================
`);

  process.exit(1);
});
