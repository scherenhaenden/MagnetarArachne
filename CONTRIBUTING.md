# Contributing to MagnetarArachne

Welcome, human or AI collaborator, to the MagnetarArachne project. Your contributions are vital to building the visual workflow automation platform. To ensure consistency and adhere to the canonical model, please follow these guidelines carefully.

## 💻 Development Environment Setup

1.  **Prerequisites:**
    *   Node.js (18+)
    *   npm
    *   Python (3.9+) for testing python-based nodes.
    *   Git
2.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/MagnetarArachne.git
    cd MagnetarArachne
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Run Tests:**
    ```bash
    npx nx test
    ```
5.  **Build the Project:**
    ```bash
    npx nx build
    ```

## 📝 Pull Request Process

1.  **Branching:** Create a new branch according to the `BRANCHING_MODEL.md` (e.g., `feature/my-new-node`).
2.  **Canonical Documentation:** Before writing code, ensure you have:
    *   Assigned a task ID in `PLAN.md`.
    *   Moved the task state to `in_progress`.
    *   Logged the state change in `BITACORA.md`.
3.  **Development:**
    *   Write tests for new features.
    *   Ensure all tests pass.
    *   Follow the coding standards and naming conventions in `RULES.md`.
4.  **Review Readiness:**
    *   Once work is complete, change the task state to `in_review` in `PLAN.md`.
    *   Log the completion and state change in `BITACORA.md`.
    *   Push your branch and open a Pull Request against `master`.
5.  **Review:**
    *   The PR description must link to the task ID.
    *   A reviewer (human or automated CI) will assess the code, tests, and canonical file updates.
6.  **Merge:**
    *   If approved, the PR is merged (using squash and merge).
    *   The task state becomes `done` in `PLAN.md`.
    *   `STATUS.md` is updated to reflect progress.
    *   A final log entry is added to `BITACORA.md`.

## 🤖 Special Instructions for AI Agents

*   **Parse Before Acting:** Always parse `projects/_template.project.yml` and `PLAN.md` to understand your current scope.
*   **WIP Limits:** You are strictly bound by the limits defined in `WIP_GUIDELINES.md`. Do not start new tasks if you are blocked.
*   **Documentation is Code:** Treat updates to `BITACORA.md` and `PLAN.md` with the same rigor as application code.