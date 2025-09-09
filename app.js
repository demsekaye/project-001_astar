(() => {
  const HEADER_HEIGHT = 51;
  const header = document.querySelector('.site-header');
  if (!header) return;

  const hero = document.querySelector('#hero');

  if (!hero) { header.classList.add('after-hero'); return; }

  const observer = new IntersectionObserver(([entry]) => {
    const overHero = entry.isIntersecting && entry.intersectionRatio > 0.4;
    header.classList.toggle('after-hero', !overHero); 
  }, { 
    threshold: [0, 0.4, 1],
    rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`
   });

  observer.observe(hero);
})();

const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('show')
}