document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const menu = document.getElementById("menu");
  const body = document.body;
  const btnToggle = document.querySelector(".repair-btn button");
  const wrapper = document.querySelector(".repair-slider");
  const swiperWrapper = wrapper.querySelector(".swiper-wrapper");
  const servicesOpen = document.querySelector(".services__btn button");
  const servicesItems = document.querySelector(".services__items");
  const tabs = document.querySelectorAll(".price__tab");
  const contents = document.querySelectorAll("[data-tab-content]");
  const modal = document.querySelector(".feedback-modal");
  const promotionWrapper = document.querySelector(
    ".promotionSwiper .swiper-wrapper"
  );
  const originalHTML = promotionWrapper.innerHTML;

  let expanded = false;
  let service = false;
  let repairSwiper = initRepairSwiper();
  let promotionSwiper;

  // Слайдеры
  function initRepairSwiper() {
    return new Swiper(".repair-slider", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: { el: ".swiper-pagination" },
    });
  }

  function initPromotionSwiper() {
    if (promotionSwiper) promotionSwiper.destroy(true, true);
    promotionSwiper = new Swiper(".promotionSwiper", {
      slidesPerView: 2,
      spaceBetween: 16,
      centeredSlides: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        991: { slidesPerView: "auto", spaceBetween: 30 },
        768: { slidesPerView: 2, spaceBetween: 16 },
        375: { slidesPerView: 1, spaceBetween: 16 },
      },
    });
  }

  function restructureSlidesForMobile() {
    const items = Array.from(
      promotionWrapper.querySelectorAll(".promotion__item")
    );
    promotionWrapper.innerHTML = "";
    items.forEach((item) => {
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
      initPromotionSwiper();
    } else {
      restoreOriginalSlides();
      initPromotionSwiper();
    }
  }

  // Скролл шапки
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 0);
  });

  // Меню
  openMenu?.addEventListener("click", () => {
    menu.classList.add("open");
    body.classList.add("shadow");
  });

  closeMenu?.addEventListener("click", () => {
    menu.classList.remove("open");
    body.classList.remove("shadow");
  });

  // "Показать все" для ремонта
  btnToggle?.addEventListener("click", () => {
    expanded = !expanded;
    if (expanded) {
      repairSwiper.destroy(true, true);
      wrapper.classList.add("expanded");
      btnToggle.textContent = "Скрыть";
    } else {
      repairSwiper = initRepairSwiper();
      wrapper.classList.remove("expanded");
      btnToggle.textContent = "Показать все";
    }
  });

  // Услуги "показать все"
  servicesOpen?.addEventListener("click", () => {
    service = !service;
    servicesItems.classList.toggle("service", service);
    servicesOpen.textContent = service ? "Скрыть" : "Показать все";
  });

  // Слайдеры
  new Swiper(".aboutSwiper", {
    pagination: { el: ".swiper-pagination", type: "fraction" },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  new Swiper(".sertSwiper", {
    slidesPerView: 3,
    spaceBetween: 16,
    pagination: { el: ".swiper-pagination" },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      991: { slidesPerView: 3, spaceBetween: 15 },
      768: { slidesPerView: 2, spaceBetween: 15 },
      576: { slidesPerView: 2, spaceBetween: 10 },
      400: { slidesPerView: 2, spaceBetween: 10 },
      375: { slidesPerView: 1, spaceBetween: 10 },
    },
  });

  // Табы
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
  tabs[0]?.click();

  // Обработка модалки через делегирование (главная правка)
  document.addEventListener("click", (e) => {
    const button = e.target.closest(".open-form-btn");
    if (button) {
      modal?.classList.add("active");
      body.classList.add("lock");
    }
    if (modal && e.target === modal) {
      modal.classList.remove("active");
      body.classList.remove("lock");
    }
  });

  // Маска
  if (window.jQuery) {
    $(".phone").mask("+7(999) 999-99-99");
  }

  // Resize
  window.addEventListener("resize", handleResize);
  handleResize();
});
