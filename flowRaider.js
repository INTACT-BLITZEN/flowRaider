/*
 *	flowRaider
 *	Gunther Lehmann
 *	Version 0.1
 *	2016
 *	BLITZEN GmbH & Co. KG
 */

var flowRaider = function(pageClass, pages, actualPage, startPage, loop)
{
	this.pageClass			= (typeof pageClass !== 'undefined')	?	pageClass	: 'page';

	this.pages				= (typeof pages !== 'undefined')		?	pages		: 0;

	this.actualPage			= (typeof actualPage !== 'undefined')	?	actualPage	: 0;

	this.startPage			= (typeof startPage !== 'undefined')	?	startPage	: 1;

	this.loop				= (typeof loop !== 'undefined')			?	loop		: false;
};

flowRaider.prototype.init = function()
{
	$('.' + this.pageClass).each(function(index){
		$(this).attr('id', 'page-' + (index + 1));
	});

	this.pages		= $('.' + this.pageClass).length;
	this.actualPage = this.startPage;

	this.showActualPage();
};

flowRaider.prototype.showActualPage = function(){
	$('.' + this.pageClass).each(function(){
		$(this).hide();
	});

	$('#page-' + this.actualPage).show();
};

flowRaider.prototype.nextStep = function(direction, beforeNavigate)
{
	var beforeNavigateResult = true;

	if (beforeNavigate)
	{
		beforeNavigateResult = beforeNavigate();
	}

	if (beforeNavigateResult)
	{
		switch (direction)
		{
			case 'forward'	:
				if (this.actualPage < this.pages)
				{
					this.actualPage++;
				}
				else
				{
					if (this.loop)
					{
						this.actualPage = this.startPage;
					}
				}
				break;
			case 'backward'	:
				if (this.actualPage > this.startPage)
				{
					this.actualPage--;
				}
				else
				{
					if (this.loop)
					{
						this.actualPage = this.pages;
					}
				}
				break;
			default			:
				this.actualPage = this.actualPage;
				break;
		}

		this.showActualPage();
	}
};

flowRaider.prototype.addNavigation = function(functionality){
	functionality = (typeof functionality !== 'undefined') ? functionality : true;

	$('#page-' + this.pages).after('<button class="navigationBackward"><</button><button class="navigationForward">></button>');

	if (functionality)
	{
		$('.navigationBackward').on('click', function(navigationBackwardEvent){
			navigationBackwardEvent.preventDefault();
			this.nextStep('backward');
			return false;
		}.bind(this));

		$('.navigationForward').on('click', function(navigationForwardEvent){
			navigationForwardEvent.preventDefault();
			this.nextStep('forward');
			return false;
		}.bind(this));
	}
};
