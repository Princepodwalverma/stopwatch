let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(2, '0');

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 10);
    playPauseBtn.innerHTML = 'Pause';
}

function stopStopwatch() {
    clearInterval(timerInterval);
    playPauseBtn.innerHTML = 'Play';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.innerHTML = '00:00:00';
    elapsedTime = 0;
    playPauseBtn.innerHTML = 'Play';
    laps.innerHTML = '';
}

function lapStopwatch() {
    let lapTime = timeToString(elapsedTime);
    let lapItem = document.createElement('li');
    lapItem.innerHTML = lapTime;
    laps.appendChild(lapItem);
}

playPauseBtn.addEventListener('click', function () {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', function () {
    resetStopwatch();
    isRunning = false;
});

lapBtn.addEventListener('click', function () {
    if (isRunning) {
        lapStopwatch();
    }
});
