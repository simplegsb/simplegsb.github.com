angular
	.module('me.software', [])
	.controller('me.software', ['$routeParams', '$scope', function($routeParams, $scope)
	{
		$scope.$watch('$viewContentLoaded', function()
		{
			$('.software.menu .item').click(function()
			{
				$(this)
					.addClass('active')
					.closest('.ui.menu')
					.find('.item')
					.not($(this))
					.removeClass('active');

				$('.software.group')
					.css('display', '');

				$('.software.group')
					.eq($('.software.menu .item').index($(this)))
					.css('display', 'initial');
			});

			$('.rush.projects .menu .item').click(function()
			{
				$(this)
					.addClass('active')
					.closest('.ui.menu')
					.find('.item')
					.not($(this))
					.removeClass('active');

				$('.rush.projects .segment')
					.css('display', '');

				$('.rush.projects .segment')
					.eq($('.rush.projects .menu .item').index($(this)))
					.css('display', 'initial');
			});

			$('.software.menu .item').eq(0).click();
			$('.rush.projects .menu .item').eq(0).click();

			if ($routeParams.full)
			{
				$('#cv').click();
			}
		});
	}]);
