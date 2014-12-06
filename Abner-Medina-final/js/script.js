$j = jQuery.noConflict();


var parentWidth = $j('nav ul').width();
var listItems = $j('nav ul li');
$j('#highlight').css('width', parentWidth+"px")

function slideTo (value, targetWidth) {	
	var data = [];
	var subtotal = 0;

	for(var i = 0; i <= value; i++){
		var range = $j('nav ul').children()[i].offsetWidth;
		data.push(range);
		subtotal += data[i];
	}
	var total = subtotal - targetWidth;
	$j('#gizmo').css({
		left: (total-15)+'px',
		width: targetWidth+'px',
		opacity: 1,
	});
}

var resizeId;
$j(window).resize(function() {
	clearTimeout(resizeId);
	resizeId = setTimeout(doneResizing(), 200);
})
function doneResizing(){
	var width = $j(window).width();
	var parent = $j('nav ul').width();
	$j('#highlight').css('width', parent+"px")
	$j('nav ul').css('display','none');

	for (var i = 0 ; i < listItems.length ; i++){
		var att = listItems[i].children[0].href;
		
		if(location.href == att && width > 975){
			$j('nav ul').css('display','block');
			var index = i;
			var targetWidth = listItems[i].childNodes[0].offsetWidth;
	
			$j('nav li').click(function () {
				slideTo(i, targetWidth);
				$j('#highlight').data('current', i);
				$j('#highlight').data('width', targetWidth);
			})

			slideTo(i, targetWidth);
			$j('#highlight').data('current', i);
			$j('#highlight').data('width', targetWidth);

		}
	}
}

doneResizing()


$j('nav ul li').mouseenter(function() {
	var index = $j(this).index();
	var targetWidth = $j(this).width();

	slideTo(index, targetWidth);

})

$j('nav ul li').mouseleave(function() {
	var i = $j('#highlight').data('current');
	var targetWidth = $j('#highlight').data('width');

	slideTo(i, targetWidth);

})


$j('nav #trigger').click(function() {
	$j('nav ul').toggle("fast", function(){
		
	})
})

$j('#next').click(function() {
	var x = event.target.id;
	var currentScroll = $j('#index #hero').scrollLeft();
	var width = $j('#slides').width()
	var ratio = (width/3);
	var widthRatio = Math.floor((currentScroll%width)/ratio);
	
	$j('#index #hero').animate({scrollLeft:(widthRatio+1)*ratio}, '500', 'swing');
})

$j('#prev').click(function() {
	var width = $j('#slides').width()
	var ratio = (width/3);
	var currentScroll = $j('#index #hero').scrollLeft();
	var widthRatio = Math.floor((currentScroll%width)/ratio);
	console.log(widthRatio,ratio)

	$j('#index #hero').animate({scrollLeft:(widthRatio-1)*ratio}, '500', 'swing');	
})






