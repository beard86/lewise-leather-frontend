//@prepros-prepend vendor/jquery-3.1.1.min.js
//@prepros-prepend vendor/modernizr.js

//Enquire to JS media queries, delete as needed
//@prepros-prepend vendor/bootstrap.min.js
//@prepros-prepend vendor/bootstrap-select.min.js
//@prepros-prepend vendor/media.match.min.js
//@prepros-prepend vendor/enquire.js

//@prepros-prepend components/titleAnimation.js

if(typeof window.blankProject === 'undefined')
  window.blankProject = {};

window.blankProject.init = function() {
  //titleAnimation.init();
  console.log('test');
	$('.selectpicker').selectpicker({
	  style: 'btn-info',
	  size: 4
	});

};

$(document).ready(window.blankProject.init);