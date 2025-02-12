document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector("#csv-table tbody");

    try {
        const response = await fetch("/api/csv-data");
        const data = await response.json();

        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.name}</td><td>${row.age}</td><td>${row.city}</td>`;
            tableBody.appendChild(tr);
        });

    } catch (error) {
        console.error("Error fetching CSV data:", error);
    }
});
