const menu = {
  Favorites: [
    ['Super Special', 'A Theo’s Cozy Corner menu highlight'],
    ['Big Boy', 'A Theo’s Cozy Corner menu highlight'],
    ['Steak and Eggs', 'A Theo’s Cozy Corner menu highlight'],
  ],
  'Eggs & Benedict': [
    ['Eggs Benedict #1', 'A Theo’s Cozy Corner menu highlight'],
    ['Eggs Benedict #2', 'A Theo’s Cozy Corner menu highlight'],
    ['Eggs Florentine', 'A Theo’s Cozy Corner menu highlight'],
    ['Supreme Omelet', 'Served with home fries and toast'],
    ['Western Omelet', 'A Theo’s Cozy Corner menu highlight'],
  ],
  Griddle: [
    ['Chocolate Chip Waffle', 'A Theo’s Cozy Corner menu highlight'],
    ['Banana Pancakes', 'A Theo’s Cozy Corner menu highlight'],
    ['Strawberry Waffle', 'A Theo’s Cozy Corner menu highlight'],
  ],
};

const gallery = [
  { src: '/images/theos-breakfast.jpg', alt: 'Breakfast plate and coffee on the counter', title: 'A breakfast at the counter', kind: 'FROM THE RESTAURANT' },
  { src: '/images/theos-interior.jpg', alt: 'Inside Theo’s Cozy Corner on Salem Street', title: 'A look inside', kind: 'FROM THE RESTAURANT' },
  { src: 'https://cdn.uk-restaurants.com/theos-cozy-corner-restaurant/14395-albums-1.jpg', alt: 'Theo’s Cozy Corner restaurant photo', title: 'The neighborhood table', kind: 'RESTAURANT PHOTO' },
  { src: 'https://cdn.uk-restaurants.com/theos-cozy-corner-restaurant/14395-albums-2.jpg', alt: 'Theo’s Cozy Corner restaurant photo', title: 'On Salem Street', kind: 'RESTAURANT PHOTO' },
];

document.documentElement.classList.add('js');

const pageInfo = {
  home: { label: 'Home', title: 'Theo’s Cozy Corner | Breakfast in Boston’s North End', description: 'Breakfast and lunch at Theo’s Cozy Corner, 162 Salem Street in Boston’s North End. Open daily, 6 a.m.–3 p.m. Cash only.' },
  menu: { label: 'Menu', title: 'Menu | Theo’s Cozy Corner', description: 'Menu highlights from Theo’s Cozy Corner on Salem Street in Boston’s North End. Ask the restaurant for current offerings and prices.' },
  story: { label: 'Our Story', title: 'Our Story | Theo’s Cozy Corner', description: 'A little look inside Theo’s Cozy Corner, a neighborhood breakfast and lunch spot on Salem Street in Boston’s North End.' },
  reviews: { label: 'Reviews', title: 'Diner Notes | Theo’s Cozy Corner', description: 'Short review excerpts and rating shown on the supplied restaurant listing for Theo’s Cozy Corner.' },
  photos: { label: 'Photos', title: 'Photos | Theo’s Cozy Corner', description: 'Photos of the breakfast and dining room at Theo’s Cozy Corner in Boston’s North End.' },
  visit: { label: 'Visit', title: 'Visit Theo’s Cozy Corner | North End, Boston', description: 'Find Theo’s Cozy Corner at 162 Salem Street in Boston’s North End. See hours, phone number, and directions.' },
};
const requestedPage = new URLSearchParams(window.location.search).get('page');
const currentPage = Object.hasOwn(pageInfo, requestedPage) ? requestedPage : 'home';
document.documentElement.classList.add('page-app');
document.body.dataset.page = currentPage;
document.querySelectorAll('main [data-page]').forEach((section) => {
  section.hidden = section.dataset.page !== currentPage;
});
document.title = pageInfo[currentPage].title;
document.querySelector('meta[name="description"]')?.setAttribute('content', pageInfo[currentPage].description);
document.querySelectorAll('.nav-links [data-page-link]').forEach((link) => {
  if (link.dataset.pageLink === currentPage) link.setAttribute('aria-current', 'page');
});

const tabs = [...document.querySelectorAll('.menu-tabs [data-category]')];
const menuItems = document.querySelector('.menu-items');

function renderMenu(category) {
  menuItems.replaceChildren();
  menu[category].forEach(([name, description], index) => {
    const row = document.createElement('article');
    row.className = 'menu-item';
    const number = document.createElement('span');
    number.className = 'menu-item-num';
    number.textContent = `0${index + 1}`;
    const itemText = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = name;
    const detail = document.createElement('p');
    detail.textContent = description;
    itemText.append(heading, detail);
    row.append(number, itemText);
    menuItems.append(row);
  });
}

tabs.forEach((tab) => tab.addEventListener('click', () => {
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  renderMenu(tab.dataset.category);
}));
renderMenu('Favorites');

const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
}));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxKind = lightbox.querySelector('.lightbox-caption small');
const lightboxTitle = lightbox.querySelector('.lightbox-caption strong');
let previousFocus = null;

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  previousFocus?.focus();
}

document.querySelectorAll('.gallery-photo').forEach((button) => button.addEventListener('click', () => {
  const photo = gallery[Number(button.dataset.photo)];
  previousFocus = button;
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxKind.textContent = photo.kind;
  lightboxTitle.textContent = photo.title;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.lightbox-close').focus();
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
lightboxImage.addEventListener('click', (event) => event.stopPropagation());
window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !lightbox.hidden) closeLightbox(); });
