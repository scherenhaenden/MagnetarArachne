# Canonical Plan of MagnetarArachne

This plan captures the project's milestones, tasks, estimates, and status; its structure must be kept intact.

## 🎯 Milestones Overview

| Milestone ID | Name | Target Date | Description | Completion Criteria |
| :--- | :--- | :--- | :--- | :--- |
| `ms-01` | Project Initiation | 2024-03-01 | Set up the initial monorepo structure and canonical documentation. | All canonical files are committed to `master` and CI checks pass. |
| `ms-02` | Core Runner Release | 2024-04-15 | Implement the core local flow execution engine for Python and TypeScript packages. | CLI successfully executes test flows containing multiple nodes. |
| `ms-03` | Visual Editor MVP | 2024-06-30 | Develop the Angular/PixiJS desktop app for visual DAG editing. | Users can visually construct and run a basic flow within the UI. |

## 📋 Task Backlog

| Task ID | Milestone | Title | Owner | Effort (pts) | Weight (%) | State | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `task-101` | `ms-01` | Scaffold Nx workspace | Lead Dev | 3 | 5% | `done` | Initial commit completed |
| `task-102` | `ms-01` | Implement canonical model docs | AI Agent | 5 | 8% | `in_progress` | Writing markdown files per standard |
| `task-103` | `ms-02` | CLI argument parsing | Eng Team | 5 | 8% | `ready` | Awaiting core runner architecture review |
| `task-104` | `ms-02` | Subprocess orchestration engine | Eng Team | 13 | 21% | `planned` | Needs technical design document |
| `task-105` | `ms-03` | PixiJS canvas integration | UI Team | 8 | 13% | `blocked` | Waiting on final UI mocks |

## 📊 Effort Summary

*   **Total effort:** 34 pts
*   **Completed:** 3 pts
*   **In progress:** 5 pts
*   **Remaining:** 26 pts

## 🚦 State Definitions

1.  **`planned`**: The task has been identified and estimated, but work has not yet been scheduled or scoped in detail.
2.  **`ready`**: The task is fully defined, prioritized, and ready to be picked up by a developer.
3.  **`in_progress`**: Active work is currently being performed on this task.
4.  **`in_review`**: Code/documentation is complete and is awaiting peer review or CI validation via a Pull Request.
5.  **`blocked`**: Work is completely halted due to external dependencies, missing information, or technical impediments.
6.  **`done`**: The task has been successfully merged, tested, and documented.

---

*Note: This document must be updated whenever tasks change state or scope, and these changes must simultaneously be reflected in the project's YAML file and in `BITACORA.md`.*