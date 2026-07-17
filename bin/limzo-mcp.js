#!/usr/bin/env node
// limzo-mcp — stdio bridge to the hosted Limzo MCP server.
// Everything is read-only public data; no API key or account needed.
// Equivalent to: npx mcp-remote https://limzo.com/api/public/mcp
const { spawn } = require('child_process');
const path = require('path');

const ENDPOINT = 'https://limzo.com/api/public/mcp';
const remote = require.resolve('mcp-remote/dist/proxy.js', { paths: [path.join(__dirname, '..')] });
const child = spawn(process.execPath, [remote, ENDPOINT, ...process.argv.slice(2)], { stdio: 'inherit' });
child.on('exit', code => process.exit(code ?? 0));
