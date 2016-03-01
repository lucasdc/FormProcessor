# FormProcessor

 Simple form validation and masking plugin with jQuery
  - Validation rules controlled by HTML attributes
  - Easly create your own validation rules
  - Supports Ajax calls

### How to use:
Make sure to include **jQuery** in your page:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
```
Include **jQuery FormProcessor**:

```html
<script src="jquery.formProcessor.js"></script>
```

Initialize **jQuery FormProcessor**:

```html
<script>
$(function(){
  $('form').formProc(
    //options
  );
});
</script>
```

### HTML Setup

Add **data-req** attribute with one of the validation methods available:

```html
<input type="text" name="my_field" data-req="required">
```

Add **data-mask** attribute to use masking plugin included:

```html
<input type="text" name="my_phone_field" data-mask="(99) 9999-99999">
```

### Options

FormProcessor uses callback functions to handle validation, they need to be setup on the options object when initializing:

```js
{
  /*
   * Type: Function
   * Description: Function called when submit process starts
   * Parameter: form - jQuery form element
   */
  onStart: function( form ) {},

  /*
   * Type: Function
   * Description: Function called when field validation fails
   * Parameter: input - jQuery (input, select, textarea) element
   * Parameter: form - jQuery form element
   */
  onError: function( input, form ) {},

  /*
   * Type: Function
   * Description: Function called when field validation fails
   * Parameter: form - jQuery form element
   * Parameter: valid - Boolean indicating if the form values passed all validation rules
   */
  onEnd: function( form, valid ) {},

  /*
   * Type: Function
   * Description: Function called when ajax call fails
   * Parameter: form - jQuery form element
   */
  onAjaxError: function( form ) {},

  /*
   * Type: String
   * Description: Selectors used to filter the field for a form
   */
  formFilter: ‘input[data-req], select[data-req], textarea[data-req]’,

  /*
   * Type: String
   * Description: Selector used to remove some elements from the one found by "formFilter"
   */
  ignoreFilter: ‘’,

  /*
   * Type: Boolean
   * Description: Stops when the first field fails validation
   */
  stopOnError: true,

  /*
   * Type: String
   * Description: if true triggers validation on field blur event, form submit keeps working
   */
  validateOnBlur: false,

  /*
   * Type: String
   * Description: if true apllies mask to all form fields with data-mask attribute on plugin inicialization
   */
  autoMask: true
}
```

### Validation Methods

Validation methods are used on each field that you want to make required. Just add a data-req="method_name" attribute to the field. Some methods can have parameters on them, check the demos for more details on that.

- required - Most basic, test if the field has value or not
- email - Tests if the field value is an e-mail
- date{format} - Tests if value is date. Receives the data format as a parameter eg.: datareq="date{m/d/y}"
- number - Tests if value is a number
- range{min,max} - Tests if value is a number and is between [min,max] range
- matches{selector} - Tests if the value is equal to the value of the given selector

You can create your own validation methods to suit your needs.

```js
$.addValidationRule( 'method_name', function(){
  //Validation logic
  return true || false;
} );
```

### Demos

[Basic usage, includes mask](http://codepen.io/ldupke/pen/dYGgZR)

[Custom validation rules](http://codepen.io/ldupke/pen/garpOx)
