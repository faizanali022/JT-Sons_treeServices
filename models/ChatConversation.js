const mongoose = require('mongoose');

const chatConversationSchema = new mongoose.Schema({
    sessionId: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    reply: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('ChatConversation', chatConversationSchema);