# Canonical Ruleset of MagnetarArachne

These rules codify the Magnetar standard for this project. The entire project must comply with these rules unless a formal exception is documented in `BITACORA.md`.

## 📌 Naming Conventions

All naming must conform to the following standards to ensure consistency and parsing:

*   **Repositories:** `magnetar-<domain>-<descriptor>`
*   **Branches:** `<type>/<short-description>`, where `type` is one of:
    *   `feature`
    *   `fix`
    *   `chore`
    *   `experiment`
    *   `hotfix`
*   **Tasks and Blockers:** Must use `kebab-case` (e.g., `task-202`, `blocker-db-outage`).
*   **YAML Keys:** Must use `lower_snake_case`.
*   **File Names:** Must exactly mirror those outlined in the canonical repository.

## 📄 Required Files

The following files **must** be present in every Magnetar project. Any omission requires an explicit exemption logged in `BITACORA.md`.

*   `README.md`
*   `PLAN.md`
*   `BITACORA.md`
*   `REQUIREMENTS.md`
*   `ARCHITECTURE.md`
*   `RULES.md`
*   `STATUS.md`
*   `TESTING.md`
*   `BLOCKERS.md`
*   `BRANCHING_MODEL.md`
*   `WIP_GUIDELINES.md`
*   `CONTRIBUTING.md`
*   `projects/<project>.project.yml`

## 🌿 Branching Conventions

*   **`master`:** The immutable release line. Merges require successful Continuous Integration (CI) and updated documentation.
*   **`develop` (optional):** Aggregates completed features before stabilization.
*   **`feature` branches:** Originate from `master` or `develop`. They must be rebased before merging.
*   **`hotfix` branches:** Start directly from `master`. They must trigger a `STATUS.md` update upon completion.
*   **Pull Requests:** Each PR must reference the tasks it affects and include the corresponding entries in `BITACORA.md`.

## 🚥 Allowed Task States

The lifecycle of any task is strictly limited to the following states:

1.  `planned`: Defined but not ready to be worked on.
2.  `ready`: Defined, scoped, and ready to be started.
3.  `in_progress`: Actively being worked on (when work begins, transition `ready` → `in_progress`).
4.  `in_review`: Development is complete, awaiting peer or CI review.
5.  `blocked`: Progress is halted due to an external dependency or impediment.
6.  `done`: Merged, documented, and fully complete.

## 🚧 Work-In-Progress (WIP) Constraints

*   **WIP Limit:** An individual developer or AI agent can have a maximum of **two (2)** `in_progress` tasks simultaneously.
*   **Exceptions:** Exceeding this limit requires explicit approval, which must be documented in `WIP_GUIDELINES.md` and recorded in `BITACORA.md`.

## 🚫 Blocker Lifecycle

When an impediment stops progress, the following numbered process must be followed:

1.  **Discovery:** Log the blocker in `BLOCKERS.md` immediately with an ID, description, severity, owner, and timestamp.
2.  **Assessment:** Update project risks in `STATUS.md` and note mitigation ideas in `BITACORA.md`.
3.  **Escalation:** If the blocker is not resolved within one (1) business day, it must be escalated to the project lead.
4.  **Resolution:** Once solved, document the exact solution steps in `BITACORA.md` and update the blocker status in `BLOCKERS.md` to `resolved`.
5.  **Retrospective:** Capture lessons learned in the corresponding documentation.

## 📝 Documentation Discipline

*   `BITACORA.md`: Must chronologically record every state change, decision, or exception made in the project.
*   `STATUS.md`: Must be updated at least once per day or immediately after each PR merge.
*   `PLAN.md`: Is the singular source of truth for all milestones and task assignments.

## 🤖 AI Agent Responsibilities

AI agents acting as collaborators have strict operational constraints:
*   Parse the project YAML file before taking any action.
*   Do not open Pull Requests without confirming that the task state has advanced to `in_review`.
*   When uncertain, strictly document assumptions in `BITACORA.md`.

## 🛡️ Compliance and Enforcement

*   Continuous Integration (CI) pipelines should validate the presence and correct structure of all required canonical files.
*   Periodic audits will be conducted to ensure `BITACORA.md` is updated and rules are being followed.
