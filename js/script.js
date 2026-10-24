// // const weather = prompt(
// //   'Ob havoni kiriting shunga qarab tavsiya beramiz',
// // ).toLowerCase();
// // switch (weather) {
// //   case 'yomgirli':
// //     alert('Soyabon oling!');

// //     break;
// //   case 'qor yogyapti':
// //     alert('Qalinroq kiyining');
// //     break;
// //   case 'quyosh':
// //     alert('Uyda otiring quyosh urishi mumkin');
// //     break;

// //   default:
// //     alert('Bunaqa obu havo yoq');
// //     break;
// // }
// // const number = +prompt('Raqam kiriting');
// // const number2 =
// //   number % 2 === 0 ? 'siz kiritgan raqam juft' : 'siz kiritgan raqam toq';
// // alert(number2);

// // const number = Number(prompt('Raqam kiriting'));
// // const number2 = number > 0 ? 'Musbat' : 'Manfiy';

// // alert(number2);

// // const number = Number(prompt('Balingizni kiriting'));
// // const number2 = number >= 80 ? 'siz otingiz' : 'Balingiz yetmadi';

// // const number1 = +prompt('Birinchi raqamni kiriting');
// // const number2 = +prompt('Ikkinchi raqamni kiriting');

// // function numberBox(number1, number2) {
// //   switch ((number1, number2)) {
// //     case value:
// //       break;

// //     default:
// //       break;
// //   }
// // }

// // const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// // if (numbers.includes(7)) {
// //   console.log('Hello Ronaldo');
// // } else if (numbers.includes(10)) {
// //   console.log('Hello Messi');
// // }

// // for (let index = 1; index <= 10; index++) {
// //   console.log(index);
// // // }
// // const text = document.querySelector('.text');

// // const myName = prompt('Ismingizni kiriting');
// // const newName = myName.split('').reverse();

// // const caratName = newName.join('');
// // text.textContent = caratName;

// const nameIn = document.querySelector('.nameIn');
// const realIn = document.querySelector('.realIn');
// const jobIn = document.querySelector('.jobIn');
// const submit = document.querySelector('.btn');
// const result = document.querySelector('.result');

// submit.addEventListener('click', function () {
//   event.preventDefault();
//   const myObject = {
//     name: nameIn.value,
//     real: realIn.value,
//     job: jobIn.value,
//   };

//   result.innerHTML = `
//   <p>Name:${myObject.name}</p>
//    <p>Relationship:${myObject.real}</p>
//    <p>Job:${myObject.job}</p>

//   `;
// });

const main = document.querySelector('.main');
const search = document.querySelector('.search');
const sort = document.querySelector('.sort');
const filterCountry = document.querySelector('#filter');

let products = JSON.parse(localStorage.getItem('products')) || [];

async function fetchData() {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  localStorage.setItem('products', JSON.stringify(data.products));
  const newData = data.products;
}

fetchData();

function render(data) {
  main.innerHTML = '';

  data.map((item) => {
    const box = document.createElement('div');
    box.classList.add('box');
    const brand = document.createElement('h2');
    const category = document.createElement('h2');
    const price = document.createElement('h2');
    const raiting = document.createElement('h2');
    const img = document.createElement('img');

    brand.textContent = item.brand;
    category.textContent = item.category;
    price.textContent = item.price;
    raiting.textContent = item.raiting;

    img.src = item.images[0];
    img.alt = 'error';

    img.classList.add('rasm');

    box.appendChild(img);
    box.appendChild(brand);
    box.appendChild(category);
    box.appendChild(price);
    box.appendChild(raiting);
    main.appendChild(box);
  });
}

render(products);

search.addEventListener('input', () => {
  const value = search.value.toLowerCase().trim();
  const result = products.filter((item) =>
    item.title.toLowerCase().trim().includes(value),
  );

  render(result);
});

sort.addEventListener('change', () => {
  const value = sort.value;
  const result = [...products];

  if (value === 'inc') {
    result.sort((a, b) => a.rating - b.rating);
  }
  if (value === 'dec') {
    result.sort((a, b) => b.rating - a.rating);
  }
  console.log(result);

  render(result);
});

filterCountry.addEventListener('change', () => {
  const value = filterCountry.value;

  if (value === 'all') {
    render(products);
    return;
  } else {
    const results = products.filter((product) => {
      return product.category === value;
    });
    render(results);
  }
});
