# Zasady pracy dla tego repo (Codex CLI)

Pelna konfiguracja projektu znajduje sie w AGENTS.md.

<!-- GitNexus: managed project-context block -->
## GitNexus code graph

This repository is indexed in GitNexus as DominDev-PB.

Before broad code exploration, feature work, debugging, refactoring, or impact analysis, use the GitNexus MCP server first:
- Read gitnexus://repo/DominDev-PB/context to check repository context and index freshness.
- Use query for concepts/features, context for specific symbols, and impact before changing shared code.
- Use detect_changes before finalizing changes that may affect existing flows.
- If the index is stale, ask before re-indexing or run gitnexus analyze "D:\ProgramData\DominDev\DominDev-PB" --name DominDev-PB --index-only.

GitNexus is a navigation and impact-analysis layer, not a replacement for reading the source files before editing.
<!-- /GitNexus -->