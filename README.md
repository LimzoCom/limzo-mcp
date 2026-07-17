# limzo-mcp

[![npm version](https://img.shields.io/npm/v/limzo-mcp.svg)](https://www.npmjs.com/package/limzo-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-server-blue.svg)](https://modelcontextprotocol.io)

MCP (Model Context Protocol) server for **[Limzo](https://limzo.com)** — read-only public Telegram group statistics: leaderboards, activity trends, member levels, weekly award history, and moderation summaries for any group with a public Limzo stats page.

No API key, no account. Everything served is already public at `limzo.com/s/<slug>` — payloads never include verbatim member messages.

## Tools

| Tool | What it returns |
|---|---|
| `list_groups` | Search/browse the public group directory (slug, title, members, language) |
| `get_group_stats` | Full public stats for one group by slug: activity, top members, levels, awards, moderation summary |
| `get_global_stats` | Network-wide Limzo stats |

## Quick start

The server is hosted — this package is a stdio bridge for MCP clients:

```bash
npx limzo-mcp
```

### Claude Desktop / Claude Code

```json
{
  "mcpServers": {
    "limzo": { "command": "npx", "args": ["-y", "limzo-mcp"] }
  }
}
```

### Cursor / other MCP clients

Same pattern — command `npx`, args `["-y", "limzo-mcp"]`.

### Direct HTTP (streamable MCP, no bridge)

Clients that support remote MCP can connect straight to:

```
https://limzo.com/api/public/mcp
```

## Example

Ask an assistant *"How active is the hipo_chat Telegram group?"* and it calls `get_group_stats`:

```jsonc
// get_group_stats { "slug": "hipo" }  →  (response trimmed)
{
  "group":  { "title": "Hipo Chat", "username": "hipo_chat", "member_count": 3920 },
  "range":  { "key": "7d", "label": "7 days", "days": 7 },
  "stats":  {
    "messages": 1107,
    "active_users": 236,
    "mood": { "label": "Sunny", "emoji": "☀️", "positive_pct": 83 },
    "top_members": [
      { "rank": 1, "name": "Josip", "messages": 238 },
      { "rank": 2, "name": "Behrang Norouzinia", "messages": 84 }
    ]
  }
}
```

Every value above is already public at [limzo.com/s/hipo](https://limzo.com/s/hipo) — the server never exposes verbatim member messages. Full response shape: [openapi.json](https://limzo.com/api/public/openapi.json).

## What is Limzo?

A Telegram community bot: public shareable stats pages, member levels/badges/achievements, weekly highlights and reports, mini-games, and smart anti-spam moderation (newcomer captcha, impersonator guard, link safety scan, /warn warnings, language lock, cross-group network shield). Free to start: [@LimzoRobot](https://t.me/LimzoRobot?start=github).

- Docs: https://limzo.com/docs/
- OpenAPI: https://limzo.com/api/public/openapi.json
- llms.txt: https://limzo.com/llms.txt

## Listed on

Official [MCP Registry](https://registry.modelcontextprotocol.io) (`com.limzo/telegram-group-stats`) · [Glama](https://glama.ai/mcp/servers/@LimzoCom/limzo-mcp) · [Smithery](https://smithery.ai) · [npm](https://www.npmjs.com/package/limzo-mcp)

## License

MIT
