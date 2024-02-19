// keylistener that detects if backspace is pressed. should word even through iframe

// Get a reference to the button element
const backButton = document.getElementById('back-button');

// Get a reference to the iframe element
const iframe = document.querySelector('iframe');

// Add a click event listener to the button
backButton.addEventListener('click', function() {
    // Navigate the iframe to "zotero-library.html"
    iframe.src = 'zotero-library.html';
});