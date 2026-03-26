# Testing Strategy for MagnetarArachne

This document defines the comprehensive testing strategy for the platform to ensure code quality and prevent regressions in both the desktop UI and the underlying local execution engine.

## 🧪 Types of Tests

We rely on a multi-tiered approach to testing within our Nx Monorepo.

### 1. Unit Tests (Jest)
*   **Purpose:** To verify individual functions, components, or services in isolation.
*   **Scope:** All business logic, JSON-Path parsers, package manifest validators, and utility functions in `libs/` and `tools/runner`.
*   **Tooling:** `Jest` (configured via Nx).

### 2. Integration Tests
*   **Purpose:** To verify that different modules work correctly together, particularly the Node.js runner orchestrating child processes (Python/TS packages).
*   **Scope:** The interaction between the CLI runner and a suite of "mock" packages (testing topological sorting and file-first I/O).

### 3. End-to-End (E2E) Tests (Playwright)
*   **Purpose:** To simulate real user scenarios on the visual canvas.
*   **Scope:** Loading flows, dragging and connecting nodes, filling out forms, and initiating a run.
*   **Tooling:** `Playwright` (configured via Nx) against the compiled Angular application.

## 📊 Code Coverage Targets

All new code submitted via Pull Requests must meet the following minimum coverage thresholds:

*   **Statements:** 80%
*   **Branches:** 75%
*   **Functions:** 80%
*   **Lines:** 80%

Coverage reports are generated automatically during the CI process. PRs that drop overall coverage below these thresholds will be blocked from merging.

## 🐞 Bug Reporting Process

If a bug is discovered, it must be reported and tracked according to the following process:

1.  **Verification:** Confirm the bug is reproducible and not an expected behavior based on `REQUIREMENTS.md`.
2.  **Creation:** Open an issue (or task in `PLAN.md` with a `fix` label) detailing:
    *   **Description:** A clear, concise summary of the issue.
    *   **Reproduction Steps:** Step-by-step instructions.
    *   **Expected Behavior:** What should happen.
    *   **Actual Behavior:** What actually happens.
    *   **Environment:** OS, Node.js version, package runtime version.
3.  **Triage:** The engineering team will review, assess severity, and move the task to `planned` or `ready`.
4.  **Resolution:** A developer/agent fixes the issue, includes a test preventing future regression, and submits a PR. The log must be updated in `BITACORA.md`.