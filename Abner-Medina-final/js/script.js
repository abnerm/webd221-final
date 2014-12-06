function imgGal (num) {

	var itemAnchor = document.createElement('a');
		itemAnchor.href = "#";	
		
	var	itemImg = document.createElement('img');
		itemImg.src = "assets/logo_placeholder.jpg";
		itemImg.addEventListener("mouseenter", function(){
			var self = event.target;
			self.setAttribute('class', 'active');
		});
		itemImg.addEventListener("mouseleave", function(){
			var self = event.target;
			self.removeAttribute("class")
		})

	var itemDiv = document.createElement('div');
		itemDiv.style.background = "url(http://lorempixel.com/400/200/nightlife/"+num+"/)"
		
	var parent = document.getElementById('work');
		itemAnchor.appendChild(itemImg);
		itemDiv.appendChild(itemAnchor);
		parent.appendChild(itemDiv);
}

for (var i=0; i < 18; i++) {
	imgGal(i%10);	
};

function selfScroll() {
	//$('')
}
$(window).scroll(function(){
	var scrollAmount = $(window).scrollTop();
	console.log(scrollAmount);
})

