const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');

function updateClock() {
    const now = new Date();

    const Time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    const weekday = now.toLocaleDateString([], {weekday: 'long'});
    const Month = now.toLocaleDateString([], {month:'short'});
    const day = now.toLocaleDateString([], {day: '2-digit'});
    const year = now.toLocaleDateString([], {year: 'numeric'});

    timeDisplay.textContent = Time;
    dateDisplay.textContent = weekday + " - " + Month + " " + day + ", " + year;

}

setInterval(updateClock, 1000);
updateClock();