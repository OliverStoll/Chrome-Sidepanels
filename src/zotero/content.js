function waitForElementToLoad(elementSelector, callback) {
    var checkExist = setInterval(function() {
        var element = document.querySelector(elementSelector)
        if (element) {
            clearInterval(checkExist);
            callback(element); // Call the callback function with the loaded element
        }
    }, 5); // check every 100 milliseconds
}

waitForElementToLoad(".items-list > div > div", function(element) {
    // get all items from item list
    let items = document.querySelectorAll('.items-list > div > div');
});

// get all items from item list
let items = document.querySelectorAll('.items-list > div > div');