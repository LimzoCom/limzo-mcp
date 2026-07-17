# limzo-mcp

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

## What is Limzo?

A Telegram community bot: public shareable stats pages, member levels/badges/achievements, weekly highlights and reports, mini-games, and smart anti-spam moderation (newcomer captcha, impersonator guard, link safety scan, /warn warnings, language lock, cross-group network shield). Free to start: [@LimzoRobot](https://t.me/LimzoRobot?start=github).

- Docs: https://limzo.com/docs/
- OpenAPI: https://limzo.com/api/public/openapi.json
- llms.txt: https://limzo.com/llms.txt

## License

MIT
