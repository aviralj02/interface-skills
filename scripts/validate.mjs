// Validates every skills/*/SKILL.md: frontmatter, naming, description length, required sections, size.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "skills");
const REQUIRED_SECTIONS = [
  "Purpose",
  "When to Use",
  "Core Principles",
  "Workflow",
  "Checklist",
  "Common Mistakes",
  "Example",
  "Implementation Notes",
  "Output Expectations",
];
const MAX_LINES = 500;

const errors = [];
const skills = readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory());

for (const dir of skills) {
  const file = join(root, dir.name, "SKILL.md");
  const fail = (msg) => errors.push(`${dir.name}: ${msg}`);

  if (!existsSync(file)) {
    fail("missing SKILL.md");
    continue;
  }

  const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) {
    fail("missing YAML frontmatter");
    continue;
  }

  const name = fm[1].match(/^name:\s*(.+)$/m)?.[1].trim();
  const description = fm[1].match(/^description:\s*(.+)$/m)?.[1].trim();

  if (!name) fail("frontmatter missing name");
  else {
    if (name !== dir.name) fail(`name "${name}" does not match folder`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) fail("name must be lowercase-hyphenated, ≤ 64 chars");
  }

  if (!description) fail("frontmatter missing description");
  else if (description.length > 1024) fail(`description is ${description.length} chars (max 1024)`);

  const headings = [...text.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const missing = REQUIRED_SECTIONS.filter((s) => !headings.includes(s));
  if (missing.length) fail(`missing sections: ${missing.join(", ")}`);

  const order = REQUIRED_SECTIONS.filter((s) => headings.includes(s)).map((s) => headings.indexOf(s));
  if (order.some((v, i) => i > 0 && v < order[i - 1])) fail("sections out of order");

  const lines = text.split("\n").length;
  if (lines > MAX_LINES) fail(`${lines} lines (max ${MAX_LINES}); move detail to references/`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`✓ ${skills.length} skills valid`);
