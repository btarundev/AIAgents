const agentStorageKey = "agentflow-agent-config";
const agentOutput = document.getElementById("agentOutput");

function runAgent() {
    const name = document.getElementById("agentName").value.trim() || "Untitled Agent";
    const prompt = document.getElementById("agentPrompt").value.trim();
    const model = document.getElementById("agentModel").value;

    if (!prompt) {
        agentOutput.textContent = "Add a test prompt to run the local demo.";
        document.getElementById("agentPrompt").focus();
        return;
    }

    agentOutput.textContent = `${name} · ${model} demo: I can help with “${prompt}”. This is a local preview; no AI service is connected.`;
}

function saveAgent() {
    const settings = {
        name: document.getElementById("agentName").value.trim(),
        model: document.getElementById("agentModel").value,
        temperature: document.getElementById("temperature").value,
        instructions: document.getElementById("systemInstructions").value,
        components: Array.from(document.querySelectorAll(".custom-node h3"), node => node.textContent)
    };

    if (!settings.name) {
        agentOutput.textContent = "Enter an agent name before saving.";
        document.getElementById("agentName").focus();
        return;
    }

    try {
        localStorage.setItem(agentStorageKey, JSON.stringify(settings));
        agentOutput.textContent = `“${settings.name}” saved in this browser.`;
    } catch {
        agentOutput.textContent = "Browser storage is unavailable; your changes remain on this page.";
    }
}

function selectComponent(component) {
    const workflow = document.querySelector(".workflow");
    const icons = {
        "AI Model": "🤖",
        Input: "⌨️",
        Memory: "🧠",
        Search: "🔎",
        Action: "⚡",
        Document: "📄"
    };
    const connector = document.createElement("div");
    const node = document.createElement("div");
    const icon = document.createElement("div");
    const content = document.createElement("div");
    const label = document.createElement("span");
    const heading = document.createElement("h3");
    const description = document.createElement("p");

    connector.className = "arrow";
    connector.textContent = "↓";
    node.className = "node custom-node";
    icon.className = "node-icon";
    icon.textContent = icons[component] || "✦";
    label.textContent = component.toUpperCase();
    heading.textContent = component;
    description.textContent = "Added to this agent canvas";
    content.append(label, heading, description);
    node.append(icon, content);
    workflow.append(connector, node);
    agentOutput.textContent = `${component} added to the canvas.`;
}

function updateTemperature() {
    const value = document.getElementById("temperature").value;
    document.getElementById("temperatureValue").textContent = (value / 100).toFixed(1);
}

try {
    const savedSettings = JSON.parse(localStorage.getItem(agentStorageKey) || "null");

    if (savedSettings) {
        document.getElementById("agentName").value = savedSettings.name || "Research Assistant";
        document.getElementById("agentModel").value = savedSettings.model || "GPT-4";
        document.getElementById("temperature").value = savedSettings.temperature ?? "40";
        document.getElementById("systemInstructions").value = savedSettings.instructions || "";
        updateTemperature();
        (savedSettings.components || []).forEach(selectComponent);
        agentOutput.textContent = "Saved agent settings loaded from this browser.";
    }
} catch {
    agentOutput.textContent = "Saved settings could not be loaded in this browser.";
}