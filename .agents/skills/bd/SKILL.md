# BD (Beads) Issue Tracker Skill

## Overview

BD is a lightweight, git-native issue tracker with first-class dependency support. Issues are stored in `.beads/` as JSONL files and tracked in git alongside code.

## When to Use This Skill

Use this skill when:
- Creating, updating, or managing bd issues
- Working with issue dependencies and relationships
- Understanding bd workflow and commands
- Structuring complex tasks with subtasks
- Syncing issues with git

## Core Concepts

### Issue Structure
- **ID Format**: `prefix-xyz` (e.g., `crm-build-abc`)
- **Storage**: `.beads/issues.jsonl` (JSONL format)
- **Types**: task, bug, feature, epic, chore, molecule, gate, agent, event
- **Priority**: P0-P4 (0=highest, 4=backlog)
- **Status**: open, in_progress, blocked, deferred, closed

### Dependencies
- Issues can **depend on** other issues (blockers)
- Issues can **block** other issues
- Use `bd ready` to find work with no blockers
- Dependencies prevent premature work on blocked issues

### Subtasks
- Use SUBTASK prefix in title to indicate child tasks
- Reference parent task in description: "PARENT TASK: issue-id"
- Subtasks should be completable in one focused session
- Build on each other in logical order

## Essential Commands

### Viewing Issues
```bash
bd ready              # Show issues ready to work (no blockers)
bd list               # List all open issues
bd list --all         # Include closed issues
bd show <id>          # Show full issue details
bd show <id> --children  # Show child issues
bd status             # Show database overview and statistics
```

### Creating Issues
```bash
bd create "Title" --description "Details" --priority 2 --type task
bd create "Title" -d "Details" -p 2 -t task   # Short form
bd create "Title" --labels "frontend,urgent"
bd create "Title" --parent <parent-id>        # Create child issue
bd create "Title" --deps "blocks:issue-id"    # Add dependency
```

**Useful Flags:**
- `--silent` - Output only issue ID (for scripting)
- `--due "tomorrow"` or `--due "+2d"` - Set due date
- `--assignee <name>` - Assign to someone
- `--estimate 60` - Time estimate in minutes

### Updating Issues
```bash
bd update <id> --status in_progress    # Claim work
bd update <id> --status closed         # Mark complete
bd update <id> -d "Updated details"    # Update description
bd update <id> --priority 1            # Change priority
bd update <id> --add-label "blocked"   # Add label
bd update --claim                      # Claim last touched issue
```

**Update Last Touched Issue:**
If no ID provided, updates most recent issue from create/update/show/close

### Closing Issues
```bash
bd close <id>                          # Close single issue
bd close <id1> <id2> <id3>            # Close multiple issues
bd close <id> --reason "Completed"    # Close with reason
bd close --suggest-next                # Show newly unblocked work
```

### Managing Dependencies
```bash
bd dep add <issue> <depends-on>        # Add dependency
bd dep add <issue> blocks:<blocker>    # Mark as blocking
bd dep remove <issue> <dependency>     # Remove dependency
bd dep list <issue>                    # Show dependencies
bd graph                               # Visualize dependency graph
```

### Sync with Git
```bash
bd sync                                # Export to JSONL and commit
bd export                              # Export to JSONL only
bd import                              # Import from JSONL
```

## Common Workflows

### Starting Work
```bash
# 1. Find available work
bd ready

# 2. View issue details
bd show crm-build-abc

# 3. Claim the issue
bd update crm-build-abc --status in_progress

# 4. Do the work...

# 5. Close when done
bd close crm-build-abc
```

### Creating Task with Subtasks
```bash
# 1. Create parent task
bd create "Build sidebar layout" -d "Create responsive sidebar" -p 2

# 2. Create subtasks referencing parent
bd create "SUBTASK: Install shadcn/ui" -d "PARENT TASK: crm-build-xyz" -p 2
bd create "SUBTASK: Build sidebar component" -d "PARENT TASK: crm-build-xyz" -p 2
bd create "SUBTASK: Style and polish" -d "PARENT TASK: crm-build-xyz" -p 2
```

### Managing Blocked Work
```bash
# Add blocking dependency
bd dep add crm-build-new blocks:crm-build-old

# See what's blocked
bd list --status blocked

# Find ready work (excludes blocked)
bd ready
```

## Advanced Features

### Labels
```bash
bd label add <id> frontend backend
bd label remove <id> frontend
bd list --label frontend              # Issues with ALL labels
bd list --label-any frontend,backend  # Issues with ANY label
```

### Search & Filtering
```bash
bd list --status open --priority 0    # High priority open issues
bd list --assignee "Luis"             # Assigned to Luis
bd list --type task                   # Only tasks
bd list --created-after 2026-02-01   # Recent issues
bd search "database schema"           # Text search
```

### History & Versioning
```bash
bd history <id>                       # Show version history (Dolt backend)
bd diff <commit1> <commit2>          # Show changes between commits
```

## Best Practices

### Task Descriptions
- Include **LEARNING GOAL** for learning projects
- Break down into **TASKS** or **STEP-BY-STEP**
- Add **CONCEPTS TO EXPLORE** or **QUESTIONS TO ANSWER**
- Provide **CHECKPOINT** - how to know when done
- Link **RESOURCES** (docs, tutorials, examples)

### Subtask Strategy
- Create subtasks for complex work (3+ distinct pieces)
- Each subtask = one focused session
- Mark clearly: "SUBTASK:" prefix
- Reference parent: "PARENT TASK: issue-id"
- Logical order - build on each other

### Priority Guidelines
- **P0** - Critical, blocking everything
- **P1** - High priority, important features
- **P2** - Medium priority, normal work (default)
- **P3** - Low priority, nice to have
- **P4** - Backlog, someday/maybe

### Status Workflow
1. **open** - Ready to start (if no blockers)
2. **in_progress** - Actively working
3. **blocked** - Waiting on dependencies
4. **deferred** - Postponed to specific date
5. **closed** - Completed

## Common Patterns

### Learning Project Pattern
```bash
# Create detailed learning task
bd create "Set up authentication" \
  --description "LEARNING GOAL: Understand auth flows
  
TASKS:
1. Install NextAuth.js
2. Configure providers
3. Create sign-in page

CONCEPTS:
- JWT vs sessions
- OAuth flow
- Middleware

CHECKPOINT: Users can sign in successfully" \
  --priority 2 --type task
```

### Epic with Children
```bash
# Create epic
EPIC_ID=$(bd create "Complete CRM MVP" -t epic --silent)

# Create child tasks
bd create "Database setup" --parent $EPIC_ID
bd create "Auth implementation" --parent $EPIC_ID
bd create "CRUD operations" --parent $EPIC_ID

# View epic with children
bd show $EPIC_ID --children
```

## Integration with Git

### Auto-Sync
BD automatically syncs with git when configured:
```bash
bd hooks install    # Install git hooks
bd daemon start     # Start background sync daemon
```

### Manual Sync
```bash
bd sync             # Export and commit changes
git add .beads/
git commit -m "Update issues"
git push
```

## Troubleshooting

### Issues Not Showing
```bash
bd status           # Check database status
bd import           # Re-import from JSONL
bd repair           # Fix corrupted database
```

### Conflicts
```bash
bd resolve-conflicts   # Resolve merge conflicts in JSONL
bd merge              # Git merge driver for JSONL
```

### Stale Data
```bash
bd sync               # Sync with latest
bd --allow-stale list # Override staleness check
```

## Reference

See `references/` folder for detailed command documentation:
- `commands-overview.md` - All available commands
- `create-command.md` - Creating issues in detail
- `update-command.md` - Updating issues in detail
- `workflow-examples.md` - Common workflow patterns
