function setupCtrlEnterSubmit() {
    const submitButtonSelector = '#thread-bottom div[data-testid="composer-trailing-actions"] > div > :nth-child(2)';

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            const button = document.querySelector(submitButtonSelector);
            if (button) {
                button.click();
            }
        }
    });
}

// Call the function to activate the listener
setupCtrlEnterSubmit();