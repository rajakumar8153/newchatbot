const mongoose = require('mongoose');

// Schema to store documentation
const docSchema = new mongoose.Schema({
    platform: String,  // CDP platform (Segment, mParticle, Lytics, Zeotap)
    question: String,  // The question related to platform
    answer: String,    // The answer or documentation text
    tags: [String],    // Tags for search relevance, e.g., ['setup', 'source']
});

const Doc = mongoose.model('Doc', docSchema);
module.exports = Doc;
