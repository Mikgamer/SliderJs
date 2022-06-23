// set defaults values
var slider=".slider"; // Set the slider (Work with multiple sliders)
var transi=0.2; // How many Xs is needed for a slide to enter the screen
var infi=1; // 1 if you want your slider to be infinite
var auto=0; // "right" if you want the slide to scroll to the right or "left" for the left (require infi=1)
var autotime=5000; // Every X/1000 seconds the slide scroll (require auto=1)

// get sliders with class
var sliders=Array.from(document.querySelectorAll(slider));

// set transition time of element
var t=function(el){el.style.transition=transi+"s";}

// get offsetX of the element
var getTX=function(el){
	var wc=parseInt(el.style.transform.replace(/translateX\(|\)/g,''),10);
	if(isNaN(wc)){wc=0;}
	return wc;
}
// set offsetX of the element
var setTX=function(el,offset){el.style.transform="translateX("+offset+"px)";}

sliders.forEach(function(slide){
	// Height&Width of the slider
	var h=slide.clientHeight;
	var w=slide.clientWidth;
	// Set vars
	var previous=slide.getElementsByClassName('previous')[0];
	var next=slide.getElementsByClassName('next')[0];
	var sliderimg=slide.getElementsByClassName('slider-img')[0];
	var imgs=sliderimg.querySelectorAll('*>*');
	var nbimgs=imgs.length;

	// Set styles
	previous.style.fontSize=h/10+"px";
	next.style.fontSize=h/10+"px";

	if(infi==1){ // If infi=1, put slides at the begining and the end of the slider for smooth scroll
		var temparr=Array.from(sliderimg.children);
		temparr.unshift(imgs[nbimgs-1]);temparr.push(imgs[0]);
		sliderimg.innerHTML=temparr.map(e=>e.outerHTML).join('');
		setTX(sliderimg,-w);
	}

	previous.addEventListener('click',function(e){
		var wc=getTX(sliderimg);
		t(sliderimg);
		if(infi==1){
			if((Math.abs(wc)/w)>1){
				wc=wc+w;
				setTX(sliderimg,wc);
			}else if((Math.abs(wc)/w)>0){ // If this is the fist slide, swap to the end
				wc=wc+w;
				setTX(sliderimg,wc);
				setTimeout(function(){
					sliderimg.style.transition="0s";
					setTX(sliderimg,-(w*nbimgs));
				},transi*1000);
			}
		}else{
			// Simple slide if no infi
			if((Math.abs(wc)/w)>0){
				wc=wc+w;
				setTX(sliderimg,wc);
			}
		}
	});

	next.addEventListener('click',function(e){
		var wc=getTX(sliderimg);
		t(sliderimg);
		if(infi==1){
			if((Math.abs(wc)/w)<nbimgs){
				wc=wc-w;
				setTX(sliderimg,wc);
			}else if((Math.abs(wc)/w)<nbimgs+1){ // If this is the last slide, swap to the begining
				wc=wc-w;
				setTX(sliderimg,wc);
				setTimeout(function(){
					sliderimg.style.transition="0s";
					setTX(sliderimg,-w);
				},transi*1000);
			}
		}else{
			// Simple slide if no infi
			if((Math.abs(wc)/w)<nbimgs-1){
				wc=wc-w;
				setTX(sliderimg,wc);
			}
		}
	});
	
	if(infi==1){
		if(auto=="right"){setInterval(function(){next.click();},autotime);}
		else if(auto=="left"){setInterval(function(){previous.click();},autotime);}
	}
});
