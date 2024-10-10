import Swiper from 'swiper';

import 'swiper/css';

const swiper = document.querySelector('.swiper').swiper;

document.addEventListener("DOMContentLoaded", async () => {
    const reviewsList = document.getElementById("reviews-list");
    const errorMessage = document.getElementById("error-message");
  
    // Функція для завантаження відгуків із бекенду
    async function loadReviews() {
      try {
        const response = await fetch("https://swiperjs.com/swiper-api"); // Замініть URL на ваш
        if (!response.ok) throw new Error("Failed to fetch reviews");
  
        const reviews = await response.json();
        if (reviews.length === 0) throw new Error("Not found");
  
        reviewsList.innerHTML = ""; // Очищуємо контейнер
        reviews.forEach(review => {
          const reviewItem = document.createElement("li");
          reviewItem.classList.add("swiper-slide");
          reviewItem.textContent = review.text; // Додайте тут інші деталі, якщо потрібно
          reviewsList.appendChild(reviewItem);
        });
  
        initSwiper(); // Ініціалізуємо Swiper після завантаження
      } catch (error) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error: " + error.message;
        reviewsList.innerHTML = "<li class='swiper-slide'>Not found</li>";
      }
    }
  
    // Ініціалізація Swiper
    function initSwiper() {
      new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        on: {
          slideChange: function () {
            // Заблокування кнопок на першому та останньому слайдах
            const swiperInstance = this;
            const prevButton = document.querySelector(".swiper-button-prev");
            const nextButton = document.querySelector(".swiper-button-next");
  
            if (swiperInstance.isBeginning) {
              prevButton.classList.add("swiper-button-disabled");
            } else {
              prevButton.classList.remove("swiper-button-disabled");
            }
  
            if (swiperInstance.isEnd) {
              nextButton.classList.add("swiper-button-disabled");
            } else {
              nextButton.classList.remove("swiper-button-disabled");
            }
          }
        }
      });
    }
  
    // Завантажуємо відгуки під час запуску
    loadReviews();
  });
  

  