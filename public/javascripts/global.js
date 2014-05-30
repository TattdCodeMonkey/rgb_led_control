var selectedColor = '#00FF00';

// DOM Ready =============================================================
$(document).ready(function() {
    
    // Populate the user table on initial page load
    populateTable();

    $("#set_color").on('click',function(){ setColor(); });

});

// Functions =============================================================

function setColorInTable(data){

}

// Fill table with data
function populateTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/color/selected_color', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        tableContent += '<tr>';
        tableContent += '<td bgcolor="' + data.color+ '">' + data.color + '</td>';
        tableContent += '</tr>';

        selectedColor = data.color;

        // Inject the whole content string into our existing HTML table
        $('#selected_color table tbody').html(tableContent);

        $("#clr_whl").spectrum({
          color: selectedColor,
          flat: true,
          showInput: true,
          change: function(color){
              setColor(color);
          }
        });
    });
};

function setColor(color){
  //console.writeline('set color called');
  //var newColor = $("#clr_whl").spectrum("get");
  $.post('/color/select_color',
        {
          currentColor: String(selectedColor),
          newColor: color.toHexString()
        },
        function(data){
          populateTable();
        });
}
