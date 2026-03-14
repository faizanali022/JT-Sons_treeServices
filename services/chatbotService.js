// Advanced rule-based chatbot with natural language understanding simulation
// Uses keyword matching with synonyms and contextual responses

class ChatbotService {
    constructor() {
        this.context = {}; // Optional: store session context for follow-up questions
        this.greetings = [
            'hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'
        ];
        this.farewells = [
            'bye', 'goodbye', 'see you', 'talk to you later', 'cya', 'take care'
        ];
        this.thanks = [
            'thank you', 'thanks', 'appreciate it', 'thank you so much', 'thanks a lot'
        ];

        // Knowledge base organized by intent
        this.intents = [
            {
                name: 'tree_removal',
                keywords: [
                    'tree removal', 'remove tree', 'take down tree', 'cut down tree', 'tree cutting',
                    'eliminate tree', 'get rid of tree', 'tree felling', 'tree takedown'
                ],
                responses: [
                    "We specialize in safe and professional tree removal throughout Curry County. Our team handles hazardous, dead, or unwanted trees with precision. Would you like a free estimate? Just give us a call at (541) 425-5232 or use our contact form.",
                    "Tree removal is one of our core services. Whether it's a dangerous leaning tree or one that's too close to your home, we have the equipment and expertise to remove it safely. Contact us for a free consultation.",
                    "Removing a tree requires proper planning and safety measures. Our certified arborists assess the situation and use industry-best practices. Call us today for a free estimate!"
                ]
            },
            {
                name: 'tree_trimming',
                keywords: [
                    'tree trimming', 'trim tree', 'prune tree', 'cut branches', 'branch removal',
                    'tree pruning', 'limb removal', 'tree shaping', 'tree maintenance'
                ],
                responses: [
                    "Regular tree trimming keeps your trees healthy and your property safe. We offer professional pruning, deadwood removal, and shaping. Contact us for a free estimate and let our experts enhance your landscape.",
                    "Our tree trimming services promote strong growth and prevent hazardous limbs. We serve all of Curry County with care and precision. Call (541) 425-5232 to schedule a visit.",
                    "Whether you need a simple trim or extensive pruning, JT & Sons has you covered. We'll ensure your trees look their best while maintaining safety."
                ]
            },
            {
                name: 'stump_grinding',
                keywords: [
                    'stump grinding', 'stump removal', 'remove stump', 'grind stump', 'tree stump',
                    'stump grinder', 'eliminate stump'
                ],
                responses: [
                    "After tree removal, stumps can be eyesores and tripping hazards. Our stump grinding service removes them below ground level, leaving your yard clean and ready for landscaping. Get a free quote today!",
                    "Stump grinding is essential for preventing pests and improving aesthetics. We use professional equipment to grind stumps of any size. Contact us for more information.",
                    "Don't let old stumps ruin your yard. We'll grind them down quickly and efficiently. Call (530) 635-5735 for a free estimate."
                ]
            },
            {
                name: 'fire_reduction',
                keywords: [
                    'fire reduction', 'defensible space', 'brush clearing', 'wildfire prevention',
                    'fire hazard', 'fuel reduction', 'vegetation clearance', 'view clearing',
                    'brush removal', 'land clearing', 'overgrown vegetation'
                ],
                responses: [
                    "Living on the Southern Oregon Coast means being proactive about wildfire risk. Our fire reduction services create defensible space around your home, clearing brush and thinning trees. Protect your property—schedule a free assessment.",
                    "We help homeowners maintain safe properties through professional brush clearing, tree thinning, and view enhancement. Reduce fire danger and enjoy your landscape. Call us to discuss your needs.",
                    "Fire season is a serious concern. Our team is certified in fire hazard reduction and defensible space creation. We'll evaluate your property and recommend the best course of action."
                ]
            },
            {
                name: 'emergency',
                keywords: [
                    'emergency', 'storm damage', 'fallen tree', 'tree fell', 'urgent', 'immediate',
                    'crisis', 'dangerous tree', 'tree down', 'blocking road', 'hazardous tree'
                ],
                responses: [
                    "We offer 24/7 emergency tree services. If a tree has fallen on your property or poses an immediate threat, call us right away at (541) 425-5232. We'll respond quickly to secure your safety.",
                    "Storms can cause unexpected damage. Our emergency team is ready to assist with fallen trees, broken limbs, and hazardous situations. Don't wait—contact us now.",
                    "For urgent tree issues, JT & Sons provides fast, reliable emergency response. We have the equipment to handle any situation. Call our emergency line: (530) 635-5735."
                ]
            },
            {
                name: 'crane',
                keywords: [
                    'crane', 'large tree', 'heavy tree', 'difficult access', 'crane service',
                    'crane removal', 'big tree', 'tree near house', 'tight space'
                ],
                responses: [
                    "Some trees require specialized equipment. Our crane-assisted tree removal allows us to safely handle large or hard-to-reach trees while protecting your property. Contact us for a consultation.",
                    "When traditional methods aren't enough, our crane services provide precision and safety. We've successfully removed trees in challenging locations throughout Curry County. Call for a free estimate.",
                    "Crane tree removal is our specialty for complex jobs. We assess each situation carefully and use the right equipment to get the job done without damage to your landscape."
                ]
            },
            {
                name: 'pricing',
                keywords: [
                    'cost', 'price', 'estimate', 'quote', 'how much', 'pricing', 'rates',
                    'free estimate', 'charges', 'fee'
                ],
                responses: [
                    "We provide free, no-obligation estimates for all our services. Just give us a call or fill out our contact form, and we'll schedule a time to assess your trees and provide a fair price.",
                    "Pricing depends on the scope of work, tree size, and location. Contact us for a personalized quote. We're known for transparent, competitive rates.",
                    "Would you like a free estimate? Call (541) 425-5232 or email Jtsonstree@gmail.com. We'll be happy to discuss your project and provide a detailed quote."
                ]
            },
            {
                name: 'service_area',
                keywords: [
                    'service area', 'location', 'near me', 'where you serve', 'curry county',
                    'gold beach', 'brookings', 'port orford', 'bandon', 'coos bay', 'pistol river',
                    'ophir', 'agness', 'sixes', 'langlois', 'wedderburn'
                ],
                responses: [
                    "We proudly serve all of Curry County, including Gold Beach, Brookings, Port Orford, Bandon, Coos Bay, Pistol River, Ophir, Agness, and surrounding communities. If you're in Southern Oregon Coast, we're here to help!",
                    "Our service area covers the entire Southern Oregon Coast from Brookings to Coos Bay and everything in between. Contact us to see if we serve your specific location.",
                    "JT & Sons operates throughout Curry County and nearby areas. Wherever you are, we'll come to you with our professional tree care services."
                ]
            },
            {
                name: 'contact',
                keywords: [
                    'contact', 'phone', 'email', 'call', 'reach', 'message', 'get in touch',
                    'how to contact', 'number', 'address'
                ],
                responses: [
                    "You can reach us at:\nOffice: (541) 425-5232\nCell/Text: (530) 635-5735\nEmail: Jtsonstree@gmail.com\nMailing: P.O. Box 1433, Gold Beach, OR 97444\nWe look forward to hearing from you!",
                    "Contact us anytime for questions or estimates. Call, text, or email—we're responsive and friendly.",
                    "Have questions? Our team is ready to assist. Use our contact form on the website, or call us directly at (541) 425-5232."
                ]
            },
            {
                name: 'license',
                keywords: [
                    'license', 'licensed', 'insured', 'bonded', 'certified', 'credentials',
                    'ccb', 'powerline clearance', 'qualifications'
                ],
                responses: [
                    "JT & Sons Tree Service LLC is fully licensed (CCB #247528), insured, and bonded. We're also Powerline Clearance Certified. You can trust our professional team with your property.",
                    "We take safety and professionalism seriously. Our certifications include Powerline Clearance, and we carry full insurance for your peace of mind.",
                    "Rest assured, we are a legitimate, licensed company with decades of experience. Our credentials are up to date and we're happy to provide proof upon request."
                ]
            },
            {
                name: 'hours',
                keywords: [
                    'hours', 'open', 'available', 'business hours', 'working hours', 'schedule',
                    'when can you come', 'availability'
                ],
                responses: [
                    "Our regular business hours are Monday-Friday, 8am to 5pm. For emergencies, we're available 24/7. Just give us a call!",
                    "We're flexible and can often accommodate your schedule. Contact us to arrange a convenient time for a free estimate or service."
                ]
            }
        ];
    }

    // Helper to find matching intent
    findIntent(message) {
        const lowerMsg = message.toLowerCase();
        
        // Check for greetings
        for (let g of this.greetings) {
            if (lowerMsg.includes(g)) {
                return { name: 'greeting', confidence: 1 };
            }
        }
        // Check for thanks
        for (let t of this.thanks) {
            if (lowerMsg.includes(t)) {
                return { name: 'thanks', confidence: 1 };
            }
        }
        // Check for farewells
        for (let f of this.farewells) {
            if (lowerMsg.includes(f)) {
                return { name: 'farewell', confidence: 1 };
            }
        }
        
        // Check intents
        let bestIntent = null;
        let maxMatches = 0;
        
        for (let intent of this.intents) {
            let matches = 0;
            for (let keyword of intent.keywords) {
                if (lowerMsg.includes(keyword.toLowerCase())) {
                    matches++;
                }
            }
            if (matches > maxMatches) {
                maxMatches = matches;
                bestIntent = intent;
            }
        }
        
        if (bestIntent && maxMatches > 0) {
            return { name: bestIntent.name, intent: bestIntent, confidence: maxMatches };
        }
        
        return null;
    }

    getReply(message) {
        const intentMatch = this.findIntent(message);
        
        // Handle special cases
        if (intentMatch) {
            if (intentMatch.name === 'greeting') {
                const greetings = [
                    "Hello! Welcome to JT & Sons Tree Service. How can I assist you today?",
                    "Hi there! Thanks for reaching out. What can I do for you?",
                    "Greetings! I'm here to help with any tree service questions. What do you need?"
                ];
                return this.randomResponse(greetings);
            }
            if (intentMatch.name === 'thanks') {
                const thanksResponses = [
                    "You're very welcome! If you have more questions, feel free to ask.",
                    "Happy to help! Let me know if you need anything else.",
                    "My pleasure! Don't hesitate to reach out again."
                ];
                return this.randomResponse(thanksResponses);
            }
            if (intentMatch.name === 'farewell') {
                const farewells = [
                    "Thank you for chatting! Have a great day and take care.",
                    "Goodbye! We're always here when you need tree service.",
                    "See you later! Remember, JT & Sons is just a call away."
                ];
                return this.randomResponse(farewells);
            }
            
            // Regular intent
            if (intentMatch.intent && intentMatch.intent.responses) {
                return this.randomResponse(intentMatch.intent.responses);
            }
        }
        
        // No match: fallback responses that still sound helpful
        const fallbacks = [
            "I'm not entirely sure I understood your question. Could you please rephrase? Or feel free to call us at (541) 425-5232 for immediate assistance.",
            "That's an interesting query! For detailed information, I recommend speaking with one of our tree care specialists. You can call us or use the contact form.",
            "I don't have a specific answer to that right now, but our team would be happy to help. Please give us a call at (541) 425-5232 or email Jtsonstree@gmail.com.",
            "I'm still learning! If you have a question about tree removal, trimming, fire reduction, or our service areas, I can likely help. Otherwise, please contact us directly."
        ];
        return this.randomResponse(fallbacks);
    }

    randomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

module.exports = new ChatbotService();