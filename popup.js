chrome.tabs.query(
    {
        active: true,
        currentWindow: true
    },

    tabs => {

        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                action: "getResults"
            },

            response => {

                if(!response)
                    return;

                document.getElementById(
                    "score"
                ).innerHTML =
                    `
                    Score: ${response.score}<br>
                    Risk: ${response.risk}
                    `;

                const findings =
                    document.getElementById(
                        "findings"
                    );

                response.findings.forEach(
                    finding => {

                        const li =
                            document.createElement("li");

                        li.textContent =
                            finding;

                        findings.appendChild(
                            li
                        );

                    }
                );

            }
        );

    }
);