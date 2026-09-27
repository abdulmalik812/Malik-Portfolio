'use strict';

const elementToggleFunc = (elem) => elem && elem.classList.toggle('active');

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
sidebarBtn?.addEventListener('click', () => elementToggleFunc(sidebar));

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');
const toggleTestimonialsModal = () => {
  elementToggleFunc(modalContainer);
  elementToggleFunc(overlay);
};

testimonialsItem.forEach((item) => {
  item.addEventListener('click', () => {
    const avatar = item.querySelector('[data-testimonials-avatar]');
    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (modalTitle) modalTitle.textContent = item.querySelector('[data-testimonials-title]')?.textContent || '';
    if (modalText) modalText.innerHTML = item.querySelector('[data-testimonials-text]')?.innerHTML || '';
    toggleTestimonialsModal();
  });
});
modalCloseBtn?.addEventListener('click', toggleTestimonialsModal);
overlay?.addEventListener('click', toggleTestimonialsModal);

const select = document.querySelector('[data-select]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const filterButtons = document.querySelectorAll('[data-filter-btn]');
const selectItems = document.querySelectorAll('[data-select-item]');

const filterProjects = (value) => {
  const selected = value.trim().toLowerCase();
  filterItems.forEach((item) => {
    const categories = (item.dataset.category || '').toLowerCase().split(',').map((category) => category.trim());
    item.classList.toggle('active', selected === 'all' || categories.includes(selected));
  });
  if (selectValue) selectValue.textContent = value;
  filterButtons.forEach((button) => button.classList.toggle('active', button.textContent.trim().toLowerCase() === selected));
};

select?.addEventListener('click', () => elementToggleFunc(select));
selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    filterProjects(item.textContent);
    select?.classList.remove('active');
  });
});
filterButtons.forEach((button) => button.addEventListener('click', () => filterProjects(button.textContent)));

const form = document.querySelector('[data-form]');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const subject = encodeURIComponent(`Portfolio message from ${fields.get('name')}`);
  const body = encodeURIComponent(`From: ${fields.get('name')} (${fields.get('email')})\n\n${fields.get('message')}`);
  window.location.href = `mailto:abdulmalik256786@gmail.com?subject=${subject}&body=${body}`;
});

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const pageName = link.textContent.trim().toLowerCase();
    pages.forEach((page) => page.classList.toggle('active', page.dataset.page === pageName));
    navigationLinks.forEach((navLink) => navLink.classList.toggle('active', navLink === link));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});