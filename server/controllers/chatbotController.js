const lunr = require("lunr");

let segmentIndex, mParticleIndex, lyticsIndex, zeotapIndex;

// Create and index documentation for each platform
const indexDocumentation = (docs, platform) => {
    const index = lunr(function () {
        this.ref("id");
        this.field("question");
        this.field("answer");

        docs.forEach((doc, idx) => {
            this.add({
                id: idx,
                question: doc.question,
                answer: doc.answer,
            });
        });
    });

    if (platform === "segment") segmentIndex = index;
    if (platform === "mparticle") mParticleIndex = index;
    if (platform === "lytics") lyticsIndex = index;
    if (platform === "zeotap") zeotapIndex = index;
};

// Example: Add documents to the index
indexDocumentation([
    { question: "How to set up a source in Segment?", answer: "Go to your Segment workspace..." },
    { question: "How to track user events in Segment?", answer: "Use the Segment tracking API..." },
], "segment");
