// Integrity check: broken internal links, missing assets, stray em-dashes.
"use strict";
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const issues = [];
for (const f of files) {
  const s = fs.readFileSync(path.join(dir, f), "utf8");
  if (/[—–]/.test(s)) issues.push(f + ": em/en dash");
  for (const m of s.matchAll(/href="([a-z0-9-]+\.html)(#[a-z-]+)?"/g)) {
    if (!fs.existsSync(path.join(dir, m[1]))) issues.push(f + ": broken link -> " + m[1]);
  }
  for (const m of s.matchAll(/src="(assets\/[^"]+)"/g)) {
    if (!fs.existsSync(path.join(dir, m[1]))) issues.push(f + ": missing asset -> " + m[1]);
  }
}
console.log(issues.length ? [...new Set(issues)].join("\n") : "OK: " + files.length + " pages, no broken internal links, no missing assets, no em dashes");
process.exitCode = issues.length ? 1 : 0;
