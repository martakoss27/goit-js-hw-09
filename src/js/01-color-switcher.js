const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  timerId = setInterval(event => {
    const currentColor = (document.body.style.backgroundColor =
      getRandomHexColor());
  }, 1000);
  stopBtn.disabled = false;
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  console.log(`Interval has stopped!`);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
