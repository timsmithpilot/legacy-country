const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.top-menu');
const modal = document.getElementById('band-modal');
const openButtons = document.querySelectorAll('[data-open-band]');
const closeButtons = document.querySelectorAll('[data-close-band]');

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.top-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

function openBand() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  menu.classList.remove('open');
  document.querySelector('.close-button').focus();
}
function closeBand() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
openButtons.forEach(button => button.addEventListener('click', openBand));
closeButtons.forEach(button => button.addEventListener('click', closeBand));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeBand();
});
