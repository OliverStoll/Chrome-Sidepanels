// ZOTERO API
const apiKey = 'LezhJOh3upYRHT6F4xEJvt0k';
const userID = '13146188';
const zoteroApiUrl = `https://api.zotero.org/users/${userID}/items?v=3&key=${apiKey}&limit=100`;
const zoteroCollectionUrl = `https://api.zotero.org/users/${userID}/collections/top?key=${apiKey}`;

// data
let zoteroCollection = {};
let zoteroItems = [];



function initialize_zotero_collection() {
    chrome.storage.local.get(['zotero_collections'], function(result) {
        console.log('Zotero Collections: ' + result.zotero_collections);
        if (result.zotero_collections) {
            zoteroCollection = result.zotero_collections;
            insert_zotero_collections(result.zotero_collections);
        }
    });
    load_zotero_collections_from_api();
}

function initialize_zotero_items() {
    chrome.storage.local.get(['zotero_items'], function(result) {
        console.log('Zotero Items: ' + result.zotero_items);
        if (result.zotero_items) {
            zoteroItems = result.zotero_items;
            insert_zotero_items();
        }
    });
    load_zotero_items_from_api();
}


function load_zotero_collections_from_api() {
    /** get the collections from zotero **/
    fetch(zoteroCollectionUrl)
        .then(response => {return response.json();})
        .then(data => {
            console.log(data.length + ' collections found.')
            zoteroCollection = {}; // reset the collection
            data.forEach(collection => {
                zoteroCollection[collection.key] = collection;
            });
            console.log(zoteroCollection);
            chrome.storage.local.set({'zotero_collections': zoteroCollection}, function() {
                console.log('Collections saved to chrome storage');
            });
            insert_zotero_collections(zoteroCollection);
        })
        .catch(error => {console.error('Error fetching collections from Zotero:', error);});
}


function insert_zotero_collections(collectionDict) {
    let select = document.getElementById('classFilter');
    // clear the select except the first option with value 'all'
    select.innerHTML = '<option value="all">All Items</option>';
    for (const collection in collectionDict) {
        let cleanedName = collection.data.name.replace(/ /g, '-');
        let selection_option = document.createElement('option');
        selection_option.value = cleanedName;
        selection_option.text = cleanedName;
        select.appendChild(selection_option);
    }
}


function load_zotero_items_from_api() {
    /** get the items from zotero **/
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
                        return zoteroCollection[collectionKey].data.name;
                    });
                    // replace spaces with dashes
                    itemsDict[key]['collection_names'] = collectionNames.map(name => {
                        return name.replace(/ /g, '-');
                    });
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
            zoteroItems = Object.values(itemsDict).sort((a, b) => {
                if (a.data.title < b.data.title) {return -1}
                if (a.data.title > b.data.title) {return 1}
                return 0;
            });

            // save the items to chrome storage
            chrome.storage.local.set({'zotero_items': zoteroItems}, function() {
                console.log('Items saved to chrome storage');
            });

            insert_zotero_items()
        })
        .catch(error => {console.error('Error fetching data from Zotero:', error);});
}


function insert_zotero_items() {
    /** Inject the items into the page **/
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';  // clear the list
    for (let key in zoteroItems) {
        const item = zoteroItems[key];
        if (item.data.title === undefined || item.data.title === null) {
            console.warn('Item has no title:', item)
            continue
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');

        if (item.pdf_link !== undefined && item.pdf_link !== null) {
            link.href = item.pdf_link;
            // link.target = '_blank';  // open in new tab
        }
        link.textContent = item.data.title;  // add the title as text to the link

        // add the collections as classes to the li, for filtering
        if (item.collection_names !== undefined && item.collection_names !== null) {
            item.collection_names.forEach(collectionName => {
                listItem.classList.add(collectionName);
            });
        }

        listItem.appendChild(link);
        itemsList.appendChild(listItem);
    }
}


// initialize
initialize_zotero_collection();
initialize_zotero_items();


