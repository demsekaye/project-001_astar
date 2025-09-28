
(() => {
  const HEADER_HEIGHT = 51;
  const header = document.querySelector('.site-header');
  if (!header) return;

  const hero = document.querySelector('#hero');

  if (!hero) { 
    header.classList.add('after-hero'); 
    return; 
  }

  const observer = new IntersectionObserver(([entry]) => {
    const overHero = entry.isIntersecting && entry.intersectionRatio > 0.4;
    header.classList.toggle('after-hero', !overHero); 
  }, { 
    threshold: [0, 0.4, 1],
    rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`
   });

  observer.observe(hero);
})();

const sidebar = document.getElementById('sidebar');
function toggleSidebar(){
  sidebar.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".reviews-card");
  const prevBtn = document.querySelector(".reviews-prev");
  const nextBtn = document.querySelector(".reviews-next");
  const slides = document.querySelector(".reviews-slides");
  let current = 1; 

  function updateCards() {
    const total = cards.length;

    cards.forEach((card, i) => {
      card.classList.remove("hidden-left", "prev", "active", "next", "hidden-right");
      card.style.zIndex = 1;
    });

    cards.forEach((card, i) => {
      if (i === current) card.classList.add("active");
      else if (i === current - 1) card.classList.add("prev");
      else if (i === current + 1) card.classList.add("next");
      else if (i < current - 1) card.classList.add("hidden-left");
      else if (i > current + 1) card.classList.add("hidden-right");
    });

    setTimeout(() => {
      cards.forEach((card, i) => {
        if (i === current) card.style.zIndex = 3;
        else if (i === current - 1 || i === current + 1) card.style.zIndex = 2;
        else card.style.zIndex = 1;
      });
    }, 50);

    prevBtn.style.display = current === 0 ? "none" : "block";
    nextBtn.style.display = current === total - 1 ? "none" : "block";
  }

  // Buttons
  prevBtn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      updateCards();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (current < cards.length - 1) {
      current++;
      updateCards();
    }
  });

  // Keyboard
  let activeCarousel = null;
  const carousel = document.querySelector(".reviews-carousel");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeCarousel = entry.target;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(carousel);

  document.addEventListener("keydown", (e) => {
    if (activeCarousel !== carousel) return;

    if (e.key === "ArrowLeft" && current > 0) {
      current--;
      updateCards();
    }
    if (e.key === "ArrowRight" && current < cards.length - 1) {
      current++;
      updateCards();
    }
  });

  // Touch / swipe
  let touchStartX = 0;
  let touchEndX = 0;

  slides.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slides.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance > 0 && current > 0) {
      current--;
      updateCards();
    } else if (swipeDistance < 0 && current < cards.length - 1) {
      current++;
      updateCards();
    }
  }


  updateCards();
});

