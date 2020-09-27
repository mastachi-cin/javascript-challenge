// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Get references to the input element and the filter button
var filterBtn = d3.select("#filter-btn");

// Display the default plot
function buildTable(data) {
    // remove any previous row from the table
    tbody.html("");

    // Build dynamic table
    data.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
}

// Click handler inline
filterBtn.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input field
    inputField = d3.select("#datetime");

    // Get the value property of the input element
    var inputDate = inputField.property("value");

    // Filter by input date
    var filteredSighting = tableData.filter(sightingRow => sightingRow.datetime === inputDate);

    console.log(tableData);
    console.log(inputDate);
    console.log(filteredSighting);

    // Build table with filtered rows
    buildTable(filteredSighting);
});

// Build table with init rows
buildTable(tableData);