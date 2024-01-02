// ZOTERO API
const apiKey = 'LezhJOh3upYRHT6F4xEJvt0k';
const userID = '13146188';
const zoteroApiUrl = `https://api.zotero.org/users/${userID}/items?v=3&key=${apiKey}&limit=100`;

fetch(zoteroApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.length)
        const itemsDict = {};
        const attachmentsDict = {};
        data.forEach(item => {
            if (item.data.itemType === 'attachment') {
                attachmentsDict[item.key] = item;
            } else {
                itemsDict[item.key] = item;
            }
        });

        // Match the attachment pdf links to the item
        for (const key in itemsDict) {
            const item = itemsDict[key];
            if (item.links && item.links['attachment'] && item.links['attachment']['href']) {
                const attachmentKey = item.links['attachment']['href'].split('/').pop();
                if (attachmentsDict[attachmentKey]) {
                    let attachment = attachmentsDict[attachmentKey]
                    itemsDict[key]['pdf_link'] = attachment.data.url;
                }
            }
        }
        console.log(itemsDict); // Log the entire dictionary

        // sort the items by title
        const sortedItems = Object.values(itemsDict).sort((a, b) => {
            if (a.data.title < b.data.title) {return -1;}
            if (a.data.title > b.data.title) {return 1;}
            return 0;
        });

        // Inject the items into the page
        const itemsList = document.getElementById('items-list');
        for (let key in sortedItems) {
            const item = sortedItems[key];
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            if (item.data.title === undefined || item.data.title === null) {
                continue;
            }
            if (item.pdf_link !== undefined && item.pdf_link !== null) {
                link.href = item.pdf_link;
                link.target = '_blank';
            }
            link.textContent = item.data.title; // or any other property you want to display


            listItem.appendChild(link);
            itemsList.appendChild(listItem);
        }
    })
    .catch(error => {console.error('Error fetching data from Zotero:', error);});


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