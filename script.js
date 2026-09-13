const timeElement = document.getElementById("time");
const secondsElement = document.getElementById("seconds");
const dateElement = document.getElementById("date");

const batteryElement = document.getElementById("battery");
const connectionElement = document.getElementById("connection");

const heartRateElement = document.getElementById("heartRate");
const stepsElement = document.getElementById("steps");
const temperatureElement = document.getElementById("temperature");

const watchFace = document.getElementById("watchFace");
const appsScreen = document.getElementById("appsScreen");
const detailScreen = document.getElementById("detailScreen");

const homeButton = document.getElementById("homeButton");
const appsButton = document.getElementById("appsButton");
const backButton = document.getElementById("backButton");

const detailIcon = document.getElementById("detailIcon");
const detailTitle = document.getElementById("detailTitle");
const detailValue = document.getElementById("detailValue");
const detailText = document.getElementById("detailText");

const nextFaceButton = document.getElementById("nextFace");
const batteryButton = document.getElementById("batteryButton");

const appButtons = document.querySelectorAll(".watch-app-button");
const popularApps = {};


/* =========================
   WATCH DATA
========================= */

let battery = 86;
let heartRate = 78;
let steps = 4286;
let temperature = 28;

let faceNumber = 0;


/* =========================
   CLOCK
========================= */

function updateClock() {

  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let displayHours = hours;

  if (displayHours < 10) {
    displayHours = "0" + displayHours;
  }

  const displayMinutes =
    minutes < 10 ? "0" + minutes : minutes;

  const displaySeconds =
    seconds < 10 ? "0" + seconds : seconds;

  timeElement.textContent =
    `${displayHours}:${displayMinutes}`;

  secondsElement.textContent =
    displaySeconds;

  const days = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
  ];

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];

  dateElement.textContent =
    `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

}


/* =========================
   BATTERY
========================= */

function updateBattery() {

  batteryElement.textContent =
    `🔋 ${battery}%`;

  if (battery <= 20) {
    batteryElement.style.color = "#ff4d67";
  } else {
    batteryElement.style.color = "#d8dee7";
  }

}


/* =========================
   SIMULATE BATTERY
========================= */

function drainBattery() {

  /*
    Slowly reduce the simulated battery.
    It will never go below 5%.
  */

  if (battery > 5) {
    battery -= 1;
  }

  updateBattery();

}


/* =========================
   HEART RATE
========================= */

function updateHeartRate() {

  const change =
    Math.floor(Math.random() * 7) - 3;

  heartRate += change;

  if (heartRate < 65) {
    heartRate = 65;
  }

  if (heartRate > 95) {
    heartRate = 95;
  }

  heartRateElement.textContent =
    heartRate;

}


/* =========================
   STEPS
========================= */

function updateSteps() {

  /*
    Simulate occasional walking.
  */

  if (Math.random() > 0.45) {
    steps += Math.floor(
      Math.random() * 8
    );
  }

  stepsElement.textContent =
    steps.toLocaleString();

}


/* =========================
   WEATHER
========================= */

function updateWeather() {

  const change =
    Math.floor(Math.random() * 3) - 1;

  temperature += change;

  if (temperature < 20) {
    temperature = 20;
  }

  if (temperature > 40) {
    temperature = 40;
  }

  temperatureElement.textContent =
    `${temperature}°C`;

}


/* =========================
   CONNECTION
========================= */

function updateConnection() {

  connectionElement.textContent = "●";
  connectionElement.style.color =
    "#52e889";

}


/* =========================
   HOME SCREEN
========================= */

function showHome() {

  watchFace.style.display = "flex";

  appsScreen.classList.remove("active");
  detailScreen.classList.remove("active");

}


/* =========================
   APPS SCREEN
========================= */

function showApps() {

  watchFace.style.display = "none";

  appsScreen.classList.add("active");
  detailScreen.classList.remove("active");

}


/* =========================
   DETAIL SCREEN
========================= */

function showDetail(app) {

  watchFace.style.display = "none";

  appsScreen.classList.remove("active");

  detailScreen.classList.add("active");


  if (app === "heart") {

    detailIcon.textContent = "❤️";

    detailTitle.textContent =
      "Heart Rate";

    detailValue.textContent =
      `${heartRate} BPM`;

    detailText.textContent =
      "Current simulated heart rate";

  }


  else if (app === "steps") {

    detailIcon.textContent = "👟";

    detailTitle.textContent =
      "Steps";

    detailValue.textContent =
      steps.toLocaleString();

    detailText.textContent =
      "Steps walked today";

  }


  else if (app === "weather") {

    detailIcon.textContent = "☀️";

    detailTitle.textContent =
      "Weather";

    detailValue.textContent =
      `${temperature}°C`;

    detailText.textContent =
      "Current simulated temperature";

  }


  else if (app === "music") {

    detailIcon.textContent = "🎵";

    detailTitle.textContent =
      "Music";

    detailValue.textContent =
      "▶";

    detailText.textContent =
      "No music currently playing";

  }


  else if (app === "messages") {

    detailIcon.textContent = "🔔";

    detailTitle.textContent =
      "Notifications";

    detailValue.textContent =
      "3";

    detailText.textContent =
      "You have 3 new notifications";

  }


  else if (app === "settings") {

    detailIcon.textContent = "⚙️";

    detailTitle.textContent =
      "Settings";

    detailValue.textContent =
      "Z56";

    detailText.textContent =
      "Watch settings and information";

  }

}


/* =========================
   WATCH FACE SWITCHING
========================= */

function changeWatchFace() {

  faceNumber++;

  if (faceNumber > 2) {
    faceNumber = 0;
  }


  if (faceNumber === 0) {

    watchFace.style.background =
      "transparent";

    timeElement.style.fontSize =
      "66px";

    timeElement.style.letterSpacing =
      "-3px";

  }


  else if (faceNumber === 1) {

    watchFace.style.background =
      "radial-gradient(circle, rgba(56,189,248,0.12), transparent 65%)";

    timeElement.style.fontSize =
      "62px";

    timeElement.style.letterSpacing =
      "0";

  }


  else if (faceNumber === 2) {

    watchFace.style.background =
      "radial-gradient(circle, rgba(255,77,103,0.12), transparent 65%)";

    timeElement.style.fontSize =
      "58px";

    timeElement.style.letterSpacing =
      "2px";

  }

}


/* =========================
   BATTERY BUTTON
========================= */

function showBatteryInfo() {

  showDetail("settings");

  detailIcon.textContent = "🔋";

  detailTitle.textContent =
    "Battery";

  detailValue.textContent =
    `${battery}%`;

  detailText.textContent =
    battery > 20
      ? "Battery level is good"
      : "Battery is getting low";

}


/* =========================
   NAVIGATION
========================= */

homeButton.addEventListener(
  "click",
  showHome
);

appsButton.addEventListener(
  "click",
  showApps
);

backButton.addEventListener(
  "click",
  showApps
);


/* =========================
   APP BUTTONS
========================= */

appButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const app =
        button.dataset.app;

      showDetail(app);

    }
  );

});


/* =========================
   EXTERNAL CONTROLS
========================= */

nextFaceButton.addEventListener(
  "click",
  changeWatchFace
);

batteryButton.addEventListener(
  "click",
  showBatteryInfo
);


/* =========================
   INITIALIZE
========================= */

updateClock();
updateBattery();
updateConnection();

heartRateElement.textContent =
  heartRate;

stepsElement.textContent =
  steps.toLocaleString();

temperatureElement.textContent =
  `${temperature}°C`;


/* =========================
   LIVE UPDATES
========================= */

setInterval(
  updateClock,
  1000
);

setInterval(
  updateHeartRate,
  5000
);

setInterval(
  updateSteps,
  4000
);

setInterval(
  updateWeather,
  15000
);

setInterval(
  drainBattery,
  60000
);
