

// Ensure that the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Get the "View Stock Management" button and "Close" button
  const viewStockManagementBtn = document.getElementById('view-stock-management-btn');
  const closeStockManagementBtn = document.getElementById('close-stock-management-btn');
  const stockManagementSection = document.getElementById('stock-management');
  const mainContent = document.getElementById('main-content');

  // Function to show the Stock Management section and hide others
  function showStockManagement() {
    document.getElementById('main-content').style.display = 'none';  // Hide the main content
    stockManagementSection.style.display = 'block';  // Show the Stock Management section
  }

  // Function to close the Stock Management section and show the main content
  function closeStockManagement() {
    stockManagementSection.style.display = 'none';  // Hide Stock Management section
    document.getElementById('main-content').style.display = 'block';  // Show the main content
  }

  // Add event listener to open the Stock Management section
  if (viewStockManagementBtn) {
    viewStockManagementBtn.addEventListener('click', showStockManagement);
  }

  // Add event listener to close the Stock Management section
  if (closeStockManagementBtn) {
    closeStockManagementBtn.addEventListener('click', closeStockManagement);
  }
});

















// Function to calculate Available Tilapia 150 dynamically
function calculateAvailableTilapia150() {
  // Get input values for Tilapia 150
  const previousStock150 = parseFloat(document.getElementById('previous-tilapia-150').value) || 0;
  const purchasedStock150 = parseFloat(document.getElementById('purchased-tilapia-150').value) || 0;
  const lightSoup150 = parseFloat(document.getElementById('light-soup-tilapia-150').value) || 0;
  const damagedStock150 = parseFloat(document.getElementById('damaged-tilapia-150').value) || 0;
  const soldTilapia150 = parseFloat(document.getElementById('sold-tilapia-150').value) || 0;

  // Calculate Available Tilapia 150
  const availableTilapia150 = (previousStock150 + purchasedStock150) - (lightSoup150 + damagedStock150 + soldTilapia150);

  // Automatically fill the Available Tilapia 150 field with the calculated value
  document.getElementById('available-tilapia-150').value = availableTilapia150;
}

// Function to calculate Available Tilapia 120 dynamically
function calculateAvailableTilapia120() {
  // Get input values for Tilapia 120
  const previousStock120 = parseFloat(document.getElementById('previous-tilapia-120').value) || 0;
  const purchasedStock120 = parseFloat(document.getElementById('purchased-tilapia-120').value) || 0;
  const lightSoup120 = parseFloat(document.getElementById('light-soup-tilapia-120').value) || 0;
  const damagedStock120 = parseFloat(document.getElementById('damaged-tilapia-120').value) || 0;
  const soldTilapia120 = parseFloat(document.getElementById('sold-tilapia-120').value) || 0;

  // Calculate Available Tilapia 120
  const availableTilapia120 = (previousStock120 + purchasedStock120) - (lightSoup120 + damagedStock120 + soldTilapia120);

  // Automatically fill the Available Tilapia 120 field with the calculated value
  document.getElementById('available-tilapia-120').value = availableTilapia120;
}

// Call this function to calculate and set the Available Tilapia values on page load
document.addEventListener('DOMContentLoaded', () => {
  // Automatically calculate and fill Available Tilapia fields on page load
  calculateAvailableTilapia150();
  calculateAvailableTilapia120();

  // Add input event listeners to recalculate when the user changes any input field
  document.querySelectorAll('#previous-tilapia-150, #purchased-tilapia-150, #light-soup-tilapia-150, #damaged-tilapia-150, #sold-tilapia-150')
    .forEach(input => input.addEventListener('input', calculateAvailableTilapia150));

  document.querySelectorAll('#previous-tilapia-120, #purchased-tilapia-120, #light-soup-tilapia-120, #damaged-tilapia-120, #sold-tilapia-120')
    .forEach(input => input.addEventListener('input', calculateAvailableTilapia120));
});







// Get references to the "See Average Analytical" button, "Close" button, and analysis container
const toggleButton = document.getElementById('toggle-analysis-btn');
const closeButton = document.getElementById('close-analysis-btn');
const tilapiaAnalysisSection = document.getElementById('tilapia-cumulative-analysis'); // Renamed to avoid conflict

// Function to show the analysis container
function showAnalysis() {
  tilapiaAnalysisSection.style.display = 'block';
  toggleButton.style.display = 'none'; // Hide the "See Average Analytical" button after opening
}

// Function to hide the analysis container
function hideAnalysis() {
  tilapiaAnalysisSection.style.display = 'none';
  toggleButton.style.display = 'inline-block'; // Show the "See Average Analytical" button again
}

// Event listener to open the analysis section when the button is clicked
toggleButton.addEventListener('click', showAnalysis);

// Event listener to close the analysis section when the "Close" button is clicked
closeButton.addEventListener('click', hideAnalysis);

// Ensure that the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Get the "View Stock Management" button and "Close" button
  const viewStockManagementBtn = document.getElementById('view-stock-management-btn');
  const closeStockManagementBtn = document.getElementById('close-stock-management-btn');
  const stockManagementSection = document.getElementById('stock-management');
  const mainContent = document.getElementById('main-content');

  // Function to show the Stock Management section and hide others
  function showStockManagement() {
    document.getElementById('main-content').style.display = 'none';  // Hide the main content
    stockManagementSection.style.display = 'block';  // Show the Stock Management section
  }

  // Function to close the Stock Management section and show the main content
  function closeStockManagement() {
    stockManagementSection.style.display = 'none';  // Hide Stock Management section
    document.getElementById('main-content').style.display = 'block';  // Show the main content
  }

  // Add event listener to open the Stock Management section
  if (viewStockManagementBtn) {
    viewStockManagementBtn.addEventListener('click', showStockManagement);
  }

  // Add event listener to close the Stock Management section
  if (closeStockManagementBtn) {
    closeStockManagementBtn.addEventListener('click', closeStockManagement);
  }
});

// Reference to the orderHistory node
const ordersRef = db.ref('orderHistory');

// Variables to store cumulative totals and unique dates
let cumulativeTilapia150 = 0;
let cumulativeTilapia120 = 0;
const uniqueDates = new Set();

// Function to update the cumulative totals, date analysis, and averages
function updateAnalysis(snapshot) {
  // Reset cumulative totals and unique dates
  cumulativeTilapia150 = 0;
  cumulativeTilapia120 = 0;
  uniqueDates.clear();

  // Get the orders data
  const orders = snapshot.val();
  if (!orders) {
    console.log("No orders found.");
    return;
  }

  // Process each order
  Object.values(orders).forEach(order => {
    const orderDate = new Date(order.timestamp || order.completedTimestamp).toLocaleDateString();
    uniqueDates.add(orderDate);

    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        if (item.name.includes("Tilapia 150")) {
          cumulativeTilapia150 += item.quantity;
        } else if (item.name.includes("Tilapia 120") || item.name.includes("Tilapia 100")) {
          cumulativeTilapia120 += item.quantity;
        }
      });
    }
  });

  // Sort the unique dates
  const sortedDates = Array.from(uniqueDates).sort((a, b) => new Date(a) - new Date(b));
  const earliestDate = sortedDates[0];
  const latestDate = sortedDates[sortedDates.length - 1];
  const totalDays = sortedDates.length;

  // Calculate the averages
  const averages = calculateAverages(cumulativeTilapia150, cumulativeTilapia120, totalDays);

  // Update the UI with cumulative totals
  document.getElementById('cumulative-tilapia-150').textContent = `Total Tilapia 150: ${cumulativeTilapia150}`;
  document.getElementById('cumulative-tilapia-120').textContent = `Total Tilapia 120: ${cumulativeTilapia120}`;
  document.getElementById('cumulative-total').textContent = `Total Combined (Tilapia 150 + 120): ${cumulativeTilapia150 + cumulativeTilapia120}`;

  // Display the averages with custom rounding
  document.getElementById('avg-tilapia-150').textContent = `Average Tilapia 150 per day: ${customRound(averages.avgTilapia150)}`;
  document.getElementById('avg-tilapia-120').textContent = `Average Tilapia 120 per day: ${customRound(averages.avgTilapia120)}`;
  document.getElementById('avg-total').textContent = `Average Combined per day: ${customRound(averages.avgTotal)}`;

  // Display the date analysis
  const dateRangeContainer = document.getElementById('date-analysis');
  if (!dateRangeContainer) {
    const newContainer = document.createElement('div');
    newContainer.id = 'date-analysis';
    newContainer.innerHTML = `
      <h3>Date Analysis</h3>
      <p id="total-unique-days"></p>
      <p id="date-range"></p>
    `;
    document.getElementById('tilapia-cumulative-analysis').appendChild(newContainer);
  }

  document.getElementById('total-unique-days').textContent = `Total Unique Days: ${totalDays}`;
  document.getElementById('date-range').textContent = `Date Range: ${earliestDate} to ${latestDate}`;
}

// Set up a Firebase listener for real-time updates
ordersRef.on('value', snapshot => {
  updateAnalysis(snapshot);
});

// Function to calculate averages of Tilapia 150, Tilapia 120, and the combined total
function calculateAverages(cumulativeTilapia150, cumulativeTilapia120, totalDays) {
  // Check if there are any unique days to avoid division by zero
  if (totalDays === 0) {
    console.log("No days available for averaging.");
    return {
      avgTilapia150: 0,
      avgTilapia120: 0,
      avgTotal: 0
    };
  }

  // Calculate the averages
  const avgTilapia150 = cumulativeTilapia150 / totalDays;
  const avgTilapia120 = cumulativeTilapia120 / totalDays;
  const avgTotal = (cumulativeTilapia150 + cumulativeTilapia120) / totalDays;

  // Return the calculated averages
  return {
    avgTilapia150: avgTilapia150,
    avgTilapia120: avgTilapia120,
    avgTotal: avgTotal
  };
}

// Custom rounding function (round up if >= 0.5, round down if < 0.5)
function customRound(value) {
  return value >= 0.5 ? Math.ceil(value) : Math.floor(value);
}





























/*function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    if (!displayContainer) {
      console.error("Display container not found!");
      return;
    }

    displayContainer.innerHTML = '<h3>Items from All Merged Orders:</h3>';

    // Create a map to store merged items and their quantities
    const itemMap = {};

    // Iterate over all orders
    Object.values(orders).forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (itemMap[item.name]) {
            // If item exists in the map, add the quantity
            itemMap[item.name] += item.quantity;
          } else {
            // If item does not exist in the map, add it with its quantity
            itemMap[item.name] = item.quantity;
          }
        });
      }
    });

    // Create a styled table for the merged items
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.backgroundColor = '#fff';

    // Create the header row
    const headerRow = document.createElement('tr');
    ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#4CAF50';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate the table with merged items
    const mergedItems = Object.entries(itemMap);
    mergedItems.forEach(([itemName, itemQuantity], index) => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';
      row.style.transition = 'background-color 0.3s ease';

      // Hover effect
      row.onmouseover = () => (row.style.backgroundColor = '#f9f9f9');
      row.onmouseout = () => (row.style.backgroundColor = '#fff');

      // Serial number column
      const snCell = document.createElement('td');
      snCell.textContent = index + 1;
      snCell.style.padding = '12px';
      snCell.style.textAlign = 'center';
      snCell.style.border = '1px solid #ddd';
      row.appendChild(snCell);

      // Item name column
      const itemCell = document.createElement('td');
      itemCell.textContent = itemName;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      // Total quantity column
      const quantityCell = document.createElement('td');
      quantityCell.textContent = itemQuantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      // Add the row to the table
      table.appendChild(row);
    });

    // Append the table to the display container
    displayContainer.appendChild(table);
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
}

// Call the function on page load
window.onload = function () {
  fetchAndMergeOrderItems();
};*/
  
  






  
 /* 
  // Declare global variables for Tilapia totals
  let tilapia120Total = 0;
  let tilapia150Total = 0;

  // Function to update Sold Tilapia fields (this will not modify fetchAndMergeOrderItems)
  function updateSoldTilapiaFields() {
    // Use the calculated totals to fill the Sold Tilapia fields
    document.getElementById('sold-tilapia-120').value = tilapia120Total;
    document.getElementById('sold-tilapia-150').value = tilapia150Total;
  }

  // We can trigger this function by calling it after the data is fetched
  // Ensure this function runs after fetchAndMergeOrderItems is completed
  function triggerUpdateSoldTilapia() {
    // Call the function that updates the Sold Tilapia fields
    updateSoldTilapiaFields();
  }

  // Function to fetch and merge the order items (Unmodified)
  function fetchAndMergeOrderItems() {
    const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

    console.log("Fetching orders and merging all items...");

    dbRef.once('value', snapshot => {
      if (!snapshot.exists()) {
        console.error("No orders found in the 'orderHistory' node!");
        return;
      }

      // Retrieve all orders
      const orders = snapshot.val();
      console.log("Orders Retrieved:", orders);

      const displayContainer = document.getElementById('items-display');
      if (!displayContainer) {
        console.error("Display container not found!");
        return;
      }

      // Clear any existing content
      displayContainer.innerHTML = '';

      // Group orders by date
      const groupedOrders = {};
      Object.entries(orders).forEach(([orderId, orderData]) => {
        // Ignore the order if its status is "Cancelled Order"
        if (orderData.status === "Cancelled Order") {
          console.log(`Skipping cancelled order: ${orderId}`);
          return;
        }

        // Extract the order date (from timestamp or completedTimestamp)
        const orderDate = new Date(orderData.timestamp || orderData.completedTimestamp).toLocaleDateString();

        if (!groupedOrders[orderDate]) {
          groupedOrders[orderDate] = [];
        }
        groupedOrders[orderDate].push(orderData);
      });

      // Iterate through each date and generate tables
      Object.entries(groupedOrders).forEach(([date, ordersForDate]) => {
        // Create a section for this date
        const dateSection = document.createElement('div');
        dateSection.style.marginBottom = '30px';

        const dateHeading = document.createElement('h3');
        dateHeading.textContent = `Date: ${date}`;
        dateHeading.style.marginBottom = '15px';
        dateSection.appendChild(dateHeading);

        // Create a map to store merged items and their quantities
        const itemMap = {};

        // Process orders for this date
        ordersForDate.forEach(orderData => {
          if (orderData.items && Array.isArray(orderData.items)) {
            orderData.items.forEach(item => {
              // Merge all items into itemMap
              if (itemMap[item.name]) {
                itemMap[item.name] += item.quantity;
              } else {
                itemMap[item.name] = item.quantity;
              }

              // Aggregate "Tilapia 100" and "Tilapia 120" under Tilapia 120
              if (item.name.includes("Tilapia 100") || item.name.includes("Tilapia 120")) {
                tilapia120Total += item.quantity; // Store globally
              } else if (item.name.includes("Tilapia 150")) {
                tilapia150Total += item.quantity; // Store globally
              }
            });
          }
        });

        // Create the main table for all merged items
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '10px';
        table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        table.style.backgroundColor = '#fff';

        const headerRow = document.createElement('tr');
        ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
          const th = document.createElement('th');
          th.textContent = heading;
          th.style.padding = '12px';
          th.style.border = '1px solid #ddd';
          th.style.backgroundColor = '#4CAF50';
          th.style.color = '#fff';
          th.style.fontWeight = 'bold';
          th.style.textAlign = 'center';
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Populate the main table with merged items
        const mergedItems = Object.entries(itemMap);
        mergedItems.forEach(([itemName, itemQuantity], index) => {
          const row = document.createElement('tr');
          row.style.border = '1px solid #ddd';

          const snCell = document.createElement('td');
          snCell.textContent = index + 1;
          snCell.style.padding = '12px';
          snCell.style.textAlign = 'center';
          snCell.style.border = '1px solid #ddd';
          row.appendChild(snCell);

          const itemCell = document.createElement('td');
          itemCell.textContent = itemName;
          itemCell.style.padding = '12px';
          itemCell.style.border = '1px solid #ddd';
          row.appendChild(itemCell);

          const quantityCell = document.createElement('td');
          quantityCell.textContent = itemQuantity;
          quantityCell.style.padding = '12px';
          quantityCell.style.textAlign = 'center';
          quantityCell.style.border = '1px solid #ddd';
          row.appendChild(quantityCell);

          table.appendChild(row);
        });

        dateSection.appendChild(table);

        // Append the section for this date to the display container
        displayContainer.appendChild(dateSection);
      });

      // Call the function to update Sold Tilapia fields after fetching and processing the orders
      triggerUpdateSoldTilapia(); // This will update Sold Tilapia fields with the global totals
    }).catch(error => {
      console.error("Error fetching and merging orders:", error);
    });
  }


/



  
  
  
  
/*function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    if (!displayContainer) {
      console.error("Display container not found!");
      return;
    }

    // Clear any existing content
    displayContainer.innerHTML = '';

    // Group orders by date
    const groupedOrders = {};
    Object.entries(orders).forEach(([orderId, orderData]) => {
      // Ignore the order if its status is "Cancelled Order"
      if (orderData.status === "Cancelled Order") {
        console.log(`Skipping cancelled order: ${orderId}`);
        return;
      }

      // Extract the order date (from timestamp or completedTimestamp)
      const orderDate = new Date(orderData.timestamp || orderData.completedTimestamp).toLocaleDateString();

      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = [];
      }
      groupedOrders[orderDate].push(orderData);
    });

    // Variables to store the final adjusted totals from the previous day
    let previousTilapia120Adjusted = 500;
    let previousTilapia150Adjusted = 200;

    // Iterate through each date and generate tables
    Object.entries(groupedOrders).forEach(([date, ordersForDate]) => {
      // Create a section for this date
      const dateSection = document.createElement('div');
      dateSection.style.marginBottom = '30px';

      const dateHeading = document.createElement('h3');
      dateHeading.textContent = `Date: ${date}`;
      dateHeading.style.marginBottom = '15px';
      dateSection.appendChild(dateHeading);

      // Create a map to store merged items and their quantities
      const itemMap = {};
      let tilapia120Total = 0; // Combined Tilapia 100 and Tilapia 120
      let tilapia150Total = 0;

      // Process orders for this date
      ordersForDate.forEach(orderData => {
        if (orderData.items && Array.isArray(orderData.items)) {
          orderData.items.forEach(item => {
            // Merge all items into itemMap
            if (itemMap[item.name]) {
              itemMap[item.name] += item.quantity;
            } else {
              itemMap[item.name] = item.quantity;
            }

            // Aggregate "Tilapia 100" and "Tilapia 120" under Tilapia 120
            if (item.name.includes("Tilapia 100") || item.name.includes("Tilapia 120")) {
              tilapia120Total += item.quantity;
            } else if (item.name.includes("Tilapia 150")) {
              tilapia150Total += item.quantity;
            }
          });
        }
      });

      // Create the main table for all merged items
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginTop = '10px';
      table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      table.style.backgroundColor = '#fff';

      const headerRow = document.createElement('tr');
      ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.padding = '12px';
        th.style.border = '1px solid #ddd';
        th.style.backgroundColor = '#4CAF50';
        th.style.color = '#fff';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Populate the main table with merged items
      const mergedItems = Object.entries(itemMap);
      mergedItems.forEach(([itemName, itemQuantity], index) => {
        const row = document.createElement('tr');
        row.style.border = '1px solid #ddd';

        const snCell = document.createElement('td');
        snCell.textContent = index + 1;
        snCell.style.padding = '12px';
        snCell.style.textAlign = 'center';
        snCell.style.border = '1px solid #ddd';
        row.appendChild(snCell);

        const itemCell = document.createElement('td');
        itemCell.textContent = itemName;
        itemCell.style.padding = '12px';
        itemCell.style.border = '1px solid #ddd';
        row.appendChild(itemCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = itemQuantity;
        quantityCell.style.padding = '12px';
        quantityCell.style.textAlign = 'center';
        quantityCell.style.border = '1px solid #ddd';
        row.appendChild(quantityCell);

        table.appendChild(row);
      });

      dateSection.appendChild(table);

      // Add heading for the Tilapia Analysis table
      const tilapiaHeading = document.createElement('h4');
      tilapiaHeading.textContent = 'Specific Analysis: Tilapia 120 and Tilapia 150';
      tilapiaHeading.style.marginTop = '20px';
      dateSection.appendChild(tilapiaHeading);

      // Create a separate table for Tilapia analysis
      const tilapiaTable = document.createElement('table');
      tilapiaTable.style.width = '100%';
      tilapiaTable.style.borderCollapse = 'collapse';
      tilapiaTable.style.marginTop = '10px';
      tilapiaTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      tilapiaTable.style.backgroundColor = '#fff';

      const tilapiaHeaderRow = document.createElement('tr');
      ['Item', 'Total Quantity'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.padding = '12px';
        th.style.border = '1px solid #ddd';
        th.style.backgroundColor = '#FF9800';
        th.style.color = '#fff';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        tilapiaHeaderRow.appendChild(th);
      });
      tilapiaTable.appendChild(tilapiaHeaderRow);

      // Populate the Tilapia analysis table
      const tilapiaRows = [
        { name: 'Tilapia 120 (Includes Tilapia 100)', quantity: tilapia120Total },
        { name: 'Tilapia 150', quantity: tilapia150Total },
      ];

      tilapiaRows.forEach(item => {
        const row = document.createElement('tr');
        row.style.border = '1px solid #ddd';

        const itemCell = document.createElement('td');
        itemCell.textContent = item.name;
        itemCell.style.padding = '12px';
        itemCell.style.border = '1px solid #ddd';
        row.appendChild(itemCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        quantityCell.style.padding = '12px';
        quantityCell.style.textAlign = 'center';
        quantityCell.style.border = '1px solid #ddd';
        row.appendChild(quantityCell);

        tilapiaTable.appendChild(row);
      });

      dateSection.appendChild(tilapiaTable);

      // Create and add the Adjusted Totals section (outside the table)
      const adjustedTotalsDiv = document.createElement('div');
      adjustedTotalsDiv.style.marginTop = '20px';
      adjustedTotalsDiv.style.padding = '10px';
      adjustedTotalsDiv.style.backgroundColor = '#f2f2f2';
      adjustedTotalsDiv.style.border = '1px solid #ddd';
      adjustedTotalsDiv.style.borderRadius = '5px';

      const adjustedTotalsHeading = document.createElement('h4');
      adjustedTotalsHeading.textContent = 'Tilapia Stock Update:';
      adjustedTotalsDiv.appendChild(adjustedTotalsHeading);

      // Create a form to input the spoiled/damaged Tilapia quantities
      const tilapiaDamagedForm = document.createElement('form');
      tilapiaDamagedForm.innerHTML = `
        <label for="tilapia120Damaged">Spoilt Tilapia 120: </label>
        <input type="number" id="tilapia120Damaged" name="tilapia120Damaged" value="0" min="0" style="margin-right: 10px;">
        <label for="tilapia150Damaged">Spoilt Tilapia 150: </label>
        <input type="number" id="tilapia150Damaged" name="tilapia150Damaged" value="0" min="0">
      `;
      adjustedTotalsDiv.appendChild(tilapiaDamagedForm);

      // Adjusted stock calculation and display
      const totalAdjusted120 = previousTilapia120Adjusted - tilapia120Total;
      const totalAdjusted150 = previousTilapia150Adjusted - tilapia150Total;

      // Display the adjusted totals in the required format
      const totalAvailableStockDiv = document.createElement('div');
      totalAvailableStockDiv.innerHTML = `
        <p>Total Adjusted Tilapia 120: ${previousTilapia120Adjusted} - ${tilapia120Total} = <strong>${totalAdjusted120}</strong></p>
        <p>Total Adjusted Tilapia 150: ${previousTilapia150Adjusted} - ${tilapia150Total} = <strong>${totalAdjusted150}</strong></p>
      `;
      adjustedTotalsDiv.appendChild(totalAvailableStockDiv);

      // Add the adjusted totals section to the date section
      dateSection.appendChild(adjustedTotalsDiv);

      // Add the final section to the display container
      displayContainer.appendChild(dateSection);

      // Update the previous day's adjusted stock for the next day
      previousTilapia120Adjusted = totalAdjusted120;
      previousTilapia150Adjusted = totalAdjusted150;
    });
  });
}

*/ 








  
  
  
  
  /*function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    if (!displayContainer) {
      console.error("Display container not found!");
      return;
    }

    // Clear any existing content
    displayContainer.innerHTML = '';

    // Group orders by date
    const groupedOrders = {};
    Object.entries(orders).forEach(([orderId, orderData]) => {
      // Ignore the order if its status is "Cancelled Order"
      if (orderData.status === "Cancelled Order") {
        console.log(`Skipping cancelled order: ${orderId}`);
        return;
      }

      // Extract the order date (from timestamp or completedTimestamp)
      const orderDate = new Date(orderData.timestamp || orderData.completedTimestamp).toLocaleDateString();

      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = [];
      }
      groupedOrders[orderDate].push(orderData);
    });

    // Iterate through each date and generate tables
    Object.entries(groupedOrders).forEach(([date, ordersForDate]) => {
      // Create a section for this date
      const dateSection = document.createElement('div');
      dateSection.style.marginBottom = '30px';

      const dateHeading = document.createElement('h3');
      dateHeading.textContent = `Date: ${date}`;
      dateHeading.style.marginBottom = '15px';
      dateSection.appendChild(dateHeading);

      // Create a map to store merged items and their quantities
      const itemMap = {};
      let tilapia120Total = 0; // Combined Tilapia 100 and 120
      let tilapia150Total = 0;

      // Process orders for this date
      ordersForDate.forEach(orderData => {
        if (orderData.items && Array.isArray(orderData.items)) {
          orderData.items.forEach(item => {
            // Merge all items into itemMap
            if (itemMap[item.name]) {
              itemMap[item.name] += item.quantity;
            } else {
              itemMap[item.name] = item.quantity;
            }

            // Aggregate "Tilapia 100" and "Tilapia 120" under Tilapia 120
            if (item.name.includes("Tilapia 100") || item.name.includes("Tilapia 120")) {
              tilapia120Total += item.quantity;
            } else if (item.name.includes("Tilapia 150")) {
              tilapia150Total += item.quantity;
            }
          });
        }
      });

      // Create the main table for all merged items
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginTop = '10px';
      table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      table.style.backgroundColor = '#fff';

      const headerRow = document.createElement('tr');
      ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.padding = '12px';
        th.style.border = '1px solid #ddd';
        th.style.backgroundColor = '#4CAF50';
        th.style.color = '#fff';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Populate the main table with merged items
      const mergedItems = Object.entries(itemMap);
      mergedItems.forEach(([itemName, itemQuantity], index) => {
        const row = document.createElement('tr');
        row.style.border = '1px solid #ddd';

        const snCell = document.createElement('td');
        snCell.textContent = index + 1;
        snCell.style.padding = '12px';
        snCell.style.textAlign = 'center';
        snCell.style.border = '1px solid #ddd';
        row.appendChild(snCell);

        const itemCell = document.createElement('td');
        itemCell.textContent = itemName;
        itemCell.style.padding = '12px';
        itemCell.style.border = '1px solid #ddd';
        row.appendChild(itemCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = itemQuantity;
        quantityCell.style.padding = '12px';
        quantityCell.style.textAlign = 'center';
        quantityCell.style.border = '1px solid #ddd';
        row.appendChild(quantityCell);

        table.appendChild(row);
      });

      dateSection.appendChild(table);

      // Add heading for the Tilapia Analysis table
      const tilapiaHeading = document.createElement('h4');
      tilapiaHeading.textContent = 'Specific Analysis: Tilapia 120 and Tilapia 150';
      tilapiaHeading.style.marginTop = '20px';
      dateSection.appendChild(tilapiaHeading);

      // Create a separate table for Tilapia analysis
      const tilapiaTable = document.createElement('table');
      tilapiaTable.style.width = '100%';
      tilapiaTable.style.borderCollapse = 'collapse';
      tilapiaTable.style.marginTop = '10px';
      tilapiaTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      tilapiaTable.style.backgroundColor = '#fff';

      const tilapiaHeaderRow = document.createElement('tr');
      ['Item', 'Total Quantity'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.padding = '12px';
        th.style.border = '1px solid #ddd';
        th.style.backgroundColor = '#FF9800';
        th.style.color = '#fff';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        tilapiaHeaderRow.appendChild(th);
      });
      tilapiaTable.appendChild(tilapiaHeaderRow);

      // Populate the Tilapia analysis table
      const tilapiaRows = [
        { name: 'Tilapia 120 (Includes Tilapia 100)', quantity: tilapia120Total },
        { name: 'Tilapia 150', quantity: tilapia150Total },
      ];

      tilapiaRows.forEach(item => {
        const row = document.createElement('tr');
        row.style.border = '1px solid #ddd';

        const itemCell = document.createElement('td');
        itemCell.textContent = item.name;
        itemCell.style.padding = '12px';
        itemCell.style.border = '1px solid #ddd';
        row.appendChild(itemCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        quantityCell.style.padding = '12px';
        quantityCell.style.textAlign = 'center';
        quantityCell.style.border = '1px solid #ddd';
        row.appendChild(quantityCell);

        tilapiaTable.appendChild(row);
      });

      dateSection.appendChild(tilapiaTable);

      // Append the section for this date to the display container
      displayContainer.appendChild(dateSection);

      // Populate the Sold Tilapia fields with the calculated totals
      document.getElementById('sold-tilapia-120').value = tilapia120Total;
      document.getElementById('sold-tilapia-150').value = tilapia150Total;
    });
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
}
*/
  






  /*function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    if (!displayContainer) {
      console.error("Display container not found!");
      return;
    }

    displayContainer.innerHTML = '<h3>Items from All Merged Orders:</h3>';

    // Create a map to store merged items and their quantities
    const itemMap = {};

    // Iterate over all orders
    Object.values(orders).forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (itemMap[item.name]) {
            // If item exists in the map, add the quantity
            itemMap[item.name] += item.quantity;
          } else {
            // If item does not exist in the map, add it with its quantity
            itemMap[item.name] = item.quantity;
          }
        });
      }
    });

    // Create a styled table for the merged items
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.backgroundColor = '#fff';

    // Create the header row
    const headerRow = document.createElement('tr');
    ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#4CAF50';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate the table with merged items
    const mergedItems = Object.entries(itemMap);
    mergedItems.forEach(([itemName, itemQuantity], index) => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';
      row.style.transition = 'background-color 0.3s ease';

      // Hover effect
      row.onmouseover = () => (row.style.backgroundColor = '#f9f9f9');
      row.onmouseout = () => (row.style.backgroundColor = '#fff');

      // Serial number column
      const snCell = document.createElement('td');
      snCell.textContent = index + 1;
      snCell.style.padding = '12px';
      snCell.style.textAlign = 'center';
      snCell.style.border = '1px solid #ddd';
      row.appendChild(snCell);

      // Item name column
      const itemCell = document.createElement('td');
      itemCell.textContent = itemName;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      // Total quantity column
      const quantityCell = document.createElement('td');
      quantityCell.textContent = itemQuantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      // Add the row to the table
      table.appendChild(row);
    });

    // Append the table to the display container
    displayContainer.appendChild(table);
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
}

// Call the function on page load
window.onload = function () {
  fetchAndMergeOrderItems();
};
  */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    const tilapiaContainer = document.getElementById('tilapia-table-display');
    if (!displayContainer || !tilapiaContainer) {
      console.error("Display container not found!");
      return;
    }

    // Clear any existing content
    displayContainer.innerHTML = '';
    tilapiaContainer.innerHTML = '';

    // Create a map to store merged items and their quantities
    const itemMap = {};
    let tilapia120Total = 0;
    let tilapia150Total = 0;

    // Iterate over all orders
    Object.values(orders).forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          // Merge all items into itemMap
          if (itemMap[item.name]) {
            itemMap[item.name] += item.quantity;
          } else {
            itemMap[item.name] = item.quantity;
          }

          // Check and aggregate "Tilapia 120" and "Tilapia 150"
          if (item.name.includes("Tilapia 120")) {
            tilapia120Total += item.quantity;
          } else if (item.name.includes("Tilapia 150")) {
            tilapia150Total += item.quantity;
          }
        });
      }
    });

    // Create the main table for all merged items
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.backgroundColor = '#fff';

    const headerRow = document.createElement('tr');
    ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#4CAF50';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate the main table with merged items
    const mergedItems = Object.entries(itemMap);
    mergedItems.forEach(([itemName, itemQuantity], index) => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';

      const snCell = document.createElement('td');
      snCell.textContent = index + 1;
      snCell.style.padding = '12px';
      snCell.style.textAlign = 'center';
      snCell.style.border = '1px solid #ddd';
      row.appendChild(snCell);

      const itemCell = document.createElement('td');
      itemCell.textContent = itemName;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = itemQuantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      table.appendChild(row);
    });

    displayContainer.appendChild(table);

    // Create a separate table for Tilapia analysis
    const tilapiaTable = document.createElement('table');
    tilapiaTable.style.width = '100%';
    tilapiaTable.style.borderCollapse = 'collapse';
    tilapiaTable.style.marginTop = '20px';
    tilapiaTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    tilapiaTable.style.backgroundColor = '#fff';

    const tilapiaHeaderRow = document.createElement('tr');
    ['Item', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#FF9800';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      tilapiaHeaderRow.appendChild(th);
    });
    tilapiaTable.appendChild(tilapiaHeaderRow);

    // Populate the Tilapia analysis table
    const tilapiaRows = [
      { name: 'Tilapia 120', quantity: tilapia120Total },
      { name: 'Tilapia 150', quantity: tilapia150Total },
    ];

    tilapiaRows.forEach(item => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';

      const itemCell = document.createElement('td');
      itemCell.textContent = item.name;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = item.quantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      tilapiaTable.appendChild(row);
    });

    tilapiaContainer.appendChild(tilapiaTable);
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
}
 */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    const tilapiaContainer = document.getElementById('tilapia-table-display');
    if (!displayContainer || !tilapiaContainer) {
      console.error("Display container not found!");
      return;
    }

    // Clear any existing content
    displayContainer.innerHTML = '';
    tilapiaContainer.innerHTML = '';

    // Create a map to store merged items and their quantities
    const itemMap = {};
    let tilapia120Total = 0; // Combined Tilapia 100 and 120
    let tilapia150Total = 0;

    // Iterate over all orders
    Object.values(orders).forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          // Merge all items into itemMap
          if (itemMap[item.name]) {
            itemMap[item.name] += item.quantity;
          } else {
            itemMap[item.name] = item.quantity;
          }

          // Aggregate "Tilapia 100" and "Tilapia 120" under Tilapia 120
          if (item.name.includes("Tilapia 100") || item.name.includes("Tilapia 120")) {
            tilapia120Total += item.quantity;
          } else if (item.name.includes("Tilapia 150")) {
            tilapia150Total += item.quantity;
          }
        });
      }
    });

    // Create the main table for all merged items
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.backgroundColor = '#fff';

    const headerRow = document.createElement('tr');
    ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#4CAF50';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate the main table with merged items
    const mergedItems = Object.entries(itemMap);
    mergedItems.forEach(([itemName, itemQuantity], index) => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';

      const snCell = document.createElement('td');
      snCell.textContent = index + 1;
      snCell.style.padding = '12px';
      snCell.style.textAlign = 'center';
      snCell.style.border = '1px solid #ddd';
      row.appendChild(snCell);

      const itemCell = document.createElement('td');
      itemCell.textContent = itemName;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = itemQuantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      table.appendChild(row);
    });

    displayContainer.appendChild(table);

    // Create a separate table for Tilapia analysis
    const tilapiaTable = document.createElement('table');
    tilapiaTable.style.width = '100%';
    tilapiaTable.style.borderCollapse = 'collapse';
    tilapiaTable.style.marginTop = '20px';
    tilapiaTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    tilapiaTable.style.backgroundColor = '#fff';

    const tilapiaHeaderRow = document.createElement('tr');
    ['Item', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#FF9800';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      tilapiaHeaderRow.appendChild(th);
    });
    tilapiaTable.appendChild(tilapiaHeaderRow);

    // Populate the Tilapia analysis table
    const tilapiaRows = [
      { name: 'Tilapia 120 (Includes Tilapia 100)', quantity: tilapia120Total },
      { name: 'Tilapia 150', quantity: tilapia150Total },
    ];

    tilapiaRows.forEach(item => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';

      const itemCell = document.createElement('td');
      itemCell.textContent = item.name;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = item.quantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      tilapiaTable.appendChild(row);
    });

    tilapiaContainer.appendChild(tilapiaTable);
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
}

// Event Listeners for Toggling Tilapia Analysis Section
const viewTilapiaAnalysisBtn = document.getElementById('view-tilapia-analysis-btn');
const tilapiaAnalysisSection = document.getElementById('tilapia-analysis-section');
const goBackTilapiaBtn = document.getElementById('go-back-tilapia-btn');

viewTilapiaAnalysisBtn.addEventListener('click', () => {
  tilapiaAnalysisSection.style.display = 'block';
  fetchAndMergeOrderItems(); // Fetch and display Tilapia analysis
  viewTilapiaAnalysisBtn.style.display = 'none'; // Hide the button
});

goBackTilapiaBtn.addEventListener('click', () => {
  tilapiaAnalysisSection.style.display = 'none';
  viewTilapiaAnalysisBtn.style.display = 'block'; // Show the button again
});
  */
  
  
  
  
  
  /*function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    const tilapiaContainer = document.getElementById('tilapia-table-display');
    if (!displayContainer || !tilapiaContainer) {
      console.error("Display container not found!");
      return;
    }

    // Clear any existing content
    displayContainer.innerHTML = '';
    tilapiaContainer.innerHTML = '';

    // Create a map to store merged items and their quantities
    const itemMap = {};
    let tilapia120Total = 0; // Combined Tilapia 100 and 120
    let tilapia150Total = 0;

    // Iterate over all orders
    Object.values(orders).forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          // Merge all items into itemMap
          if (itemMap[item.name]) {
            itemMap[item.name] += item.quantity;
          } else {
            itemMap[item.name] = item.quantity;
          }

          // Aggregate "Tilapia 100" and "Tilapia 120" under Tilapia 120
          if (item.name.includes("Tilapia 100") || item.name.includes("Tilapia 120")) {
            tilapia120Total += item.quantity;
          } else if (item.name.includes("Tilapia 150")) {
            tilapia150Total += item.quantity;
          }
        });
      }
    });

    // Create the main table for all merged items
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.backgroundColor = '#fff';

    const headerRow = document.createElement('tr');
    ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#4CAF50';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate the main table with merged items
    const mergedItems = Object.entries(itemMap);
    mergedItems.forEach(([itemName, itemQuantity], index) => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';

      const snCell = document.createElement('td');
      snCell.textContent = index + 1;
      snCell.style.padding = '12px';
      snCell.style.textAlign = 'center';
      snCell.style.border = '1px solid #ddd';
      row.appendChild(snCell);

      const itemCell = document.createElement('td');
      itemCell.textContent = itemName;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = itemQuantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      table.appendChild(row);
    });

    displayContainer.appendChild(table);

    // Create a separate table for Tilapia analysis
    const tilapiaTable = document.createElement('table');
    tilapiaTable.style.width = '100%';
    tilapiaTable.style.borderCollapse = 'collapse';
    tilapiaTable.style.marginTop = '20px';
    tilapiaTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    tilapiaTable.style.backgroundColor = '#fff';

    const tilapiaHeaderRow = document.createElement('tr');
    ['Item', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#FF9800';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      tilapiaHeaderRow.appendChild(th);
    });
    tilapiaTable.appendChild(tilapiaHeaderRow);

    // Populate the Tilapia analysis table
    const tilapiaRows = [
      { name: 'Tilapia 120 (Includes Tilapia 100)', quantity: tilapia120Total },
      { name: 'Tilapia 150', quantity: tilapia150Total },
    ];

    tilapiaRows.forEach(item => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';

      const itemCell = document.createElement('td');
      itemCell.textContent = item.name;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = item.quantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      tilapiaTable.appendChild(row);
    });

    tilapiaContainer.appendChild(tilapiaTable);
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
}
  */
  

  
  
  
 
    
            

     /* function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    const tilapiaContainer = document.getElementById('tilapia-table-display');
    if (!displayContainer || !tilapiaContainer) {
      console.error("Display container not found!");
      return;
    }

    // Clear any existing content
    displayContainer.innerHTML = '';
    tilapiaContainer.innerHTML = '';

    // Create a map to store merged items and their quantities
    const itemMap = {};
    let tilapia120Total = 0; // Combined Tilapia 100 and 120
    let tilapia150Total = 0;

    // Iterate over all orders
    Object.entries(orders).forEach(([orderId, orderData]) => {
      // Ignore the order if its status is "Cancelled Order"
      if (orderData.status === "Cancelled Order") {
        console.log(`Skipping cancelled order: ${orderId}`);
        return;
      }

      if (orderData.items && Array.isArray(orderData.items)) {
        orderData.items.forEach(item => {
          // Merge all items into itemMap
          if (itemMap[item.name]) {
            itemMap[item.name] += item.quantity;
          } else {
            itemMap[item.name] = item.quantity;
          }

          // Aggregate "Tilapia 100" and "Tilapia 120" under Tilapia 120
          if (item.name.includes("Tilapia 100") || item.name.includes("Tilapia 120")) {
            tilapia120Total += item.quantity;
          } else if (item.name.includes("Tilapia 150")) {
            tilapia150Total += item.quantity;
          }
        });
      }
    });

    // Create the main table for all merged items
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    table.style.backgroundColor = '#fff';

    const headerRow = document.createElement('tr');
    ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#4CAF50';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate the main table with merged items
    const mergedItems = Object.entries(itemMap);
    mergedItems.forEach(([itemName, itemQuantity], index) => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';

      const snCell = document.createElement('td');
      snCell.textContent = index + 1;
      snCell.style.padding = '12px';
      snCell.style.textAlign = 'center';
      snCell.style.border = '1px solid #ddd';
      row.appendChild(snCell);

      const itemCell = document.createElement('td');
      itemCell.textContent = itemName;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = itemQuantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      table.appendChild(row);
    });

    displayContainer.appendChild(table);

    // Create a separate table for Tilapia analysis
    const tilapiaTable = document.createElement('table');
    tilapiaTable.style.width = '100%';
    tilapiaTable.style.borderCollapse = 'collapse';
    tilapiaTable.style.marginTop = '20px';
    tilapiaTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    tilapiaTable.style.backgroundColor = '#fff';

    const tilapiaHeaderRow = document.createElement('tr');
    ['Item', 'Total Quantity'].forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      th.style.padding = '12px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#FF9800';
      th.style.color = '#fff';
      th.style.fontWeight = 'bold';
      th.style.textAlign = 'center';
      tilapiaHeaderRow.appendChild(th);
    });
    tilapiaTable.appendChild(tilapiaHeaderRow);

    // Populate the Tilapia analysis table
    const tilapiaRows = [
      { name: 'Tilapia 120 (Includes Tilapia 100)', quantity: tilapia120Total },
      { name: 'Tilapia 150', quantity: tilapia150Total },
    ];

    tilapiaRows.forEach(item => {
      const row = document.createElement('tr');
      row.style.border = '1px solid #ddd';

      const itemCell = document.createElement('td');
      itemCell.textContent = item.name;
      itemCell.style.padding = '12px';
      itemCell.style.border = '1px solid #ddd';
      row.appendChild(itemCell);

      const quantityCell = document.createElement('td');
      quantityCell.textContent = item.quantity;
      quantityCell.style.padding = '12px';
      quantityCell.style.textAlign = 'center';
      quantityCell.style.border = '1px solid #ddd';
      row.appendChild(quantityCell);

      tilapiaTable.appendChild(row);
    });

    tilapiaContainer.appendChild(tilapiaTable);
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
}

    */
  
  
  
  
  
  
  
  
  
  
  
  
  /* function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    if (!displayContainer) {
      console.error("Display container not found!");
      return;
    }

    // Clear any existing content
    displayContainer.innerHTML = '';

    // Group orders by date
    const groupedOrders = {};
    Object.entries(orders).forEach(([orderId, orderData]) => {
      // Ignore the order if its status is "Cancelled Order"
      if (orderData.status === "Cancelled Order") {
        console.log(`Skipping cancelled order: ${orderId}`);
        return;
      }

      // Extract the order date (from timestamp or completedTimestamp)
      const orderDate = new Date(orderData.timestamp || orderData.completedTimestamp).toLocaleDateString();

      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = [];
      }
      groupedOrders[orderDate].push(orderData);
    });

    // Iterate through each date and generate tables
    Object.entries(groupedOrders).forEach(([date, ordersForDate]) => {
      // Create a section for this date
      const dateSection = document.createElement('div');
      dateSection.style.marginBottom = '30px';

      const dateHeading = document.createElement('h3');
      dateHeading.textContent = `Date: ${date}`;
      dateHeading.style.marginBottom = '15px';
      dateSection.appendChild(dateHeading);

      // Create a map to store merged items and their quantities
      const itemMap = {};
      let tilapia120Total = 0; // Combined Tilapia 100 and 120
      let tilapia150Total = 0;

      // Process orders for this date
      ordersForDate.forEach(orderData => {
        if (orderData.items && Array.isArray(orderData.items)) {
          orderData.items.forEach(item => {
            // Merge all items into itemMap
            if (itemMap[item.name]) {
              itemMap[item.name] += item.quantity;
            } else {
              itemMap[item.name] = item.quantity;
            }

            // Aggregate "Tilapia 100" and "Tilapia 120" under Tilapia 120
            if (item.name.includes("Tilapia 100") || item.name.includes("Tilapia 120")) {
              tilapia120Total += item.quantity;
            } else if (item.name.includes("Tilapia 150")) {
              tilapia150Total += item.quantity;
            }
          });
        }
      });

      // Create the main table for all merged items
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginTop = '10px';
      table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      table.style.backgroundColor = '#fff';

      const headerRow = document.createElement('tr');
      ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.padding = '12px';
        th.style.border = '1px solid #ddd';
        th.style.backgroundColor = '#4CAF50';
        th.style.color = '#fff';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Populate the main table with merged items
      const mergedItems = Object.entries(itemMap);
      mergedItems.forEach(([itemName, itemQuantity], index) => {
        const row = document.createElement('tr');
        row.style.border = '1px solid #ddd';

        const snCell = document.createElement('td');
        snCell.textContent = index + 1;
        snCell.style.padding = '12px';
        snCell.style.textAlign = 'center';
        snCell.style.border = '1px solid #ddd';
        row.appendChild(snCell);

        const itemCell = document.createElement('td');
        itemCell.textContent = itemName;
        itemCell.style.padding = '12px';
        itemCell.style.border = '1px solid #ddd';
        row.appendChild(itemCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = itemQuantity;
        quantityCell.style.padding = '12px';
        quantityCell.style.textAlign = 'center';
        quantityCell.style.border = '1px solid #ddd';
        row.appendChild(quantityCell);

        table.appendChild(row);
      });

      dateSection.appendChild(table);

      // Create a separate table for Tilapia analysis
      const tilapiaTable = document.createElement('table');
      tilapiaTable.style.width = '100%';
      tilapiaTable.style.borderCollapse = 'collapse';
      tilapiaTable.style.marginTop = '10px';
      tilapiaTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      tilapiaTable.style.backgroundColor = '#fff';

      const tilapiaHeaderRow = document.createElement('tr');
      ['Item', 'Total Quantity'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.padding = '12px';
        th.style.border = '1px solid #ddd';
        th.style.backgroundColor = '#FF9800';
        th.style.color = '#fff';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        tilapiaHeaderRow.appendChild(th);
      });
      tilapiaTable.appendChild(tilapiaHeaderRow);

      // Populate the Tilapia analysis table
      const tilapiaRows = [
        { name: 'Tilapia 120 (Includes Tilapia 100)', quantity: tilapia120Total },
        { name: 'Tilapia 150', quantity: tilapia150Total },
      ];

      tilapiaRows.forEach(item => {
        const row = document.createElement('tr');
        row.style.border = '1px solid #ddd';

        const itemCell = document.createElement('td');
        itemCell.textContent = item.name;
        itemCell.style.padding = '12px';
        itemCell.style.border = '1px solid #ddd';
        row.appendChild(itemCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        quantityCell.style.padding = '12px';
        quantityCell.style.textAlign = 'center';
        quantityCell.style.border = '1px solid #ddd';
        row.appendChild(quantityCell);

        tilapiaTable.appendChild(row);
      });

      dateSection.appendChild(tilapiaTable);

      // Append the section for this date to the display container
      displayContainer.appendChild(dateSection);
    });
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
} */
  
  
  
  
  
  
  
  
    /* function fetchAndMergeOrderItems() {
  const dbRef = db.ref('orderHistory'); // Reference the 'orderHistory' node

  console.log("Fetching orders and merging all items...");

  dbRef.once('value', snapshot => {
    if (!snapshot.exists()) {
      console.error("No orders found in the 'orderHistory' node!");
      return;
    }

    // Retrieve all orders
    const orders = snapshot.val();
    console.log("Orders Retrieved:", orders);

    const displayContainer = document.getElementById('items-display');
    if (!displayContainer) {
      console.error("Display container not found!");
      return;
    }

    // Clear any existing content
    displayContainer.innerHTML = '';

    // Group orders by date
    const groupedOrders = {};
    Object.entries(orders).forEach(([orderId, orderData]) => {
      // Ignore the order if its status is "Cancelled Order"
      if (orderData.status === "Cancelled Order") {
        console.log(`Skipping cancelled order: ${orderId}`);
        return;
      }

      // Extract the order date (from timestamp or completedTimestamp)
      const orderDate = new Date(orderData.timestamp || orderData.completedTimestamp).toLocaleDateString();

      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = [];
      }
      groupedOrders[orderDate].push(orderData);
    });

    // Iterate through each date and generate tables
    Object.entries(groupedOrders).forEach(([date, ordersForDate]) => {
      // Create a section for this date
      const dateSection = document.createElement('div');
      dateSection.style.marginBottom = '30px';

      const dateHeading = document.createElement('h3');
      dateHeading.textContent = `Date: ${date}`;
      dateHeading.style.marginBottom = '15px';
      dateSection.appendChild(dateHeading);

      // Create a map to store merged items and their quantities
      const itemMap = {};
      let tilapia120Total = 0; // Combined Tilapia 100 and 120
      let tilapia150Total = 0;

      // Process orders for this date
      ordersForDate.forEach(orderData => {
        if (orderData.items && Array.isArray(orderData.items)) {
          orderData.items.forEach(item => {
            // Merge all items into itemMap
            if (itemMap[item.name]) {
              itemMap[item.name] += item.quantity;
            } else {
              itemMap[item.name] = item.quantity;
            }

            // Aggregate "Tilapia 100" and "Tilapia 120" under Tilapia 120
            if (item.name.includes("Tilapia 100") || item.name.includes("Tilapia 120")) {
              tilapia120Total += item.quantity;
            } else if (item.name.includes("Tilapia 150")) {
              tilapia150Total += item.quantity;
            }
          });
        }
      });

      // Create the main table for all merged items
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginTop = '10px';
      table.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      table.style.backgroundColor = '#fff';

      const headerRow = document.createElement('tr');
      ['S/N', 'Items', 'Total Quantity'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.padding = '12px';
        th.style.border = '1px solid #ddd';
        th.style.backgroundColor = '#4CAF50';
        th.style.color = '#fff';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Populate the main table with merged items
      const mergedItems = Object.entries(itemMap);
      mergedItems.forEach(([itemName, itemQuantity], index) => {
        const row = document.createElement('tr');
        row.style.border = '1px solid #ddd';

        const snCell = document.createElement('td');
        snCell.textContent = index + 1;
        snCell.style.padding = '12px';
        snCell.style.textAlign = 'center';
        snCell.style.border = '1px solid #ddd';
        row.appendChild(snCell);

        const itemCell = document.createElement('td');
        itemCell.textContent = itemName;
        itemCell.style.padding = '12px';
        itemCell.style.border = '1px solid #ddd';
        row.appendChild(itemCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = itemQuantity;
        quantityCell.style.padding = '12px';
        quantityCell.style.textAlign = 'center';
        quantityCell.style.border = '1px solid #ddd';
        row.appendChild(quantityCell);

        table.appendChild(row);
      });

      dateSection.appendChild(table);

      // Add heading for the Tilapia Analysis table
      const tilapiaHeading = document.createElement('h4');
      tilapiaHeading.textContent = 'Specific Analysis: Tilapia 120 and Tilapia 150';
      tilapiaHeading.style.marginTop = '20px';
      dateSection.appendChild(tilapiaHeading);

      // Create a separate table for Tilapia analysis
      const tilapiaTable = document.createElement('table');
      tilapiaTable.style.width = '100%';
      tilapiaTable.style.borderCollapse = 'collapse';
      tilapiaTable.style.marginTop = '10px';
      tilapiaTable.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      tilapiaTable.style.backgroundColor = '#fff';

      const tilapiaHeaderRow = document.createElement('tr');
      ['Item', 'Total Quantity'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.padding = '12px';
        th.style.border = '1px solid #ddd';
        th.style.backgroundColor = '#FF9800';
        th.style.color = '#fff';
        th.style.fontWeight = 'bold';
        th.style.textAlign = 'center';
        tilapiaHeaderRow.appendChild(th);
      });
      tilapiaTable.appendChild(tilapiaHeaderRow);

      // Populate the Tilapia analysis table
      const tilapiaRows = [
        { name: 'Tilapia 120 (Includes Tilapia 100)', quantity: tilapia120Total },
        { name: 'Tilapia 150', quantity: tilapia150Total },
      ];

      tilapiaRows.forEach(item => {
        const row = document.createElement('tr');
        row.style.border = '1px solid #ddd';

        const itemCell = document.createElement('td');
        itemCell.textContent = item.name;
        itemCell.style.padding = '12px';
        itemCell.style.border = '1px solid #ddd';
        row.appendChild(itemCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;
        quantityCell.style.padding = '12px';
        quantityCell.style.textAlign = 'center';
        quantityCell.style.border = '1px solid #ddd';
        row.appendChild(quantityCell);

        tilapiaTable.appendChild(row);
      });

      dateSection.appendChild(tilapiaTable);

      // Append the section for this date to the display container
      displayContainer.appendChild(dateSection);
    });
  }).catch(error => {
    console.error("Error fetching and merging orders:", error);
  });
} 
  */