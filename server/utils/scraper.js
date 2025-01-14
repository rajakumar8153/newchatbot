const axios = require('axios');
const cheerio = require('cheerio');
const Doc = require('../models/Doc');  // MongoDB model for storing docs

// Function to scrape and save documentation to MongoDB
const saveDocumentationToDB = async (platform, url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        $('h2, h3').each(async (_, element) => {
            const question = $(element).text().trim();
            const answer = $(element).next().text().trim();

            const newDoc = new Doc({
                platform,
                question,
                answer,
                tags: ['guide', 'setup'],  // Tags can be customized
            });

            await newDoc.save();  // Save document to MongoDB
        });
    } catch (error) {
        console.error(`Error scraping data from ${url}: ${error}`);
    }
};

module.exports = { saveDocumentationToDB };
