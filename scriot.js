let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" +
                        (minutes < 10 ? "0" + minutes : minutes) + ":" +
                        (seconds < 10 ? "0" + seconds : seconds);
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsContainer.innerHTML = '';
    lapCount = 0;
}

function lapTimer() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

// Event Listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);
