//  ##################     TABBING     ##################
document.addEventListener('keydown', function(e){
  // KEY UP / DOWN
  if (e.key === 'l' || e.key === 'k') {
    let focusedElement = document.activeElement;
    let allFocusableElements = document.querySelectorAll('a[target="_blank"]');
    let focusableArray = Array.from(allFocusableElements)
      .filter(element => window.getComputedStyle(element).display !== 'none')
    let index = focusableArray.indexOf(focusedElement);

    if (e.key === 'l') {
      index = (index + 1) % focusableArray.length;
    } else {
      index = (index - 1) % focusableArray.length;
    }
    focusableArray[index].focus();
  }
  // SPACE FOR OPENING LINK
    if (e.key === ' ') {
        let focusedElement = document.activeElement;
        if (focusedElement.tagName === 'A') {
            focusedElement.click();
        }
    }

})

document.getElementById('classFilter').addEventListener('change', function() {
  var selectedClass = this.value;
  var listItems = document.querySelectorAll('#items-list li');
  console.log(listItems);

  listItems.forEach(function(item) {
    if (selectedClass === 'all' || item.classList.contains(selectedClass)) {
      item.style.display = 'block'; // Show this item
        console.log(item);
    } else {
      item.style.display = 'none'; // Hide this item
    }
  });
});
