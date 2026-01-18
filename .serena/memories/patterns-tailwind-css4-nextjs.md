# Pattern: Tailwind CSS 4 + Next.js Integration

## Font Configuration Best Practice

### ❌ Wrong: Circular CSS Variable Reference
```css
@theme inline {
  --font-orbitron: var(--font-orbitron);  /* Circular - doesn't work */
}
```

### ✅ Correct: Direct Font Stack Definition
```css
@theme {
  --font-sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
  --font-orbitron: "Orbitron", ui-sans-serif, system-ui, sans-serif;
}
```

## CSS Reset Compatibility

### ❌ Wrong: Global Reset Overrides Utilities
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
This overrides Tailwind utilities like `mx-auto`, `px-6`, etc.

### ✅ Correct: Let Tailwind Handle Reset
Tailwind CSS 4 includes Preflight which handles CSS normalization.
Remove any custom `* {}` resets that conflict with utility classes.

## @source Directive Configuration

### Complete Source Configuration
```css
@import "tailwindcss";

@source "../components/**/*.tsx";
@source "../app/**/*.tsx";
@source "../lib/**/*.ts";
```

Key points:
- Paths are relative to the CSS file location
- Include ALL directories containing Tailwind classes
- Use glob patterns for recursive matching

## Debugging Checklist

1. **Check computed styles in DevTools**
   - Are utility classes present in className?
   - What are the actual computed values?

2. **Verify CSS variables**
   ```javascript
   getComputedStyle(document.documentElement).getPropertyValue('--font-orbitron')
   ```
   - Empty string = variable not defined or scoped incorrectly

3. **Check for conflicting resets**
   - Search for `* {` in CSS files
   - Look for `margin: 0` or `padding: 0` global rules

4. **Verify @source coverage**
   - All component directories included?
   - Paths relative to CSS file?

5. **Clear cache and rebuild**
   ```bash
   rm -rf .next && npm run build
   ```

## Reference
- Context7: Tailwind CSS 4 Documentation
- Next.js 16+ Google Fonts Integration
