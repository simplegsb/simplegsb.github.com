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
	.run(['$rootScope', '$window', function($rootScope, $window)
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

			$('http, body').animate({scrollTop: 0}, 'slow');
		});

		$rootScope.$on('$viewContentLoaded', function()
		{
			$('.main.menu .item').removeClass('active');
			$('.main.menu .item[href="' + location.hash + '"]').addClass('active');
		});

		$rootScope.$on('$stateChangeSuccess', function(event)
		{
            $window.ga('send', 'pageview', $location.path());
        });
	}]);
