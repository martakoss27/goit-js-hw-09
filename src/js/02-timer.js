import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTime = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

btnStart.disabled = true;

let result = null;
let chosenDate = new Date(dateTime.value).getTime();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      chosenDate = selectedDates[0];
    }
  },
};

flatpickr(dateTime, options);

btnStart.addEventListener('click', startClick);

function startClick() {
  btnStart.disabled = true;
  counting();
}

function counting() {
  let timer = setInterval(() => {
    result = chosenDate - new Date();
    console.log(result);
    const dateValue = convertMs(result);

    if (result < 0) {
      clearInterval(timer);
    } else {
      timerElements(dateValue);
    }
  }, 1000);
  console.log(chosenDate);
}

function timerElements(dateValue) {
  daysValue.textContent = dateValue.days;
  hoursValue.textContent = dateValue.hours;
  minutesValue.textContent = dateValue.minutes;
  secondsValue.textContent = dateValue.seconds;

  console.log(timerElements);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
