FormProcessor
=============

Easy form validation and masking


HTML Setup

Add "data-req" attribute with on of the validation methods available:

<input type="text" name="my_field" data-req="required">


Core validation methods

- required
- email
- date
- number
- range{min,max}
- matches{selector}


Adding new methods

$.addValidationRule( 'method_name', function(){
  return true/false;
} );


Options

onError : function( input, form ) // called when field validation fails

onStart : function( form ) // called when validation process starts

onEnd : function( form, valid ) // called when validation process ends

onAjaxError : function( form ) // calles when ajax fails

formFilter : 'input[data-req], select[data-req], textarea[data-req]' // selector used to find fields inside a form

ignoreFilter : '' // selector to exclude fields from the ones found by "formFilter"

stopOnError : true // if true stops on the first field validation fail

validateOnBlur : // if true validates a field on blur, also validates on submit

autoMask : true // if true apllies mask to all form field with data-mask attribute



Examples

Full form validation, triggers when form submits

$('form').formProc({
  validateOnBlur : true,
  stopOnError : false,
  autoMask : false,
  ignoreFilter : '.ignore',
  onError : function(i,f){ alert('aaaaa' + i); }
});


//Field area validation

var is_valid = $('#some-div-with-inputs').validate({
                  validateOnBlur : true,
                  stopOnError : false,
                  autoMask : false,
                  ignoreFilter : '.ignore',
                  onError : function(i,f){ alert('aaaaa' + i); }
                });
if( is_valid ) {
  //Values correct, do something
}

//Single field validation

var is_valid = $('#some-input').validate({
                  validateOnBlur : true,
                  stopOnError : false,
                  autoMask : false,
                  ignoreFilter : '.ignore',
                  onError : function(i,f){ alert('aaaaa' + i); }
                });

if( is_valid ) {
  //Value correct, move on
}
