function runAgent() {
    const name = document.getElementById("agentName").value;

    alert("🚀 " + name + " is running!");
}

function saveAgent() {
    const name = document.getElementById("agentName").value;

    alert("✅ Agent '" + name + "' saved successfully!");
}

function selectComponent(component) {
    alert(component + " component selected.");
}

function updateTemperature() {
    const value = document.getElementById("temperature").value;

    document.getElementById("temperatureValue").textContent =
        (value / 100).toFixed(1);
}