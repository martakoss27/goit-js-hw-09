import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name=delay]');
const delayStep = document.querySelector('input[name=step]');
const Amount = document.querySelector('input[name=amount]');

form.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  const promiseMy = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promiseMy;
}

function submitForm(event) {
  event.preventDefault();

  let waitDelay = Number(firstDelay.value);
  let amount = Number(Amount.value);
  let waitStep = Number(delayStep.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, waitDelay)
      .then(({ position, delay }) => {
        console.log(position);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    waitDelay += waitStep;
  }
}
