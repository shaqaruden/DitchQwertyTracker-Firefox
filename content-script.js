function extractData() {
    // Access and extract data from the page's DOM here
    // For example, let data = document.querySelector('.some-element').textContent;
    let time = document.querySelector('#timeText').textContent;
    let accuracy = extractPercentage();
    let wpm = extractWPM();

    if (time === null || accuracy === null || wpm === null) {
        return null;
    }

    let datetime = new Date().toISOString();

    return { time, accuracy, wpm, datetime };
}

function extractPercentage() {
    // Find the element that contains the accuracy text.
    // This example assumes the text is directly within a certain element (e.g., a <div> or <span>).
    // You may need to adjust the selector based on the actual structure of the webpage.
    let accuracyText = document.querySelector('#accuracyText').textContent;

    // Extract the percentage value from the text
    let matches = accuracyText.match(/Accuracy: (\d+\.\d+)%/);
    if (matches && matches.length > 1) {
        // Parse the percentage value
        return matches[1];
    }

    // Return a default value or handle the case where the text is not found
    return null;
}

function extractWPM() {
    // Find the element that contains the WPM text.
    // Adjust the selector to target the specific element that contains the WPM text.
    let wpmText = document.querySelector('#wpmText').textContent;

    // Extract the WPM value from the text
    let matches = wpmText.match(/WPM: (\d+\.\d+)/);
    if (matches && matches.length > 1) {
        // Parse the WPM value
        let wpm = parseFloat(matches[1]);
        return wpm;
    }

    // Return a default value or handle the case where the text is not found
    return null;
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "extract-data") {
        let data = extractData();
        if (data !== null) {
            sendResponse({ data });
        } else {
            alert('Missing data on the page')
        }
    }
});

// Send the extracted data to the background script
