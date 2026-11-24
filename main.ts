// One-Line Office Joke — make.fun entry
// Writes a single office joke line to /output/entry.txt, validates it
// against the bounty gate (UTF-8, 1-200 chars, one line, not blank),
// then reads it back and verifies it byte-for-byte.

import { mkdirSync, readdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The fire drill is the only meeting everyone attends on time, because it's the only one with an actual exit.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// --- Validate the joke against the gate before writing anything. ---
const chars = [...JOKE];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  fail(`joke is ${chars.length} characters, must be 1-${MAX_CHARS}`);
}
if (JOKE.trim().length === 0) fail("joke is only whitespace");
if (JOKE.includes("\n") || JOKE.includes("\r")) fail("joke must be a single line");
if (JOKE !== JOKE.trim()) fail("joke has leading or trailing whitespace");
// No control characters (other than none allowed at all): a joke line must
// be plain printable text, so stray control bytes fail the run loudly.
for (const ch of JOKE) {
  if (ch.codePointAt(0)! < 0x20 || ch.codePointAt(0) === 0x7f) {
    fail(`joke contains control character U+${ch.codePointAt(0)!.toString(16).padStart(4, "0")}`);
  }
}
// Valid UTF-8 round-trip check: encoding then decoding must be identical.
if (Buffer.from(JOKE, "utf8").toString("utf8") !== JOKE) {
  fail("joke is not valid UTF-8");
}

// --- Prepare the output directory: clear its CONTENTS only. ---
// /output is the grader's mount point: never remove the directory itself.
mkdirSync(OUTPUT_DIR, { recursive: true });
for (const name of readdirSync(OUTPUT_DIR)) {
  rmSync(join(OUTPUT_DIR, name), { recursive: true, force: true });
}

// --- Write the entry with no trailing newline and verify it. ---
writeFileSync(OUTPUT_FILE, JOKE, "utf8");

const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== JOKE) fail("read-back mismatch: entry.txt differs from the joke");
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(JOKE, "utf8")) {
  fail("read-back byte length mismatch");
}
// Raw-bytes comparison: the file on disk must be exactly the joke's UTF-8
// bytes, no BOM, no trailing newline, nothing extra.
const raw = readFileSync(OUTPUT_FILE);
if (!raw.equals(Buffer.from(JOKE, "utf8"))) {
  fail("read-back raw bytes differ from the joke");
}
// The output directory must contain exactly the one entry file.
const leftovers = readdirSync(OUTPUT_DIR).filter((n) => n !== "entry.txt");
if (leftovers.length > 0) fail(`unexpected files left in /output: ${leftovers.join(", ")}`);

console.log(`wrote ${OUTPUT_FILE} (${chars.length} chars, 1 line)`);
console.log(written);
