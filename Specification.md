¡Perfecto, Eddie! Vamos a “re-encarrilar” **MagnetarArachne** según lo que quieres: **paquetitos autocontenidos**, **orquestadores file-based**, **sin BD obligatoria**, y con posibilidad de correr **Python, TypeScript y más** desde el día 1. Aquí tienes la especificación revisada y accionable.

# MagnetarArachne — Especificación Revisada (file-first, package-centric)

## 0) Principios

* **Todo es archivo**: proyectos, flujos, paquetes, históricos y logs en disco (JSON/YAML/JSONL).
* **Paquetes autocontenidos**: cada paquete define su UI (schema), su runner y su lógica.
* **Orquestación declarativa**: flujos como DAG en JSON/YAML, sin BD ni colas externas.
* **Multi-lenguaje por contrato**: entrada/salida en JSON; ejecución aislada por proceso.
* **Extensible**: paquetes pueden **embeder** otros paquetes.

---

## 1) Estructura de Proyecto (ejemplo)

```
arachne-workspace/
  projects/
    my-project/
      flows/
        email-campaign.flow.json
      packages/
        pkg.python.hello/
          arachne.package.json
          execute.py
          requirements.txt
        pkg.ts.transform/
          arachne.package.json
          execute.ts
          package.json
      secrets/.env           # opcional (inyectado como env)
      runs/
        email-campaign/2025-08-28T07-42-11Z/
          run.meta.json
          node-logs.jsonl
          outputs.json
```

---

## 2) Formato de **Paquete Arachne**

Un paquete es un directorio con un manifiesto y su código.

**`arachne.package.json` (ejemplo mínimo):**

```json
{
  "name": "pkg.python.hello",
  "version": "0.1.0",
  "language": "python",
  "entry": "execute.py",
  "schemas": {
    "config": {
      "type": "object",
      "properties": {
        "greeting": { "type": "string", "default": "Hola" }
      },
      "required": ["greeting"]
    },
    "inputs": { "type": "object", "properties": { "name": { "type": "string" } }, "required": ["name"] },
    "outputs": { "type": "object", "properties": { "message": { "type": "string" } }, "required": ["message"] }
  },
  "env": ["OPENAI_API_KEY"],
  "embedded": ["../pkg.ts.transform"],   // rutas relativas a otros paquetitos
  "install": { "python": "pip install -r requirements.txt" },
  "test": { "command": "python execute.py --self-test" },
  "ui": { "icon": "lucide:message-circle", "category": "demo" }
}
```

**Contrato de ejecución (todas las lenguas):**

* **STDIN**: JSON con `{ "config": {...}, "input": {...} }`
* **STDOUT**: JSON con `{ "output": {...} }`
* **STDERR**: logs (se capturan a `node-logs.jsonl`)
* **Exit code**: `0` ok, `!=0` error.

**Ejemplo `execute.py`:**

```python
import sys, json
req = json.load(sys.stdin)
greeting = req["config"]["greeting"]
name = req["input"]["name"]
print(json.dumps({"output": {"message": f"{greeting}, {name}!"}}))
```

**Ejemplo `execute.ts` (Node):**

```ts
import * as fs from "node:fs";

(async () => {
  const data = JSON.parse(fs.readFileSync(0, "utf8"));
  const txt = String(data.input?.text ?? "");
  const out = { output: { upper: txt.toUpperCase() } };
  process.stdout.write(JSON.stringify(out));
})();
```

> Nota: Para TypeScript puedes usar **tsx** o **ts-node** en dev; en release puedes transpilarlos a JS.

---

## 3) **Orquestadores (Flujos/DAG)**

Archivo declarativo (`*.flow.json`) que referencia nodos (=paquetes) y sus conexiones.

**`email-campaign.flow.json` (ejemplo):**

```json
{
  "name": "email-campaign",
  "version": "0.1.0",
  "nodes": [
    {
      "id": "n1",
      "package": "pkg.python.hello",
      "config": { "greeting": "Hola" }
    },
    {
      "id": "n2",
      "package": "pkg.ts.transform",
      "config": {}
    }
  ],
  "edges": [
    { "from": "n1", "to": "n2", "map": { "text": "$.n1.output.message" } }
  ],
  "triggers": [
    { "type": "manual" }
  ],
  "retry": { "max": 2, "backoffMs": 1000 },
  "concurrency": 2,
  "onHumanIntervention": "pause"  // si algún paquete 'chat' lo requiere
}
```

**Mapping**: JSON-Path simple (`"$.nodeId.output.field"`). El runner resuelve inputs de cada nodo a partir de outputs previos.

---

## 4) **Runner local** (sin BD / sin Redis)

* Proceso de orquestación en **Node.js** (parte del binario/CLI de Arachne).
* Ejecuta cada nodo como **subproceso**:

  * `python` para `language=python` (usa venv si existe).
  * `node` para `language=ts/js` (o bin configurado del paquete).
  * `bash`/`sh` para `language=shell` (si lo necesitas).
* **Aislamiento**: cada ejecución con **cwd** del paquete y env minimal (más `.env` del proyecto).
* **Logs**: JSONL por nodo; **salida** consolidada en `runs/<flow>/<ts>/outputs.json`.
* **Reintentos** y **paralelismo** básicos implementados en memoria.

CLI propuesto:

```
arachne init
arachne new package --lang python|ts --name pkg.xxx
arachne new flow --name my-flow
arachne run flows/email-campaign.flow.json --input '{ "n1": { "name":"Eddie" } }'
arachne pack packages/pkg.python.hello   # crea .apkg (tar.gz)
arachne add dist/pkg.python.hello-0.1.0.apkg
```

---

## 5) **UI y Desktop (sin backend obligatorio)**

* **Desktop** con **Tauri 2** + **Angular 18**:

  * Canvas (PixiJS) para diseñar el DAG (drag\&drop, zoom/pan).
  * Panel que renderiza **JSON Schema** de cada paquete para su config.
  * Botón **Run** que llama al **CLI interno** (Tauri `Command`) y **streaming** de logs a la UI (eventos Tauri).
  * Gestión de proyectos/paquetes en disco (abrir carpeta, importar `.apkg`).
* **Web** (opcional, sin Python nativo):

  * Modo **preview**: editar flujos/paquetes, validar schemas, simular data.
  * Para ejecutar Python en web: más adelante con **Pyodide/WASM** o **remote runner** opcional (no requerido ahora).

> **Sin NestJS** en MVP. Si en el futuro quieres API multiusuario/remote, añadimos un **Arachne Server** como plugin aparte.

---

## 6) **Paquetes embebidos** y dependencias

* Campo `"embedded"` en el manifiesto para referenciar sub-paquetes (por ruta o nombre+versión si están instalados en `packages/`).
* `arachne pack` crea **`.apkg`** (tar.gz con el paquete y sus embebidos).
* `arachne add` extrae el `.apkg` en `projects/<p>/packages/`.

---

## 7) **Secretos**

* Nada de BD: `.env` por proyecto (`secrets/.env`), o llavero del SO vía Tauri (más adelante).
* El manifiesto puede declarar variables esperadas en `"env"`, y el runner las inyecta.

---

## 8) **IA y Chat (opcionales desde el día 1)**

* Un paquete `pkg.chat.human` que:

  * Emite un evento `HUMAN_REQUIRED` → la UI abre el panel de chat del nodo.
  * La UI guarda la respuesta del usuario en un archivo temporal y reanuda el DAG con ese JSON como output.
* Paquetes IA (OpenAI, Anthropic, etc.) sólo requieren tener su **execute.ts/py** que consuma la API; claves via `.env`.

---

## 9) **Interfaces TypeScript (libs/shared-types)**

(Útiles para UI + runner; se versionan en el monorepo Nx)

```ts
export interface ArachnePackage {
  name: string; version: string;
  language: "python" | "ts" | "js" | "shell";
  entry: string;
  schemas: { config: any; inputs: any; outputs: any };
  env?: string[];
  embedded?: string[];
  install?: Record<string,string>;
  test?: { command: string };
  ui?: { icon?: string; category?: string };
}

export interface FlowEdge { from: string; to: string; map?: Record<string,string>; }

export interface FlowNode {
  id: string;
  package: string;   // name o ruta
  config?: Record<string,any>;
}

export interface FlowSpec {
  name: string; version: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  triggers?: Array<{ type: "manual" | "schedule" }>;
  retry?: { max: number; backoffMs: number };
  concurrency?: number;
  onHumanIntervention?: "pause" | "skip";
}
```

---

## 10) Diagrama (alto nivel)

```mermaid
flowchart LR
  UI[Angular + PixiJS (Tauri)] -- edita --> FLOWS[(flows/*.flow.json)]
  UI -- importa/exporta --> PKGS[(packages/*/arachne.package.json)]
  UI -- run --> CLI[arachne runner]
  CLI --> PROC1[Subproceso Python/Node/Shell]
  CLI --> PROC2[Subproceso ...]
  PROC1 --> RUNS[(runs/<flow>/<ts>)]
  PROC2 --> RUNS
  UI <-- eventos/logs --> CLI
```

---

## 11) MVP — Plan en 5 pasos (realista)

1. **CLI básico** (`arachne`): run de un flow con 2 nodos (Python + TS), logs JSONL y outputs.json.
2. **Esquemas UI**: Angular renderiza `schemas.config` de un paquete y guarda el flow.
3. **PixiJS Canvas**: crear nodos, conectar edges, guardar el `.flow.json`.
4. **Paquetes de ejemplo**:

  * `pkg.python.hello` (arriba),
  * `pkg.ts.transform` (uppercase),
  * `pkg.chat.human` (pausa/continúa).
5. **Packaging**: `pack`/`add` de `.apkg` con embebidos.

> Todo esto **sin BD** y **sin Redis**. Más adelante: keyring Tauri, Pyodide/Web runner, servidor remoto opcional.

---

## 12) Cómo empezamos ahora mismo

* **Monorepo Nx** (útil para UI y libs TS), pero **el runner CLI** puede ser un package TS independiente:

  * `apps/desktop` (Angular+Tauri)
  * `tools/runner` (Node CLI)
  * `libs/shared-types`
* Crea proyecto:

  ```
  npx create-nx-workspace@latest arachne
  # añade apps/desktop (Angular), tools/runner (Node), libs/shared-types
  ```
* Implementa `tools/runner` con:

  * carga de flow, topological sort simple,
  * spawn por lenguaje (python/node),
  * inyección de `.env`,
  * captura de stdout/stderr,
  * persistencia en `runs/...`.


Got it 🚀 — let’s lock in a **comprehensive, extended specification** of your app as it stands now (MagnetarArachne 💜🕷️). I’ll break it into **domains, view model, persistence model, and project storage**, so it’s future‑proof and detailed enough to serve as an architecture blueprint.

---

# 📑 **MagnetarArachne – Extended Specification**

## 1. 🎯 **High‑Level Vision**
MagnetarArachne is a **workflow automation and orchestration tool**, inspired by Node‑RED and n8n, but with a modern **modular architecture** and **rich UI built from atoms → molecules → organisms**.  
It allows users to **visually compose flows** made of nodes connected by edges, where each node represents a task (e.g., AI agent call, database query, file read, transform, HTTP request).  
The system must support:
- **Execution flows** (sequential and parallel branches).
- **Persistence of projects** in a filesystem‑friendly format (YAML/JSON).
- **Graph‑like visualization and editing** in a node‑based canvas.
- **Replayability** and **monitoring of executions**.

---

## 2. 🏗️ **Domain Architecture**

### **Backend logic domains (`apps/api` + `logic/`):**
- **execution/** – workflow runner, state transitions, concurrency controller.
- **flow-designer/** – manages the graph model (nodes, edges, categories).
- **human-chat/** – integration of human‑in‑the‑loop steps.
- **logs/** – execution logs, error traces, user logs.
- **mapping/** – piping outputs between nodes.
- **node-config/** – metadata schema of nodes (inputs, outputs, parameters).
- **security/** – credentials, secrets.
- **workspace/** – manages projects, versioning, directory persistence.

### **Frontend domains (`view/`):**
- **atoms/** – primitives (buttons, icons, inputs, connection points, etc).
- **molecules/** – combos like node-header, property-fields, node-category.
- **organisms/** – toolbar, property panel, sidebars.
- **canvas/** – PixiJS host, workflow nodes, connection rendering.
- **sidebar/** – searchable node library.
- **properties/** – configurable node parameters.
- **layouts/** – shells for screens.
- **pages/** – main Flow Editor page, Settings, Executions dashboard.

---

## 3. 🎨 **Interaction Flow**
1. User creates a **new project** (workspace folder).
2. Project contains **flows** (each a YAML/JSON file).
  - Flow defines nodes, connections, parallelism.
3. User **drags nodes** from sidebar → canvas.
4. Nodes have **input/output ports** → create connections.
5. Nodes expose **properties** configurable via properties panel.
6. Execution triggered → runner interprets project definition.
7. Outputs logged, status shown in the **status bar** and execution log.

---

## 4. 💾 **Persistence & Project Format**

### **Project directory structure**
```
project-root/
├── project.yml               # High-level metadata (name, author, version)
├── flows/
│   ├── main.flow.yml         # Primary flow definition
│   └── subflow-1.flow.yml    # A referenced subflow
├── tasks/
│   ├── task-uuid-1.yml       # Declarative task definitions (atomic)
│   └── task-uuid-2.yml
├── secrets.yml               # (encrypted) credentials
└── logs/
    └── execution-2025-08-28.log
```

### **YAML Schema**

#### `project.yml`
```yaml
id: magnetar-sample
name: My First Workflow
version: 1.0.0
created: 2025-08-28T12:00:00Z
description: >
  Example project that executes an OpenAI GPT analysis and branches based on sentiment.
flows:
  - main.flow.yml
```

#### `main.flow.yml`
```yaml
id: main-flow
name: Main Flow
nodes:
  - id: start
    type: start
    name: Workflow Start
    next: [gpt-analysis]

  - id: gpt-analysis
    type: ai.openai
    name: Analyze Input
    params:
      model: gpt-4
      system_prompt: "You are a helpful assistant."
      temperature: 0.7
    next: [condition-1]

  - id: condition-1
    type: condition
    name: Sentiment Check
    condition: sentiment == "positive"
    branches:
      true: [chat-step]
      false: []

  - id: chat-step
    type: chat.human
    name: Human In The Loop
    params:
      message: "Please review the analysis result"
    next: []
```

#### `task-uuid-1.yml`
```yaml
id: ai.openai
category: AI & ML
inputs:
  - name: prompt
    type: string
outputs:
  - name: response
    type: string
config:
  auth: openai-key
  endpoint: https://api.openai.com/v1/chat/completions
```

---

## 5. 📜 **Execution Semantics**
- **Sequential nodes**: executed in listed order.
- **Parallel nodes**: multiple `next` targets can run concurrently.
- **Condition nodes**: runtime evaluates branch condition → executes branch.
- **Join semantics**: future extension to allow merging of branches.
- Each execution generates a **trace log** with timings, params, outcomes.

---

## 6. 🔐 **Secrets Management**
- Stored in `secrets.yml` (optionally encrypted).
- Example:
```yaml
openai-key: "sk-..."
database-password: "ENC(...cipher...)"
```
- Secrets injected at runtime by `security/` domain.

---

## 7. 📊 **Monitoring**
- Status bar shows:
  - Last execution
  - Active nodes / connections count
  - Current readiness status
- Logs stored per execution with event stream:
```json
{ "timestamp": "...", "node": "gpt-analysis", "status": "running" }
```

---

## 8. 🪄 **Next Suggested Steps**
1. Define **flow JSON Schema** formally (for validation).
2. Implement `WorkspaceService` (create/read/save projects as dirs).
3. Implement `ExecutionService` (parse YAML → run tasks → log results).
4. Extend atoms → molecules into **runnable node views** (canvas integration).
5. Add `Save` + `Load` commands on UI → persists into `project-root/`.

---

✨ With this spec, you now have:
- **Clear modular architecture**,
- **View model tied to atoms/molecules**,
- **Persistence model with YAML flows & tasks**,
- **Execution semantics defined**,
- **Storage layout planned**.

---

👉 Want me to **write a formal JSON Schema + validation rules** for the `flow.yml` so you can validate inputs automatically at runtime?
