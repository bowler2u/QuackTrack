$(document).ready(function() {

  $('.loader').delay(2000).fadeOut(1000);
  $('.duckData').delay(2000).fadeIn(1000);

  setTimeout(function() {

    let table = $('#duckTable').DataTable({
      responsive: true
    });

    new $.fn.dataTable.FixedHeader(table);
  }, 2000);

});