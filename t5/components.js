'use strict';
/*const restaurantRow = () => {
  const name = restaurant.name;
  const company = restaurant.company;
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${name}</td><td>${company}</td>`;
  return tr;
};*/

const restaurantRow = restaurant => {
  const {name, company} = restaurant;
  const tr = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.innerText = name;
  const companyCell = document.createElement('td');
  companyCell.innerText = company;
  tr.appendChild(nameCell);
  tr.appendChild(companyCell);
  return tr;
};

/*
const restaurantModal = (restaurant, menu) => {
  const {name, address, city, postalCode, phone} = restaurant;
  const html = `<h3>${restaurant.name}</h3>
      <p>${restaurant.company}</p>
      <p>${restaurant.address} ${restaurant.postalCode} ${restaurant.city}</p>
      <p>${restaurant.phone}</p>`;

  let menuHtml = `
      <table>
        <tr>
          <th>Course</th>
          <th>Diet</th>
          <th>Price</th>
        </tr>
      `;

  for (const course of menu.courses) {
    const {name, diets, price} = course;
  }
};
*/

const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, city, phone, company} = restaurant;
  let html = `<h3>${name}</h3>
      <p>${company}</p>
      <p>${address} ${postalCode} ${city}</p>
      <p>${phone}</p>`;
  let menuHtml = `
      <table>
        <tr>
          <th>Course</th>
          <th>Diet</th>
          <th>Price</th>
        </tr>
      `;
  for (const course of menu.courses) {
    const {name, diets, price} = course;
    html += `
        <tr>
          <td>${name}</td>
          <td>${diets ?? ' - '}</td>
          <td>${price ?? ' - '}</td>
        </tr>
      `;
  }
  html += '</table>';
  return html;
};

export {restaurantRow, restaurantModal};
