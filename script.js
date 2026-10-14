
let currentPage = 0;
const pages = document.querySelectorAll(".page");
let scrolling = false;

const scrollDelay = 1200;
const mobileView = window.matchMedia("(max-width: 700px)");

function initializePages() {
  if (mobileView.matches) {
    // Mobile: show all sections for normal touch scrolling.
    pages.forEach((page) => {
      page.classList.remove("hidden");
      page.classList.add("active");
    });

    scrolling = false;
    return;
  }

  // Desktop: show one section at a time.
  pages.forEach((page) => {
    page.classList.remove("active");
    page.classList.add("hidden");
  });

  if (pages.length > 0) {
    currentPage = 0;
    pages[0].classList.remove("hidden");
    pages[0].classList.add("active");
  }
}

function switchPage(next) {
  if (
    mobileView.matches ||
    scrolling ||
    next < 0 ||
    next >= pages.length
  ) {
    return;
  }

  scrolling = true;

  pages[currentPage].classList.remove("active");
  pages[currentPage].classList.add("hidden");

  pages[next].classList.remove("hidden");
  pages[next].classList.add("active");

  currentPage = next;

  setTimeout(() => {
    scrolling = false;
  }, scrollDelay);
}

window.addEventListener("wheel", (event) => {
  if (mobileView.matches || scrolling) return;

  if (event.deltaY > 0) {
    switchPage(currentPage + 1);
  } else if (event.deltaY < 0) {
    switchPage(currentPage - 1);
  }
});

window.addEventListener("keydown", (event) => {
  if (mobileView.matches) return;

  if (
    event.key === "ArrowDown" ||
    event.key === "PageDown"
  ) {
    event.preventDefault();
    switchPage(currentPage + 1);
  } else if (
    event.key === "ArrowUp" ||
    event.key === "PageUp"
  ) {
    event.preventDefault();
    switchPage(currentPage - 1);
  }
});

mobileView.addEventListener("change", initializePages);

initializePages();
