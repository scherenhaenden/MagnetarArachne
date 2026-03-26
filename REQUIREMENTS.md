# Requirements for MagnetarArachne

This document clearly and exhaustively defines the project's functional and non-functional requirements. They are prioritized using the **MoSCoW** labeling method:
*   **[Must-Have]**: Critical for the current delivery timeframe in order for it to be a success.
*   **[Should-Have]**: Important but not strictly necessary for the current delivery.
*   **[Could-Have]**: Desirable but not necessary. Can improve the user experience or customer satisfaction for a little development cost.
*   **[Won't-Have]**: Agreed to not be delivered in the current timeframe.

## 🛠️ Functional Requirements

These define specific behaviors and functions the system must perform.

### 1. Visual Node Editor
*   **[Must-Have]** Users must be able to drag and drop nodes onto a high-performance visual canvas.
*   **[Must-Have]** Users must be able to connect outputs of one node to inputs of another node using visual edges.
*   **[Must-Have]** The editor must map connections using JSON-Path (`$.nodeId.output.field`).
*   **[Should-Have]** Real-time validation of node inputs based on package JSON schema.
*   **[Could-Have]** Collaborative editing for multiple users.
*   **[Won't-Have]** Auto-layout algorithms for complex DAGs (in phase 1).

### 2. Package System
*   **[Must-Have]** Packages must be self-contained directories with an `arachne.package.json` manifest.
*   **[Must-Have]** Support execution scripts in Python, TypeScript, and Shell.
*   **[Must-Have]** Packages must dynamically define their UI configuration, inputs, and outputs via JSON Schema.
*   **[Should-Have]** Packages can embed other sub-packages to form complex nodes.
*   **[Could-Have]** `.apkg` bundled packaging for easily sharing nodes online.

### 3. CLI Runner and Orchestration
*   **[Must-Have]** The system must execute `.flow.json` files representing Directed Acyclic Graphs (DAGs).
*   **[Must-Have]** The runner must execute nodes in topological order.
*   **[Must-Have]** Execution must be "file-first", saving logs, inputs, and outputs locally under a `runs/` directory.
*   **[Must-Have]** The runner must spawn child processes (e.g., Python/TS runtimes) for execution.
*   **[Should-Have]** Support for pausing execution for human-in-the-loop interventions (e.g., chat nodes).
*   **[Won't-Have]** Mandatory databases or external message queues like Redis/RabbitMQ.

## ⚙️ Non-Functional Requirements

These specify criteria that can be used to judge the operation of a system, rather than specific behaviors.

### 1. Performance
*   **[Must-Have]** The visual canvas must render at least 1,000 nodes smoothly using PixiJS (WebGL).
*   **[Must-Have]** The desktop application shell (Tauri) must consume minimal baseline RAM compared to Electron alternatives.
*   **[Should-Have]** The local runner should handle flows with up to 50 concurrent parallel branches.

### 2. Portability and Installation
*   **[Must-Have]** The application must be cross-platform, running on Windows, macOS, and Linux.
*   **[Must-Have]** The runner must be capable of running independently via Node.js without the desktop UI.
*   **[Should-Have]** Dependencies for Python nodes should be seamlessly managed (e.g., via virtual environments).

### 3. Scalability
*   **[Could-Have]** The architecture must accommodate a future transition to an optional NestJS backend for multi-user or remote execution.

### 4. Security
*   **[Must-Have]** Execution of custom packages (especially Shell/Python) must occur within explicitly granted permissions by the local user.
*   **[Should-Have]** Secure management of environment variables (e.g., `OPENAI_API_KEY`) within flows.