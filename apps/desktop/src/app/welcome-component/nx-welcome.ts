import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nx-welcome',
  standalone: false,
  template: `
    <div class="magnetar-workspace">
      <!-- Top Header Bar -->
      <header class="header-bar">
        <div class="header-left">
          <div class="logo-section">
            <div class="logo-icon">🕷️</div>
            <span class="logo-text">MagnetarArachne</span>
          </div>
          <nav class="main-nav">
            <button class="nav-item active">Workflows</button>
            <button class="nav-item">Templates</button>
            <button class="nav-item">Executions</button>
            <button class="nav-item">Settings</button>
          </nav>
        </div>
        <div class="header-right">
          <button class="header-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
          </button>
          <button class="header-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          <div class="user-avatar">
            <img src="https://placehold.co/32x32/6366f1/ffffff?text=U" alt="User" />
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <div class="main-content">
        <!-- Left Sidebar - Node Palette -->
        <aside class="left-sidebar">
          <div class="sidebar-header">
            <h3>Node Library</h3>
            <button class="collapse-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
          </div>
          
          <div class="search-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search nodes..." />
          </div>

          <div class="node-categories">
            <div class="category-section">
              <div class="category-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
                <span>Core</span>
              </div>
              <div class="node-list">
                <div class="node-item" draggable="true">
                  <div class="node-icon start">▶</div>
                  <span>Start</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon function">ƒ</div>
                  <span>Function</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon condition">?</div>
                  <span>If Condition</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon switch">⚡</div>
                  <span>Switch</span>
                </div>
              </div>
            </div>

            <div class="category-section">
              <div class="category-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
                <span>AI & ML</span>
              </div>
              <div class="node-list">
                <div class="node-item" draggable="true">
                  <div class="node-icon ai">🤖</div>
                  <span>OpenAI GPT</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon ai">🧠</div>
                  <span>Claude</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon vector">📊</div>
                  <span>Vector Search</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon chat">💬</div>
                  <span>Human Chat</span>
                </div>
              </div>
            </div>

            <div class="category-section">
              <div class="category-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
                <span>Data</span>
              </div>
              <div class="node-list">
                <div class="node-item" draggable="true">
                  <div class="node-icon database">🗄️</div>
                  <span>Database</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon api">🌐</div>
                  <span>HTTP Request</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon file">📄</div>
                  <span>Read File</span>
                </div>
                <div class="node-item" draggable="true">
                  <div class="node-icon transform">🔄</div>
                  <span>Transform</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Canvas Area -->
        <main class="canvas-container">
          <div class="canvas-toolbar">
            <div class="toolbar-left">
              <button class="toolbar-btn active">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
                </svg>
                Select
              </button>
              <button class="toolbar-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
                Pan
              </button>
              <div class="zoom-controls">
                <button class="zoom-btn">-</button>
                <span class="zoom-level">100%</span>
                <button class="zoom-btn">+</button>
              </div>
            </div>
            <div class="toolbar-right">
              <button class="toolbar-btn primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
                Execute
              </button>
              <button class="toolbar-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17,21 17,13 7,13 7,21"/>
                  <polyline points="7,3 7,8 15,8"/>
                </svg>
                Save
              </button>
            </div>
          </div>

          <div class="canvas-workspace">
            <div class="canvas-grid">
              <!-- Sample Workflow Nodes -->
              <div class="workflow-node start-node" style="left: 100px; top: 150px;">
                <div class="node-header">
                  <div class="node-icon">▶</div>
                  <span class="node-title">Start</span>
                  <div class="node-status success"></div>
                </div>
                <div class="node-outputs">
                  <div class="connection-point output"></div>
                </div>
              </div>

              <div class="workflow-node function-node" style="left: 300px; top: 150px;">
                <div class="node-header">
                  <div class="node-icon">🤖</div>
                  <span class="node-title">OpenAI GPT-4</span>
                  <div class="node-status running"></div>
                </div>
                <div class="node-body">
                  <div class="node-field">
                    <label>Prompt:</label>
                    <div class="field-preview">Analyze the following text...</div>
                  </div>
                </div>
                <div class="node-inputs">
                  <div class="connection-point input"></div>
                </div>
                <div class="node-outputs">
                  <div class="connection-point output"></div>
                </div>
              </div>

              <div class="workflow-node condition-node" style="left: 550px; top: 150px;">
                <div class="node-header">
                  <div class="node-icon">?</div>
                  <span class="node-title">If Condition</span>
                  <div class="node-status pending"></div>
                </div>
                <div class="node-body">
                  <div class="node-field">
                    <label>Condition:</label>
                    <div class="field-preview">sentiment === "positive"</div>
                  </div>
                </div>
                <div class="node-inputs">
                  <div class="connection-point input"></div>
                </div>
                <div class="node-outputs">
                  <div class="connection-point output true">True</div>
                  <div class="connection-point output false">False</div>
                </div>
              </div>

              <div class="workflow-node chat-node" style="left: 300px; top: 350px;">
                <div class="node-header">
                  <div class="node-icon">💬</div>
                  <span class="node-title">Human Chat</span>
                  <div class="node-status waiting"></div>
                </div>
                <div class="node-body">
                  <div class="node-field">
                    <label>Message:</label>
                    <div class="field-preview">Please review the analysis...</div>
                  </div>
                </div>
                <div class="node-inputs">
                  <div class="connection-point input"></div>
                </div>
                <div class="node-outputs">
                  <div class="connection-point output"></div>
                </div>
              </div>

              <!-- Connection Lines -->
              <svg class="connection-layer">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                          refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                  </marker>
                </defs>
                
                <!-- Start to GPT -->
                <path d="M 180 170 Q 220 170 260 170" 
                      stroke="#6366f1" stroke-width="2" fill="none" 
                      marker-end="url(#arrowhead)" class="connection-line active"/>
                
                <!-- GPT to Condition -->
                <path d="M 430 170 Q 470 170 510 170" 
                      stroke="#6366f1" stroke-width="2" fill="none" 
                      marker-end="url(#arrowhead)" class="connection-line active"/>
                
                <!-- Condition to Chat (False branch) -->
                <path d="M 590 200 Q 590 250 380 350" 
                      stroke="#ef4444" stroke-width="2" fill="none" 
                      marker-end="url(#arrowhead)" class="connection-line"/>
              </svg>
            </div>
          </div>
        </main>

        <!-- Right Sidebar - Properties Panel -->
        <aside class="right-sidebar">
          <div class="sidebar-header">
            <h3>Properties</h3>
            <button class="collapse-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>

          <div class="properties-content">
            <div class="property-section">
              <h4>OpenAI GPT-4</h4>
              <div class="property-tabs">
                <button class="tab active">Parameters</button>
                <button class="tab">Settings</button>
                <button class="tab">Output</button>
              </div>
            </div>

            <div class="property-form">
              <div class="form-group">
                <label>Model</label>
                <select class="form-control">
                  <option>gpt-4-turbo</option>
                  <option>gpt-4</option>
                  <option>gpt-3.5-turbo</option>
                </select>
              </div>

              <div class="form-group">
                <label>System Prompt</label>
                <textarea class="form-control" rows="3" placeholder="You are a helpful assistant..."></textarea>
              </div>

              <div class="form-group">
                <label>User Message</label>
                <div class="input-mapper">
                  <textarea class="form-control" rows="4" placeholder="Enter your prompt or map from previous node..."></textarea>
                  <button class="mapper-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label>Temperature</label>
                <div class="slider-group">
                  <input type="range" min="0" max="2" step="0.1" value="0.7" class="slider" />
                  <span class="slider-value">0.7</span>
                </div>
              </div>

              <div class="form-group">
                <label>Max Tokens</label>
                <input type="number" class="form-control" value="1000" />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Bottom Status Bar -->
      <footer class="status-bar">
        <div class="status-left">
          <span class="status-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            Last execution: 2 minutes ago
          </span>
          <span class="status-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            4 nodes, 3 connections
          </span>
        </div>
        <div class="status-right">
          <span class="status-item">Ready</span>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .magnetar-workspace {
      height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      color: #334155;
    }

    /* Header Bar */
    .header-bar {
      height: 60px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-icon {
      font-size: 24px;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    .main-nav {
      display: flex;
      gap: 5px;
    }

    .nav-item {
      padding: 8px 16px;
      border: none;
      background: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }

    .nav-item:hover {
      background: #f1f5f9;
    }

    .nav-item.active {
      background: #6366f1;
      color: white;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-btn {
      width: 36px;
      height: 36px;
      border: none;
      background: none;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .header-btn:hover {
      background: #f1f5f9;
    }

    .user-avatar img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    /* Left Sidebar */
    .left-sidebar {
      width: 280px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      padding: 16px 20px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sidebar-header h3 {
      font-size: 16px;
      font-weight: 600;
    }

    .collapse-btn {
      width: 24px;
      height: 24px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .collapse-btn:hover {
      background: #f1f5f9;
    }

    .search-box {
      padding: 16px 20px;
      border-bottom: 1px solid #e2e8f0;
      position: relative;
    }

    .search-box svg {
      position: absolute;
      left: 32px;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
    }

    .search-box input {
      width: 100%;
      padding: 8px 12px 8px 36px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
    }

    .search-box input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .node-categories {
      flex: 1;
      overflow-y: auto;
      padding: 10px 0;
    }

    .category-section {
      margin-bottom: 10px;
    }

    .category-header {
      padding: 8px 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #64748b;
      cursor: pointer;
    }

    .category-header:hover {
      background: #f8fafc;
    }

    .node-list {
      padding-left: 10px;
    }

    .node-item {
      padding: 8px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: grab;
      border-radius: 6px;
      margin: 2px 10px;
      transition: all 0.2s;
    }

    .node-item:hover {
      background: #f1f5f9;
    }

    .node-item:active {
      cursor: grabbing;
    }

    .node-icon {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }

    .node-icon.start { background: #10b981; color: white; }
    .node-icon.function { background: #6366f1; color: white; }
    .node-icon.condition { background: #f59e0b; color: white; }
    .node-icon.switch { background: #8b5cf6; color: white; }
    .node-icon.ai { background: #ec4899; color: white; }
    .node-icon.vector { background: #06b6d4; color: white; }
    .node-icon.chat { background: #84cc16; color: white; }
    .node-icon.database { background: #64748b; color: white; }
    .node-icon.api { background: #f97316; color: white; }
    .node-icon.file { background: #6b7280; color: white; }
    .node-icon.transform { background: #14b8a6; color: white; }

    /* Canvas Container */
    .canvas-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #f8fafc;
    }

    .canvas-toolbar {
      height: 50px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }

    .toolbar-left, .toolbar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .toolbar-btn {
      padding: 6px 12px;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }

    .toolbar-btn:hover {
      background: #f8fafc;
    }

    .toolbar-btn.active {
      background: #6366f1;
      color: white;
      border-color: #6366f1;
    }

    .toolbar-btn.primary {
      background: #10b981;
      color: white;
      border-color: #10b981;
    }

    .toolbar-btn.primary:hover {
      background: #059669;
    }

    .zoom-controls {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-left: 10px;
    }

    .zoom-btn {
      width: 28px;
      height: 28px;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .zoom-level {
      font-size: 12px;
      color: #64748b;
      min-width: 40px;
      text-align: center;
    }

    .canvas-workspace {
      flex: 1;
      position: relative;
      overflow: hidden;
    }

    .canvas-grid {
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle, #cbd5e1 1px, transparent 1px);
      background-size: 20px 20px;
      position: relative;
    }

    /* Workflow Nodes */
    .workflow-node {
      position: absolute;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      min-width: 160px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      cursor: move;
      transition: all 0.2s;
    }

    .workflow-node:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .workflow-node.start-node { border-color: #10b981; }
    .workflow-node.function-node { border-color: #6366f1; }
    .workflow-node.condition-node { border-color: #f59e0b; }
    .workflow-node.chat-node { border-color: #84cc16; }

    .node-header {
      padding: 10px 12px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
      gap: 8px;
      background: #fafbfc;
      border-radius: 6px 6px 0 0;
    }

    .node-title {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
    }

    .node-status {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .node-status.success { background: #10b981; }
    .node-status.running { background: #f59e0b; animation: pulse 2s infinite; }
    .node-status.pending { background: #64748b; }
    .node-status.waiting { background: #ec4899; animation: pulse 2s infinite; }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .node-body {
      padding: 10px 12px;
    }

    .node-field {
      margin-bottom: 8px;
    }

    .node-field label {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
    }

    .field-preview {
      font-size: 12px;
      color: #334155;
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .node-inputs, .node-outputs {
      position: relative;
    }

    .connection-point {
      width: 12px;
      height: 12px;
      border: 2px solid #6366f1;
      background: white;
      border-radius: 50%;
      position: absolute;
      cursor: crosshair;
    }

    .connection-point.input {
      left: -6px;
      top: 50%;
      transform: translateY(-50%);
    }

    .connection-point.output {
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
    }

    .connection-point.output.true {
      right: -6px;
      top: 25%;
      border-color: #10b981;
    }

    .connection-point.output.false {
      right: -6px;
      top: 75%;
      border-color: #ef4444;
    }

    .connection-point:hover {
      background: #6366f1;
      transform: translateY(-50%) scale(1.2);
    }

    /* Connection Lines */
    .connection-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .connection-line {
      transition: all 0.2s;
    }

    .connection-line.active {
      stroke-width: 3;
      filter: drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3));
    }

    /* Right Sidebar */
    .right-sidebar {
      width: 320px;
      background: #ffffff;
      border-left: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
    }

    .properties-content {
      flex: 1;
      overflow-y: auto;
    }

    .property-section {
      padding: 16px 20px;
      border-bottom: 1px solid #e2e8f0;
    }

    .property-section h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .property-tabs {
      display: flex;
      gap: 2px;
    }

    .tab {
      padding: 6px 12px;
      border: none;
      background: #f1f5f9;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }

    .tab.active {
      background: #6366f1;
      color: white;
    }

    .property-form {
      padding: 20px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 6px;
      color: #374151;
    }

    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      transition: all 0.2s;
    }

    .form-control:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .input-mapper {
      position: relative;
    }

    .mapper-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border: none;
      background: #f1f5f9;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mapper-btn:hover {
      background: #e2e8f0;
    }

    .slider-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slider {
      flex: 1;
      height: 4px;
      border-radius: 2px;
      background: #e2e8f0;
      outline: none;
      -webkit-appearance: none;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #6366f1;
      cursor: pointer;
    }

    .slider-value {
      font-size: 12px;
      color: #64748b;
      min-width: 30px;
    }

    /* Status Bar */
    .status-bar {
      height: 32px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 12px;
      color: #64748b;
    }

    .status-left, .status-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .left-sidebar {
        width: 240px;
      }
      .right-sidebar {
        width: 280px;
      }
    }

    @media (max-width: 768px) {
      .left-sidebar, .right-sidebar {
        display: none;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {}