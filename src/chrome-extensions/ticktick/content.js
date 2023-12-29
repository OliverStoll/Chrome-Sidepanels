function waitForElementToLoad(elementId, callback) {
    var checkExist = setInterval(function() {
        var element = document.getElementById(elementId);
        if (element) {
            clearInterval(checkExist);
            callback(element); // Call the callback function with the loaded element
        }
    }, 5); // check every 100 milliseconds
}

waitForElementToLoad("left-view", function(element) {
    element.style.display = "none";
});
waitForElementToLoad("right-view", function(element) {
    element.style.display = "none";
});


waitForElementToLoad("container-main", function(element) {

    // HIDE ELEMENTS
    let hide_icons = document.querySelectorAll("#left-menu-t, #group-order-option, #tl-bar-action")
    hide_icons.forEach(function(item) {
        item.style.display = "none";
    });
    let hide_input = document.getElementById("add-task");
    hide_input.style.display = "none";
    let hide_dates = document.querySelectorAll(".items-center.tip.date-hint.t-date");
    hide_dates.forEach(function(item) {
        item.style.display = "none";
    });

    /* HIDE HABIT SECTION
    let hide_sectionheaders = document.querySelector(".section-header");
    hide_sectionheaders.style.display = "none";
    let siblings_after_header = document.querySelectorAll(".section-header ~ *");
    siblings_after_header.forEach(function(item) {
        item.style.top = parseInt(item.style.top) - 40 + "px";
    }); */



    //  ##################     TABBING     ##################
    document.addEventListener('keydown', function(e){
      // KEY UP / DOWN
      if (e.key === 'l' || e.key === 'k') {
        let focusedElement = document.activeElement;
        let allFocusableElements = document.querySelectorAll('div.l-task[tabindex="0"]');
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
    })


});



