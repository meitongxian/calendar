// resize vh for mobile
mobileResize();

function mobileResize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', () => {
    mobileResize();
});


// load numbers

let now = new Date();

let yearNumber = now.getFullYear();

let isLeapYear = leapYear(yearNumber);

function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

let dayTotal = 365;

if (isLeapYear == true) {
    dayTotal = 366;
}

let numbersWrapper = document.querySelector(".numbers-wrapper");
 
placeNumbers();
 
function placeNumbers() {
    numbersWrapper.innerHTML = "";
 
    const radiusX = window.innerWidth / 2 * 0.9;
    const radiusY = window.innerHeight / 2 * 0.9;
 
    for (let i = 1; i <= dayTotal; i++) {
        let angle = (i * (Math.PI * 2 / dayTotal) - Math.PI / 2) - (Math.PI / dayTotal);
        let x = window.innerWidth / 2 + Math.cos(angle) * radiusX;
        let y = window.innerHeight / 2 + Math.sin(angle) * radiusY;
        const dayNumber = document.createElement("span");
        dayNumber.textContent = i;
        dayNumber.style.left = `${x}px`;
        dayNumber.style.top = `${y}px`;

        let currentDay = getDate();

        if (i == currentDay) {
            dayNumber.className = "number number-selected mono";
        } else {
            dayNumber.className = "number mono";
        }

        numbersWrapper.appendChild(dayNumber);
    }
}
 
window.addEventListener('resize', placeNumbers);

function getDate() {
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}
