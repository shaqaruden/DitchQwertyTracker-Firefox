// Initialize storage with an empty array if not already present
browser.storage.local.get("exerciseData").then(result => {
    if (!result.exerciseData) {
        browser.storage.local.set({ "exerciseData": [] });
    }
});

function saveExerciseData(newData) {
    browser.storage.local.get("exerciseData").then(result => {
        let dataInstances = result.exerciseData || [];
        dataInstances.push(newData);
        browser.storage.local.set({ "exerciseData": dataInstances });
    });
}

browser.commands.onCommand.addListener((command) => {
    if (command === 'store-exercise') {
        console.log('store-exercise')
        browser.tabs.query({ active: true, currentWindow: true })
            .then((tabs) => {
                let activeTab = tabs[0];

                if (activeTab.url && activeTab.url.includes('ditchqwerty.com')) {
                    browser.tabs.sendMessage(tabs[0].id, { command: "extract-data" })
                        .then(({ data }) => {
                            saveExerciseData(data);
                        });
                }
            });
    }
})