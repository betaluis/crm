# Navigation Setup Guide

**Date:** 2026-02-12  
**Objective:** Set up navigation icons and menu headers for Dashboard, Companies, and Contacts

---

## 📋 Overview

This guide walks through building a complete sidebar navigation system with icons, active states, and routing for your CRM application. You'll create three main navigation items:
- **Dashboard** - Overview/home page with metrics
- **Companies** - Company/organization records  
- **Contacts** - Individual contact/people records

---

## 🎯 Learning Objectives

By completing this guide, you will:
- Understand shadcn's sidebar component composition pattern
- Learn to integrate icon libraries in React components
- Practice Next.js App Router navigation patterns
- Implement active route detection with `usePathname`
- Master the `asChild` prop pattern for component composition
- Build accessible, responsive navigation

---

## 📚 Task Breakdown

### Phase 1: Foundation (Parallel Tasks)

#### Task 1: Choose Icons (`crm-build-1eg`)
**Priority:** P2  
**Status:** Ready to start

**Objective:** Select appropriate icons from `@remixicon/react` for navigation items

**Icon Selection Criteria:**
1. **Visual distinction** - Each icon clearly different at a glance
2. **Semantic meaning** - Icons match user expectations for CRM
3. **Scalability** - Work at different sizes (16px, 20px, 24px)
4. **Consistency** - All icons feel like the same family

**Suggested Icons to Explore:**
- Dashboard: `RiDashboard3Line`, `RiHome5Line`, `RiBarChartBoxLine`
- Companies: `RiBuilding4Line`, `RiBuildingLine`, `RiCommunityLine`
- Contacts: `RiContactsLine`, `RiUser3Line`, `RiTeamLine`, `RiGroupLine`

**Steps:**
1. Browse Remix Icon docs: https://remixicon.com
2. Import 2-3 options for each navigation item into a test component
3. Compare icons side-by-side at different sizes
4. Consider both line and fill variants
5. Document final choices with reasoning

**Checkpoint:**
- ✓ 3 final icon selections documented
- ✓ Clear reasoning for each choice
- ✓ Icons imported and ready to use
- ✓ Visual confirmation icons are distinct

---

#### Task 2: Menu Structure (`crm-build-4lc`)
**Priority:** P2  
**Status:** Ready to start  
**Blocks:** 5 other tasks

**Objective:** Build navigation menu structure using shadcn sidebar components

**Component Hierarchy:**
```
AppSidebar
├─ SidebarHeader (branding area)
├─ SidebarContent
│  └─ SidebarGroup
│     ├─ SidebarGroupLabel (optional: "Navigation")
│     └─ SidebarMenu
│        ├─ SidebarMenuItem (Dashboard)
│        │  └─ SidebarMenuButton
│        ├─ SidebarMenuItem (Companies)
│        │  └─ SidebarMenuButton
│        └─ SidebarMenuItem (Contacts)
│           └─ SidebarMenuButton
└─ SidebarFooter (user profile area)
```

**Key Components:**
- `SidebarGroup` - Groups related navigation items
- `SidebarGroupLabel` - Optional header text for the group
- `SidebarMenu` - Unordered list wrapper (`<ul>`)
- `SidebarMenuItem` - List item wrapper (`<li>`)
- `SidebarMenuButton` - Interactive button with built-in styling

**Steps:**
1. Review sidebar component structure in `components/ui/sidebar.tsx:331-674`
2. Import necessary sidebar components into `AppSidebar.tsx`
3. Add `SidebarGroupLabel` with text like "Navigation" (or omit)
4. Create `SidebarMenu` with three `SidebarMenuItem` children
5. Add `SidebarMenuButton` to each item with placeholder text
6. Test visual layout in browser

**Checkpoint:**
- ✓ Three menu items appear in sidebar
- ✓ Component tree follows proper hierarchy
- ✓ No TypeScript errors
- ✓ Sidebar renders and items are clickable (no functionality yet)

**Reference:** `components/ui/sidebar.tsx:381-468`

---

#### Task 3: Placeholder Pages (`crm-build-94b`)
**Priority:** P2  
**Status:** Ready to start  
**Can be done independently**

**Objective:** Create basic page files for routes to enable navigation testing

**Folder Structure:**
```
app/
├─ dashboard/
│  └─ page.tsx
├─ companies/
│  └─ page.tsx
└─ contacts/
   └─ page.tsx
```

**Minimal Page Template:**
```tsx
export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Dashboard page content goes here</p>
    </div>
  )
}
```

**Steps:**
1. Create `app/dashboard` folder and `page.tsx`
2. Create `app/companies` folder and `page.tsx`
3. Create `app/contacts` folder and `page.tsx`
4. Add basic heading and placeholder text to each
5. Test by navigating to `/dashboard`, `/companies`, `/contacts` in browser
6. Verify each route renders its respective page

**Checkpoint:**
- ✓ All three routes accessible in browser
- ✓ Each route shows unique content (heading with page name)
- ✓ No 404 errors when visiting routes
- ✓ Page layout includes sidebar (inherited from root layout)

---

### Phase 2: Make It Functional

#### Task 4: Add Icons (`crm-build-i39`)
**Priority:** P2  
**Depends on:** `crm-build-1eg`, `crm-build-4lc`

**Objective:** Integrate selected Remix icons into navigation menu items

**Component Pattern:**
```tsx
import { RiDashboard3Line } from '@remixicon/react'

<SidebarMenuButton>
  <RiDashboard3Line />
  <span>Dashboard</span>
</SidebarMenuButton>
```

**Key Concepts:**
- Icon components render SVG elements
- `SidebarMenuButton` auto-styles icons: `[&>svg]:size-4` = 16px
- Icons should be first child for proper layout
- Sidebar handles icon sizing in collapsed state automatically

**Steps:**
1. Import your three chosen icons from `@remixicon/react`
2. Add icon as first child of each `SidebarMenuButton`
3. Add `<span>` element after icon with menu item text
4. Test in expanded sidebar state
5. Test in collapsed sidebar state (should show only icon with tooltip)
6. Verify icons are properly sized and aligned

**Checkpoint:**
- ✓ All three menu items show icons in expanded state
- ✓ Icons and text properly aligned
- ✓ Collapsed sidebar shows icons only
- ✓ No layout shifts between expanded/collapsed states
- ✓ Icons visually distinct and properly sized

**Common Pitfalls:**
- Forgetting to wrap text in `<span>` (icons won't align)
- Wrong import path for icons
- Not testing collapsed state

---

#### Task 5: Active Route Highlighting (`crm-build-ew4`)
**Priority:** P2  
**Depends on:** `crm-build-4lc`

**Objective:** Add active state styling based on current route using `usePathname`

**Key Concepts:**
- `usePathname` is a client-side hook (requires `'use client'`)
- `SidebarMenuButton` has `isActive` prop for active states
- Active items get styling: `data-active:bg-sidebar-accent`
- Route matching: `pathname === '/dashboard'` or `pathname.startsWith('/companies')`

**Implementation Pattern:**
```tsx
'use client'

import { usePathname } from 'next/navigation'

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="floating">
      {/* ... */}
      <SidebarMenuButton isActive={pathname === '/dashboard'}>
        {/* ... */}
      </SidebarMenuButton>
    </Sidebar>
  )
}
```

**Why 'use client'?**
- `AppSidebar` needs to be a client component because:
  - Uses `usePathname` (client-side hook)
  - Needs to react to route changes
  - Add `'use client'` directive at very top of file

**Steps:**
1. Add `'use client'` directive to `AppSidebar.tsx` (first line)
2. Import `usePathname` from `'next/navigation'`
3. Call `usePathname()` hook at top of component
4. Add `isActive` prop to each `SidebarMenuButton`
5. Use pathname comparison: `pathname === '/dashboard'`, etc.
6. Test by navigating to different routes

**Checkpoint:**
- ✓ Active menu item visually highlighted
- ✓ Clicking different items changes which is active
- ✓ No TypeScript errors with 'use client'
- ✓ Active state persists on page refresh
- ✓ Only one item active at a time

**Edge Cases:**
- Root path (`/`) - should it activate dashboard?
- Nested routes (`/companies/123`) - use `startsWith`
- Routes that don't match any menu item

---

#### Task 6: Navigation Links (`crm-build-cun`)
**Priority:** P2  
**Depends on:** `crm-build-4lc`

**Objective:** Make menu items clickable using Next.js Link

**Key Concepts:**
- `asChild` prop delegates rendering to child component
- Lets `Link` handle navigation while `SidebarMenuButton` provides styling
- Slot component merges props from both components
- Common pattern in shadcn for composition

**Component Pattern:**
```tsx
import Link from 'next/link'

<SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
  <Link href="/dashboard">
    <RiDashboard3Line />
    <span>Dashboard</span>
  </Link>
</SidebarMenuButton>
```

**Why asChild?**
- Without asChild: Nested buttons/links (invalid HTML)
- With asChild: Link replaces button, inheriting all styling
- `SidebarMenuButton` becomes just a style provider

**Steps:**
1. Import `Link` from `'next/link'`
2. Add `asChild` prop to each `SidebarMenuButton`
3. Wrap icon and text in `<Link>` component with `href` prop
4. Set hrefs: `/dashboard`, `/companies`, `/contacts`
5. Test navigation - clicking should change routes
6. Verify active states update when navigating

**Checkpoint:**
- ✓ Clicking menu items navigates to different routes
- ✓ Browser URL changes when clicking items
- ✓ No nested button warnings in console
- ✓ Active state updates on navigation
- ✓ Back/forward browser buttons work

**Common Pitfalls:**
- Forgetting `asChild` prop (creates nested buttons)
- Wrong Link import (`next/router` vs `next/link`)
- Not wrapping all content in Link

---

### Phase 3: Polish (Optional)

#### Task 7: Group Label (`crm-build-tt0`)
**Priority:** P3 (Optional)  
**Depends on:** `crm-build-4lc`

**Objective:** Add `SidebarGroupLabel` to provide context for navigation

**Pattern:**
```tsx
<SidebarGroup>
  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
  <SidebarMenu>
    {/* menu items */}
  </SidebarMenu>
</SidebarGroup>
```

**Design Decision:**
Should you use a label?
- **YES:** If you'll have multiple groups later (Settings, Admin, etc.)
- **NO:** If navigation is obvious and you prefer minimal design

**Steps:**
1. Import `SidebarGroupLabel` if not already imported
2. Add as first child of `SidebarGroup`
3. Try different label text: "Navigation", "Main", or omit
4. Test in expanded state - does it help or add noise?
5. Test in collapsed state - it should disappear
6. Make a decision: keep it or remove it

**Note:** This is optional polish. Skip if you prefer cleaner look.

---

#### Task 8: Branding/Logo (`crm-build-x4a`)
**Priority:** P3 (Optional)  
**Depends on:** `crm-build-4lc`

**Objective:** Add CRM application branding to `SidebarHeader`

**Design Options:**
1. Text only: "CRM" or "My CRM"
2. Logo + text: Icon with app name
3. Minimal: Just initials "CM" or an icon
4. Collapsed state: Just icon or initials

**Suggested Pattern:**
```tsx
<SidebarHeader>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" asChild>
        <Link href="/">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xl font-bold">C</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">My CRM</span>
            <span className="truncate text-xs">Business Management</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarHeader>
```

**Steps:**
1. Decide on your CRM app name
2. Import components if needed
3. Add content to `SidebarHeader`
4. Choose between text-only, logo, or icon approach
5. Test in expanded state
6. Test in collapsed state
7. Consider adding Link to `/` for home navigation

**Note:** This is polish. Use simple text placeholder and enhance later.

---

#### Task 9: Test & Polish (`crm-build-np8`)
**Priority:** P3  
**Depends on:** `crm-build-i39`, `crm-build-ew4`, `crm-build-cun`, `crm-build-94b`

**Objective:** Test complete navigation experience and make final adjustments

**Test Scenarios:**
1. Desktop experience (1920px width)
2. Tablet experience (768px width)
3. Mobile experience (375px width)
4. Keyboard navigation (Tab, Enter, Cmd+B)
5. Active state accuracy
6. Collapsed sidebar usability
7. Mobile sheet behavior

**Test Checklist:**
- [ ] Click each menu item - navigates to correct page
- [ ] Active state highlights current page
- [ ] Collapsed sidebar shows icons with tooltips
- [ ] Mobile view shows sidebar in sheet/drawer
- [ ] Keyboard shortcut (Cmd/Ctrl+B) toggles sidebar
- [ ] No layout shift between expanded/collapsed
- [ ] Smooth transitions and animations
- [ ] Tooltips appear in collapsed state
- [ ] Back/forward browser navigation works
- [ ] Direct URL entry shows correct active state

**Polish Opportunities:**
- Adjust spacing between menu items
- Fine-tune active state colors
- Improve transition timing
- Add subtle hover effects
- Ensure tooltip positioning
- Verify accessibility (screen reader friendly)

**Common Issues:**
- Tooltips not showing in collapsed state
- Active state not updating on direct navigation
- Mobile sidebar not closing after selection
- Icons not aligned properly
- Text truncation issues

**Checkpoint:**
- ✓ All navigation works smoothly across devices
- ✓ No visual glitches or layout issues
- ✓ Active states always accurate
- ✓ Mobile experience smooth
- ✓ Happy with look and feel
- ✓ Fresh user could navigate intuitively

---

## 🗺️ Task Dependencies

```
START
  ├─→ [1eg] Choose Icons ──────────┐
  ├─→ [4lc] Menu Structure ────────┼─→ [i39] Add Icons ─────┐
  │         │                       │                         │
  │         ├──→ [ew4] Active States ──────────────────────┤
  │         │                                                │
  │         ├──→ [cun] Add Links ───────────────────────────┤
  │         │                                                │
  │         ├──→ [tt0] Group Label (optional)               │
  │         │                                                │
  │         └──→ [x4a] Header Branding (optional)           │
  │                                                          │
  └─→ [94b] Create Pages ──────────────────────────────────┤
                                                             │
                                                             ▼
                                                 [np8] Test & Polish
```

---

## 🚀 Recommended Starting Order

1. **crm-build-94b** - Create placeholder pages (5 min)
   - Gives you routes to test immediately

2. **crm-build-1eg** - Choose icons (10 min)
   - Quick research and documentation task

3. **crm-build-4lc** - Build menu structure (15 min)
   - Core implementation that unblocks most tasks

4. **crm-build-i39** - Add icons to menu (10 min)
   - Visual enhancement

5. **crm-build-ew4** - Active route highlighting (15 min)
   - Important UX feature

6. **crm-build-cun** - Navigation links (10 min)
   - Makes navigation functional

7. **crm-build-tt0** & **crm-build-x4a** - Polish (optional)
   - Add if desired

8. **crm-build-np8** - Test everything (20 min)
   - Final validation

**Total Time:** ~1.5-2 hours for core features

---

## 📦 What You Already Have

- ✅ Sidebar component installed (`components/ui/sidebar.tsx`)
- ✅ AppSidebar skeleton created (`components/AppSidebar.tsx`)
- ✅ Layout integration done (`app/layout.tsx`)
- ✅ Remix Icon library installed (`@remixicon/react`)
- ✅ All shadcn components available

---

## 🔗 Resources

### Documentation
- **Remix Icon:** https://remixicon.com
- **shadcn Sidebar:** https://ui.shadcn.com/docs/components/sidebar
- **Next.js Routing:** https://nextjs.org/docs/app/building-your-application/routing
- **Next.js usePathname:** https://nextjs.org/docs/app/api-reference/functions/use-pathname
- **Next.js Link:** https://nextjs.org/docs/app/api-reference/components/link
- **Radix Slot (asChild):** https://www.radix-ui.com/primitives/docs/utilities/slot

### Local Files
- `components/ui/sidebar.tsx` - Sidebar component reference
- `app/layout.tsx` - Root layout with sidebar integration
- `docs/sessions/2026-02-09-sidebar-layout-foundation.md` - Previous session notes

---

## 💡 Key Concepts to Master

### Component Composition
- How shadcn components nest and work together
- Proper hierarchy: Group → Menu → MenuItem → MenuButton

### Icon Integration
- Using React icon component libraries
- Automatic sizing with Tailwind classes
- Responsive behavior in collapsed state

### Route Detection
- Client-side hooks in Next.js App Router
- When to use 'use client' directive
- Pathname matching strategies

### asChild Pattern
- Radix UI's Slot component
- Composing components without nesting
- Delegating rendering to children

### Responsive Design
- Desktop, tablet, mobile breakpoints
- Collapsed sidebar states
- Mobile drawer/sheet behavior

---

## ✅ Success Criteria

You'll know you've succeeded when:
- ✓ Three navigation items (Dashboard, Companies, Contacts) are visible
- ✓ Each has a distinct, appropriate icon
- ✓ Clicking navigates to the correct page
- ✓ Current page is visually highlighted
- ✓ Works on desktop, tablet, and mobile
- ✓ Collapsed sidebar shows icons with tooltips
- ✓ Navigation feels smooth and intuitive

---

## 🎯 Next Steps After Completion

Once navigation is complete, you'll be ready to:
1. Build out the Dashboard page with metrics
2. Create Companies data table and CRUD
3. Create Contacts data table and CRUD
4. Add more navigation sections (Settings, Reports, etc.)
5. Implement user profile in SidebarFooter

Good luck! Remember, I'm here to guide you through each step. You'll be writing the code yourself and learning as you go.
