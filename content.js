let dismissedEmail = "";

function runAnalysis(){

    const result =
        analyzePage();

    window.phishGuardResult =
        result;

const emailFingerprint =
    result.findings.join("|") +
    result.score;

    const existingBanner =
        document.getElementById(
            "phishguard-banner"
        );

    if(existingBanner){
        existingBanner.remove();
    }

   if(
    result.score <= 0 ||
    dismissedEmail === emailFingerprint
){
    return;
}


    const banner =
        document.createElement("div");

    banner.id =
        "phishguard-banner";

    let color = "#28a745";

    if(result.risk === "MEDIUM")
        color = "#ffc107";

    if(result.risk === "HIGH")
        color = "#fd7e14";

    if(result.risk === "CRITICAL")
        color = "#dc3545";

    banner.innerHTML = `
        <div>
            <strong>🛡️ PhishGuard</strong>
            | Score: ${result.score}
            | Risk: ${result.risk}

            <button
                id="pgClose"
                style="
                    margin-left:10px;
                    cursor:pointer;
                    border:none;
                    padding:4px 8px;
                ">
                ✕
            </button>

            <div
                style="
                    margin-top:8px;
                    font-size:12px;
                ">

                ${result.findings
                    .map(
                        finding =>
                            `• ${finding}`
                    )
                    .join("<br>")
                }

            </div>

        </div>
    `;

    banner.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        right:0;
        background:${color};
        color:white;
        z-index:999999;
        padding:10px;
        font-family:Arial,sans-serif;
        font-size:14px;
        text-align:center;
    `;

    document.body.appendChild(
        banner
    );

    const closeButton =
        document.getElementById(
            "pgClose"
        );

   closeButton.addEventListener(
    "click",
    () => {

        dismissedEmail =
            emailFingerprint;

        banner.remove();

    }
);

    

}

runAnalysis();


let analysisTimer;

const observer =
    new MutationObserver(() => {

        clearTimeout(
            analysisTimer
        );

        analysisTimer =
            setTimeout(
                runAnalysis,
                1500
            );

    });

observer.observe(
    document.body,
    {
        childList: true,
        subtree: true
    }
);

chrome.runtime.onMessage.addListener(
    (
        request,
        sender,
        sendResponse
    ) => {

        if(
            request.action ===
            "getResults"
        ){

            sendResponse(
                window.phishGuardResult
            );

        }

    }
);