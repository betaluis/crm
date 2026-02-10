# BD Commands Overview

Complete reference from `bd --help`

## Command Categories

### Working With Issues
- `children` - List child beads of a parent
- `close` - Close one or more issues
- `comments` - View or manage comments on an issue
- `create` - Create a new issue (or multiple from markdown)
- `create-form` - Create issue using interactive form
- `delete` - Delete one or more issues
- `edit` - Edit an issue field in $EDITOR
- `gate` - Manage async coordination gates
- `label` - Manage issue labels
- `list` - List issues
- `merge-slot` - Manage merge-slot gates
- `move` - Move issue to different rig with dependency remapping
- `promote` - Promote a wisp to permanent bead
- `q` - Quick capture: create issue and output only ID
- `query` - Query issues using query language
- `refile` - Move issue to different rig
- `reopen` - Reopen closed issues
- `search` - Search issues by text query
- `set-state` - Set operational state
- `show` - Show issue details
- `state` - Query current value of state dimension
- `todo` - Manage TODO items (wrapper for task issues)
- `update` - Update one or more issues

### Views & Reports
- `activity` - Show real-time molecule state feed
- `count` - Count issues matching filters
- `diff` - Show changes between commits (Dolt backend)
- `find-duplicates` - Find similar issues using AI
- `history` - Show version history (Dolt backend)
- `lint` - Check issues for missing template sections
- `stale` - Show stale issues (not updated recently)
- `status` - Show database overview and statistics
- `types` - List valid issue types

### Dependencies & Structure
- `dep` - Manage dependencies
- `duplicate` - Mark issue as duplicate
- `duplicates` - Find and merge duplicates
- `epic` - Epic management commands
- `graph` - Display dependency graph
- `supersede` - Mark issue as superseded
- `swarm` - Swarm management for structured epics

### Sync & Data
- `branch` - List or create branches (Dolt backend)
- `daemon` - Manage background sync daemon
- `export` - Export to JSONL or Obsidian
- `federation` - Manage P2P federation
- `import` - Import from JSONL
- `merge` - Git merge driver for JSONL
- `restore` - Restore full history from git
- `sync` - Export to JSONL (sync with git)
- `vc` - Version control operations (Dolt)

### Setup & Configuration
- `backend` - Manage storage backend
- `config` - Manage configuration
- `hooks` - Manage git hooks
- `human` - Show essential commands
- `info` - Show database and daemon info
- `init` - Initialize bd in directory
- `kv` - Key-value store commands
- `onboard` - Display minimal AGENTS.md snippet
- `prime` - Output AI-optimized workflow context
- `quickstart` - Quick start guide
- `setup` - Setup integration with AI editors
- `where` - Show active beads location

### Maintenance
- `doctor` - Check and fix installation health
- `migrate` - Database migration commands
- `preflight` - Show PR readiness checklist
- `rename-prefix` - Rename issue prefix
- `repair` - Repair corrupted database
- `resolve-conflicts` - Resolve git merge conflicts
- `upgrade` - Check and manage version upgrades
- `worktree` - Manage git worktrees

### Integrations
- `admin` - Administrative commands
- `jira` - Jira integration
- `linear` - Linear integration
- `gitlab` - GitLab integration
- `repo` - Manage multiple repository config

### Additional Commands
- `agent` - Manage agent bead state
- `audit` - Record agent interactions
- `blocked` - Show blocked issues
- `completion` - Generate shell autocompletion
- `cook` - Compile formula into proto
- `defer` - Defer issues for later
- `formula` - Manage workflow formulas
- `help` - Help about any command
- `hook` - Execute git hook
- `mail` - Delegate to mail provider
- `mol` - Molecule commands
- `orphans` - Identify orphaned issues
- `ready` - Show ready work (no blockers)
- `rename` - Rename issue ID
- `ship` - Publish capability
- `slot` - Manage agent bead slots
- `undefer` - Undefer issues
- `version` - Print version

## Global Flags

```
--actor string              Actor name for audit trail
--allow-stale               Allow ops on stale data
--db string                 Database path
--dolt-auto-commit string   Auto-commit after writes
-h, --help                  Help
--json                      JSON output
--lock-timeout duration     SQLite busy timeout (default 30s)
--no-auto-flush             Disable automatic JSONL sync
--no-auto-import            Disable automatic JSONL import
--no-daemon                 Force direct storage mode
--no-db                     No-db mode: load from JSONL
--profile                   Generate CPU profile
-q, --quiet                 Errors only
--readonly                  Read-only mode
--sandbox                   Sandbox mode: no daemon/auto-sync
-v, --verbose               Verbose/debug output
-V, --version               Version information
```

## Most Common Commands

For day-to-day work, you'll use these most:

```bash
bd ready                    # Find available work
bd show <id>                # View details
bd create "Title"           # Create issue
bd update <id> --status     # Update status
bd close <id>               # Close issue
bd list                     # List issues
bd sync                     # Sync with git
```

Use `bd <command> --help` for detailed help on any command.
