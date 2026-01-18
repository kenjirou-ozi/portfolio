# Codebase Cleanup & Maintenance

## Critical Principles (Must Follow)

### Boy Scout Rule
> "Leave the codebase better than you found it."

After this cleanup, the codebase must be:
- Clean and readable
- Free of dead code
- Free of legacy patterns
- Easy to maintain and extend
- Well-organized and consistent

### Broken Window Theory
> "One broken window, left unrepaired, leads to more broken windows."

Every piece of dead code, every unused import, every commented-out block is a "broken window" that invites more mess. We will leave NO broken windows.

### Work Carefully and Thoroughly

- Do NOT rush through this process
- Verify each deletion before making it
- When in doubt, keep the code and flag it for review
- Document every significant change

---

## Phase 0: Backup (Mandatory - Do This First)

**Before making ANY changes, create a complete backup.**

### Step 0.1: Create Backup Directory

```bash
# Create timestamped backup
BACKUP_DIR="../portfolio-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Copy entire project (excluding node_modules and .next)
rsync -av --exclude='node_modules' --exclude='.next' --exclude='.git' ./ "$BACKUP_DIR/"

# Verify backup
echo "Backup created at: $BACKUP_DIR"
ls -la "$BACKUP_DIR"
```

### Step 0.2: Verify Backup Integrity

```bash
# Count files in original vs backup
echo "Original file count:"
find . -type f -not -path './node_modules/*' -not -path './.next/*' -not -path './.git/*' | wc -l

echo "Backup file count:"
find "$BACKUP_DIR" -type f | wc -l
```

### Step 0.3: Git Commit Current State (If Not Already)

```bash
# Ensure current state is committed
git status
git add -A
git commit -m "checkpoint: before codebase cleanup"
```

**Halt Condition**: Do NOT proceed until backup is verified.

---

## Phase 1: Comprehensive Audit

### Step 1.1: Dead Code Detection

#### Unused Imports

```bash
# Find potentially unused imports in TypeScript/React files
# This requires manual verification
echo "=== Checking for unused imports ==="
for file in $(find src -name "*.tsx" -o -name "*.ts"); do
  echo "Checking: $file"
  # List imports and check if they're used in the file
done
```

#### Unused Components

```bash
# Find component files
echo "=== Component Files ==="
find src -name "*.tsx" -type f | sort

# Search for usage of each component
# Components not imported anywhere may be dead code
```

#### Unused Functions and Variables

```bash
# Search for exported functions/variables and check usage
echo "=== Exported but potentially unused ==="
grep -rn "export const\|export function\|export default" src/ --include="*.ts" --include="*.tsx"
```

### Step 1.2: Legacy Code Detection

#### Old Patterns No Longer Used

```bash
# Check for Pages Router patterns in App Router project
echo "=== Checking for Pages Router patterns ==="
grep -rn "getServerSideProps\|getStaticProps\|getStaticPaths" src/ --include="*.tsx"

# Check for old React patterns
echo "=== Checking for class components ==="
grep -rn "extends React.Component\|extends Component" src/ --include="*.tsx"

# Check for deprecated lifecycle methods
echo "=== Checking for deprecated patterns ==="
grep -rn "componentWillMount\|componentWillReceiveProps\|componentWillUpdate" src/ --include="*.tsx"
```

#### Outdated Dependencies Usage

```bash
# Check for patterns that might indicate outdated usage
echo "=== Checking for potentially outdated patterns ==="
grep -rn "useRouter.*from 'next/router'" src/ --include="*.tsx"  # Should be next/navigation in App Router
```

### Step 1.3: Conflicting Code Detection

#### Duplicate Implementations

```bash
# Find files with similar names that might be duplicates
echo "=== Checking for potential duplicates ==="
find src -name "*.tsx" -type f | xargs basename -a | sort | uniq -d

# Check for multiple implementations of same concept
echo "=== Multiple component definitions ==="
grep -rn "const Hero\|function Hero\|export.*Hero" src/ --include="*.tsx"
grep -rn "const Services\|function Services\|export.*Services" src/ --include="*.tsx"
```

#### Conflicting Styles

```bash
# Check for multiple style definitions
echo "=== Style file locations ==="
find src -name "*.css" -type f

# Check for conflicting global styles
echo "=== Global style definitions ==="
grep -rn ":root\|html\|body" src/ --include="*.css"
```

### Step 1.4: Workaround and Temporary Code Detection

```bash
# Find inline styles (potential workarounds)
echo "=== Inline styles ==="
grep -rn "style={{" src/ --include="*.tsx"

# Find TODO/FIXME/HACK comments
echo "=== TODO/FIXME/HACK comments ==="
grep -rn "TODO\|FIXME\|HACK\|XXX\|TEMP\|TEMPORARY" src/ --include="*.ts" --include="*.tsx" --include="*.css"

# Find commented-out code blocks
echo "=== Large comment blocks (potential dead code) ==="
grep -rn "^[[:space:]]*//" src/ --include="*.tsx" | head -50

# Find hardcoded values that should be tokens
echo "=== Hardcoded color values ==="
grep -rn "#[0-9A-Fa-f]\{6\}\|#[0-9A-Fa-f]\{3\}" src/ --include="*.tsx"
```

### Step 1.5: Unused Files Detection

```bash
# List all component/section files
echo "=== All TSX files ==="
find src -name "*.tsx" -type f | sort

# Check if each file is imported somewhere
# Files not imported anywhere are candidates for deletion
```

### Step 1.6: Create Audit Report

After running all checks, create a report:

```markdown
## Audit Report

### Dead Code Found
| File | Type | Description | Action |
|------|------|-------------|--------|
| ... | unused import | ... | DELETE |
| ... | unused component | ... | DELETE |

### Legacy Code Found
| File | Pattern | Description | Action |
|------|---------|-------------|--------|
| ... | ... | ... | ... |

### Conflicting Code Found
| Files | Conflict Type | Description | Action |
|-------|---------------|-------------|--------|
| ... | ... | ... | ... |

### Workarounds Found
| File | Line | Type | Action |
|------|------|------|--------|
| ... | ... | inline style | CONVERT/DELETE |

### Unused Files Found
| File | Reason | Action |
|------|--------|--------|
| ... | not imported | DELETE |
```

---

## Phase 2: Systematic Cleanup

**Work through ONE category at a time. Verify after each category.**

### Step 2.1: Remove Unused Imports

For each file with unused imports:
1. Open the file
2. Remove unused import statements
3. Save the file
4. Verify no errors

```bash
# After cleanup, verify no import errors
npm run build 2>&1 | grep -i "import\|module"
```

### Step 2.2: Remove Dead Components/Files

For each unused file identified:
1. Verify it's truly not used (search for imports)
2. Delete the file
3. Verify build still works

```bash
# Before deleting, confirm no references
grep -rn "ComponentName" src/ --include="*.tsx" --include="*.ts"

# After deletion, verify build
npm run build
```

### Step 2.3: Remove Legacy Patterns

For each legacy pattern found:
1. Understand what it was trying to do
2. Implement the modern equivalent (if needed)
3. Remove the legacy code
4. Verify functionality

### Step 2.4: Resolve Conflicts

For each conflict found:
1. Determine which implementation is correct/current
2. Remove the duplicate/obsolete version
3. Update any references
4. Verify functionality

### Step 2.5: Remove Workarounds

For each workaround (inline style, hardcoded value, etc.):
1. Understand what it was working around
2. Verify the root cause is now fixed
3. Convert to proper implementation or remove
4. Verify styling/functionality still works

### Step 2.6: Clean Up Comments

```bash
# Remove commented-out code blocks (not documentation comments)
# Be careful to preserve intentional documentation
```

For each large commented block:
1. Determine if it's documentation or dead code
2. If dead code → delete
3. If outdated documentation → update or delete
4. If valid documentation → keep

---

## Phase 3: Organization & Consistency

### Step 3.1: File Organization

Ensure consistent directory structure:

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── studio/             # Sanity Studio
├── components/             # Reusable UI components
│   ├── ui/                 # Basic UI elements (Button, Card, etc.)
│   └── sections/           # Page sections (Hero, Services, etc.)
├── sanity/                 # Sanity configuration
│   ├── schemas/            # Content schemas
│   └── lib/                # Sanity client utilities
├── lib/                    # Utility functions
└── types/                  # TypeScript type definitions
```

### Step 3.2: Naming Consistency

Verify consistent naming conventions:
- Components: PascalCase (e.g., `ServiceCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- CSS files: kebab-case or match component (e.g., `globals.css`)
- Schemas: camelCase (e.g., `siteSettings.ts`)

### Step 3.3: Import Order Consistency

Establish and apply consistent import order:
1. React/Next.js imports
2. Third-party library imports
3. Local component imports
4. Local utility imports
5. Type imports
6. Style imports

---

## Phase 4: Verification

### Step 4.1: Build Verification

```bash
# Clean build
rm -rf .next
npm run build

# Check for any errors or warnings
```

### Step 4.2: Runtime Verification

```bash
# Start dev server
npm run dev

# Verify all pages work:
# - http://localhost:3000 (home page)
# - http://localhost:3000/studio (Sanity Studio)
```

### Step 4.3: Visual Verification

Check each section still displays correctly:
- [ ] Hero section
- [ ] Services section
- [ ] Works section
- [ ] Profile section
- [ ] Contact section

### Step 4.4: Functionality Verification

- [ ] Navigation works
- [ ] Animations work
- [ ] Responsive design works
- [ ] Sanity data loads correctly

---

## Final Checklist (Mandatory Before Completion)

### Dead Code Elimination
- [ ] No unused imports remain
- [ ] No unused components remain
- [ ] No unused functions remain
- [ ] No unused variables remain
- [ ] No unused files remain

### Legacy Code Elimination
- [ ] No Pages Router patterns in App Router project
- [ ] No class components (unless intentional)
- [ ] No deprecated lifecycle methods
- [ ] No outdated library usage patterns

### Conflict Resolution
- [ ] No duplicate component implementations
- [ ] No conflicting style definitions
- [ ] No competing functionality

### Workaround Elimination
- [ ] No inline styles (except truly necessary cases)
- [ ] No hardcoded values that should be tokens
- [ ] No TODO/FIXME left unaddressed
- [ ] No commented-out code blocks

### Code Quality
- [ ] Consistent file organization
- [ ] Consistent naming conventions
- [ ] Consistent import order
- [ ] Clean, readable code

### Verification
- [ ] Build succeeds without errors
- [ ] All pages render correctly
- [ ] All functionality works
- [ ] Backup exists and is verified

---

## Deliverables

1. **Audit Report**: Complete list of what was found
2. **Cleanup Log**: What was removed/changed and why
3. **Before/After File Count**: Evidence of cleanup
4. **Verification Results**: Proof everything still works
5. **Backup Location**: Path to backup directory

---

## Important Reminders

- **Backup FIRST** - Do not skip Phase 0
- **Verify each deletion** - Don't delete blindly
- **One category at a time** - Don't rush
- **Build after major changes** - Catch errors early
- **When in doubt, keep it** - Flag for review instead of deleting
- **Document everything** - Future you will thank you

This is about leaving the codebase BETTER, not just smaller. Quality over quantity.
