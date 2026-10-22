# MCP: a starter server in TypeScript

From @techlordbywlm ("MCP, 40 second mein"). MCP (Model Context Protocol) is one standard plug between AI apps and your tools and data. Build the server once, and every MCP-aware app (Claude Desktop, Claude Code, Cursor and more) can use it.

This starter exposes one tool, `search_notes`, that searches `data/notes.json`. Swap in your own data or call your own API inside the tool.

## Run it

Node 18 or newer:

```bash
npm install
npm run build
```

That builds `dist/server.js`. The AI app starts it for you, so you don't run it yourself.

## Connect it

Use the absolute path to `dist/server.js` on your machine.

**Claude Code**

```bash
claude mcp add my-notes -- node /absolute/path/to/mcp/dist/server.js
```

**Claude Desktop**: Settings → Developer → Edit Config, then add to `claude_desktop_config.json` and restart:

```json
{
  "mcpServers": {
    "my-notes": {"command": "node", "args": ["/absolute/path/to/mcp/dist/server.js"]}
  }
}
```

**Cursor**: add the same `mcpServers` block to `.cursor/mcp.json` in your project.

Then ask: *"Search my notes for the refund policy."*

## Make it yours

- Edit `data/notes.json`, or replace the file read with a database query or an API call.
- Add more tools with `server.registerTool(name, {description, inputSchema}, handler)`. Give each a clear description: the AI decides when to call a tool from its description.
- Keep secrets in environment variables, never in the code.
- Give a tool only the access it needs: a read-only search is a safe first tool.

Built and tested with `@modelcontextprotocol/sdk` 1.32.1.
