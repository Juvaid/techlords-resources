#!/usr/bin/env node
// check-deps.mjs: look before you install. From @techlordsbywlm ("Fake packages, real hack").
//
// AI agents sometimes suggest packages that don't exist, and attackers register those names ("slopsquatting").
// This script checks npm packages against the registry before they enter your project:
//   FAIL  the package does not exist on npm
//   WARN  it is very new, barely downloaded, or has no linked source repository
//
// Usage (Node 18+, no dependencies):
//   node check-deps.mjs react zod some-new-package     check the named packages
//   node check-deps.mjs                                check every dependency in ./package.json
//   node check-deps.mjs --since origin/main            check only dependencies added since a git ref (for CI)
// Options: --min-age-days 30   --min-weekly 500   --strict (exit 1 on warnings too)

import {execSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(name);
  if (i === -1) return dflt;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const flag = (name) => {
  const i = args.indexOf(name);
  if (i === -1) return false;
  args.splice(i, 1);
  return true;
};
const MIN_AGE = Number(opt('--min-age-days', 30));
const MIN_WEEKLY = Number(opt('--min-weekly', 500));
const SINCE = opt('--since', null);
const STRICT = flag('--strict');

const depsOf = (pkg) => Object.keys({...pkg.dependencies, ...pkg.devDependencies, ...pkg.optionalDependencies, ...pkg.peerDependencies});

function targets() {
  if (args.length) return args;
  const now = JSON.parse(readFileSync('package.json', 'utf8'));
  if (!SINCE) return depsOf(now);
  let before = {};
  try {
    before = JSON.parse(execSync(`git show ${SINCE}:package.json`, {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}));
  } catch {
    // no package.json at that ref: everything is new
  }
  const old = new Set(depsOf(before));
  return depsOf(now).filter((d) => !old.has(d));
}

async function check(name) {
  const res = await fetch(`https://registry.npmjs.org/${name.replace('/', '%2F')}`);
  if (res.status === 404) return {name, level: 'FAIL', notes: ['does not exist on npm (possible hallucination; anyone could register this name)']};
  if (!res.ok) return {name, level: 'WARN', notes: [`registry answered ${res.status}`]};
  const meta = await res.json();
  const notes = [];
  let level = 'OK';
  const created = meta.time?.created ? new Date(meta.time.created) : null;
  const ageDays = created ? Math.floor((Date.now() - created.getTime()) / 86400000) : null;
  if (ageDays !== null && ageDays < MIN_AGE) { level = 'WARN'; notes.push(`created ${ageDays} days ago`); }
  let weekly = null;
  try {
    const d = await fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`);
    if (d.ok) weekly = (await d.json()).downloads ?? null;
  } catch {
    // downloads API unavailable: skip this check
  }
  if (weekly !== null && weekly < MIN_WEEKLY) { level = 'WARN'; notes.push(`${weekly} downloads last week`); }
  const latest = meta['dist-tags']?.latest;
  const repo = meta.repository || (latest && meta.versions?.[latest]?.repository);
  if (!repo) { level = 'WARN'; notes.push('no source repository linked'); }
  const maintainers = meta.maintainers?.length ?? 0;
  return {name, level, notes, info: `v${latest ?? '?'} · ${ageDays ?? '?'} days old · ${weekly ?? '?'} weekly downloads · ${maintainers} maintainer(s)`};
}

const list = targets();
if (!list.length) {
  console.log('No new dependencies to check.');
  process.exit(0);
}
let fails = 0, warns = 0;
for (const name of list) {
  const r = await check(name);
  if (r.level === 'FAIL') fails++;
  if (r.level === 'WARN') warns++;
  const mark = r.level === 'OK' ? 'OK  ' : r.level === 'WARN' ? 'WARN' : 'FAIL';
  console.log(`${mark}  ${r.name}${r.info ? `  (${r.info})` : ''}${r.notes.length ? `\n      ${r.notes.join('; ')}` : ''}`);
}
console.log(`\n${list.length} checked: ${fails} failed, ${warns} need a look.`);
process.exit(fails || (STRICT && warns) ? 1 : 0);
