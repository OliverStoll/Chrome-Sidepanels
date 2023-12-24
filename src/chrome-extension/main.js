// Fix header & website settings
const title = document.querySelector('#header');
let newTitle = title.textContent.replace('Index von C:\\', '').replace(/\\/g, '/').slice(0, -1);
title.textContent = newTitle;
document.title = newTitle;
let favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'https://w7.pngwing.com/pngs/507/339/png-transparent-computer-icons-directory-windows-10-others-miscellaneous-angle-rectangle-thumbnail.png';
document.head.appendChild(favicon); 


// Switch Header with breadcrumbs
const breadcrumbsDiv = document.createElement('div');
breadcrumbsDiv.id = 'breadcrumbs'
const sections = newTitle.split('/')
let path = 'file://C:/';
for (let i=0; i < sections.length; i++) {
  path += sections[i] + '/'
  const link = document.createElement('a')
  link.textContent = sections[i]
  link.href = path
  link.classList.add('breadcrumb')
  breadcrumbsDiv.appendChild(link)
  if (i < sections.length - 1) {
    var separatorSpan = document.createElement('span');
    separatorSpan.textContent = ' / ';
    breadcrumbsDiv.appendChild(separatorSpan);
  }
}

document.body.prepend(breadcrumbsDiv)





const rows = document.querySelectorAll('#tbody tr');

rows.forEach(row => {
  folder = row.querySelector('a')
  let text = folder.textContent;

  if (text.endsWith('/')) {
    text = text.slice(0, -1);
    folder.classList.add("folder");
  }

  // handle hidden entries
  if (text.endsWith('.ini') || text.startsWith('.')) {
    row.style.display = 'none';
    folder.classList.add('hidden')
  }

  // add file-ending class for icons
  const dotIndex = text.lastIndexOf('.');
  if (dotIndex !== -1) {
    const fileEnding = text.substring(dotIndex + 1);
    text = text.substring(0, dotIndex)
    folder.classList.add(fileEnding);
  }

  folder.textContent = text;
})



//  ##################     HANDLE FOCUS     ##################


document.addEventListener('keydown', function(event){
  // KEY UP / DOWN
  if (event.key === 'l' || event.key === 'k') {
    let focusedElement = document.activeElement;
    let allFocusableElements = document.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]');
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
  // CONFIRM
  if (event.key === ' ') {
    event.preventDefault();
    let focusedElement = document.activeElement;
    if (focusedElement.tagName === 'A') {
      let hrefValue = focusedElement.getAttribute('href');
      window.location.href = hrefValue;
    }
  }
  // GO BACK
  if (event.key === 'j') {
    let currentURL = window.location.href;
    let parts = currentURL.split('/');
    parts.pop();
    parts.pop(); // double for trailing slash
    window.location.href = parts.join('/');
  }
})



//  ##################     HANDLE KEY-SEARCH     ##################

// Get all the file names in an array
const fileNames = Array.from(document.querySelectorAll('#tbody td[data-value] a')).map(a => a.textContent.trim());

// Variable to store typed characters
let typedCharacters = '';
let timer;

// Function to focus on the best-guess element
function focusBestGuess() {
  const matchingElement = fileNames.find(fileName => fileName.toLowerCase().startsWith(typedCharacters));

  if (matchingElement) {
    const matchingLink = document.querySelector(`#tbody td[data-value][data-value^="${matchingElement}"] a`);
    if (matchingLink) {
      matchingLink.focus();
    }
  }
}

// Keydown event handler
document.addEventListener('keydown', function(event) {
  const keyPressed = event.key;

  // Check if the pressed key is an alphanumeric character
  if (/^[a-zA-Z]$/.test(keyPressed)) {
    typedCharacters += keyPressed.toLowerCase();
    focusBestGuess();

    clearTimeout(timer);
    timer = setTimeout(function() {
      typedCharacters = '';
    }, 1500);
  }
});


// Breadcrumb event handler
document.addEventListener('keydown', function(event) {
  const keyPressed = event.key;

  // Check if the pressed key is a number from 1 to 9
  if (/^[1-9]$/.test(keyPressed)) {
    // Get all breadcrumb elements
    const breadcrumbs = document.querySelectorAll('.breadcrumb');

    // Get the index based on the pressed number
    const index = parseInt(keyPressed, 10) - 1; // Subtract 1 because arrays are zero-based

    // Check if the index is valid and the breadcrumb exists at that index
    if (index >= 0 && index < breadcrumbs.length) {
      // Get the href of the breadcrumb at the index and open it in the same tab
      const link = breadcrumbs[index].getAttribute('href');
      if (link) {
        window.location.href = link;
      }
    }
  }
});







