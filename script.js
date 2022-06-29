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
  getCountryAndNeighbour('holland');
});

//challenge1
// const whereAmI = function (lat, lng) {
//   return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error('slow down!');
//       return res.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city},${data.country},`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('Country not found!');
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => renderError(err));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//259 build promise
// const lotteryPromise = new Promise((resolve, reject) => {
//   console.log('Your destiny depends on this!');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) resolve('You are rich now!');
//     else reject(new Error('You have no soul!'));
//   }, 1000);
//   console.log('Please be seated!');
// });

// lotteryPromise
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => console.error(err));

// //promisfying settimeout
const wait = function (sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`You have waited ${sec} seconds`);
    }, sec * 1000);
  });
};

// wait(2)
//   .then(res => {
//     console.log(res);
//     return wait(3);
//   })
//   .then(res => {
//     console.log(res);
//     return wait(4);
//   })
//   .then(res => {
//     console.log(res);
//     return wait(5);
//   })
//   .then(res => console.log(res));

// //resolve right away
// Promise.resolve(5 / 100).then(res => console.log(res));
// Promise.reject('Yh 5986$%#$').catch(err => console.error(err));

//promisfying getGeoLocation
// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(res => {
//   const { latitude: lat, longitude: lng } = res.coords;
//   whereAmI(lat, lng);
// });

//challenge 2
// const hold = document.querySelector('.images');

// const createImage = function (url) {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = url;
//     img.addEventListener('load', () => {
//       hold.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', () => {
//       reject(new Error('no photo'));
//     });
//   });
// };
// let currImg;
// createImage('img/img-1.jpg')
//   .then(res => {
//     console.log(res);
//     currImg = res;
//     return wait(1);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(res => {
//     currImg = res;
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none';
//   })
//   .catch(err => alert(err));
// //async await
// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     const geoRes = await getPosition();
//     //   const geoData = await geoRes.json();
//     const { latitude: lat, longitude: lng } = geoRes.coords;

//     const res = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!res.ok) throw new Error('slow down!🐚');
//     const data = await res.json();
//     console.log(`You are in ${data.city},${data.country}`);
//     const res2 = await fetch(
//       `https://restcountries.com/v3.1/name/${data.country}`
//     );
//     if (!res2.ok) throw new Error('Country cannot found!🐚');
//     const data2 = await res2.json();
//     renderCountry(data2[0]);
//     return `${data.country}!!!You are in ${data.city},`;
//   } catch (err) {
//     console.error('👟👟👟');
//     renderError(err);

//     throw err;
//   }
// };

// whereAmI();
// whereAmI();

// console.log('I am hungry');

// //using IFEE
// (async function () {
//   try {
//     const loc = await whereAmI();
//     console.log(loc);
//   } catch (err) {
//     alert(err.message);
//   }
// })();

//promise.all

// function getJSON(url, errorMsg) {
//     return fetch(url).then(res => {
//       if (!res.ok) {
//         throw new Error(`!!!❌❌❌ ${errorMsg}, ${res.status}`);
//       }
//       return res.json();
//     });
//   }
const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    data.map(el => {
      console.log(el[0].capital);
    });
  } catch (err) {
    console.log(err);
  }
};
// get3Countries('usa', 'japan', 'france');

//promise.race
const race = async function (c1, c2, c3) {
  try {
    const winner = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
      wait(1),
    ]);
    console.log(winner[0].name);
  } catch (err) {
    console.log(err);
  }
};

// race('germany', 'Korea', 'africa');

//promise.allsettled
const race2 = async function (c1, c2, c3) {
  try {
    const winner = await Promise.allSettled([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
      wait(2),
    ]);
    console.log(winner);
  } catch (err) {
    console.log(err);
  }
};
// race2('germany', 'Koreaa', 'africa');

//Promise.any
const race3 = async function (c1, c2, c3) {
  try {
    const winner = await Promise.any([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
      wait(2),
    ]);
    console.log(winner);
  } catch (err) {
    console.log(err);
  }
};
race3('germany', 'Koreaa', 'africa');
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
