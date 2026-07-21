#!/usr/bin/env node
// limzo-mcp — stdio bridge to the hosted Limzo MCP server.
// Read-only public Telegram group statistics; no API key or account needed.
//
// A local stdio MCP client (Claude Desktop, Cursor, ...) speaks to us over
// stdin/stdout; we relay every JSON-RPC message to the remote streamable-HTTP
// endpoint and relay its replies back. The endpoint is public, so there is no
// auth, browser, or child process involved — just a message pipe.
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const ENDPOINT = process.env.LIMZO_MCP_ENDPOINT || 'https://limzo.com/api/public/mcp';

function report(err) {
  process.stderr.write(`limzo-mcp: ${err instanceof Error ? err.stack || err.message : String(err)}\n`);
}

async function main() {
  const local = new StdioServerTransport();
  const remote = new StreamableHTTPClientTransport(new URL(ENDPOINT));

  let closing = false;
  const shutdown = (code = 0) => {
    if (closing) return;
    closing = true;
    Promise.allSettled([local.close(), remote.close()]).then(() => process.exit(code));
  };

  // Forward JSON-RPC in both directions. The client and the remote server
  // negotiate capabilities directly through this pipe; we add nothing.
  local.onmessage = (msg) => { remote.send(msg).catch(report); };
  remote.onmessage = (msg) => { local.send(msg).catch(report); };

  local.onerror = report;
  remote.onerror = report;
  local.onclose = () => shutdown(0);
  remote.onclose = () => shutdown(0);

  process.on('SIGINT', () => shutdown(0));
  process.on('SIGTERM', () => shutdown(0));

  // Open the remote first so we can relay the moment stdin starts flowing.
  await remote.start();
  await local.start();
}

main().catch((err) => { report(err); process.exit(1); });
