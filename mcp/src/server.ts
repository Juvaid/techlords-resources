// A minimal MCP server: one tool that searches your own data. From @techlordsbywlm ("MCP, 40 second mein").
// Any MCP-aware AI app (Claude Desktop, Claude Code, Cursor, ...) can connect to it and call `search_notes`.
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {z} from 'zod';

// Your data. Replace data/notes.json with anything: FAQs, product docs, customer notes, runbooks.
type Note = {id: string; title: string; body: string; tags: string[]};
const notes: Note[] = JSON.parse(readFileSync(fileURLToPath(new URL('../data/notes.json', import.meta.url)), 'utf8'));

const server = new McpServer({name: 'my-notes', version: '1.0.0'});

server.registerTool(
  'search_notes',
  {
    title: 'Search notes',
    description: 'Search the team notes by keyword. Returns the matching notes with their full text.',
    inputSchema: {query: z.string().min(2).describe('Words to look for in titles, text and tags')},
  },
  async ({query}) => {
    const words = query.toLowerCase().split(/\s+/);
    const hits = notes.filter((n) => words.every((w) => `${n.title} ${n.body} ${n.tags.join(' ')}`.toLowerCase().includes(w)));
    const text = hits.length
      ? hits.map((n) => `# ${n.title} (${n.id})\n${n.body}\nTags: ${n.tags.join(', ')}`).join('\n\n')
      : `No notes match "${query}".`;
    return {content: [{type: 'text', text}]};
  },
);

// stdio transport: the AI app starts this process and talks to it over stdin/stdout.
// Log to stderr only; stdout carries the protocol.
await server.connect(new StdioServerTransport());
console.error('my-notes MCP server running on stdio');
