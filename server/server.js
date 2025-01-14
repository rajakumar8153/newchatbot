const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const port = 5000;

dotenv.config();

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());

// Define a schema for storing chat conversations
const chatSchema = new mongoose.Schema({
    question: String,
    platform: String,
    response: [String],
    createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Chat = mongoose.model('Chat', chatSchema);

// Helper function to scrape data
const scrapeDocumentation = async (url, query) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let results = [];
        $('h2, h3').each((_, element) => {
            const text = $(element).text().toLowerCase();
            if (text.includes(query.toLowerCase())) {
                results.push($(element).next().text().trim());
            }
        });

        return results.length > 0
            ? results.slice(0, 3)
            : ['No relevant information found.'];
    } catch (error) {
        console.error(error);
        return ['Error fetching documentation.'];
    }
};

// API to handle chatbot queries
app.post('/api/query', async (req, res) => {
    const { question } = req.body;

    const docMap = {
        segment: 'https://segment.com/docs/?ref=nav',
        mparticle: 'https://docs.mparticle.com/',
        lytics: 'https://docs.lytics.com/',
        zeotap: 'https://docs.zeotap.com/home/en-us/',
    };

    const platform = Object.keys(docMap).find((key) => question.toLowerCase().includes(key));
    if (!platform) {
        return res.json({
            answer: 'The question does not seem related to Segment, mParticle, Lytics, or Zeotap.',
        });
    }

    const results = await scrapeDocumentation(docMap[platform], question);

    // Save the conversation to MongoDB
    const chat = new Chat({
        question,
        platform,
        response: results,
    });
    
    await chat.save();  // Save the conversation

    res.json({ answer: results });
});


app.get('/api/chat-history', async (req, res) => {
    try {
        const chats = await Chat.find().sort({ createdAt: -1 }); // Fetch all chats, most recent first
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chat history.' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
