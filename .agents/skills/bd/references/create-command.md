# BD Create Command Reference

Create new issues with `bd create`

## Basic Usage

```bash
bd create [title] [flags]
```

**Aliases:** `create`, `new`

## Common Examples

### Simple Task
```bash
bd create "Fix login bug"
bd create "Fix login bug" --type bug --priority 1
```

### Detailed Task
```bash
bd create "Implement user dashboard" \
  --description "Create dashboard showing user stats" \
  --priority 2 \
  --type feature \
  --estimate 120 \
  --labels "frontend,dashboard"
```

### Learning Task (with structured description)
```bash
bd create "Set up authentication" \
  --description "LEARNING GOAL: Understand auth flows

TASKS:
1. Install NextAuth.js
2. Configure providers
3. Create sign-in page

CHECKPOINT: Users can sign in successfully" \
  --priority 2
```

### Subtask with Parent
```bash
bd create "SUBTASK: Install shadcn/ui" \
  --description "PARENT TASK: crm-build-tlu
  
Install and configure shadcn/ui..." \
  --parent crm-build-tlu
```

### Issue with Dependencies
```bash
bd create "Build API endpoints" \
  --deps "blocks:crm-build-schema,discovered-from:crm-build-planning"
```

### Scripting (silent output)
```bash
ID=$(bd create "New task" --silent)
echo "Created: $ID"
```

## Key Flags

### Content
- `-t, --title string` - Issue title
- `-d, --description string` - Issue description
- `--body-file string` - Read description from file (use `-` for stdin)
- `--notes string` - Additional notes
- `--append-notes string` - Append to existing notes

### Classification
- `--type string` - Issue type (default: `task`)
  - `bug` - Bug fix
  - `feature` - New feature (alias: `enhancement`)
  - `task` - General task
  - `epic` - Large feature set
  - `chore` - Maintenance work
  - `molecule` - Work template
  - `gate` - Coordination gate
  - `agent` - Agent tracking
  - `event` - Event log
- `-p, --priority string` - Priority 0-4 or P0-P4 (default: `2`)
  - `0` or `P0` - Critical
  - `1` or `P1` - High
  - `2` or `P2` - Medium
  - `3` or `P3` - Low
  - `4` or `P4` - Backlog

### Assignment & Tracking
- `-a, --assignee string` - Assignee name
- `-l, --labels strings` - Comma-separated labels
- `-e, --estimate int` - Time estimate in minutes
- `--due string` - Due date
  - Formats: `+6h`, `+1d`, `+2w`, `tomorrow`, `next monday`, `2025-01-15`
- `--defer string` - Defer until date (same formats as `--due`)

### Relationships
- `--parent string` - Parent issue ID (creates hierarchical child)
- `--deps strings` - Dependencies
  - Format: `type:id` or just `id`
  - Examples: `blocks:bd-20`, `discovered-from:bd-15,blocks:bd-20`
- `--waits-for string` - Spawner issue ID (for fanout gates)
- `--waits-for-gate string` - Gate type: `all-children` or `any-children`

### Organization
- `--rig string` - Create in different rig
- `--prefix string` - Create by prefix (e.g., `--prefix bd-`)
- `--repo string` - Target repository
- `--external-ref string` - External reference (e.g., `gh-9`, `jira-ABC`)
- `--spec-id string` - Link to specification document

### Advanced
- `--id string` - Explicit issue ID (e.g., `bd-42`)
- `--ephemeral` - Create as ephemeral (not exported to JSONL)
- `--wisp-type string` - Wisp type for TTL-based compaction
  - `heartbeat`, `ping`, `patrol`, `gc_report`, `recovery`, `error`, `escalation`
- `--silent` - Output only issue ID (for scripting)
- `--dry-run` - Preview without creating
- `--force` - Force creation even if prefix doesn't match
- `--validate` - Validate required sections for issue type

### Type-Specific Flags

**For `--type molecule`:**
- `--mol-type string` - Molecule type: `swarm`, `patrol`, or `work`

**For `--type agent`:**
- `--agent-rig string` - Agent's rig name

**For `--type event`:**
- `--event-actor string` - Entity URI who caused event
- `--event-category string` - Event category (e.g., `patrol.muted`)
- `--event-target string` - Entity URI or bead ID affected
- `--event-payload string` - Event-specific JSON data

### Batch Creation
- `-f, --file string` - Create multiple issues from markdown file

## Dependency Format

Dependencies use the format `[type:]id`:

```bash
# Simple blocking dependency
--deps "blocks:bd-123"

# Multiple dependencies
--deps "blocks:bd-123,discovered-from:bd-456"

# Just ID (infers relationship)
--deps "bd-123"
```

**Common dependency types:**
- `blocks` - This issue blocks the specified issue
- `blocked-by` - This issue is blocked by the specified issue
- `discovered-from` - This issue was discovered from another
- `relates-to` - General relationship

## Examples by Use Case

### Bug Report
```bash
bd create "Login fails with special characters" \
  --type bug \
  --priority 1 \
  --description "Users can't login when password contains @" \
  --labels "auth,critical"
```

### Feature Request
```bash
bd create "Add dark mode toggle" \
  --type feature \
  --priority 2 \
  --estimate 180 \
  --description "Allow users to switch between light/dark themes" \
  --labels "ui,enhancement"
```

### Epic with Children
```bash
# Create epic
EPIC=$(bd create "User Management System" --type epic --silent)

# Create child features
bd create "User registration" --parent $EPIC
bd create "User profile editing" --parent $EPIC
bd create "Password reset flow" --parent $EPIC
```

### Learning Task with Checkpoint
```bash
bd create "Learn Zod validation" \
  --description "LEARNING GOAL: Master schema validation

TASKS:
1. Install zod
2. Create first schema
3. Integrate with forms

CHECKPOINT: Form validates with Zod schema" \
  --estimate 90 \
  --labels "learning,forms"
```

### Deferred Task
```bash
bd create "Review Q2 metrics" \
  --defer "2026-04-01" \
  --description "Quarterly review of performance metrics"
```

## Tips

1. **Use `--silent`** for scripting to get just the ID
2. **Use `--dry-run`** to preview before creating
3. **Use `--body-file -`** to pipe description from stdin
4. **Set defaults** in `.beads/config.yaml` for your project
5. **Use parent/child** for breaking down complex work
6. **Add estimates** to track time and plan capacity

## See Also

- `bd update --help` - Updating issues
- `bd show --help` - Viewing issues
- `bd dep --help` - Managing dependencies
