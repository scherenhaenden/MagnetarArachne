# Branching Model of MagnetarArachne

The project utilizes a disciplined approach to Git branching based on a simplified GitFlow model. Strict adherence is necessary to maintain the canonical structure.

## 🔀 Branch Types

### 1. `master` Branch
*   **Purpose:** The immutable release line representing the production-ready state of the platform.
*   **Rules:**
    *   Direct commits are forbidden.
    *   All merges into `master` must occur via Pull Requests.
    *   CI pipelines must pass (tests, linting, build) before merging.
    *   `BITACORA.md`, `PLAN.md`, and `STATUS.md` must be up to date before a merge.

### 2. `develop` Branch (Optional)
*   **Purpose:** Aggregates completed features before stabilization and release.
*   **Rules:** Only merges from `feature` and `fix` branches are allowed.

### 3. `feature/` Branches
*   **Purpose:** Used for developing new features for upcoming releases.
*   **Origin:** Must originate from `master` or `develop`.
*   **Naming:** `feature/<short-description>` (e.g., `feature/visual-node-editor`).
*   **Rules:**
    *   Must be rebased onto `master` (or `develop`) before merging.
    *   Must reference an explicit task ID from `PLAN.md` in PR descriptions.

### 4. `fix/` Branches
*   **Purpose:** Used to resolve non-critical bugs found outside of production.
*   **Naming:** `fix/<short-description>` (e.g., `fix/json-path-parser`).

### 5. `hotfix/` Branches
*   **Purpose:** Immediate fixes for critical production issues.
*   **Origin:** Must originate from `master`.
*   **Naming:** `hotfix/<short-description>` (e.g., `hotfix/tauri-build-crash`).
*   **Rules:** Must trigger a `STATUS.md` update and an immediate log entry in `BITACORA.md`.

### 6. `chore/` Branches
*   **Purpose:** Routine tasks, documentation updates, or tooling changes that do not modify application code.

## 🔄 Merging Strategy
*   We prefer **Squash and Merge** for feature and fix branches to keep the `master` history clean and linear.
*   Merge commit messages must clearly describe the changes and reference the corresponding task ID (e.g., "Merge task-105: Update visual node editor layout").