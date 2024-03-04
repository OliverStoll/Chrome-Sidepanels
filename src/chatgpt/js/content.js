document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        var sendButton = document.querySelector('button[data-testid="send-button"]');
        sendButton.click();
    }
});


// keylistener that listens for ctrl+l to toggle between light and dark mode
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'l') {
        const currentScheme = document.documentElement.style.colorScheme;
        alert(currentScheme === 'dark' ? 'Switching to light mode' : 'Switching to dark mode')
        if (currentScheme === 'dark') {
            document.documentElement.style.colorScheme = 'light';
            // add a class to the body to change the background color
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
        else {
            document.documentElement.style.colorScheme = 'dark';
            // add a class to the body
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        }
        event.preventDefault();
    }
});
