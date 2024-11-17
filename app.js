document.getElementById("osintForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("query").value;
    const resultsDiv = document.getElementById("results");

    resultsDiv.textContent = "Loading...";

    try {
        const response = await fetch(`https://your-backend-url/shodan?query=${query}`);
        const data = await response.json();

        if (data.error) {
            resultsDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
            return;
        }

        resultsDiv.innerHTML = `
            <h3>Results for ${query}</h3>
            <p><strong>IP:</strong> ${data.ip_str || "N/A"}</p>
            <p><strong>Organization:</strong> ${data.org || "N/A"}</p>
            <p><strong>Open Ports:</strong> ${data.ports ? data.ports.join(", ") : "None"}</p>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});
