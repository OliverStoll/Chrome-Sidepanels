// Fix header & website settings
const title = document.querySelector('#header');
let newTitle = title.textContent.replace('Index von C:\\', '').replace(/\\/g, '/').slice(0, -1);
title.textContent = newTitle;
document.title = newTitle;
let favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
favicon.rel = 'icon';
favicon.href = 'https://raw.githubusercontent.com/OliverStoll/better-local-explorer/main/res/icons/explorer.png';
document.head.appendChild(favicon); 




// ############     BREADCRUMBS      ############

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




// ############     SIDEBAR      ############

var ul = document.createElement("ul");
ul.id = "sidebar"

// Add list items to the unordered list
var items = [
  {text:"DRIVE", link: "file:///C:/Drive/"},
  {text:"Downloads", link: "file:///C:/Users/Oliver/Downloads/"},
];
items.forEach(function(item) {
  var li = document.createElement("li");
  var link = document.createElement("a");
  link.textContent = item.text;
  link.setAttribute("href", item.link);
  li.appendChild(link);
  ul.appendChild(li);
});

var table = document.querySelector("table");
var parent = table.parentNode;
parent.insertBefore(ul, table);
// Set CSS styles for ul and table
ul.style.float = "left";
ul.style.width = "30%";
table.style.width = "70%";



// ############     MODIFY FOLDERS      ############

const rows = document.querySelectorAll('#tbody tr');

rows.forEach(row => {
  folder = row.querySelector('a')
  let text = folder.textContent;

  if (text.endsWith('/')) {
    text = text.slice(0, -1);
    folder.classList.add("folder");
  }

  if (text.endsWith('.ini') || text.startsWith('.')) {
    row.style.display = 'none';
    folder.classList.add('hidden')
  }

  // add file-ending class for icons
  const dotIndex = text.lastIndexOf('.');
  if (dotIndex !== -1) {
    const fileEnding = text.substring(dotIndex + 1);
    if (fileEnding.trim() !== "") {
      folder.classList.add(fileEnding);
    }
    text = text.substring(0, dotIndex)
  }

  folder.textContent = text;
})




//  ##################     TABBING     ##################

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




//  ##################    KEY-SEARCH     ##################

const fileNames = Array.from(document.querySelectorAll('#tbody td[data-value] a')).map(a => a.textContent.trim());
let typedCharacters = '';
let timer;

function focusBestGuess() {
  const matchingElement = fileNames.find(fileName => fileName.toLowerCase().startsWith(typedCharacters));
  if (matchingElement) {
    const matchingLink = document.querySelector(`#tbody td[data-value][data-value^="${matchingElement}"] a`);
    if (matchingLink) {
      matchingLink.focus();
    }
  }
}
document.addEventListener('keydown', function(event) {
  const keyPressed = event.key;
  if (/^[a-zA-Z]$/.test(keyPressed)) {
    typedCharacters += keyPressed.toLowerCase();
    focusBestGuess();
    clearTimeout(timer);
    timer = setTimeout(function() {typedCharacters = '';}, 1500);
  }
});




//  ##################    NUMBER KEY-SELECTOR     ##################

document.addEventListener('keydown', function(event) {
  const keyPressed = event.key;
  if (/^[1-9]$/.test(keyPressed)) {
    const index = parseInt(keyPressed, 10) - 1;
    const sidebar = document.getElementById('sidebar');
    const listItems = sidebar.querySelectorAll('li');
    if (index >= 0 && index < listItems.length) {
        window.location.href = listItems[index].querySelector('a').getAttribute('href');
    }
  }
});







