/**
 * @typedef {Object} SidebarToggleParameters
 * @property {string} sidebarSelector - 
 * @property {string} toggleSelector - 
 * @property {string} activeClass - The class to add to the sidebar when it is active.
 * 
 * @function
 * 
 * @param {SidebarToggleParameters} params - 
 * 
 * @throws {Error} If the sidebar is not found.
 * 
 * @author
 * LeeTrongjNghiax <leetrongjnghiax0938225745@gmail.com>
 */
const initiateSidebarToggle = ({
  sidebarSelector = ``,
  toggleSelector = ``,
  activeClass = ``,
  overflowHiddenClass = ``,
}) => {
  const html = document.documentElement;

  const sidebar = document.querySelector(sidebarSelector);

  if (!sidebar) throw new Error(`Sidebar not found: ${sidebarSelector}`);

  const toggleSelectors = document.querySelectorAll(toggleSelector);

  toggleSelectors.forEach((toggle) => {
    toggle.addEventListener(`click`, () => {
      sidebar.classList.toggle(activeClass);
      html.classList.toggle(overflowHiddenClass);
    });
  });
}

export default initiateSidebarToggle;
