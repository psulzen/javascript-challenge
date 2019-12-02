// set variable to data from from data.js
var tableData = data;
// For each UFO sighting append data to the web page 
var tbody = d3.select("tbody");

// Call function to populate the data into the Web page
popTable(tableData);


// This funtion populates the data into the web page.
function popTable(data) {
   tbody.html("");
   data.forEach(function(ufoSightings) {
      var row = tbody.append("tr");
      Object.entries(ufoSightings).forEach(function([key, value]) {
         var cell = row.append("td"); 
         cell.text(value);
//         console.log(key, value);  // See all data in the console log
        });
    });
}

// When the filters get changed, change what will get filtered when the
// button gets clicked.  
var list_Of_Filters = {};
function updateFilter() {
// For whichever filter changed, filter that input    
   var selInput = d3.select(this).select("input");
   var selInputValue = selInput.property("value");
   var filterID = selInput.attr("id");
   if (selInputValue) {
      list_Of_Filters[filterID] = selInputValue;
//      console.log(list_Of_Filters);  // See selected filter in the console log
  
   } else {
      delete list_Of_Filters[filterID]
//      console.log(list_Of_Filters);  // See selected filter in the console log

}
console.log(list_Of_Filters)
}

// * When the button gets clicked, filter the data.
var button = d3.select("#filter-btn");
button.on("click", function() {
   var filteredData = tableData;
// For each entry in teh list of filters, apply .filter
// using the key and value of the filters on the object   
   Object.entries(list_Of_Filters).forEach(([key,value]) => {
   filteredData = filteredData.filter(row => row[key] === value);
   }); 
 console.log(filteredData); // see all the results that were filtered
   popTable(filteredData);
});

// 
d3.selectAll(".filter").on("change",updateFilter);