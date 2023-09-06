'use strict';

import {restaurantRow, restaurantModal} from './components.js';
import {fetchData} from './functions.js';
import {apiUrl, positionOptions} from './variables.js';

const modal = document.querySelector('dialog');
modal.addEventListener('click', () => {
  modal.close();
});

const calculateDistance = (
  {latitude: x1, longitude: y1},
  {
    location: {
      coordinates: [x2, y2],
    },
  }
) => {
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return distance;
};

const error = err => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

const success = async pos => {
  try {
    const {coords: crd} = pos;
    const restaurants = await fetchData(`${apiUrl}/restaurants`);
    console.log(restaurants);

    restaurants.sort((a, b) => {
      const distanceA = calculateDistance(crd, a);
      const distanceB = calculateDistance(crd, b);
      return distanceA - distanceB;
    });

    for (const restaurant of restaurants) {
      const tr = restaurantRow(restaurant);

      document.querySelector('table').appendChild(tr);
      tr.addEventListener('click', async () => {
        try {
          // remove all highlights
          const allHighs = document.querySelectorAll('.highlight');
          for (const high of allHighs) {
            high.classList.remove('highlight');
          }
          // add highlight
          tr.classList.add('highlight');
          // add restaurant data to modal
          modal.innerHTML = '';
          // fetch menu
          const menu = await fetchData(
            `${apiUrl}/restaurants/daily/${restaurant._id}/fi`
          );
          console.log(menu);

          const menuHtml = restaurantModal(restaurant, menu);

          modal.insertAdjacentHTML('beforeend', `<table>${menuHtml}</table>`);
          modal.showModal();
        } catch (error) {
          alert(error.message);
        }
      });
    }
  } catch (error) {
    alert(error.message);
  }
};

navigator.geolocation.getCurrentPosition(success, error, positionOptions);
