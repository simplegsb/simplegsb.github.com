angular
	.module('me', ['ngRoute', 'me.campers', 'me.software'])
	.config(['$routeProvider', function($routeProvider)
	{
		$routeProvider.otherwise('/home');

		$routeProvider.when('/campers',
		{
			controller: 'me.campers',
			templateUrl: 'campers.html'
		});

		$routeProvider.when('/film',
		{
			templateUrl: 'film.html'
		});

		$routeProvider.when('/home',
		{
			templateUrl: 'home.html'
		});

		$routeProvider.when('/osho',
		{
			templateUrl: 'osho.html'
		});

		$routeProvider.when('/poetry',
		{
			templateUrl: 'poetry.html'
		});

		$routeProvider.when('/software',
		{
			controller: 'me.software',
			templateUrl: 'software.html'
		});
	}])
	.run(['$location', '$rootScope', '$window', function($location, $rootScope, $window)
	{
		$('.main.menu').visibility({ type: 'fixed' });

		$('.main.menu .item').click(function()
		{
			$(this)
				.addClass('active')
				.closest('.ui.menu')
				.find('.item')
				.not($(this))
				.removeClass('active');

			$('html,body').scrollTop(0);
		});

		$rootScope.$on('$viewContentLoaded', function()
		{
			$('.main.menu .item').removeClass('active');
			$('.main.menu .item[href="#' + $location.path() + '"]').addClass('active');
			resizeIFrames();

			ga('send', 'pageview', $location.path());
		});

		$(window).resize(function()
		{
			resizeIFrames();
		});

		function resizeIFrames()
		{
			var iFrames = $('iframe');

			iFrames.each(function(index)
			{
				var iFrame = iFrames.eq(index);
				var aspectRatio = iFrame.attr('width') / iFrame.attr('height');
				iFrame.css('height', iFrame.width() / aspectRatio);
			});
		}
	}]);
