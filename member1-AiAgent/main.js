const notification = document.querySelector(".notification");

notification.addEventListener("click", function () {

    alert("You have 3 new agent notifications!");

});


// Simple agent count animation

let count = 0;
const target = 12;

const agentCount = document.getElementById("agentCount");

const timer = setInterval(function () {

    count++;

    agentCount.textContent = count;

    if (count >= target) {
        clearInterval(timer);
    }

}, 100);