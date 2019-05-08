$(document).ready(function() {
					  
	$('#duckData').delay(1000).fadeIn(1000);
	
	setTimeout(function(){
			
					let table = $('#duckTable').DataTable( {
							responsive: true
					} );

					new $.fn.dataTable.FixedHeader( table );
	}, 2000);
	
});
