# Tech Lords resources

Free templates, checklists and scripts from the [@techlordsbywlm](https://instagram.com/techlordsbywlm) reels. Each folder is named after the word you comment on a reel.

| Comment | Reel | What you get |
|---|---|---|
| **VIBE** | Vibe coding: 3 non-negotiables | [`vibe/AGENTS.md`](vibe/AGENTS.md), a project memory file with negative constraints, and [`vibe/SYSTEM-PROMPT.md`](vibe/SYSTEM-PROMPT.md) for Claude Code and Cursor |
| **GUARD** | Bunty ne prod uda diya | [`guard/AGENT-SAFETY-CHECKLIST.md`](guard/AGENT-SAFETY-CHECKLIST.md): sandbox, permissions and checkpoints before an agent touches anything real |
| **SAFE** | Fake packages, real hack | [`safe/check-deps.mjs`](safe/check-deps.mjs): checks new npm dependencies (exists? how old? how many downloads?) before you install them, plus a CI step |
| **MCP** | MCP, 40 second mein | [`mcp/`](mcp/): a minimal MCP server in TypeScript with one tool, ready to connect to an AI app |
| **BILL** | AI bill kisne kiya? | [`bill/AI-COST-CHECKLIST.md`](bill/AI-COST-CHECKLIST.md): right-size the model, cache repeated context, cap every key, and a weekly cost table |
| **TEN** | 10x developer? Aur das bugs. | [`ten/AI-WORKFLOW.md`](ten/AI-WORKFLOW.md): the small-diffs, tests-first, read-every-change loop, with prompts to copy and a diff review checklist |
| **CONTEXT** | Duniya ka sabse perfect prompt | [`context/CONTEXT-TEMPLATE.md`](context/CONTEXT-TEMPLATE.md): a task brief with files, pattern and a working example, plus a filled sample |
| **TOOLS** | Cursor ya Claude Code? Dono. | [`tools/SETUP.md`](tools/SETUP.md): pick the tool by the job, one shared rules file for every agent, and the same safety in both |

## How to use

1. Open the folder for your keyword.
2. Copy the file into your project and edit the parts marked `<like this>`.
3. Commit it, so your agent and your team see the same rules.

Everything here is MIT licensed: use it, change it, ship it.

Follow [@techlordsbywlm](https://instagram.com/techlordsbywlm) for high-signal AI engineering. Main hoon aapka Tech Lord: smart build karo.
