function refreshMonitor() {
    const rows = Array.from(document.querySelectorAll(".execution"));
    const runningCount = rows.filter(row => row.querySelector(".running-status")).length;
    const time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    document.getElementById("running").textContent = runningCount;
    document.getElementById("lastUpdated").textContent = `Demo snapshot refreshed at ${time}`;

    rows.forEach(row => {
        const status = row.querySelector(".running-status");

        if (!status) {
            return;
        }

        const progressBar = row.querySelector(".progress div");
        const progressLabel = row.querySelector(".progress-box span");
        const currentProgress = Number.parseInt(progressLabel.textContent, 10) || 0;
        const nextProgress = Math.min(currentProgress + 7, 96);

        progressBar.style.width = `${nextProgress}%`;
        progressLabel.textContent = `${nextProgress}%`;
    });
}

const agentFilter = document.getElementById("agentFilter");

agentFilter.addEventListener("change", () => {
    document.querySelectorAll(".execution").forEach(row => {
        row.hidden = agentFilter.value !== "all" && row.dataset.agent !== agentFilter.value;
    });
});