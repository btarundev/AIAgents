const notification = document.querySelector(".notification");

function showDashboardNotice(message) {
    let notice = document.querySelector(".dashboard-notice");

    if (!notice) {
        notice = document.createElement("div");
        notice.className = "dashboard-notice";
        notice.setAttribute("role", "status");
        document.body.append(notice);
    }

    notice.textContent = message;
    notice.classList.add("visible");
    window.clearTimeout(notice.dismissTimer);
    notice.dismissTimer = window.setTimeout(() => notice.remove(), 2800);
}

if (notification) {
    notification.addEventListener("click", () => {
        showDashboardNotice("3 demo notifications: 2 tasks completed, 1 agent is idle.");
    });
}


// Simple agent count animation

let count = 0;
const target = 12;

const agentCount = document.getElementById("agentCount");

if (agentCount) {
    const timer = setInterval(function () {
        count++;
        agentCount.textContent = count;

        if (count >= target) {
            clearInterval(timer);
        }
    }, 70);
}

const activityPeriod = document.getElementById("activityPeriod");
const activityCaption = document.getElementById("activityCaption");
const activityBars = document.querySelectorAll(".chart .bar");
const activitySamples = {
    7: [45, 70, 55, 85, 65, 92, 78],
    30: [58, 44, 76, 61, 89, 69, 94],
    90: [38, 63, 51, 79, 57, 86, 72]
};

if (activityPeriod) {
    activityPeriod.addEventListener("change", () => {
        const days = activityPeriod.value;
        const samples = activitySamples[days] || activitySamples[7];

        activityBars.forEach((bar, index) => {
            bar.style.height = `${samples[index]}%`;
        });

        if (activityCaption) {
            activityCaption.textContent = `Tasks completed in the last ${days} days`;
        }
    });
}