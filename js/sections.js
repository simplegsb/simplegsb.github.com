
// Do stuff when the page opens!
$(document).ready(function()
{
	fixSlide();
});

// The jQuery slide functions were jumpy, this fixes it.
function fixSlide()
{
	$('.section').before('<div class="slideFixer"></div>');
	$('.subSection').before('<div class="slideFixer"></div>');
	$('.superSubSection').before('<div class="slideFixer"></div>');

	$('.section').after('<div class="slideFixer"></div>');
	$('.subSection').after('<div class="slideFixer"></div>');
	$('.superSubSection').after('<div class="slideFixer"></div>');
}

// Open the given section.
function openSection(sectionClass, sectionId)
{
	$('.' + sectionClass).slideUp();
	$('#' + sectionId).slideDown();
}

// Select the given section (toggles open/close).
function selectSection(sectionClass, sectionId)
{
	var originalDisplay = $('#' + sectionId).css('display');

	$('.' + sectionClass).slideUp();

	if (originalDisplay === 'none')
	{
		$('#' + sectionId).slideDown();
	}
}
