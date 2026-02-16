import initiateSidebarToggle from "./initiate-sidebar-toggle.js";

const initiate = () => {
  initiateSidebarToggle({
    sidebarSelector: `.c-sidebar--left`,
    toggleSelector: `.c-title-container__sidebar-toggle-button--left-sidebar, .c-sidebar__sidebar-left-toggle-button`,
    activeClass: `c-sidebar--left-active`,
  });

  initiateSidebarToggle({
    sidebarSelector: `.c-sidebar--right`,
    toggleSelector: `.c-title-container__sidebar-toggle-button--right-sidebar, .c-sidebar__sidebar-right-toggle-button`,
    activeClass: `c-sidebar--right-active`,
  });
}

document.addEventListener(`DOMContentLoaded`, initiate);
