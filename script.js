'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const currencies = Object.values(data.currencies);
  const language = Object.values(data.languages);
  const html = `
      <article class= "country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.official}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${language[0]}</p>
        <p class="country__row"><span>💰</span>${currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

//old way of doing AJAX
// function getCountryAndNeighbour(country) {
//   const req = new XMLHttpRequest();
//   req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   req.send();

//   req.addEventListener('load', function () {
//     const [data] = JSON.parse(req.responseText);
//     console.log(data);
//     renderCountry(data);
//     if (!data.borders) return;
//     const neighbour = data.borders?.[0];

//     const req2 = new XMLHttpRequest();
//     req2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     req2.send();
//     req2.addEventListener('load', function () {
//       const [data] = JSON.parse(req2.responseText);
//       renderCountry(data, 'neighbour');
//     });
//   });
// }

// getCountryAndNeighbour('britain');

//Using Promise
function renderError(err) {
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentText('beforeend', err);
}

function getJSON(url, errorMsg) {
  return fetch(url).then(res => {
    if (!res.ok) {
      throw new Error(`!!!❌❌❌ ${errorMsg}, ${res.status}`);
    }
    return res.json();
  });
}

function getCountryAndNeighbour(country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'country not found')
    .then(data => {
      renderCountry(data[0]);
      if (!data[0].borders) throw new Error('no neighbour');
      const neighbour = data[0].borders?.[0];
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'country not found'
      );
    })
    .then(data2 => renderCountry(data2[0], 'neighbour'))
    .catch(err => {
      renderError(`something went wrong.....,${err.message}`);
      console.log(err.message, 'something went wrong.....');
    });
}

btn.addEventListener('click', () => {
  getCountryAndNeighbour('japan');
});

///////////////////////////////////////

// function getCountries(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText)[0];
//     console.log(data);
//
//     console.log(neighbour);

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//     });

// const html = `
//       <article class="country">
//               <img class="country__img" src="${data.flags.png}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.name.common}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(
//                   +data.population / 1000000
//                 ).toFixed(1)}M people</p>
//                 <p class="country__row"><span>🗣️</span>${language}</p>
//                 <p class="country__row"><span>💰</span>${currency}</p>
//               </div>
//             </article>
//       `;

// countriesContainer.insertAdjacentHTML('beforebegin', html);

// const getCountries = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       //   console.log(data[0]);
//       if (!data[0].borders) throw new Error('There is no neighbour');
//       const neighbour = data[0]?.borders[0];

//       getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(data => renderCountry(data, 'neighbour'));
//   // .catch(err => {
//   //   renderError(err);
//   // });
// };

// const getJSON = function (url, err = 'Something went wrong') {
//   return fetch(url).then(res => {
//     if (!res.ok) throw new Error(`${err} (${res.status})`);

//     return res.json();
//   });
// };

// const renderCountry = function (data, className = '') {
//   const lk = Object.keys(data.languages)[0];
//   const language = data.languages[lk];
//   const ck = Object.keys(data.currencies)[0];
//   const currency = data.currencies[ck].name;

//   const html = `
//       <article class="country ${className}">
//               <img class="country__img" src="${data.flags.png}" />
//               <div class="country__data">
//                 <h3 class="country__name">${data.name.common}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(
//                   +data.population / 1000000
//                 ).toFixed(1)}M people</p>
//                 <p class="country__row"><span>🗣️</span>${language}</p>
//                 <p class="country__row"><span>💰</span>${currency}</p>
//               </div>
//             </article>
//       `;

//   countriesContainer.style.opacity = 1;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
// };

// const renderError = function (msg) {
//   countriesContainer.style.opacity = 1;
//   countriesContainer.insertAdjacentText('beforeend', msg);
// };

// const country = getCountries('cn');

//challenge 1

// whereAmI(19.037, 72.873);
// whereAmI(52.508, 13.381);
// whereAmI(-33.933, 18.474);

// const lotteryWin = new Promise(function (resolve, reject) {
//   console.log('You destiny is pending now!');
//   setTimeout(() => {
//     if (Math.random() > 0.5) resolve('You are rich now!');
//     else reject('You lost your soul!');
//   }, 2000);
// });

// lotteryWin.then(res => console.log(res)).catch(err => console.log(err));

// const wait = function (secs) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(`You waited for ${secs} secs`);
//     }, secs * 1000);
//   });
// };

// wait(1).then(res => console.log(res));
// wait(5).then(res => console.log(res));
// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       //console.log(res.status);
//       if (res.status === 403) throw new Error('Do not send request too fast!');
//       return res.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       const country = data.country;

//       return fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(res => res.json())
//         .then(data => console.log(data[0]));
//     })
//     .catch(err => console.log('We have a problem', err));
// };

// whereAmI();

//challenge2
// let currImg;
// const imgBox = document.querySelector('.images');

// const wait = function () {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, 2000);
//   });
// };

// const createImage = function (path) {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = path;
//     img.addEventListener('load', () => {
//       imgBox.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', () => {
//       reject(new Error('Not found'));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(img => {
//     currImg = img;
//     console.log(currImg);
//     return wait();
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     console.log('img2 loaded');
//     currImg = img;
//     return wait();
//   })
//   .then(() => (currImg.style.display = 'none'))
//   .catch(err => console.log(err));

//async await
// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     const res = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

//     if (!res.ok) throw new Error('Do not send request too fast!');
//     const data = await res.json();
//     //console.log(`You are in ${data.city}, ${data.country}`);
//     const country = data.country;

//     const countryData = await fetch(
//       `https://restcountries.com/v3.1/name/${country}`
//     );
//     if (!countryData.ok) throw new Error('country cant be found!');
//     const countryRes = await countryData.json();
//     return `You are still in ${data.city}, ${data.country}`;
//   } catch (err) {
//     console.error('This is our message:', err);
//   }
// };

// whereAmI();
// whereAmI();

// whereAmI().then(mes2 => console.log(mes2));
// const mes = whereAmI();
// console.log(mes);

// const cou = document.querySelector('.countries');
// (async function () {})();
// console.log('hello');
// setTimeout(() => {
//   cou.style.backgroundColor = 'blue';
// }, 5000);
// console.log('dabian');
