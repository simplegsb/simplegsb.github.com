
// Do stuff when the page opens!
$(document).ready(function()
{
	initVideos();
});

// Size the videos appropriately for the device.
function initVideos()
{
	if(window.matchMedia('only screen and (max-device-width: 700px)').matches)
	{
		$('video').attr('width', '100%');
	    $('.sd').addClass('selected');
	    $('#str8GangstaVideo').attr('src', 'videos/str8-gangsta-360.mp4');
	    $('#bigDealVideo').attr('src', 'videos/big-deal-360.mp4');
	}
	else
	{
	    $('video').attr('width', '720px');
	    $('.hd').addClass('selected');
	    $('#str8GangstaVideo').attr('src', 'videos/str8-gangsta-720.mp4');
	    $('#bigDealVideo').attr('src', 'videos/big-deal-720.mp4');
	}
}

// Pause all the videos on the page.
function pauseVideos()
{
	var videos = $('video');
	for (var index = 0; index < videos.length; index++)
	{
		videos[index].pause();
	}
}

// Changes the file being played by a video tag.
function setVideo(videoId, videoFile)
{
	var video = $('#' + videoId);
	var currentTime = video[0].currentTime;
	var playing = currentTime > 0 && !video[0].ended && !video[0].paused;

	video.attr('src', videoFile);

	video.on('loadedmetadata', function()
	{
  		this.currentTime = currentTime;
		if (playing)
		{
			this.play();
		}
	});
}

// Changes the file being played by a video tag and also updates the button classes to reflect the change.
function switchVideo(button, videoId, videoFile)
{
	var buttonDiv = button.parent();
	var section = buttonDiv.parent();

	if (buttonDiv.hasClass('selected'))
	{
		return;
	}

	setVideo(videoId, videoFile);

	section.find('.roundButton').removeClass('selected');
	buttonDiv.addClass('selected');
}
