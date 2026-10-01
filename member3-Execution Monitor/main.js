function refreshMonitor() {

    const running = document.getElementById("running");

    running.textContent = "...";

    setTimeout(function () {
        running.textContent = Math.floor(Math.random() * 10) + 8;

        alert("✅ Monitor refreshed successfully!");
    }, 800);
}