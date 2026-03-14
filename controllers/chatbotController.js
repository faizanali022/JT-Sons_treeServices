const chatbotService = require('../services/chatbotService');
const ChatConversation = require('../models/ChatConversation');

exports.handleMessage = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // Generate session ID (you can use session or a simple timestamp + random)
    const sessionId = req.sessionID || 'anonymous-' + Date.now();

    try {
        // Get reply from chatbot service
        const reply = await chatbotService.getReply(message);

        // Save conversation to DB (optional)
        await ChatConversation.create({ sessionId, message, reply });

        res.json({ reply });
    } catch (err) {
        console.error('Chatbot error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};