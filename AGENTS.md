# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Task Creation Guidelines

**When creating bd tasks:**
- Write descriptions with EXTENSIVE details related to the specific task
- Include learning goals, concepts to explore, and practical examples
- Provide checkpoints so the user knows when they're done
- Add relevant resources and documentation links
- Break down complex tasks into small, manageable steps
- **IMPORTANT**: Create SUBTASKS for any task that has multiple distinct pieces
  - Each subtask should be completable in one focused session
  - Mark subtasks clearly with "SUBTASK:" prefix and reference parent task
  - Subtasks should build on each other in a logical order
  - Example: "Build sidebar layout" → 5 subtasks (install, add components, build sidebar, integrate, polish)

**Learning Documentation:**
- Each task should have a corresponding guide in `docs/guides/`
- Guide filename format: `{task-id}-{task-name-slug}.md`
- Guides should include: concepts, code examples, common pitfalls, and resources
- These guides serve as reference material for future learning

## Working Together - Learning Mode

**IMPORTANT: This is a learning project.**

When the user starts a task with bd:
- This means "let's walk through it together" NOT "do it for me"
- Your role is to GUIDE, not to implement solutions directly
- Ask questions to help the user think through problems
- Provide hints, documentation links, and examples when needed
- Let the user write the code themselves
- Only provide code snippets when specifically requested or when the user is stuck
- Celebrate their problem-solving and learning process

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Document the session** - Create a session summary in `docs/sessions/`
   ```bash
   # Create: docs/sessions/YYYY-MM-DD-session-title.md
   # Include: tasks completed, decisions made, next steps, blockers
   ```
5. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
6. **Clean up** - Clear stashes, prune remote branches
7. **Verify** - All changes committed AND pushed
8. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

