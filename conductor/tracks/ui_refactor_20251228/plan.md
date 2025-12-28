# Plan: UI Refactoring & Component Library

**Goal**: Establish a unified UI component library by migrating legacy "base" components, enforcing a consistent design system (Dify-like), and normalizing Tailwind CSS usage.

**Strategy**: "Copy & Adapt". We will leverage the extensive component set in `easyquant_old_code/client/src/components/base`, adapting them to the new frontend structure (Vite + React + Tailwind v4).

## Phase 1: Infrastructure & Core Setup
- [ ] **Fix Tailwind v4 Config**: Ensure `postcss.config.js` and `index.css` are correctly set up for Tailwind v4. Verify `@import "tailwindcss";` usage if necessary.
- [ ] **Setup Directory Structure**: Create `frontend/src/components/ui/` for atomic components.
- [ ] **Theme Variables**: Ensure all CSS variables used by legacy components (in `dify-theme.css` or `index.css`) are present in the new `index.css`.

## Phase 2: Essential Component Migration (The "Base" Kit)
Migrate the following components from `easyquant_old_code/client/src/components/base` to `frontend/src/components/ui`.
*Note: Convert to TypeScript if they are in JS/JSX, and ensure imports (like `classnames` or `clsx`) are handled.*

- [ ] **Button**: `components/base/button`
- [ ] **Input**: `components/base/input`
- [ ] **Select**: `components/base/select` (Crucial for dropdowns)
- [ ] **Modal**: `components/base/modal`
- [ ] **Toast/Notification**: `components/base/toast`
- [ ] **Tooltip**: `components/base/tooltip`
- [ ] **Card/Container**: Create a standard `Card` component (might need to extract from common patterns if no dedicated `base/card` exists, though `components/ui` might have it).
- [ ] **Spinner/Loading**: `components/base/spinner` or `loading`.

## Phase 3: Advanced/Compound Component Migration
- [ ] **DataTable**: Refactor the new `DataTable` page to use the migrated `Table` (if available) or `Grid` components.
- [ ] **Forms**: Standardize form layouts using `Input`, `Select`, `Checkbox`.

## Phase 4: Refactoring & Cleanup
- [ ] **Replace Hardcoded UI**: Scan `frontend/src/` for raw HTML elements (like `<button className="...">`) and replace them with `<Button ...>`.
- [ ] **Remove Redundant CSS**: Clean up any ad-hoc CSS in `index.css` that is superseded by the component library.

## Phase 5: Documentation (Optional but recommended)
- [ ] Create a simple "Playground" page (`/ui-test`) to display all available components for visual verification.
