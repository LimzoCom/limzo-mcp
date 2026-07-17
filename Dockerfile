# Used by registries (e.g. Glama) that build and introspect the server.
# The bridge proxies stdio <-> https://limzo.com/api/public/mcp - read-only
# public data, no API key. Runtime needs outbound HTTPS to limzo.com.
FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY bin ./bin
ENTRYPOINT ["node", "bin/limzo-mcp.js"]
