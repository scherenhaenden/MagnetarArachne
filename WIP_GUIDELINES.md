# Work-In-Progress (WIP) Guidelines

This document outlines the strict Work-In-Progress (WIP) policies for the MagnetarArachne project to prevent context switching, ensure quality, and manage cognitive load for both human developers and AI agents.

## 🚧 WIP Limits

The core constraint of the project is a strict limit on concurrent active tasks per contributor.

*   **Maximum Concurrent Tasks (`in_progress` state): 2**

### Why a Limit?
A limit of 2 forces focus on completing work rather than starting it. It encourages helping others unblock tasks and finishing documentation before moving to the next feature.

## 🚦 Enforcing the Limit

1.  **Before Starting Work:**
    *   Check `PLAN.md` to see your current tasks in the `in_progress` state.
    *   If you have 2 tasks in progress, you **must not** start a new task.
2.  **When Blocked:**
    *   If a task becomes `blocked` (as per the process in `RULES.md` and `BLOCKERS.md`), its state is changed in `PLAN.md`.
    *   A blocked task **does not count** against your WIP limit, allowing you to pick up another task while waiting for resolution.
    *   You must immediately resume the original task once unblocked.
3.  **When Reviewing:**
    *   Tasks in the `in_review` state **do not count** against your WIP limit.

## ⚠️ Exceptions

Exceptions to the WIP limit are rare but may be necessary in emergencies (e.g., a critical `hotfix`).

To exceed the WIP limit:
1.  **Approval:** You must obtain explicit approval from the project lead (or document an overriding context if acting autonomously as an AI).
2.  **Documentation:** You must log an entry in `BITACORA.md` explaining the exception.
    *   *Example:* `Exception: Taking on task-999 despite WIP limit due to production outage. Authorized by Lead Dev.`
3.  **Resolution:** You must resolve the exception as quickly as possible and return to the standard WIP limit.