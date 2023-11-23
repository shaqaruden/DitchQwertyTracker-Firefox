function exerciseDataHandler() {
    return {
        exerciseData: [],

        fetchData() {
            browser.storage.local.get("exerciseData").then(result => {
                if (result.exerciseData) {
                    this.exerciseData = result.exerciseData.map(data => {
                        // Format the datetime for each data entry
                        data.formattedDatetime = this.formatDateTime(data.datetime);
                        return data;
                    });
                }
            });
        },

        formatDateTime(isoString) {
            const date = new Date(isoString);
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
            return date.toLocaleString('en-US', options);
        },
        formatTime(timeString) {
            // Replaces "1m :30 s" with "1m 30s"
            return timeString.replace(/\s*:\s*/, ' ').trim();
        },
        confirmClearData() {
            if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
                this.clearData();
            }
        },
        clearData() {
            this.exerciseData = [];
            browser.storage.local.set({ "exerciseData": [] });
        },
        collectData() {
            browser.runtime.sendMessage({ command: "store-exercise" });
        }
    };
}
