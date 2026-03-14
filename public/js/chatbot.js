// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Toggle chatbot panel
    if (chatbotToggle && chatbotPanel) {
        chatbotToggle.addEventListener('click', function() {
            chatbotPanel.classList.toggle('open');
        });
    }
    
    // Close chatbot
    if (chatbotClose && chatbotPanel) {
        chatbotClose.addEventListener('click', function() {
            chatbotPanel.classList.remove('open');
        });
    }
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Send to server
        fetch('/chatbot/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            removeTypingIndicator();
            addMessage(data.reply, 'bot');
        })
        .catch(error => {
            removeTypingIndicator();
            addMessage('Sorry, I am having trouble connecting. Please try again later.', 'bot');
            console.error('Chatbot error:', error);
        });
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message bot typing';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = '<div class="message-content"><span>.</span><span>.</span><span>.</span></div>';
        chatbotMessages.appendChild(indicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }
    
    // Event listeners
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Optional: Auto-open after delay (e.g., 10 seconds)
    setTimeout(() => {
        if (chatbotPanel && !chatbotPanel.classList.contains('open')) {
            chatbotPanel.classList.add('open');
        }
    }, 10000);
});