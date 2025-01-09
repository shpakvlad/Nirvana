//*** set hero background photo
const container = document.getElementById('section__hero-img-container');

// Настройки
const displayTime = 2500; // Время показа изображения
const cyclePause = 4000; // Время между циклами
const maxMovement = 100; // Максимальное смещение в пикселах
let lastImage;  //последнее фото, что бы не было повтора

function getRandomOffset() {
  return Math.random() * maxMovement * 2 - maxMovement; // Смещение от -100 до 100
}

function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 300);
  return {x, y};
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomImage() {
  let randomImage;
  do {
    randomImage = `./img/img${randomInteger(1, 35)}.jpg`;
  } while (randomImage === lastImage);
  lastImage = randomImage;
  return randomImage;
}

function showImage() {
  const img = document.createElement('img');
  const randomImage = getRandomImage();
  const startPosition = getRandomPosition();

  img.src = randomImage;
  img.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px)`;
  container.appendChild(img);

  // Показываем изображение
  setTimeout(() => {
    img.style.opacity = '0.3';

    // Смещение на случайное расстояние в пределах 100px
    const offsetX = getRandomOffset();
    const offsetY = getRandomOffset();
    img.style.transform = `translate(${startPosition.x + offsetX}px, ${startPosition.y + offsetY}px)`;
  }, 50);

  // Убираем изображение
  setTimeout(() => {
    img.style.opacity = '0';
    setTimeout(() => {
      container.removeChild(img);
    }, 3000); // Удаление через 1 сек после исчезновения
  }, displayTime);
}

function startCycle() {
  showImage();
  setTimeout(startCycle, displayTime + cyclePause);
}

startCycle();

//*** Swiper
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal', autoplay: 5000, slidesPerView: 1, loop: true,

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',
  },
});

//*** Fill gallery
let start = false;
const gallery = document.querySelector('.gallery__wrapper');

function fillGallery() {
  let counts = 12;
  if (!start) {
    gallery.innerHTML = '';
    if (window.innerWidth < 500) counts = 4;

    for (let i = 0; i < counts; i++) {
      const randomNumber = randomInteger(1, 35);

      const li = document.createElement('li');
      li.classList.add('gallery__item');

      const randomImage = getRandomImage();
      const img = document.createElement('img');
      img.src = randomImage;
      img.classList.add('gallery__image');

      li.appendChild(img)

      gallery.appendChild(li);
    }
  }
  start = true;
}

fillGallery();

//refresh gallery
document.querySelector('.gallery__refresh-btn')
  .addEventListener('click', e) => {
    start = false;
    fillGallery();
  });

//dialog
const dialogFormAuthor = document.querySelector('#dialog__from-author');
//dialog show
document.querySelector('.dialog__form-author-open')
  .addEventListener('click', () => {
    dialogFormAuthor.showModal();
});

//dialog close
document.querySelector('.dialog__button-close')
  .addEventListener('click', () => {
    dialogFormAuthor.close();
});

//dialog close
dialogFormAuthor.addEventListener('click', (e) => {
  if (e.target === dialogFormAuthor) {
    dialogFormAuthor.close();
  }
});
