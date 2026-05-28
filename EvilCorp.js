// ==UserScript==
// @name        Accurate Company Names
// @version    	1.9.6
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
        "711",
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
        "Amazon Elastic Compute Cloud",
        "Amazon Kindle",
        "Amazon Web Services",
        "Amazon.com",
        "AmerisourceBergen",
        "Amway",
        "Anduril Industries",
        "Annapurna Labs",
        "Anthem Blue Cross",
        "Antipodean Resistance",
        "Apple Inc",
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
        "Dow Chemical Company",
        "Dow Inc",
        "Dyson",
        "Dzen News",
        "EC2",
        "EKWB",
        "Eagle Forum",
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
        "Verisk Analytics",
        "Verizon",
        "Victus",
        "VitalSource",
        "Vitol",
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

    /**
     * Escapes special characters for regex
     */
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Main regex
    const escapedCompanyNames = companyNames.map(escapeRegExp);
    const companyRegex = new RegExp(`(?<!\\w)(${escapedCompanyNames.join('|')})(?!\\w)`, 'giu');

    // Special regex for Microsoft → Microslop
    const specialRegex = new RegExp(`(?<!\\w)Microsoft(?!\\w)`, 'giu');

    // Text replacement function
    const replaceTextInNode = (contextNode) => {
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

        textNodes.forEach(node => {
            const parent = node.parentElement;
            if (parent) {
                const parentTag = parent.tagName.toLowerCase();
                if (parentTag === 'script' || parentTag === 'style' || parent.isContentEditable) {
                    return;
                }
            }

            let text = node.nodeValue;
            const originalText = text;

            // 1. Apply special Microsoft replacement first
            if (specialRegex.test(text)) {
                specialRegex.lastIndex = 0;
                text = text.replace(specialRegex, specialReplacement);
            }

            // 2. Apply general company replacement
            if (companyRegex.test(text)) {
                companyRegex.lastIndex = 0;
                text = text.replace(companyRegex, replacement);
            }

            if (originalText !== text) {
                node.nodeValue = text;
            }
        });
    };

    // --- Execution ---
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
