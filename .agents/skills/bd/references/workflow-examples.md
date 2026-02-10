# BD Workflow Examples

Common workflows and patterns for using bd effectively.

## Daily Work Flow

### Morning: Find Work
```bash
# See what's ready to work on (no blockers)
bd ready

# Check your assigned work
bd list --assignee "Luis" --status open

# Review priorities
bd list --priority 0,1 --status open
```

### Start Work
```bash
# View issue details
bd show crm-build-abc

# Claim it atomically
bd update crm-build-abc --claim

# Or claim last viewed issue
bd show crm-build-abc
bd update --claim
```

### During Work
```bash
# Add notes as you discover things
bd update --append-notes "Found dependency on auth module"

# Hit a blocker
bd update --status blocked
bd dep add crm-build-abc blocked-by:crm-build-xyz

# Resume work
bd update --status in_progress
```

### Complete Work
```bash
# Close issue
bd close crm-build-abc --reason "Implemented and tested"

# Close and see what's unblocked
bd close crm-build-abc --suggest-next

# Close multiple completed tasks
bd close crm-build-abc crm-build-def crm-build-ghi
```

### End of Day: Sync
```bash
# Commit issues to git
bd sync

# Check status
bd status
```

## Learning Project Flow

### Create Learning Task
```bash
bd create "Set up authentication with NextAuth" \
  --description "LEARNING GOAL: Understand OAuth flows and session management

TASKS:
1. Install NextAuth.js v5
2. Configure Google OAuth provider
3. Create sign-in page
4. Implement protected routes
5. Test the full flow

CONCEPTS TO EXPLORE:
- JWT vs session-based auth
- OAuth 2.0 flow
- Next.js middleware
- Session storage options

RESOURCES:
- https://next-auth.js.org/getting-started
- https://next-auth.js.org/configuration/providers/oauth

CHECKPOINT: Users can sign in with Google and access protected pages." \
  --priority 2 \
  --type task \
  --estimate 180 \
  --labels "learning,auth,nextjs"
```

### Work Through Learning Task
```bash
# Start
bd update <id> --claim

# Add discoveries
bd update --append-notes "TIL: NextAuth v5 uses different config structure than v4"

# Update estimate as you learn
bd update --estimate 240

# Mark complete
bd close <id> --reason "Completed - auth working, created guide doc"
```

### Create Follow-up Tasks
```bash
# Discovered while learning
bd create "Add email provider to auth" \
  --description "Add email/password auth alongside OAuth" \
  --deps "discovered-from:<original-task-id>" \
  --priority 3
```

## Breaking Down Complex Tasks

### Step 1: Create Parent Task
```bash
PARENT=$(bd create "Build sidebar navigation layout" \
  --description "Create responsive sidebar with navigation for CRM app" \
  --type feature \
  --priority 2 \
  --labels "ui,layout" \
  --silent)

echo "Parent task: $PARENT"
```

### Step 2: Create Subtasks
```bash
bd create "SUBTASK: Install shadcn/ui" \
  --description "PARENT TASK: $PARENT

Install and configure shadcn/ui, add initial components" \
  --parent $PARENT \
  --priority 2

bd create "SUBTASK: Add core UI components" \
  --description "PARENT TASK: $PARENT

Add Button, Card, Avatar, Separator components" \
  --parent $PARENT \
  --priority 2

bd create "SUBTASK: Build sidebar component" \
  --description "PARENT TASK: $PARENT

Create Sidebar.tsx with navigation links" \
  --parent $PARENT \
  --priority 2

bd create "SUBTASK: Integrate into layout" \
  --description "PARENT TASK: $PARENT

Add sidebar to app/layout.tsx" \
  --parent $PARENT \
  --priority 2

bd create "SUBTASK: Style and polish" \
  --description "PARENT TASK: $PARENT

Add icons, colors, hover states, responsive behavior" \
  --parent $PARENT \
  --priority 2
```

### Step 3: View Full Structure
```bash
bd show $PARENT --children
```

### Step 4: Work Through Subtasks
```bash
# Get ready subtasks
bd ready | grep "SUBTASK"

# Work on first one
bd update <subtask-1-id> --claim
# ... do work ...
bd close <subtask-1-id>

# Move to next
bd update <subtask-2-id> --claim
```

## Epic Management

### Create Epic
```bash
EPIC=$(bd create "CRM Contact Management" \
  --type epic \
  --description "Complete contact management system with CRUD operations" \
  --priority 1 \
  --silent)
```

### Add Features to Epic
```bash
# Database schema
bd create "Design contacts table schema" \
  --parent $EPIC \
  --priority 1 \
  --labels "database,schema"

# CRUD operations
bd create "Build contact CRUD operations" \
  --parent $EPIC \
  --deps "blocks:$(bd list --title 'schema' --silent)" \
  --priority 1 \
  --labels "backend,api"

# UI
bd create "Create contacts list page" \
  --parent $EPIC \
  --priority 2 \
  --labels "frontend,ui"

bd create "Create contact form" \
  --parent $EPIC \
  --priority 2 \
  --labels "frontend,forms"
```

### Track Epic Progress
```bash
# View epic with all children
bd show $EPIC --children

# Count completed vs total
bd count --parent $EPIC --status closed
bd count --parent $EPIC
```

## Dependency Management

### Sequential Dependencies
```bash
# Task 1 must complete before Task 2
TASK1=$(bd create "Set up database" --silent)
TASK2=$(bd create "Create tables" --silent)
TASK3=$(bd create "Seed data" --silent)

# Add dependencies
bd dep add $TASK2 blocks:$TASK1
bd dep add $TASK3 blocks:$TASK2

# View what's ready (only TASK1 shows)
bd ready
```

### Parallel Work with Final Integration
```bash
# Create parallel features
AUTH=$(bd create "Implement auth" --silent)
DB=$(bd create "Set up database" --silent)
UI=$(bd create "Build UI components" --silent)

# Create integration task that waits for all
INTEGRATE=$(bd create "Integrate all systems" --silent)

bd dep add $INTEGRATE blocks:$AUTH
bd dep add $INTEGRATE blocks:$DB
bd dep add $INTEGRATE blocks:$UI

# As you complete each, integration unblocks when all done
bd close $AUTH
bd close $DB
bd close $UI

# Now integration is ready
bd ready  # Shows $INTEGRATE
```

## Sprint Planning

### Create Sprint Milestone
```bash
# Create sprint "epic"
SPRINT=$(bd create "Sprint 3 - Feb 10-24" \
  --type epic \
  --due "2026-02-24" \
  --silent)
```

### Add Sprint Tasks
```bash
# Add issues to sprint
bd update crm-build-abc --parent $SPRINT --priority 1
bd update crm-build-def --parent $SPRINT --priority 2
bd update crm-build-ghi --parent $SPRINT --priority 2

# Or create new sprint tasks
bd create "Implement search" --parent $SPRINT --priority 1
```

### Monitor Sprint
```bash
# Sprint overview
bd show $SPRINT --children

# Burndown (remaining work)
bd count --parent $SPRINT --status open,in_progress

# Completed work
bd count --parent $SPRINT --status closed

# At-risk (due soon, not in progress)
bd list --parent $SPRINT --status open --due-before "+3d"
```

## Bug Triage

### Log Incoming Bug
```bash
bd create "Login fails on Safari" \
  --type bug \
  --priority 3 \
  --description "Users report login button doesn't respond on Safari 17" \
  --labels "bug,browser-compat,needs-triage"
```

### Triage Session
```bash
# View untriaged bugs
bd list --type bug --label needs-triage

# Triage each one
bd update <bug-id> --priority 0 --remove-label "needs-triage" --add-label "critical"
bd update <bug-id> --assignee "Alice" --status in_progress
bd update <bug-id> --defer "+1w" --notes "Wait for Safari update"
```

### Track Critical Bugs
```bash
# Critical bugs dashboard
bd list --type bug --priority 0,1 --status open,in_progress

# Bugs blocking release
bd list --type bug --label "blocking-release"
```

## Maintenance & Cleanup

### Find Stale Issues
```bash
# Issues not updated in 30 days
bd stale --days 30

# Review and close or update
bd close <stale-id> --reason "No longer relevant"
bd update <stale-id> --priority 3 --notes "Still relevant, lowering priority"
```

### Find Orphaned Issues
```bash
# Issues referenced in commits but still open
bd orphans

# Review and close completed ones
bd close <orphan-id>
```

### Resolve Duplicates
```bash
# Find similar issues
bd find-duplicates

# Mark as duplicate
bd duplicate <duplicate-id> <original-id>

# Or merge them
bd duplicates --merge
```

## Session Documentation Pattern

### At Session Start
```bash
# Create session marker
SESSION=$(bd create "Session: Implement contact CRUD" \
  --type chore \
  --labels "session" \
  --silent)

# Link work to session
bd update crm-build-abc --external-ref "session:$SESSION"
```

### At Session End
```bash
# Update session with summary
bd update $SESSION --status closed \
  --append-notes "Completed:
- Database schema
- Create/Read operations
- Form validation

Next:
- Update/Delete operations
- Error handling"

# Sync to git
bd sync
```

## Tips for Effective Workflows

1. **Use `--silent`** in scripts to capture IDs
2. **Leverage last-touched** for rapid iteration
3. **Label consistently** for easier filtering
4. **Update notes** as you work (audit trail)
5. **Close with reasons** for future reference
6. **Sync regularly** to keep git updated
7. **Use `bd ready`** to focus on unblocked work
8. **Set estimates** to track time and improve planning
9. **Create guides** for completed learning tasks
10. **Review `bd status`** periodically for health check
