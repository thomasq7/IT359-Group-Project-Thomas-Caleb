const TRUSTED_DOMAINS = [

    "google.com",
    "bing.com",
    "duckduckgo.com",
    "search.brave.com",

    "facebook.com",
    "instagram.com",
    "messenger.com",

    "chatgpt.com",
    "openai.com",

    "github.com",

    "youtube.com",

    "amazon.com",

    "apple.com",

    "microsoft.com",

    "outlook.com"

];

const BRAND_DOMAINS = {
    paypal: ["paypal.com"],
    microsoft: [
    "microsoft.com",
    "outlook.com",
    "office.com",
    "live.com",
    "microsoftonline.com",
    "bing.com",
    "windows.com",
    "xbox.com"
],
    apple: [
        "apple.com",
        "icloud.com"
    ],
    amazon: [
        "amazon.com",
        "amazonaws.com",
        "amazon.co.uk",
        "amazon.ca"
    ],
    google: [
    "google",
    "google.com",
    "gmail.com",
    "youtube.com",
    "googleusercontent.com",
    "gstatic.com",
    "googleapis.com",
    "withgoogle.com",
    "googleadservices.com"
],
    netflix: ["netflix.com"],
    facebook: [
    "facebook.com",
    "facebookmail.com",
    "meta.com",
    "fb.com",
    "messenger.com",
    "instagram.com",
    "cdninstagram.com"
],
    instagram: [
    "instagram.com",
    "cdninstagram.com",
    "facebook.com",
    "fb.com",
    "l.facebook.com"
],
    linkedin: [
        "linkedin.com",
        "licdn.com"
    ],
    dropbox: [
        "dropbox.com",
        "dropboxusercontent.com"
    ],
    docusign: [
        "docusign.com",
        "docusign.net"
    ],
    chase: ["chase.com"],
    wellsfargo: ["wellsfargo.com"],
    bankofamerica: ["bankofamerica.com"],
    usps: ["usps.com"],
    fedex: ["fedex.com"],
    dhl: ["dhl.com"],
    irs: ["irs.gov"],
    openai: [
        "openai.com",
        "chat.openai.com",
        "chatgpt.com",
        "oaistatic.com"
    ],
    chatgpt: [
        "chatgpt.com",
        "openai.com",
        "chat.openai.com",
        "oaistatic.com"
    ],
    steam: ["steampowered.com"],
    whatsapp: ["whatsapp.com"],
    yahoo: ["yahoo.com"],
    xfinity: ["xfinity.com"],
    tesla: ["tesla.com"],
    att: ["att.com"],
    telekom: [
        "telekom.com",
        "t-mobile.com"
    ],
    cpsc: ["cpsc.gov"],
    walmart: ["walmart.com"],
    nike: ["nike.com"],
    ledger: ["ledger.com"],
    coinbase: ["coinbase.com"],
    youtube: [
        "youtube.com",
        "youtu.be",
        "googlevideo.com"
    ],
    ups: ["ups.com"],
    royalmail: ["royalmail.com"],
    citi: ["citi.com"],
    capitalone: ["capitalone.com"],
    hsbc: ["hsbc.com"],
    pnc: ["pnc.com"],
    truist: ["truist.com"],
    americanexpress: ["americanexpress.com"],
    discover: ["discover.com"],
    verizon: ["verizon.com"],
    tmobile: ["t-mobile.com"],
    sprint: ["sprint.com"],
    vodafone: ["vodafone.com"],
    orange: ["orange.com"],
    ebay: ["ebay.com"],
    target: ["target.com"],
    costco: ["costco.com"],
    bestbuy: ["bestbuy.com"],
    homedepot: ["homedepot.com"],
    lowes: ["lowes.com"],
    shein: ["shein.com"],
    aliexpress: ["aliexpress.com"],
    etsy: ["etsy.com"],
    uber: ["uber.com"],
    lyft: ["lyft.com"],
    airbnb: ["airbnb.com"],
    booking: ["booking.com"],
    expedia: ["expedia.com"],
    intuit: [
        "intuit.com",
        "turbotax.com",
        "quickbooks.com"
    ],
    adobe: ["adobe.com"],
    salesforce: ["salesforce.com"],
    slack: ["slack.com"],
    zoom: [
        "zoom.us",
        "zoom.com"
    ],
    github: [
        "github.com",
        "githubusercontent.com"
    ],
    gitlab: ["gitlab.com"],
    bitbucket: ["bitbucket.org"],
    binance: ["binance.com"],
    kraken: ["kraken.com"],
    metamask: ["metamask.io"],
    opensea: ["opensea.io"],
    irs_state: ["state.gov"],
    ssa: ["ssa.gov"],
    medicare: ["medicare.gov"],

bing: [
    "bing.com"
],

duckduckgo: [
    "duckduckgo.com"
],

yahoo: [
    "yahoo.com"
],

brave: [
    "search.brave.com",
    "brave.com"
],

startpage: [
    "startpage.com"
],

ecosia: [
    "ecosia.org"
],

ask: [
    "ask.com"
],

aol: [
    "aol.com"
]

};

const BRANDS = {};

for(const brand in BRAND_DOMAINS){

    BRANDS[brand] = {

        domains: BRAND_DOMAINS[brand],

        keywords: [
            brand,
            `${brand} account`,
            `${brand} login`,
            `${brand} security`,
            `${brand} verification`
        ]

    };

}
BRANDS.paypal.keywords.push(
    "verify account",
    "payment pending",
    "paypal security"
);

BRANDS.microsoft.keywords.push(
    "office 365",
    "outlook login",
    "microsoft account",
    "password reset"
);

BRANDS.amazon.keywords.push(
    "amazon order",
    "amazon delivery",
    "track package"
);

BRANDS.google.keywords.push(
    "gmail",
    "google sign in",
    "google account"
);

BRANDS.chatgpt.keywords.push(
    "chatgpt plus",
    "chatgpt login"
);

BRANDS.openai.keywords.push(
    "openai",
    "gpt",
    "chatgpt"
);

BRANDS.bankofamerica.keywords.push(
    "bank of america",
    "boa account"
);

BRANDS.americanexpress.keywords.push(
    "american express",
    "amex"
);

BRANDS.coinbase.keywords.push(
    "coinbase wallet"
);



const BAD_TLDS = [
    "xyz",
    "top",
    "click",
    "loan"
];

const SHORTENERS = [
    "bit.ly",
    "tinyurl.com"
];

const KEYWORDS = {
    urgency: [
        "urgent",
        "act now",
        "immediately"
    ]
};

const BAD_FILES = [
    ".exe",
    ".scr",
    ".js",
    ".vbs",
    ".bat",
    ".cmd",
    ".msi",
    ".jar",
    ".apk",
    ".ps1",
    ".hta"
];
const MACRO_FILES = [
    ".docm",
    ".xlsm",
    ".pptm"
];
const ARCHIVE_FILES = [
    ".zip",
    ".rar",
    ".7z",
    ".iso"
];
