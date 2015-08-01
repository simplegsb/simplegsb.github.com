
// Do stuff when the page opens!
$(document).ready(function()
{
	initVideos();
});

// Size the videos appropriately for the device.
function initVideos()
{
	$('.aside').css('background-color', 'black');

	if(window.matchMedia('only screen and (max-device-width: 700px)').matches)
	{
		$('video').attr('width', '100%');
	    $('.sd').addClass('selected');
	    $('#str8GangstaVideo').attr('src', 'https://googledrive.com/host/0B54v-1wOoeUGfnZOMmNqNXktMll0MGdJbXZYaXVKeVlOZkQ5Skx2M2lSWHd1UXdwMEQ1LW8/Str8 Gangsta (360).mp4');
	    $('#bigDealVideo').attr('src', 'https://googledrive.com/host/0B54v-1wOoeUGfnNJYVhjdTNJaEVOUTlHRVgxRnN2WkZjS0t4MkMwd1h4ZWR1SzA3Y3BCVlU/Big Deal (360).mp4');
	}
	else
	{
	    $('video').attr('height', '480px');
	    $('video').attr('width', '720px');
	    $('.hd').addClass('selected');
	    $('#str8GangstaVideo').attr('height', '480px');
	    $('#str8GangstaVideo').attr('src', 'https://googledrive.com/host/0B54v-1wOoeUGfnZOMmNqNXktMll0MGdJbXZYaXVKeVlOZkQ5Skx2M2lSWHd1UXdwMEQ1LW8/Str8 Gangsta (720).mp4');
	    $('#bigDealVideo').attr('src', 'https://googledrive.com/host/0B54v-1wOoeUGfnNJYVhjdTNJaEVOUTlHRVgxRnN2WkZjS0t4MkMwd1h4ZWR1SzA3Y3BCVlU/Big Deal (720).mp4');
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
