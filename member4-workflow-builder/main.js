function runWorkflow() {

    const name = document.getElementById("workflowName").value;

    alert("🚀 " + name + " started successfully!");
}

function saveWorkflow() {

    const name = document.getElementById("workflowName").value;

    alert("✅ Workflow '" + name + "' saved successfully!");
}

function selectTool(tool) {

    alert(tool + " component selected.");
}