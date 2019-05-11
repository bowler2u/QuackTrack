$(document).ready(() => {

	$('.loader').delay(2000).fadeOut(1000);
	$('#duckData').delay(2000).fadeIn(1000);

	setTimeout(() => {
		const table = $('#duckTable').DataTable({
			responsive: true
		});
		new $.fn.dataTable.FixedHeader(table);
	}, 2000);
});
