const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

addEventListener("DOMContentLoaded", function () {
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const menu = document.getElementById("menu");
  const body = document.querySelector("body");

  openMenu.addEventListener("click", function () {
    menu.classList.add("open");
    body.classList.add("shadow");
  });

  closeMenu.addEventListener("click", function () {
    menu.classList.remove("open");
    body.classList.remove("shadow");
  });
});

const btnToggle = document.querySelector(".repair-btn button");
const wrapper = document.querySelector(".repair-slider");
const swiperWrapper = wrapper.querySelector(".swiper-wrapper");

let repairSwiper = initSwiper();
let expanded = false;

function initSwiper() {
  return new Swiper(".repair-slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

btnToggle.addEventListener("click", () => {
  expanded = !expanded;
  if (expanded) {
    repairSwiper.destroy(true, true); // уничтожаем
    wrapper.classList.add("expanded");
    btnToggle.textContent = "Скрыть";
  } else {
    repairSwiper = initSwiper(); // заново инициализируем
    wrapper.classList.remove("expanded");
    btnToggle.textContent = "Показать все";
  }
});

const servicesOpen = document.querySelector(".services__btn button");
const servicesItems = document.querySelector(".services__items");
let service = false;

servicesOpen.addEventListener("click", () => {
  service = !service;
  if (service) {
    servicesItems.classList.add("service");
    servicesOpen.textContent = "Скрыть";
  } else {
    servicesItems.classList.remove("service");
    servicesOpen.textContent = "Показать все";
  }
});

var aboutSwiper = new Swiper(".aboutSwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let promotionSwiper;
const promotionWrapper = document.querySelector(
  ".promotionSwiper .swiper-wrapper"
);

// Сохраняем оригинальный HTML (внутренние слайды со всеми item'ами)
const originalHTML = promotionWrapper.innerHTML;

function initPromotionSwiper(slidesPerView = 1) {
  if (promotionSwiper) promotionSwiper.destroy(true, true);
  promotionSwiper = new Swiper(".promotionSwiper", {
    slidesPerView: 2,
    spaceBetween: 16,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      991: {
        slidesPerView: "auto",
        spaceBetween: 30,
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      375: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
    },
  });
}

function restructureSlidesForMobile() {
  const allItems = Array.from(
    promotionWrapper.querySelectorAll(".promotion__item")
  );

  promotionWrapper.innerHTML = "";

  allItems.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.appendChild(item.cloneNode(true));
    promotionWrapper.appendChild(slide);
  });
}

function restoreOriginalSlides() {
  promotionWrapper.innerHTML = originalHTML;
}

function handleResize() {
  if (window.innerWidth <= 991) {
    restructureSlidesForMobile();
    initPromotionSwiper(1);
  } else {
    restoreOriginalSlides();
    initPromotionSwiper(2);
  }
}

const tabs = document.querySelectorAll(".price__tab");
const contents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    contents.forEach((c) => {
      c.style.display = c.dataset.tabContent === target ? "flex" : "none";
    });
  });
});

tabs[0].click();

window.addEventListener("DOMContentLoaded", handleResize);
window.addEventListener("resize", handleResize);

const openBtn = document.querySelectorAll(".open-form-btn");
const modal = document.querySelector(".feedback-modal");

openBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.add("active");
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

var sertSwiper = new Swiper(".sertSwiper", {
  slidesPerView: 3,
  spaceBetween: 16,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    991: {
      slidesPerView: 3,
      spaceBetween: 15,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    400: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
});

$(".phone").mask("+7(999) 999-99-99");
