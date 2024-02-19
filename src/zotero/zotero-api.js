// ZOTERO API
const apiKey = 'LezhJOh3upYRHT6F4xEJvt0k';
const userID = '13146188';
const zoteroApiUrl = `https://api.zotero.org/users/${userID}/items?v=3&key=${apiKey}&limit=100`;
const zoteroColUrl = `https://api.zotero.org/users/${userID}/collections/top?key=${apiKey}`;

// data
let collectionsDict = {};

fetch(zoteroColUrl)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let select = document.getElementById('classFilter');

        console.log(data.length + ' collections found')
        data.forEach(collection => {
            collectionsDict[collection.key] = collection;
            // add the collection name as an option
            let cleanedName = collection.data.name.replace(/ /g, '-');
            let option = document.createElement('option');
            option.value = cleanedName;
            option.text = cleanedName;
            select.appendChild(option);
        });
        console.log(collectionsDict); // Log the entire dictionary
    })
    .catch(error => {console.error('Error fetching collections from Zotero:', error);}
    );




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


        for (const key in itemsDict) {
            const item = itemsDict[key];
            // get all collection names
            if (item.data.collections && item.data.collections.length > 0) {
                let collectionNames = item.data.collections.map(collectionKey => {
                    return collectionsDict[collectionKey].data.name;
                });
                // replace spaces with dashes
                itemsDict[key]['collection_names'] = collectionNames.map(name => {return name.replace(/ /g, '-');});
            }
            // Match the attachment pdf links to the item
            if (item.links && item.links['attachment'] && item.links['attachment']['href']) {
                const attachmentKey = item.links['attachment']['href'].split('/').pop();
                if (attachmentsDict[attachmentKey]) {
                    let attachment = attachmentsDict[attachmentKey]
                    itemsDict[key]['pdf_link'] = attachment.data.url;
                }
            }
        }
        console.log(itemsDict);

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
            if (item.data.title === undefined || item.data.title === null) {continue}

            const listItem = document.createElement('li');
            const link = document.createElement('a');

            if (item.pdf_link !== undefined && item.pdf_link !== null) {
                link.href = item.pdf_link;
                // link.target = '_blank';
            }
            link.textContent = item.data.title; // or any other property you want to display

            // add the collections as classes to the li
            if (item.collection_names !== undefined && item.collection_names !== null) {
                item.collection_names.forEach(collectionName => {
                    listItem.classList.add(collectionName);
                });
            }

            listItem.appendChild(link);
            itemsList.appendChild(listItem);
        }
    })
    .catch(error => {console.error('Error fetching data from Zotero:', error);});


// get the collections



