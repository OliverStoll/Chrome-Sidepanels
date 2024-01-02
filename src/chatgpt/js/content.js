document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        var sendButton = document.querySelector('button[data-testid="send-button"]');
        sendButton.click();
    }
});