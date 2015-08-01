
// Do stuff when the page opens!
$(document).ready(function()
{
	redirect();
});

// Redirect all internal links to www.garyshawnbuyn.me and open them in the parent window (this website is being displayed in an iframe).
function redirect()
{
	$('head').append('<base target="_parent" />');

	$('#header a').each(function(index) {
		$(this).attr('href', "http://www.garyshawnbuyn.me/" + $(this).attr('href'));
	});
}
