let currentPage = 0;
const pages = document.querySelectorAll('.page');
let scrolling = false;

const scrollDelay = 1200; // delay between scrolls (1.2s)

pages.forEach(p => p.classList.add('hidden'));
pages[0].classList.add('active');
pages[0].classList.remove('hidden');

function switchPage(next) {
  if (next < 0 || next >= pages.length) return;
  
  scrolling = true;

  pages[currentPage].classList.remove('active');
  pages[currentPage].classList.add('hidden');

  pages[next].classList.remove('hidden');
  pages[next].classList.add('active');

  currentPage = next;

  setTimeout(() => scrolling = false, scrollDelay);
}

let lastScroll = 0;

window.addEventListener('wheel', (e) => {
  const now = Date.now();
  if (now - lastScroll < scrollDelay) return;
  lastScroll = now;

  if (e.deltaY > 0) switchPage(currentPage + 1);
  else switchPage(currentPage - 1);
});
