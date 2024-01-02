//  ##################     TABBING     #################

document.addEventListener('keydown', function(e){
  // KEY UP / DOWN
  if (e.key === 'l' || e.key === 'k') {
    let focusedElement = document.activeElement;
    let allFocusableElements = document.querySelectorAll('div.l-task[tabindex="0"]');
    let focusableArray = Array.from(allFocusableElements)
      .filter(element => window.getComputedStyle(element).display !== 'none')
    let index = focusableArray.indexOf(focusedElement);

    if (e.key === 'l') {index = (index + 1) % focusableArray.length;}
    else {index = (index - 1) % focusableArray.length;}
    focusableArray[index].focus();
  }
  if (e.key === 'Escape') {
      console.log("esc pressed")
    try{
      document.querySelector("#right-menu").click();
    } catch {
          // do nothing
        console.log("no right menu")
    }
  }
  if (e.key === ' ' || e.key === 'Enter') {
    try{
      // click focused element
        e.preventDefault();
        let clickElement = document.activeElement.querySelector('.title');
        clickElement.click();
    } catch {
        console.log("Go back element not found or clickable")
    }
  }
})




//  ##################     SIDE PANEL - QUERY PARAMETER     #################
