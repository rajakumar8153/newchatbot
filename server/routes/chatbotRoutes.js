const express = require('express');
const router = express.Router();
const Doc = require('../models/Doc');  // MongoDB model
const { saveDocumentationToDB } = require('../utils/scraper');

// Endpoint to handle chatbot queries
router.post('/query', async (req, res) => {
    const { question } = req.body;

    // Simple platform extraction based on keywords
    const platforms = ['segment', 'mparticle', 'lytics', 'zeotap'];
    const platform = platforms.find(p => question.toLowerCase().includes(p));
    if (!platform) {
        return res.json({
            answer: 'The question does not seem related to the available platforms (Segment, mParticle, Lytics, Zeotap).',
        });
    }

    try {
        // Search MongoDB for a matching question
        const result = await Doc.find({
            platform,
            question: new RegExp(question, 'i'), // Case-insensitive search
        });

        if (result.length > 0) {
            return res.json({ answer: result[0].answer });
        } else {
            return res.json({
                answer: `Sorry, I could not find relevant documentation for: "${question}"`,
            });
        }
    } catch (error) {
        console.error('Error fetching documentation:', error);
        res.status(500).json({ answer: 'Internal Server Error' });
    }
});

// Example to scrape documentation (this can be called when needed)
router.post('/scrape', async (req, res) => {
    const { platform, url } = req.body;
    await saveDocumentationToDB(platform, url);
    res.json({ message: `Scraping started for ${platform}` });
});

module.exports = router;
