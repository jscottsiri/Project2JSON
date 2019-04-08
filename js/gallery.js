// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
    
	var myElement= document.querySelectorAll("img#slideshow");
    myElement.src;
    GalleryImage(mImages[mCurrentIndex].imgLocation,mImages[mCurrentIndex].description,mJson.images[mCurrentIndex].date,mJson.images[mCurrentIndex].imgPath);
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = mJson.images;

// Holds the retrived JSON information
var mJson= JSON.parse(mRequest.open("GET", mUrl));

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = '../images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(location, description, date, src) {
	//implement me as an object to hold the following data about an image:
	this.location=location;
    this.description=description;
    this.date=date;
    this.src=src;
}
$('#nextPhoto').on('click', () => {
    mCurrentIndex+=1;
if (mCurrentIndex > 12){
        mCurrentIndex= 0;
}
    swapPhoto();});
$('#prevPhoto').on('click', () => {
    mCurrentIndex-=1;
    if (mCurrentIndex < 0){
        mCurrentIndex= 12;
}
    swapPhoto();
});
$("img.moreIndicator").click(function() {
    if($(".moreIndicator").hasClass("rot90")){
        $(".moreIndicator").addClass("rot270");
        $(".moreIndicator").removeClass("rot90");
}
    else if($(".moreIndicator").hasClass("rot270")){
        $(".moreIndicator").addClass("rot90");
        $(".moreIndicator").removeClass("rot270");
}
});