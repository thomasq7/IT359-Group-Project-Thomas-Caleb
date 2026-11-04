function getRiskLevel(score) {

    if(score >= 75)
        return "CRITICAL";

    if(score >= 50)
        return "HIGH";

    if(score >= 25)
        return "MEDIUM";

    return "LOW";
}

function analyzeDomain(result){

    const host =
        location.hostname;

    const tld =
        host.split(".").pop();

    if(BAD_TLDS.includes(tld)){

        result.score += 15;

        result.findings.push(
    `Suspicious domain ending (.${tld})`
);
    }
}



function analyzeLinks(result){

    const links =
        document.querySelectorAll("a");

    links.forEach(link => {

        try{

            const url =
                new URL(link.href);

            if(
                SHORTENERS.includes(
                    url.hostname
                )
            ){

                result.score += 10;

                result.findings.push(
    "Shortened URL detected"
);

            }

        }
        catch(error){
        }

    });

}

function analyzeIPLinks(result){

    const ipRegex =
        /^\d{1,3}(\.\d{1,3}){3}$/;

    document
    .querySelectorAll("a")
    .forEach(link => {

        try{

            const host =
                new URL(link.href)
                .hostname;

            if(
                ipRegex.test(host)
            ){

                result.score += 15;

                result.findings.push(
                    `IP address link: ${host}`
                );

            }

        }
        catch{
        }

    });

}

function analyzeHiddenLinks(result){

    document
    .querySelectorAll("a")
    .forEach(link => {

        const text =
            link.innerText
            .toLowerCase()
            .trim();

        if(
            text === "click here" ||
            text === "sign in" ||
            text === "verify now" ||
            text === "update account"
        ){

            result.score += 10;

            result.findings.push(
                `Generic phishing phrase link (${text})`
            );

        }

    });

}


function analyzeContent(result){

    const text =
        document.body.innerText
            .toLowerCase();

    KEYWORDS.urgency.forEach(
        word => {

            if(text.includes(word)){

                result.score += 2;

                result.findings.push(
                    "Urgency phrase: " + word
                );
            }
        }
    );
}


function analyzeForms(result){

    const passwordFields =
        document.querySelectorAll(
            'input[type="password"]'
        );

    if(!passwordFields.length){
        return;
    }

    const host =
        location.hostname.toLowerCase();

    let trusted = false;

    for(const brand in BRANDS){

        if(
            isLegitimateBrandDomain(
                host,
                brand
            )
        ){

            trusted = true;
            break;

        }

    }

    if(!trusted){

        result.score += 15;

        result.findings.push(
            "Login form requests credentials"
        );

    }

}



function analyzeCredentialHarvesting(result){

    const pageText =
        document.body.innerText
        .toLowerCase();

    const hasPasswordField =
        document.querySelectorAll(
            'input[type="password"]'
        ).length > 0;

const host =
    location.hostname
    .toLowerCase();

    if(!hasPasswordField)
        return;

    for(const brand in BRANDS){

        const brandMatch =
            BRANDS[brand].keywords.some(
                keyword =>
                    pageText.includes(
                        keyword.toLowerCase()
                    )
            );

        if(
    brandMatch &&
    !isLegitimateBrandDomain(
        host,
        brand
    )
){

            result.score += 30;

            result.findings.push(
                `Credential request using ${brand} branding`
            );

        }

    }

}


function analyzeDownloads(result){

    document
    .querySelectorAll("a")
    .forEach(link => {

        const href =
            link.href.toLowerCase();

        if(
            href.endsWith(".exe")
        ){

            result.score += 25;

            result.findings.push(
                "Executable download"
            );
        }

    });
}

function analyzeAttachments(result){

    const links =
        document.querySelectorAll("a");

    links.forEach(link => {

        const content =
            (
                link.href +
                " " +
                link.innerText
            ).toLowerCase();

        BAD_FILES.forEach(ext => {

            if(
                content.includes(ext)
            ){

                result.score += 25;

                result.findings.push(
                    `Dangerous attachment (${ext})`
                );

            }

        });

        MACRO_FILES.forEach(ext => {

            if(
                content.includes(ext)
            ){

                result.score += 15;

                result.findings.push(
                    `Macro-enabled document (${ext})`
                );

            }

        });

        ARCHIVE_FILES.forEach(ext => {

            if(
                content.includes(ext)
            ){

                result.score += 8;

                result.findings.push(
                    `Archive attachment (${ext})`
                );

            }

        });

    });

}
function analyzePhishingLanguage(result){

    const text =
        document.body.innerText
        .toLowerCase();

    const phrases = [

        "verify your account",

        "account suspended",

        "unusual activity",

        "confirm your identity",

        "update your payment",

        "your account has been locked",

        "immediate action required",

        "click below",

        "verify now"

    ];

    phrases.forEach(phrase => {

        if(
            text.includes(phrase)
        ){

            result.score += 10;

            result.findings.push(
                `Phishing phrase: ${phrase}`
            );

        }

    });

}

function analyzeEmailLinks(result){

    document
    .querySelectorAll("a")
    .forEach(link => {

        const text =
            link.innerText.trim();

        const url =
            link.href;

        if(
            text.length > 0
        ){

            result.findings.push(
                `Email link: "${text}" → ${url}`
            );

        }

    });

}


function analyzeEmailButtons(result){

    document
    .querySelectorAll("a")
    .forEach(link => {

        const text =
            link.innerText
            .toLowerCase()
            .trim();

        if(

            text.includes("sign in") ||

            text.includes("verify account") ||

            text.includes("view document") ||

            text.includes("update information")

        ){

            result.score += 10;

            result.findings.push(
                `Suspicious email button (${text})`
            );

        }

    });

}

function analyzeImages(result){

    document
    .querySelectorAll("img")
    .forEach(img => {

        try{

            const url =
                new URL(img.src);

            const host =
                url.hostname
                .toLowerCase();

            if(
                BAD_TLDS.some(
                    tld =>
                        host.endsWith(
                            "." + tld
                        )
                )
            ){

                result.score += 10;

                result.findings.push(
                    `Image hosted on suspicious domain (${host})`
                );

            }

            for(const brand in BRANDS){

                const imageText =
                    img.src.toLowerCase();

                const brandMatch =
                    BRANDS[brand].keywords.some(
                        keyword =>
                            imageText.includes(
                                keyword.toLowerCase()
                            )
                    );

                if(
                    brandMatch &&
                    !isLegitimateBrandDomain(
                        host,
                        brand
                    )
                ){

                    result.score += 15;

                    result.findings.push(
                        `Possible fake ${brand} image`
                    );

                }

            }

        }
        catch{}

    });

}

function analyzeQRCodeImages(result){

    document
    .querySelectorAll("img")
    .forEach(img => {

        const src =
            img.src.toLowerCase();

        if(
            src.includes("qr") ||
            src.includes("qrcode")
        ){

            result.score += 10;

            result.findings.push(
                "Possible QR code detected"
            );

        }

    });

}


function analyzeBrand(result){

    const host =
        location.hostname.toLowerCase();

    const hostParts =
        host.split(/[.-]/);

    for(const brand in BRANDS){

        if(
    hostParts.includes(brand)
){

    if(
        !isLegitimateBrandDomain(
            host,
            brand
        )
    ){

        result.score += 25;

        result.findings.push(
            `Website may be impersonating ${brand}`
        );

    }

}

}
}

function analyzeSenderDisplay(result){

    const pageText =
        document.body.innerText
        .toLowerCase();

    for(const brand in BRANDS){

        if(
            pageText.includes(
                `${brand} security`
            )
        ){

            result.score += 5;

            result.findings.push(
                `Uses ${brand} security wording`
            );

        }

    }

}



function isLegitimateBrandDomain(host, brand){

    host = host.toLowerCase();

    if(
        host === brand ||
        host.endsWith("." + brand)
    ){
        return true;
    }

    return BRANDS[brand].domains.some(domain =>
    host === domain ||
    host.endsWith("." + domain) ||
    domain === host
);

}

function analyzeMismatchedLinks(result){

    document
    .querySelectorAll("a")
    .forEach(link => {

        const visible =
            (
                link.innerText +
                " " +
                (link.title || "") +
                " " +
                (link.getAttribute("aria-label") || "")
            )
            .toLowerCase();

        let actual = "";

        try{

            actual =
                new URL(link.href)
                .hostname
                .toLowerCase();

        }
        catch{

            return;

        }


        for(const brand in BRANDS){

    const brandMatch =
    BRANDS[brand].keywords.some(
        keyword =>
            visible.includes(
                keyword.toLowerCase()
            )
    );

if(brandMatch){

    const legitimate =
        isLegitimateBrandDomain(
            actual,
            brand
        );

    if(!legitimate){

        result.score += 20;

        result.findings.push(
    `${brand} link points to ${actual}`
);

    }

}

        }

    });

}

function analyzeEmailPage(result){

    const host =
        location.hostname.toLowerCase();

    const emailProviders = [
        "mail.google.com",
        "outlook.office.com",
        "outlook.live.com",
        "mail.yahoo.com"
    ];

    if(
        emailProviders.some(
            provider =>
                host.includes(provider)
        )
    ){

        result.findings.push(
            "Email message detected"
        );

    }

}

function analyzeEmailButtons(result){

    document
    .querySelectorAll("a, button")
    .forEach(element => {

        const text =
            element.innerText
            .toLowerCase()
            .trim();

        if(

            text.includes("sign in") ||

            text.includes("open document") ||

            text.includes("view document") ||

            text.includes("verify account") ||

            text.includes("review message")

        ){

            result.score += 15;

            result.findings.push(
                `Suspicious email button (${text})`
            );

        }

    });

}

function analyzePage(){

    const result = {
        score:0,
        findings:[]
    };

    analyzeDomain(result);

    analyzeLinks(result);

    analyzeIPLinks(result);

    analyzeHiddenLinks(result);

    analyzeForms(result);

    analyzeCredentialHarvesting(result);

    analyzeContent(result);

    analyzePhishingLanguage(result);

    analyzeEmailButtons(result);

    analyzeDownloads(result);

    analyzeAttachments(result);

    analyzeImages(result);

    analyzeQRCodeImages(result);

    analyzeBrand(result);

    analyzeSenderDisplay(result);

    analyzeMismatchedLinks(result);

    analyzeEmailPage(result);

    analyzeEmailLinks(result);

    result.risk =
        getRiskLevel(
            result.score
        );

    return result;

}
