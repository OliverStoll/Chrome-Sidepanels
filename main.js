// Fix header & website settings
const title = document.querySelector('#header');
let newTitle = title.textContent.replace('Index von C:\\', '').replace(/\\/g, '/');
title.textContent = newTitle;
document.title = newTitle;
// Create a new favicon link element
let favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'https://w7.pngwing.com/pngs/507/339/png-transparent-computer-icons-directory-windows-10-others-miscellaneous-angle-rectangle-thumbnail.png';
document.head.appendChild(favicon); // 




const rows = document.querySelectorAll('#tbody tr');
let firstVisibleElement;

rows.forEach(row => {
  folder = row.querySelector('a')

  // hide trailing slashes for folders
  let text = folder.textContent;
  
  if (text.endsWith('/')) {
    text = text.slice(0, -1);
  }



  // hide certain entries
  if (text.endsWith('.ini') || text.startsWith('.')) {
    row.style.display = 'none';
  } else if (firstVisibleElement === undefined) {
    firstVisibleElement = folder;
  }
  
  // change icons
  const dotIndex = text.lastIndexOf('.');
  if (dotIndex !== -1) {
    const fileEnding = text.substring(dotIndex + 1);
    text = text.substring(0, dotIndex)
    folder.classList.add(fileEnding);
  } else {
    folder.classList.add("folder")
  }
  
  folder.textContent = text;
  
})



// HANDLE FOCUS


firstVisibleElement.focus()

document.addEventListener('keydown', function(event){
  // make rows tabable via l & k keys
  if (event.key === 'l' || event.key === 'k') { 
    let focusedElement = document.activeElement;
    let allFocusableElements = document.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'
    );
    // Convert NodeList to an array for better manipulation
    let focusableArray = Array.from(allFocusableElements)
      .filter(element => window.getComputedStyle(element).display !== 'none');
    let index = focusableArray.indexOf(focusedElement);
    if (index === -1) {
      index = 1;
    }
    if (event.key === 'l') {
      let nextIndex = (index + 1) % focusableArray.length;
      focusableArray[nextIndex].focus();
    }
    if (event.key === 'k') {
      let nextIndex = (index - 1) % focusableArray.length;
      focusableArray[nextIndex].focus();
    }
  } 
  
  if (event.key === ' ') {
    event.preventDefault();
    let focusedElement = document.activeElement;
    if (focusedElement.tagName === 'A') {
      let hrefValue = focusedElement.getAttribute('href');
      window.location.href = hrefValue;
    }
  }
  if (event.key === 'j') {
    let currentURL = window.location.href;
    let parts = currentURL.split('/');
    parts.pop();
    parts.pop(); // double for trailing slash
    window.location.href = parts.join('/');
  }
})

