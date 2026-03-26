# Blockers for MagnetarArachne

This document tracks and manages all significant impediments hindering the project's progress. As per `RULES.md`, any active blocker here will automatically halt progress on its associated task.

## 🛑 Blockers Log

| ID | Description | Creation Date | Owner | Severity | Status | Associated Task |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `blocker-001` | Final UI mockups for the node canvas are pending from the design team. | 2024-03-01 | UI Team | Medium | `Active` | `task-105` |
| `blocker-002` | Tauri bundler is failing to compile on macOS ARM architecture due to a missing dependency in the pipeline. | 2024-02-28 | Lead Dev | High | `Resolved` | `task-101` |

---

## 🚀 Escalation Process

If a blocker remains in the `Active` status and impedes progress, the following process must be observed:

1.  **Immediate Notification:** The owner of the blocked task must immediately log the blocker here, assign an ID, and document it in `BITACORA.md`.
2.  **24-Hour Review:** The team or AI agent must attempt resolution within 24 hours of logging. Mitigation ideas should be placed in `BITACORA.md`.
3.  **Escalation to Lead (1 Business Day):** If the blocker is not resolved within 1 business day, it must be explicitly flagged during the daily standup (or directly to the project lead/maintainer).
4.  **Status Update:** `STATUS.md` must be updated to reflect the overall risk to the project's milestones.
5.  **Resolution Logging:** Once unblocked, the solution must be detailed in `BITACORA.md`, and the status here changed to `Resolved`. The associated task can then return to `in_progress`.