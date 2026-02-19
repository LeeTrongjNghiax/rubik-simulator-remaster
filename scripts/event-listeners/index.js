import initiateSidebarToggle from "./initiate-sidebar-toggle.js";

const initiate = () => {
  initiateSidebarToggle({
    sidebarSelector: `.c-sidebar--left`,
    toggleSelector: `.c-title-container__sidebar-toggle-button--left-sidebar, .c-sidebar__sidebar-left-toggle-button`,
    activeClass: `c-sidebar--left-active`,
    overflowHiddenClass: `u-overflow-hidden`,
  });

  initiateSidebarToggle({
    sidebarSelector: `.c-sidebar--right`,
    toggleSelector: `.c-title-container__sidebar-toggle-button--right-sidebar, .c-sidebar__sidebar-right-toggle-button`,
    activeClass: `c-sidebar--right-active`,
    overflowHiddenClass: `u-overflow-hidden`,
  });
}

document.addEventListener(`DOMContentLoaded`, initiate);
