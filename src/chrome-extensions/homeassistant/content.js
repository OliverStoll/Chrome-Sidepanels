//  ##################     TABBING     ##################

document.addEventListener('keydown', function(event){
  // KEY UP / DOWN
  if (event.key === 'l' || event.key === 'k') {
    let focusedElement = document.activeElement;
    let selector = 'mushroom-button'
    let allFocusableElements = document.querySelectorAll(selector);
    let focusableArray = Array.from(allFocusableElements)
      .filter(element => window.getComputedStyle(element).display !== 'none')
      .filter(element => !element.classList.contains('hidden'))
      .filter(element => !element.classList.contains('breadcrumb'))
      .filter(element => element.id !== "parentDirLink");
    let index = focusableArray.indexOf(focusedElement);

    // switch to next or last focusable element
    if (event.key === 'l') {
      index = (index + 1) % focusableArray.length;
    } else {
      index = (index - 1) % focusableArray.length;
    }
    focusableArray[index].focus();
  }
})