/* Author: 
  Collin Reisdorf
*/

/*
  Google Maps code for contact section
*/

if(window.console)
{
  //cool
}else
{
  console = {log:function(){return false;}};
}

var map, mapBounds;

function initializeMap() {
  var stylez = [
    {
      featureType: "road.local",
      elementType: "all",
      stylers: [ { hue: "#c9dfe3" }, { saturation:-50 } ]
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [ { visibility: "off" }, { lightness: 100} ]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [ { hue: "#ffffff" }, { saturation:-100 }, { lightness:30} ]
    },
    {
      featureType: "road.arterial",
      elementType: "labels",
      stylers: [ { visibility: "off" } ]
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [ { hue: "#96bac7" }, { saturation:-50 } ]
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [ { visibility: "simplified" } ]
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [ { saturation:-100 } ]
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [ { visibility:"simplified" } ]
    },
    {
      featureType: "poi.school",
      elementType: "labels",
      stylers: [ { visibility:"on" } ]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [ { saturation:-100 } ]
    },
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [ { saturation:-100 } ]
    },
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [ { visibility:"simplified" } ]
    },
    {
      featureType: "administrative.locality",
      elementType: "labels",
      stylers: [ { visibility:"on" } ]
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "labels",
      stylers: [ { visibility:"off" } ]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ saturation:-100 }]
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [{ visibility:"simplified" }]
    }
  ];
  
  // var toth = new google.maps.LatLng(42.364295,-71.07929); // Old address
  var toth = new google.maps.LatLng(42.342305,-71.065407);
  
  var mapOptions = {
    zoom: 15,
    center: toth,
    mapTypeControl:false,
    zoomControl: true,
    zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL},
    panControl: false,
    scrollwheel:false,
    minZoom:4
  };
  map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);
  
  var image = '/images/map_marker_new.png';
  // var image = "http://code.google.com/apis/maps/documentation/javascript/examples/images/beachflag.png";
  var tothIcon = new google.maps.MarkerImage(
    // url
    image,
    // size
    new google.maps.Size(70, 102),
    // origin
    new google.maps.Point(0,0),
    // anchor
    new google.maps.Point(35,100));
  
  
  var tothMarker = new google.maps.Marker({
      position: toth,
      map: map,
      flat:true,
      clickable:true,
      title:"Toth + Co, 500 Harrison Avenue 5F Boston, MA 02118 (click for directions)",
      icon: tothIcon
  });
  
  google.maps.event.addListener(tothMarker, 'click', function() {
    // map.setZoom(8);
    // map.setCenter(marker.getPosition());
    var directionsURL = 'https://maps.google.com/maps?client=safari&oe=UTF-8&q=500+Harrison+Avenue+5F+Boston,+MA+02118&ie=UTF-8&hq=&hnear=0x89e37a6e4557bd25:0xaf07565a43beb7ea,500+Harrison+Ave,+Boston,+MA+02118&gl=us&daddr=500+Harrison+Ave,+Boston,+MA+02118&ei=ExvHUvf7M8HNsQSPlYKQDg&ved=0CC8QwwUwAA';
    
    window.open(directionsURL,'_blank');
  });
  
  var styledMapOptions = {name: "Hip-Hop"};
  var jayzMapType = new google.maps.StyledMapType(
      stylez, styledMapOptions);
  map.mapTypes.set('hiphop', jayzMapType);
  map.setMapTypeId('hiphop');
  mapBounds = map.getBounds();
}

function codeAddress() {
  var address = query;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map, 
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function anchorToURL(anchor){
  return anchor.replace('/', '').replace('#', '/');
}

function anchorToMenuItemID(anchor){
  return '#' + anchor.replace('/', '').replace('#', '');
}

$(function(){
  
  // Borrowed from Chris Coyier
  // Find all YouTube videos
  var $allVideos = $("iframe[src^='http://player.vimeo.com']").not('#optimism_video'),
  // The element that is fluid width
  $fluidEl = $("body"), newWidth = $fluidEl.width(),
  // filter buttons for the experience section
  $filters = addClientsFilter(),
  // whole page element for scrollTo
  $scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $('body'),
  shown, duration = 200;

  // Figure out and save aspect ratio for each video
  $allVideos.each(function() {

      $(this)
      .data('aspectRatio', 9/16 ) //this.height / this.width)

      // and remove the hard coded width/height
      .removeAttr('height')
      .removeAttr('width');

  });

  // When the window is resized
  $(window).resize(function(){
      newWidth = $fluidEl.width();

      // Resize all videos according to their own aspect ratio
      $allVideos.each(function() {

          var $el = $(this);
          $el
          .width(newWidth)
          .height(newWidth * $el.data('aspectRatio'));

      });
      // Kick off one resize to fix all videos on page load
  }).resize();

  // Handling subnavigation   
  // $("#thinking_nav a, a#careers, a#footer_careers").click(function(e) {
  //     e.preventDefault();
  //     
  //     itemName = $(this).attr('href');
  // 
      // $('#thinking_nav a')
      // .removeClass('active')
      // .siblings('[href="' + anchorToMenuItemID(itemName) + '"]').addClass('active');
  // 
  //     $('#thinking_container').load(anchorToURL(itemName));
  //     // $.Body.triggerHandler($.Events.SCROLL_TO, $('#thinking_nav'));
  // });
  
  //  Now that the people section is in the homepage, lets do this!
  $('.employee').mouseenter(function(){   
	  $('.headshot>img').css("opacity",".5"); 
    $(this).addClass("zoomed");
	}).mouseleave(function () {
    $(this).removeClass("zoomed");
    $('.headshot>img').css("opacity","1"); 
	});
  
  // removes leftover items to keep all the columns even
  function handleResize(evt)
  {
    hideRemainder($('#project_list'), 300);
    // hideRemainder($('#case_studies ul'), 300);
    // hideRemainder($('#experience .lists'));
    hideRemainder($('#blog ul'), 300);
    // hideRemainder($('#people ul'), 120);
    padLastSection($('#contact'));
    handleScroll();
    // console.log('resized...')
  }
  
  function handleScroll(evt)
  {
    positionFilters($('#experience .lists'));
    selectNav();
    
    showOptimism(evt);
  }
  
  function addClientsFilter()
  {
    var allMediaTypes = [];
    $('.client_name').each(function(){
      var types = $(this).attr('data-media-types');
      if(types.length > 0){
        allMediaTypes = allMediaTypes.concat(types.toLowerCase().split(','));
        $(this).attr('data-media-types', types.toLowerCase());
        // $(this).data('mediaTypes', types.toLowerCase().split(','));
      }
    });
    var uniqueMediaTypes = [];
    allMediaTypes = allMediaTypes.sort();
    for (var i=0; i < allMediaTypes.length; i++)
    {
      if(allMediaTypes[i] != uniqueMediaTypes[0])
        uniqueMediaTypes.unshift(allMediaTypes[i]);
    }
    uniqueMediaTypes.reverse();
    
    for(var i=0; i < uniqueMediaTypes.length; i++)
    {
      uniqueMediaTypes[i] = '<a href="#filter_'+uniqueMediaTypes[i]+'">'+uniqueMediaTypes[i]+'</a>';
    }
    
    var $clientFilters = $('<div id="filter_nav" class="floating_nav">'+uniqueMediaTypes.join(' <span class="nav_divider">//</span> ')+'</div>').append('<span class="all hidden">\
      <span class="nav_divider">//</span>\
      <a href="#all" id="filter_all">all</a>\
      </span>');
    $('#experience').append($clientFilters);
    
    $clientFilters.children('a').click(filterClients);
    
    return $clientFilters;
    
  }
  
  function filterClients(evt){
    // search data function and add class if selected, before that remove all classes to clear
    
    evt.preventDefault();
    $('#filter_nav>a.active').removeClass('active');
    $(this).addClass('active');
    
    var $filterButton = $(this);
    var filter = $filterButton.attr("href").substr(8);
    
    $('.client_name').each(function(){
      var $client = $(this);

      if($client.attr('data-media-types').indexOf(filter) != -1)
      {
        $client.stop().animate({opacity:1}, 500);
        // if($client.attr('href').length > 0)
          
      }else {
        $client.stop().animate({opacity:0.3}, 500);
        // if($client.attr('href').indexOf("#"))
          // $client.attr('href', $client.attr())
      }
    });
    
    $('a.client_name').each(function(){
      var $this = $(this);
      $this.attr('href', $this.attr("href")+"#filter_"+filter);
    });
    
    $('.all').removeClass('hidden');
    $('#filter_all').click(showAllClients);
    
    return false;
  }
  
  function showAllClients(evt){
    // show all the projects
    evt.preventDefault();
    $('.all').addClass('hidden');
    $('#filter_nav>a.active').removeClass('active');
    $('.client_name').stop().animate({opacity:1}, 500);
    $('a.client_name').each(function(){
      $(this).attr('href', this.href.substr(this.href.indexOf('#')));
    });
    // $.Body.triggerHandler($.Events.SCROLL_TO, $('#client_description'));
    
    return false;
  }
  
  function padLastSection($target)
  {
    if($target.attr('id') == "contact"){
      $('#map_canvas').css('height', ($(window).height() - ($target.outerHeight(true)-$('#map_canvas').height()) - ($('#footer').outerHeight(true))));
      if(map) google.maps.event.trigger(map, "resize");
      else initializeMap();
    }else
    {
      $('#map_canvas').css('height', ($(window).height() - ($target.outerHeight(true)-$target.height()) - ($('#footer').outerHeight(true))));
    }
  }
  
  
  
  /*
    Allows the filters to scroll with the page till they hit the top, then scroll again when the parent div is it at the top
  */
  function positionFilters($target){
    // TODO: Clean this up to make tied to the margins on the filter holder instead
    var topLimit      = 28; // How far down the page the filter nav will be before it stops.
    var bottomMargin  = 50; // How far above the client images, the filter nav will stay.
    var leftMargin    = 10; // You get it right?
        
    var top = $target.offset().top - $(window).scrollTop() - bottomMargin;
    var bottom = ($target.offset().top + $target.innerHeight()) - $(window).scrollTop();
    
    top = (top >= topLimit) ? top : (bottom >= topLimit) ? topLimit : bottom;
    
    if(top <= topLimit)
      $filters.css({
        '-webkit-box-shadow':'rgba(114, 181, 204, 0.6) 0px 3px 5px -2px',
        '-moz-box-shadow':'rgba(114, 181, 204, 0.6) 0px 3px 5px -2px',
        '-0-box-shadow':'rgba(114, 181, 204, 0.6) 0px 3px 5px -2px',
        'box-shadow':'rgba(114, 181, 204, 0.6) 0px 3px 5px -2px'
      });
    else
      $filters.css({
        '-webkit-box-shadow':'none',
        '-moz-box-shadow':'none',
        '-0-box-shadow':'none',
        'box-shadow':'none'
      });
    
    var left = $target.offset().left + leftMargin;
    
    $filters.css({top:top, left:left});
  }
  
  /*
    Centers the map when resizing the browser window.
  */
  function recenterMap(){
    if(map){
      map.panTo(new google.maps.LatLng(42.364295,-71.07929));
      // TODO: Add zooming to make sure that things fit on very small screens (requires creating a bounding box)
    }
  }
  
  /*
    Removes the leftover items when rewrapping floating stuff (imgs and case studies)
  */
  function hideRemainder($target, gridSize){
    
    // console.log('removing remainder', $target.children().length, Math.floor($target.innerWidth()/gridSize), $target.children().length >= Math.floor($target.innerWidth()/gridSize));
    
    if($target.children().length >= Math.floor($target.innerWidth()/gridSize))
    {
      $target.children().removeClass('hidden');
      var blocksToKeep = $target.children().length - ($target.children().length % Math.floor($target.innerWidth()/gridSize));
      // console.log(blocksToKeep, $target.children().length);
      $target.children().slice((blocksToKeep)).addClass('hidden');
    }
  }
  
  /*
    Removes the leftover items when rewrapping floating stuff (imgs and case studies)
  */
  function showRemainder($target){
    $target.children().removeClass('hidden');
  }
  
  /*
    Highlights the correct link as the page is scrolled.
  */
  function selectNav(evt)
  {
    var scrollToppy = $(this).scrollTop();
    $('.section').each(function(){
      // console.log(this.id, $(this).offset().top <= scrollToppy + 100)

      if($(this).offset().top <= scrollToppy + ($(window).height()/4)){ 
        $('#nav a').removeClass('selected');
        $('#nav a[href*="'+this.id+'"]').addClass('selected');
      }
    });
  }
  
  /*
    These are for the bird animation easteregg
  */
  var showBird = false;
  var showBranch = false;
  var showWord = false;
  var scrolledToBottom = false;
  
  var $branch = $('#branch');
  var $bird = $('#bird');
  
  var scrollTrigger = [800, 1600, 2400, 200];
  var toTop = 0;
  var birdTimeoutDelay = 5000;
  var birdTimeout;
  birdTimeout = setTimeout(showBirdForGood, birdTimeoutDelay);
  
  function showBirdForGood(){
    if(!showBranch){
      showBranch = true;
      $branch.css({left:-200, opacity:0}).removeClass('hidden').stop().animate({opacity:1, left:toTop}, 1000);
    }
    if(!showBird){
      showBird = true;
      $bird.css({left:-200, opacity:0}).removeClass('hidden').stop().animate({opacity:1, left:toTop}, 1000);
    }
    // if(!showWord){
    //       showWord = true;
    //       $word.css({top:-40, opacity:0}).removeClass('hidden').stop().delay(1600).animate({opacity:1, top:toTop}, 1000);
    //     }
    scrolledToBottom = true;
  }
  
  /*
    Shows the video at the top of the page, currently disabled.
    TODO: Move to individual js file.
  */
  function showOptimism(evt)
    {
      if($(window).scrollTop() > scrollTrigger[0] && !showBranch)
      {
        showBranch = true;
        $branch.css({left:-200, opacity:0}).removeClass('hidden').stop().animate({opacity:1, left:toTop}, 1000);
      }
      
      if($(window).scrollTop() > scrollTrigger[0] && !showBird)
      {
        showBird = true;
        $bird.css({left:-200, opacity:0}).removeClass('hidden').stop().animate({opacity:1, left:toTop}, 1000);
      }
      
    }
  
  function loadOptimism()
  {
    // alert('Nothing to see here (yet). Please move along. Also this will be less blurry if we like how it works/fits here.')
    
    // if($('#optimism').hasClass('hidden')){
    //       var $o  = $('#optimism').removeClass('hidden');
    //       var $od = $('#optimism_divider').removeClass('hidden');
    //     
    //       $scroll.stop().scrollTop( $(window).scrollTop() + ($o.outerHeight(true) + $od.outerHeight()) )
    //     }
    //     
    //     $scroll.stop().delay(500).animate({scrollTop:0}, $(window).scrollTop() * 1)
  }
  
  
  
  /*
    Does the logo animation on initial rollover, and also reveals them all when konami code is entered... 
    TODO: need to reveal them all or something when page is resized (since something is messed up in buckets)
  */
  function animateLogos($target){
    $('.img_rollover').not($target).each(function(index){
      $(this).stop().delay(Math.round(Math.random()*opacityRandomness) + (index*10)).animate({opacity:overOpacity}, {duration:duration*2});
    });
    shown = true;
  }
  
  /*
    Resets the logos (currently when you mouseover the toth+co logo).
  */
  function resetLogos(){
    $('.img_rollover').each(function(index){
      $(this).stop().delay(Math.round(Math.random()*opacityRandomness) + (index*10)).animate({opacity:upOpacity}, {duration:duration*2});
      shown = false;
    });
  }
  
  /*
    Debug method to see all projects reguardless of column count. Invoked with the konami code right now.
  */
  function showAllProjects(){
    showRemainder($('#project_list'));
  }
  
  
  $('#map_address h3').click(recenterMap).css('cursor', 'pointer');
  
  $(window).resize(handleResize).resize();  
  $(window).scroll(handleScroll).scroll();
  $('#nav a').not('#client_login').not('#careers').not('#social_links>*').click(function(evt){
    
    var hash = $(this).attr('href').substr(1);    
    $scroll.stop().animate({scrollTop:$('#'+hash).offset().top}, 800, function(){
      window.location.hash = hash;
    });
    
    evt.preventDefault();
    return false;
  });
  
  
  $('.img_rollover').mouseover(function(){
    var $this = $(this);
    if(!shown){
      // $this.stop().animate({opacity:overOpacity}, {duration:duration});
      animateLogos($this);
    }//else{
      $this.stop().animate({opacity:upOpacity}, {duration:duration});
    // }
  }).mouseout(function(){
    $(this).stop().animate({opacity:overOpacity}, {duration:duration});
  });
  
  
  if(overOpacity == 1) resetLogos();
  
  // var timeout = animateLogos();
  
  $('#toth_logo').mouseover(resetLogos);
  $('#optimism_bug').click(loadOptimism);
  
  konami = new Konami();
  konami.code = showAllProjects;
  konami.load();
  
});

function reorder(bucket, el) {
  var slugs = [];
  
  $(el).children().each(function(){
    slugs.push($(this).find('a').attr('href').replace('/clients/', ''));
  });
  
 $.ajax({url: '/projects/reorder', data: {bucket: bucket, 'slugs': slugs}, success: function(response, status){
  }});
}
