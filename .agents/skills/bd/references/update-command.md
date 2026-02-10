# BD Update Command Reference

Update existing issues with `bd update`

## Basic Usage

```bash
bd update [id...] [flags]
```

**Important:** If no ID provided, updates the **last touched issue** from most recent create/update/show/close operation.

## Common Examples

### Change Status
```bash
bd update crm-build-abc --status in_progress
bd update crm-build-abc -s closed
bd update crm-build-abc --status blocked
```

### Claim Work
```bash
# Atomically claim issue (sets assignee + status to in_progress)
bd update crm-build-abc --claim

# Claim last touched issue
bd update --claim
```

### Update Description
```bash
bd update crm-build-abc --description "Updated details here"
bd update crm-build-abc -d "New description"
```

### Change Priority
```bash
bd update crm-build-abc --priority 1
bd update crm-build-abc -p P0  # Critical
```

### Add Labels
```bash
bd update crm-build-abc --add-label "urgent"
bd update crm-build-abc --add-label "frontend,backend"
```

### Update Multiple Issues
```bash
bd update crm-build-abc crm-build-xyz --status closed
bd update crm-build-* --add-label "migration"  # Glob pattern
```

## Key Flags

### Content Updates
- `--title string` - New title
- `-d, --description string` - New description
- `--body-file string` - Read description from file (use `-` for stdin)
- `--notes string` - Additional notes
- `--append-notes string` - Append to existing notes (with newline)

### Status & Assignment
- `-s, --status string` - New status
  - `open` - Ready to start
  - `in_progress` - Actively working
  - `blocked` - Waiting on dependencies
  - `deferred` - Postponed
  - `closed` - Completed
- `-a, --assignee string` - Set assignee
- `--claim` - Atomically claim (set assignee to you + status to in_progress)
  - **Fails if already claimed** (prevents conflicts)

### Classification
- `-t, --type string` - Change issue type
  - `bug`, `feature`, `task`, `epic`, `chore`, etc.
- `-p, --priority string` - Change priority (0-4 or P0-P4)

### Labels
- `--add-label strings` - Add labels (repeatable)
- `--remove-label strings` - Remove labels (repeatable)
- `--set-labels strings` - Replace all labels (repeatable)

### Time & Scheduling
- `-e, --estimate int` - Time estimate in minutes
- `--due string` - Due date/time (empty to clear)
  - Formats: `+6h`, `+1d`, `tomorrow`, `2025-01-15`
- `--defer string` - Defer until date (empty to clear)
  - Issue hidden from `bd ready` until then

### Relationships
- `--parent string` - Reparent issue (empty string to remove parent)
- `--external-ref string` - External reference (e.g., `gh-9`)
- `--spec-id string` - Link to specification

### Advanced
- `--metadata string` - Custom metadata (JSON string or `@file.json`)
- `--ephemeral` - Mark as ephemeral (wisp)
- `--persistent` - Promote wisp to regular issue
- `--await-id string` - Set gate await_id (for coordination gates)
- `--session string` - Claude Code session ID (or use `CLAUDE_SESSION_ID` env)

## Status Workflow

Common status transitions:

```bash
# Start work
bd update <id> --status in_progress
# or
bd update <id> --claim

# Hit a blocker
bd update <id> --status blocked

# Resume work
bd update <id> --status in_progress

# Complete work
bd update <id> --status closed
# or
bd close <id>
```

## Label Management

### Add Labels
```bash
# Add single label
bd update <id> --add-label "urgent"

# Add multiple labels (repeatable flag)
bd update <id> --add-label "frontend" --add-label "backend"

# Add multiple labels (comma-separated)
bd update <id> --add-label "frontend,backend,urgent"
```

### Remove Labels
```bash
bd update <id> --remove-label "urgent"
bd update <id> --remove-label "frontend,backend"
```

### Replace All Labels
```bash
# Set exact label set
bd update <id> --set-labels "frontend,reviewed,ready"
```

## Defer & Due Dates

### Defer (Hide Until Date)
```bash
# Defer until specific date
bd update <id> --defer "2026-03-01"

# Defer relative to now
bd update <id> --defer "+1w"      # 1 week
bd update <id> --defer "tomorrow"

# Clear defer date
bd update <id> --defer ""
```

### Due Dates
```bash
# Set due date
bd update <id> --due "2026-02-15"
bd update <id> --due "+2d"        # 2 days from now
bd update <id> --due "next friday"

# Clear due date
bd update <id> --due ""
```

## Parent/Child Relationships

### Set Parent
```bash
# Make issue a child of another
bd update crm-build-sub --parent crm-build-main
```

### Remove Parent
```bash
# Remove parent relationship
bd update crm-build-sub --parent ""
```

## Updating Last Touched Issue

BD tracks the last issue you interacted with:

```bash
# Create issue (becomes "last touched")
bd create "New task"

# Update it without specifying ID
bd update --status in_progress
bd update --add-label "urgent"

# Show it
bd show
```

This is useful for rapid workflows:
```bash
bd create "Fix bug" --silent
bd update --claim              # Claims the issue just created
# ... do work ...
bd close                       # Closes the issue
```

## Batch Updates

### Update Multiple Issues
```bash
# Close several issues
bd update abc xyz 123 --status closed

# Add label to multiple
bd update abc xyz --add-label "refactor"
```

### Using Glob Patterns
```bash
# Update all issues matching pattern (if supported)
bd update crm-build-* --add-label "sprint-3"
```

## Metadata (Custom Fields)

Store custom JSON data:

```bash
# Set metadata directly
bd update <id> --metadata '{"reviewed_by": "Alice", "complexity": 5}'

# Read from file
bd update <id> --metadata @metadata.json
```

## Examples by Scenario

### Claiming Work
```bash
# Atomic claim (best practice)
bd update crm-build-abc --claim

# Manual claim
bd update crm-build-abc --assignee "Luis" --status in_progress
```

### Blocked by Another Issue
```bash
# Mark as blocked
bd update <id> --status blocked

# Add blocking dependency
bd dep add <id> blocked-by:<blocker-id>
```

### Escalating Priority
```bash
bd update <id> --priority 0 --add-label "critical"
```

### Deferring to Next Week
```bash
bd update <id> --defer "+1w" --notes "Waiting for API release"
```

### Reparenting Subtask
```bash
# Move subtask to different parent
bd update crm-build-sub1 --parent crm-build-new-parent
```

### Marking as Ready for Review
```bash
bd update <id> --status in_progress --add-label "ready-for-review"
```

### Extending Due Date
```bash
bd update <id> --due "+3d" --append-notes "Extended due to blockers"
```

## Tips

1. **Use `--claim`** instead of manual status+assignee for atomic claiming
2. **Last touched** feature is great for quick workflows
3. **Append notes** to maintain audit trail
4. **Use labels** for flexible categorization beyond types
5. **Set metadata** for custom tracking fields
6. **Batch update** to keep related issues in sync

## See Also

- `bd create --help` - Creating issues
- `bd close --help` - Closing issues
- `bd label --help` - Label management
- `bd dep --help` - Dependencies
