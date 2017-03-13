/*
  The object name should be captialised
  and would usually be namespaced by
  the project/client name, e.g. intu.Pattern.
  Variable and function names should be 
  full words, using camel case with a 
  lowercase first letter.
*/
if (typeof titleAnimation === 'undefined') {
  var titleAnimation = {};
}

titleAnimation = {

  vars: {
    sampleVar: true
  },

  DOM: {  
    words:''
  },

  init: function () {
    // console.log('loaded example');
    this.splitHeading();
  },

  splitHeading: function() {
    var _words = titleAnimation.DOM.words;
    _words = $('h2').text().split(' ');
    $('h2').empty();
    $.each( _words, function(i, v) {
        $('h2').append($('<span>').text(v));
    });

  },

  events: {
    
  },

  helpers: {
    
  }
};