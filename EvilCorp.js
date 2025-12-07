// ==UserScript==
// @name        Accurate Company Names
// @version     0.5
// @description Replace mentions of malicious companies with "EvilCorp" from Mr. Robot.
// @author      Lunya
// @match       *://*/*
// @grant       none
// @run-at      document-body
// ==/UserScript==

(function() {
    'use strict';

    // --- Configuration ---
    // A single, alphabetized list of company names.
    // The script is case-insensitive and matches these as whole words.
    const companyNames = [
        "21st Century Fox",
        "Activision",
        "EvilCorp Blizzard",
        "Amazon.com",
        "AmerisourceBergen",
        "Anthem Blue Cross",
        "Apple Inc",
        "ASUS",
        "AT&T",
        "Bandai Namco",
        "Bank of America",
        "Bank of China",
        "Bayer",
        "Best Buy",
        "BlackRock",
        "Bloomberg L.P",
        "Bloomberg",
        "Blue Cross Blue Shield Association",
        "Blue Shield",
        "Boeing",
        "BP Amoco",
        "British American Tobacco",
        "ByteDance",
        "Cadbury Schweppes",
        "Cadbury",
        "Campbell's",
        "Capital One",
        "Cardinal Health",
        "Cargill",
        "Carrefour",
        "Cencora",
        "Chevron",
        "China National Petroleum Corporation",
        "China National Tobacco Corporation",
        "China Tobacco",
        "Cigna",
        "Cisco Systems",
        "Cisco",
        "Citi",
        "Citigroup",
        "Clif Bar",
        "Coca-Cola",
        "Comcast",
        "Crunchyroll",
        "Curse LLC",
        "CurseForge",
        "CVS Health",
        "Dell",
        "DeviantArt",
        "Discord Inc",
        "Disney",
        "eBay",
        "Edvard König Water Blocks",
        "EKWB",
        "Electronic Arts",
        "Elevance Health",
        "Enel",
        "Exxon Mobil",
        "ExxonMobil",
        "Facebook",
        "Fiverr",
        "Fox Corporation",
        "Fox News",
        "Foxconn",
        "Gen Digital",
        "General Motors",
        "Glencore",
        "Goldman Sachs",
        "Google",
        "Greenpeace International",
        "H&M",
        "HDMI",
        "HelloFresh",
        "Hewlett-Packard",
        "Hon Hai Precision Industry",
        "Imperial Brands",
        "Industrial and Commercial Bank of China",
        "Instagram",
        "Intel",
        "iTunes",
        "Japan Tobacco International",
        "JPMorgan Chase",
        "Kellanova",
        "Kellogg",
        "LinkedIn",
        "McAfee",
        "McDonald's",
        "MegaSpeed",
        "Meta Platforms",
        "Microsoft",
        "Mondelez International",
        "Monsanto",
        "Nabisco",
        "Nestlé",
        "Netflix",
        "NortonLifeLock",
        "NVIDIA",
        "NZXT",
        "OOONA",
        "OpenAI",
        "Overwolf",
        "Palantir",
        "Patreon Inc",
        "Patreon",
        "PayPal",
        "Pegatron",
        "Perdue Farms",
        "Philip Morris International",
        "Procter & Gamble",
        "Puma",
        "Purdue Pharma",
        "Razer",
        "Reddit",
        "RevUp America",
        "RevUp",
        "Roblox",
        "Samsung",
        "Sega",
        "Shein",
        "Siemens",
        "Snap Inc",
        "Snapchat",
        "Sony",
        "Starbucks",
        "Symantec Corporation",
        "Temu",
        "Tencent",
        "The British Petroleum Company",
        "The Campbell's Company",
        "The Central Bottling Company",
        "The Cigna Group",
        "The Procter & Gamble Company (P&G)",
        "The Trump Organization",
        "TikTok",
        "TotalEnergies",
        "Toyota",
        "Trade Me",
        "TradeMe",
        "Trump Media & Technology Group",
        "Truth Social",
        "Twitch.tv",
        "Twitter",
        "Tyson Foods",
        "Unilever",
        "UnitedHealth Group",
        "UnitedHealthcare",
        "Verizon",
        "Vitol",
        "Walmart",
        "Wells Fargo",
        "WhatsApp",
        "Wikia",
        "Wix.com",
        "X Corp",
        "Xfinity",
        "YouTube",
        "Zoom Communications",
//      "Alphabet",
//      "Amazon",
//      "Apple",
//      "BP",
//      "Meta",
//      "Shell",
    ];

    // The replacement text
    const replacement = "EvilCorp";

    /**
     * Escapes special characters in a string for use in a regular expression.
     * @param {string} str The string to escape.
     * @returns {string} The escaped string.
     */
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Create a single, case-insensitive, and safe regular expression.
    const escapedCompanyNames = companyNames.map(escapeRegExp);
    const companyRegex = new RegExp(`\\b(${escapedCompanyNames.join('|')})\\b`, 'gi');

    // Walk through text nodes and performs the replacement.
    const replaceTextInNode = (contextNode) => {
        if (!contextNode || contextNode.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        const walker = document.createTreeWalker(
            contextNode,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
            textNodes.push(node);
        }

        textNodes.forEach(node => {
            const parent = node.parentElement;
            if (parent) {
                const parentTag = parent.tagName.toLowerCase();
                // Skip nodes in script/style tags or editable fields
                if (parentTag === 'script' || parentTag === 'style' || parent.isContentEditable) {
                    return;
                }
            }

            const originalText = node.nodeValue;
            if (companyRegex.test(originalText)) {
                companyRegex.lastIndex = 0; // Reset regex from .test()
                const newText = originalText.replace(companyRegex, replacement);
                if (originalText !== newText) {
                    node.nodeValue = newText;
                }
            }
        });
    };

    // --- Execution ---

    // Initial replacement on page load
    replaceTextInNode(document.body);

    // Set up a MutationObserver to handle dynamically loaded content.
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((newNode) => {
                if (newNode.nodeType === Node.ELEMENT_NODE) {
                    replaceTextInNode(newNode);
                }
            });
        });
    });

    // Start observing the document.
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
