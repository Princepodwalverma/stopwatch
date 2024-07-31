let timer = null;
let startTime = 0;
let elapsedTime = 0;
let laps = [];

document.getElementById('play-btn').addEventListener('click', play);
document.getElementById('reset-btn').addEventListener('click', reset);
document.getElementById('lap-btn').addEventListener('click', lap);

function play() {
  if (timer === null) {
    startTime = new Date().getTime() - elapsedTime;
    timer = setInterval(updateTime, 1000);
  }
}

function reset() {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  laps = [];
  document.getElementById('display').innerHTML = '00:00:00';
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  const currentTime = new Date().getTime() - startTime;
  const lapTime = currentTime - elapsedTime;
  laps.push(lapTime);
  elapsedTime = currentTime;
  const lapHTML = `
    <li>Lap ${laps.length}: ${formatTime(lapTime)}</li>
    `;
  document.getElementById('laps').insertAdjacentHTML('beforeend', lapHTML);
}

function updateTime() {
  const currentTime = new Date().getTime() - startTime;
  document.getElementById('display').innerHTML = formatTime(currentTime);
  elapsedTime = currentTime;
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}