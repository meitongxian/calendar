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

function updateSelected() {

    let now = new Date();

    let yearNumber = now.getFullYear();

    let isLeapYear = leapYear(yearNumber);

    function leapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    //place months
    let monthsWrapper = document.querySelector(".months-wrapper");
    placeNumbers(12, monthsWrapper, now.getMonth() + 1);


    //place days
    let daysWrapper = document.querySelector(".days-wrapper");
    let daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let daysTotal;

    if (isLeapYear == true) {
        daysTotal = 28;
    } else {
        daysTotal = daysInMonth[now.getMonth()];
    }
    document.querySelector(".days-total").innerHTML = daysTotal;
    placeNumbers(daysTotal, daysWrapper, now.getDate());
    

    //place hours
    let hoursWrapper = document.querySelector(".hours-wrapper");
    placeNumbers(24, hoursWrapper, now.getHours());


    //place minutes
    let minutesWrapper = document.querySelector(".minutes-wrapper");
    placeNumbers(60, minutesWrapper, now.getMinutes());


    //place seconds
    let secondsWrapper = document.querySelector(".seconds-wrapper");
    placeNumbers(60, secondsWrapper, now.getSeconds());

    setTimeout(updateSelected, 1000);
}

updateSelected();



function placeNumbers(total, wrapper, selected) {
    wrapper.innerHTML = "";
 
    const radiusX = window.innerWidth / 2 * 0.9;
    const radiusY = window.innerHeight / 2 * 0.9;
 
    for (let i = 1; i <= total; i++) {
        let angle = (i * (Math.PI * 2 / total)) - Math.PI / 2;
        let x = window.innerWidth / 2 + Math.cos(angle) * radiusX;
        let y = window.innerHeight / 2 + Math.sin(angle) * radiusY;
        const unitNumber = document.createElement("span");
        unitNumber.textContent = i;
        unitNumber.style.left = `${x}px`;
        unitNumber.style.top = `${y}px`;

        if (i == selected) {
            unitNumber.className = "number number-selected mono";
        } else {
            unitNumber.className = "number mono";
        }

        wrapper.appendChild(unitNumber);
    }
}