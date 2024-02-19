
document.addEventListener('keydown', function(e){
  // SPACE FOR OPENING LINK
    if (e.key === ' ') {
        let focusedElement = document.activeElement;
        if (focusedElement.tagName === 'A') {
            focusedElement.click();
        }
    }

    // KEY LEFT / RIGHT -> CHANGE SELECTION IN DROPDOWN
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        let select = document.getElementById('classFilter');
        let index = select.selectedIndex;
        if (e.key === 'ArrowLeft' && index > 0) {
            index = (index - 1);
        } else if (e.key === 'ArrowRight' && index < select.options.length - 1) {
            index = (index + 1);
        }
        select.selectedIndex = index;
        select.dispatchEvent(new Event('change'));
    }

    // CTRL + L -> TOGGLE LIGHT/DARK MODE
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
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






