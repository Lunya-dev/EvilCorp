// ==UserScript==
// @name        Accurate Company Names
// @version    	1.9.8
// @description Replaces names of malicious corporations/organizations etc. with "Evil Corp" from Mr. Robot.
// @author      Lunya
// @match       *://*/*
// @grant       none
// @run-at      document-body
// ==/UserScript==

(function () {
    'use strict';

    // --- Configuration ---
    const companyNames = [
        "21st Century Fox",
        "7-Eleven",
//      "711",
        "AIJAC",
        "AMD PAC",
        "AMD",
        "ASRock",
        "ASUS",
        "ASUSTeK Computer",
        "AT&T",
        "AWS Elemental",
        "AWS",
        "Action Zealandia",
        "Activision Blizzard",
        "Activision",
        "Acxiom",
        "Adobe",
        "Advanced Micro Devices",
        "Afrikaner Weerstandsbeweging",
        "Alliance Defending Freedom",
        "Alphabet Inc.",
        "Amazon Elastic Compute Cloud",
        "Amazon Kindle",
        "Amazon Web Services",
//      "Amazon",
        "Amazon.com",
        "AmerisourceBergen",
        "Amway",
        "Anduril Industries",
        "Annapurna Labs",
        "Anthem Blue Cross",
        "Antipodean Resistance",
        "Apple Inc",
//      "Apple",
        "Audi",
        "Australia/Israel & Jewish Affairs Council",
        "AutoPets",
        "Automated Pet Care Products",
        "BMW",
        "BP Amoco",
        "Bandai Namco",
        "Bank of America",
        "Bank of China",
        "Bayer",
        "Bayerische Motoren Werke AG",
        "Beira's Place",
        "Best Buy",
        "Bethesda",
        "BetterHelp",
        "Blizzard Entertainment",
        "Bloomberg",
        "Blue Cross Blue Shield Association",
        "Blue Shield",
        "Boeing",
        "Bricks & Minifigs",
        "British American Tobacco",
        "British Petroleum",
        "Buick",
        "ByteDance",
        "CNN",
        "CVS Health",
        "Cable News Network",
        "Cadbury Schweppes",
        "Cadbury",
        "Cadillac",
        "Campbell's",
        "Capital One",
        "Cardinal Health",
        "Cargill",
        "Carrefour",
        "Cencora",
        "Chevrolet",
        "Chevron",
        "Chick-fil-A",
        "China National Petroleum Corporation",
        "China National Tobacco Corporation",
        "China Tobacco",
        "Chipotle Mexican Grill",
        "Chipotle",
        "Cigna",
        "Cisco Systems",
        "Cisco",
        "Citi",
        "Citigroup",
        "Clif Bar",
        "Coca-Cola",
        "Comcast",
        "Cricut",
        "Crunchyroll",
        "Curse LLC",
        "CurseForge",
        "Dell",
        "DeviantArt",
        "Discord Inc",
        "Discovery Institute",
        "Disney",
        "DomTuned",
        "Dow Chemical Company",
        "Dow Inc",
        "Dyson",
        "Dzen News",
        "EC2",
        "EKWB",
        "Eagle Forum",
        "Eaton",
        "Edvard König Water Blocks",
        "Electronic Arts",
        "Elevance Health",
        "Enel",
        "Epic Games",
        "Exxon Mobil",
        "ExxonMobil",
        "FIDE",
        "Facebook",
        "Fitbit",
        "Fiverr",
        "Flock Safety",
        "Ford Motor Company",
        "Fox Corporation",
        "Fox News",
        "Foxconn",
        "Futrehome",
        "GMC",
        "GeForce",
        "Gen Digital",
        "General Motors",
        "Glencore",
        "Goldman Sachs",
        "Google",
        "Greenpeace International",
        "Greenpeace",
        "Groyper Army",
        "Groypers",
        "H&M",
        "HDMI",
        "HP Inc",
        "HP Labs",
        "HP Omen",
        "Hamas",
        "Happy Bar & Grill",
        "HelloFresh",
        "Herstigte Nasionale Party",
        "Hewlett-Packard",
        "Hisense",
        "Hon Hai Precision Industry",
        "Honda",
        "HyperX",
        "Hyundai Motor Company",
        "Hyundai Motors",
        "Hyundai",
        "Imperial Brands",
        "Industrial and Commercial Bank of China",
        "Instagram",
        "Intel",
        "International Chess Federation",
        "Intuit",
        "JPMorgan Chase",
        "Japan Tobacco International",
        "John Deere",
        "Kalshi",
        "Kellanova",
        "Kellogg",
        "Kia",
        "Krafton",
        "Ku Klux Klan",
        "LG",
        "Lenovo",
        "LinkedIn",
        "Litter Robot",
        "Litter-Robot",
        "MAGA",
        "Make America Great Again",
        "McDonald's",
        "MegaSpeed",
        "Mercedes",
        "Meta Platforms",
        "Micro-Star International",
        "Micron Technology",
        "Mitsubishi",
        "Mondelez International",
        "Monsanto",
        "NVIDIA",
        "NY Post",
        "NZXT",
        "Nabisco",
        "Nestlé",
        "Netflix",
        "Netgear",
        "Neurable",
        "New York Post",
        "Newsmax",
        "Nintendo",
        "Nissan Motor",
        "Nissan",
        "Nordic Resistance Movement",
        "NortonLifeLock",
        "Novartis",
        "OOONA",
        "OpenAI",
        "Oracle",
        "Overwolf",
        "Patreon",
        "PayPal Honey",
        "PayPal",
        "Pegatron",
        "Peloton",
        "Perdue Farms",
        "Pfizer",
        "PhRMA",
        "Pharmaceutical Research and Manufacturers of America",
        "Philip Morris International",
        "PlayStation",
        "Procter & Gamble",
        "Puma",
        "Purdue Pharma",
        "PuroAir",
        "Razer",
        "Reddit",
        "Relational Software",
        "Restaurant Brands International",
        "RevUp America",
        "RevUp",
        "Roblox",
        "Roche",
        "Roku",
        "SK Hynix",
        "Samsung",
        "Sega",
        "Shein",
        "Siemens",
        "Snap Inc",
        "Snapchat",
        "SoftKey International",
        "SoftKey Software Products",
        "SoftKey",
        "Software Development Laboratories",
        "Sonos",
        "Sony PlayStation",
        "Sony",
        "Spotify",
        "Starbucks",
        "SteelSeries",
        "Symantec Corporation",
        "TPG Capital",
        "TPUSA",
        "Temu",
        "Tencent",
        "Tesla Inc",
        "Tesla Model",
        "The British Petroleum Company",
        "The Campbell's Company",
        "The Central Bottling Company",
        "The Cigna Group",
        "The New York Times",
        "The Procter & Gamble Company (P&G)",
        "The Trump Organization",
        "The Washington Post",
        "TikTok",
        "Tim Hortons",
        "TotalEnergies",
        "Toyota",
        "Trade Me",
        "TradeMe",
        "Tripp Lite",
        "Trump Media & Technology Group",
        "Truth Social",
        "TurboTax",
        "Turning Point USA",
        "Twitch.tv",
        "Twitter",
        "Tyson Foods",
        "UberEATS",
        "Ubisoft",
        "Unilever",
        "UnitedHealth Group",
        "UnitedHealthcare",
        "VDARE",
        "VZIO",
        "Verisk Analytics",
        "Verizon",
        "Victus",
        "VitalSource",
        "Vitol",
        "Vizio",
        "WHOOP",
        "WaPo",
        "Walmart",
        "Wells Fargo",
        "Wemo",
        "Wendy's International",
        "WhatsApp",
        "Wikia",
        "Wix.com",
        "World Chess Federation",
        "X Corp",
        "Xfinity",
        "Yahoo!",
        "Yandex",
        "YouTube",
        "Zoom Communications",
        "eBay",
        "iTunes",
    ];

    // Default replacement
    const replacement = "Evil Corp";
    // Special replacement for Microsoft
    const specialReplacement = "Microslop";

    // Build combined list (including Microsoft) and sort by descending length for correct matching
    const allNames = [...companyNames, "Microsoft"];
    allNames.sort((a, b) => b.length - a.length);

    /**
     * Escapes special characters for regex
     */
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const escapedNames = allNames.map(escapeRegExp);
    // Combined regex with word boundaries
    const combinedRegex = new RegExp(`(?<!\\w)(${escapedNames.join('|')})(?!\\w)`, 'giu');

    // Inject CSS for the red halo effect
    const style = document.createElement('style');
    style.textContent = `
        .evil-corp-replacement {
            text-shadow: 0 0 4px rgba(255, 0, 0, 0.8), 0 0 2px rgba(255, 0, 0, 0.6);
            transition: text-shadow 0.1s ease;
            cursor: help;
        }
        .evil-corp-replacement:hover {
            text-shadow: 0 0 6px rgba(255, 0, 0, 1), 0 0 3px rgba(255, 0, 0, 0.8);
        }
    `;
    document.head.appendChild(style);

    /**
     * Wraps all matched company names inside a text node with <span> elements
     * that have a red glow and a title attribute showing the original text.
     */
    function wrapMatchesInNode(textNode) {
        const parent = textNode.parentElement;
        if (!parent) return;

        const parentTag = parent.tagName.toLowerCase();
        if (parentTag === 'script' || parentTag === 'style' || parent.isContentEditable) {
            return;
        }
        // Skip if already inside a replacement span to avoid double wrapping
        if (parent.classList && parent.classList.contains('evil-corp-replacement')) {
            return;
        }

        const text = textNode.nodeValue;
        if (!text.trim()) return;

        // Find all matches with their indices
        const matches = [];
        let match;
        combinedRegex.lastIndex = 0;
        while ((match = combinedRegex.exec(text)) !== null) {
            matches.push({
                fullMatch: match[0],
                start: match.index,
                end: match.index + match[0].length
            });
        }

        if (matches.length === 0) return;

        // Build a document fragment with alternating text and span nodes
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        for (const match of matches) {
            // Add text before the match
            if (match.start > lastIndex) {
                const beforeText = text.substring(lastIndex, match.start);
                if (beforeText) {
                    fragment.appendChild(document.createTextNode(beforeText));
                }
            }

            // Create the replacement span
            const span = document.createElement('span');
            span.className = 'evil-corp-replacement';

            // Determine replacement text (special for Microsoft)
            const isMicrosoft = match.fullMatch.toLowerCase() === 'microsoft';
            span.textContent = isMicrosoft ? specialReplacement : replacement;
            span.title = match.fullMatch; // show original on hover

            fragment.appendChild(span);
            lastIndex = match.end;
        }

        // Add any remaining text after the last match
        if (lastIndex < text.length) {
            const afterText = text.substring(lastIndex);
            if (afterText) {
                fragment.appendChild(document.createTextNode(afterText));
            }
        }

        // Replace the original text node with our new fragment
        textNode.parentNode.replaceChild(fragment, textNode);
    }

    /**
     * Processes all eligible text nodes within the given context element.
     */
    function replaceTextInNode(contextNode) {
        if (!contextNode || contextNode.nodeType !== Node.ELEMENT_NODE) return;

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

        textNodes.forEach(wrapMatchesInNode);
    }

    // --- Initial execution and observer ---
    replaceTextInNode(document.body);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((newNode) => {
                if (newNode.nodeType === Node.ELEMENT_NODE) {
                    replaceTextInNode(newNode);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
