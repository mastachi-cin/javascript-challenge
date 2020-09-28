// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Get reference to the filter button
var filterBtn = d3.select("#filter-btn");

// Build dynamic table
function buildTable(data) {
    // remove any previous row from the table
    tbody.html("");

    // Append row by row to table
    data.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
}

// Build dropdown menu options according to data
function buildDropdownMenus() {

    // Get reference to the Country menu
    var menuCountry = d3.select("#selCountry");

    // Create an array with country values, removing duplicates and sorting ascending
    var countries = Array.from(new Set(tableData.map(sightingRecord => sightingRecord.country))).sort();
    // Add All option
    countries.unshift("All")
    
    // Remove any previous options from the dropdown menu
    menuCountry.html("");

    // Append country by country to dropdown menu
    countries.forEach(country => {
        var option = d3.select("#selCountry").append("option");
        option.text(country);
    });

    // Get reference to the State menu
    var menuState = d3.select("#selState");

    // Create an array with states values, removing duplicates and sorting ascending
    var states = Array.from(new Set(tableData.map(sightingRecord => sightingRecord.state))).sort();
    // Add All option
    states.unshift("All")
    
    /// Remove any previous options from the dropdown menu
    menuState.html("");

    // Append city by city to dropdown menu
    states.forEach(state => {
        var option = d3.select("#selState").append("option");
        option.text(state);
    });

    // Get reference to the City menu
    var menuCity = d3.select("#selCity");

    // Create an array with city values, removing duplicates and sorting ascending
    var cities = Array.from(new Set(tableData.map(sightingRecord => sightingRecord.city))).sort();
    // Add All option
    cities.unshift("All")
    
    /// Remove any previous options from the dropdown menu
    menuCity.html("");

    // Append city by city to dropdown menu
    cities.forEach(city => {
        var option = d3.select("#selCity").append("option");
        option.text(city);
    });

    // Get reference to the Shape menu
    var menuShape = d3.select("#selShape");

    // Create an array with city values, removing duplicates and sorting ascending
    var shapes = Array.from(new Set(tableData.map(sightingRecord => sightingRecord.shape))).sort();
    // Add All option
    shapes.unshift("All")
    
    /// Remove any previous options from the dropdown menu
    menuShape.html("");

    // Append city by city to dropdown menu
    shapes.forEach(shape => {
        var option = d3.select("#selShape").append("option");
        option.text(shape);
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

    // Select the dropdown menu for country
    var dropMenuCountry = d3.selectAll("#selCountry").node();
    
    // Assign the dropdown menu value to a variable
    var selOptCountry = dropMenuCountry.value;

    // Select the dropdown menu for state
    var dropMenuState = d3.selectAll("#selState").node();
    
    // Assign the dropdown menu value to a variable
    var selOptState = dropMenuState.value;

    // Select the dropdown menu for city
    var dropMenuCity = d3.selectAll("#selCity").node();
    
    // Assign the dropdown menu value to a variable
    var selOptCity = dropMenuCity.value;

    // Select the dropdown menu for shape
    var dropMenuShape = d3.selectAll("#selShape").node();
    
    // Assign the dropdown menu value to a variable
    var selOptShape = dropMenuShape.value;

    var filter = {
        datetime: inputDate,
        country: selOptCountry,
        state: selOptState,
        city: selOptCity,
        shape: selOptShape
      };
      
    filteredSighting = tableData.filter(function(item) {
        for (var key in filter) {
            // Only filter when filter is not blank and is not All option
            if (filter[key] != "" && filter[key] != "All") {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
        }
        return true;
    });

    // Build table with filtered rows
    buildTable(filteredSighting);
});

// Build table with init rows
buildTable(tableData);

// Build dropdown menu options
buildDropdownMenus();

