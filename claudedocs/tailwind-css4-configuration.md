# Tailwind CSS 4 Configuration Guide

## Overview

This document describes the proper configuration of Tailwind CSS 4 in this portfolio project.

## Root Cause of Previous Issues

The styling issues were caused by missing `@source` directive in `app/globals.css`. Tailwind CSS 4 uses `@source` to specify which directories contain components using Tailwind classes. Without this directive, components in the `components/` directory were not being scanned.

## Proper Configuration

### `app/globals.css`

```css
@import "tailwindcss";

/*
 * Tailwind CSS 4 Source Configuration
 * All directories containing components with Tailwind classes must be listed here.
 * Paths are relative to this CSS file (app/globals.css).
 */
@source "../components/**/*.tsx";
@source "../src/design-patterns/**/*.tsx";
@source "../lib/**/*.ts";
```

### Key Points

1. **`@source` Directive**: Required for Tailwind CSS 4 to scan custom directories
2. **Path Resolution**: Paths are relative to the CSS file location (not project root)
3. **Glob Patterns**: Use `**/*.tsx` to include all nested files

## Directory Structure

```
portfolio/
├── app/
│   └── globals.css          # Main CSS with @source directives
├── components/
│   ├── layout/              # Header, Footer
│   ├── sections/            # Hero, Services, Works, Profile, Contact
│   └── ui/                  # Container, Section, Button, Card, etc.
├── lib/
│   └── animations.ts        # Animation variants
└── src/
    └── design-patterns/     # Design pattern components
```

## Best Practices

### DO ✅

- Use Tailwind utility classes for styling
- Add CSS Variables via `var(--color-name)` syntax in arbitrary values
- Define complex patterns (like grid overlays) as utility classes in `globals.css`
- Keep design tokens in CSS variables in `:root`

### DON'T ❌

- Use inline `style={{}}` attributes (prohibited as per project standards)
- Bypass the design system with hardcoded values
- Create component-specific CSS files (use Tailwind instead)

## CSS Variable Integration

Tailwind CSS 4 works seamlessly with CSS variables:

```tsx
// Using CSS variables in Tailwind classes
<div className="bg-[var(--color-surface)] text-[var(--color-text-primary)]" />
<div className="border-[var(--color-accent-cyan)] shadow-[var(--glow-cyan)]" />
```

## Custom Utility Classes

For complex patterns that can't be expressed with Tailwind utilities, add classes to `globals.css`:

```css
/* Grid overlay for brutalist aesthetic */
.grid-overlay {
  background-image:
    linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

## Verification

After making changes:

1. Run `npm run build` to verify Tailwind compilation
2. Check for TypeScript errors
3. Visually verify all sections render correctly

## References

- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- Context7 research on `@source` directive syntax
