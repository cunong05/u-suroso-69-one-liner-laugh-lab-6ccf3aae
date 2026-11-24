// One-Liner Laugh Lab — u-suroso-69-one-liner-laugh-lab-6ccf3aae
// Writes a single funny one-liner answering the prompt
// "the excuse a robot vacuum gives after eating a sock"
// to output/entry.txt. Deterministic: fixed string, no randomness,
// no timestamps, no network, Node 22 stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "It was on the floor, Your Honor. I rest my case.";

// The gate: 1-200 UTF-8 characters, one line, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (/\n|\r/.test(ENTRY) || ENTRY.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

// Write next to the repo (output/entry.txt) and, when the harness
// mounts /output, there too. Same bytes in both places, no trailing
// newline so the file is exactly the one line.
for (const dir of ["output", "/output"]) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
  } catch {
    // /output may not exist outside the harness sandbox; output/ is
    // the fallback that always works.
  }
}

console.log(`Wrote entry (${ENTRY.length} chars): ${ENTRY}`);
