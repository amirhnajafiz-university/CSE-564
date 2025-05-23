/**
 * Fetches JSON data from a given endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {Promise<any>} - A promise that resolves with the JSON data.
 */
async function fetchDataFromAPI(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await handledResponse.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    showAlert(`Failed to fetch data from ${endpoint}.`, "danger");
    return null;
  }
}

/**
 * Displays a custom alert div at the top of the page.
 * @param {string} message - The message to display in the alert.
 * @param {string} type - The type of alert (e.g., "success", "error").
 */
function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-container");
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show d-flex align-items-center`;
  alertDiv.role = "alert";
  alertDiv.style.marginBottom = "10px"; // Add margin to create space between alerts
  alertDiv.innerHTML = `
    <span>${message}</span>
  `;
  alertContainer.appendChild(alertDiv);

  // Trigger reflow to ensure the transition starts
  alertDiv.offsetHeight;
  alertDiv.classList.add("show");

  setTimeout(() => {
    alertDiv.classList.remove("show");
    alertDiv.classList.add("hide");
    setTimeout(() => alertDiv.remove(), 500); // Wait for transition to complete
  }, 4000);
}
