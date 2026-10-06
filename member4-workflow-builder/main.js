const workflowStorageKey = "agentflow-workflow-config";
const workflowStatus = document.getElementById("workflowStatus");

function runWorkflow() {
    const name = document.getElementById("workflowName").value.trim();
    const runButton = document.querySelector(".run-button");

    if (!name) {
        workflowStatus.textContent = "● Add a workflow name before running";
        document.getElementById("workflowName").focus();
        return;
    }

    runButton.disabled = true;
    workflowStatus.textContent = `● Running demo: ${name}`;

    window.setTimeout(() => {
        workflowStatus.textContent = `● Demo complete: ${name}`;
        runButton.disabled = false;
    }, 900);
}

function saveWorkflow() {
    const settings = {
        name: document.getElementById("workflowName").value.trim(),
        description: document.getElementById("workflowDescription").value,
        mode: document.getElementById("executionMode").value,
        timeout: document.getElementById("workflowTimeout").value,
        nodes: Array.from(document.querySelectorAll(".added-workflow-node h3"), node => node.textContent)
    };

    if (!settings.name) {
        workflowStatus.textContent = "● Add a workflow name before saving";
        document.getElementById("workflowName").focus();
        return;
    }

    try {
        localStorage.setItem(workflowStorageKey, JSON.stringify(settings));
        workflowStatus.textContent = `● Saved locally: ${settings.name}`;
    } catch {
        workflowStatus.textContent = "● Browser storage unavailable; settings remain on this page";
    }
}

function selectTool(tool) {
    const workflow = document.querySelector(".workflow");
    const icons = {
        Trigger: "⚡",
        "AI Agent": "🤖",
        Search: "🔎",
        Action: "⚙️",
        Condition: "◇",
        "Send Email": "✉️"
    };
    const connector = document.createElement("div");
    const node = document.createElement("div");
    const icon = document.createElement("div");
    const content = document.createElement("div");
    const label = document.createElement("span");
    const heading = document.createElement("h3");
    const description = document.createElement("p");

    connector.className = "connector";
    connector.textContent = "↓";
    node.className = "workflow-node added-workflow-node";
    icon.className = "node-icon";
    icon.textContent = icons[tool] || "✦";
    content.className = "node-content";
    label.textContent = tool.toUpperCase();
    heading.textContent = tool;
    description.textContent = "Added to this workflow";
    content.append(label, heading, description);
    node.append(icon, content);
    workflow.append(connector, node);
    workflowStatus.textContent = `● Added ${tool} to workflow`;
}

try {
    const savedSettings = JSON.parse(localStorage.getItem(workflowStorageKey) || "null");

    if (savedSettings) {
        document.getElementById("workflowName").value = savedSettings.name || "Customer Support Workflow";
        document.getElementById("workflowDescription").value = savedSettings.description || "";
        document.getElementById("executionMode").value = savedSettings.mode || "Automatic";
        document.getElementById("workflowTimeout").value = savedSettings.timeout || "5 minutes";
        (savedSettings.nodes || []).forEach(selectTool);
        workflowStatus.textContent = "● Saved workflow loaded from this browser";
    }
} catch {
    workflowStatus.textContent = "● Saved workflow could not be loaded in this browser";
}