(function($, w, u) {
	//Plugin de Mascara
  $.fn.fpMask = function() {
    var er_masks = {
      'a' : '[a-zA-Z]',
      '9' : '[0-9]',
      '*' : '[a-zA-Z0-9]'
    };

    function check_mask () {
      var mask = $(this).data('mask'),
          val = $(this).val(),
          arr_val = val.split(''),
          new_val = '',
          curr_char,
          i = 0,
          er;

      while (i < mask.length && arr_val.length > 0) {
        curr_char = arr_val.shift();
        if (er_masks[mask[i]]) {
          er = new RegExp(er_masks[mask[i]]);

          if(er.test(curr_char)) {
            new_val += curr_char;
            i++;
          }
        } else if (mask[i] != "") {
          if(mask[i] == curr_char) {
            new_val += curr_char;
          } else {
            new_val += mask[i];
            arr_val.unshift(curr_char);
          }
          i++;
        }
      }
      $(this).val(new_val);
    }
    return $(this).on('input',check_mask);
  }

	//Regras
	var validationRules = {},
			ajaxResponses = {};

	var formProc_default_options = {
		onError : function( input, form ) {
			input.focus();
			console.log(input);
		},
		onStart : function( form ) {
			//console.clear();
		},
		onEnd : function( form, valid ) {
			//console.clear();
		},
		onAjaxError : function( form ) {
			//console.log('Erro no ajax');
		},
		formFilter : 'input[data-req], select[data-req], textarea[data-req]',
		ignoreFilter : '',
		stopOnError : true,
		validateOnBlur : false,
		debug : false,
		autoMask : true
	};

	$.addValidationRule = function(name, fn) {
		validationRules[name] = fn;
	}

	$.addAjaxResponse = function(name, fn) {
		ajaxResponses[name] = fn;
	}

	//Validação de campo
	function validate_field( $el ) {
		var isValid = true,
				elrules = $el.data('req').split('|'),
				elruleslen = elrules.length,
				i = 0, aux;

		while(i < elruleslen) {
			aux = /([\w\d_]+)({([^!]+)})?/g.exec(elrules[i]);
			if( $.isFunction( validationRules[ aux[1] ] ) ) {
				if( !validationRules[ aux[1] ]($el, aux[3]) ) {
					isValid = false;

				}

			}

			i++;

		}

		return isValid;

	}

	function call_fn( fn, scope, arg1, arg2 ) {
		if( $.isFunction( fn ) ) {
			fn.call( scope, arg1, arg2 );
		}
	}

	$.fn.validate = function(opts) {
		var options = $.extend( {}, formProc_default_options, opts ),
				$form = this,
				is_valid = true,
				$elements, i;

		if( $form.length > 0 ) {
			//onStart
			call_fn( options.onStart, $form, $form );

			if( $form.eq(0).is('input,select,textarea') ) {
				if( !validate_field( $form.eq(0) ) ) {
					//onError
					call_fn( options.onError, $form, $form.eq(0), $form );
					is_valid = false;

				}

			} else {
				$elements = $form.find( options.formFilter ).filter(':not( ' + options.ignoreFilter + ' )');

				for ( i = 0; i < $elements.length; i++ ) {
					if( !validate_field( $( $elements[i] ) ) ) {
						//onError
						call_fn( options.onError, $( $elements[i] ), $( $elements[i] ), $form );
						is_valid = false;

						if( options.stopOnError )
							break;

					}

				}

			}

			//onEnd
			call_fn( options.onEnd, $form, $form, is_valid );

		}

		return is_valid;
	};

	$.fn.formProc = function( opts ) {
		var options = $.extend( {}, formProc_default_options, opts );

		if(options.autoMask)
			this.find( 'input[data-mask], textarea[data-mask]' ).fpMask();

		if(options.validateOnBlur) {
			var $elements = this.find( options.formFilter ).filter(':not( ' + options.ignoreFilter + ' )');
			$elements.each(function(i, el) {
				$(this).on('blur', function() {
					$(this).validate( options );

				});

			});

		}


		this.attr('novalidate', true);

		this.data( 'sending', false );

		return $( this ).on( 'submit', function() {
			var $form = $( this ),
					is_valid = true,
					is_ajax = $form.data( 'ajax' ),
					url = $form.attr( 'action' );

			if( !$form.data( 'sending' ) ) {
				$form.data( 'sending', true );
				is_valid = $form.validate( options );

				if( is_valid ) {
					if( is_ajax ) {

						$.post( url, $form.serialize() )
							.done(
								function(resp) {
									call_fn( ajaxResponses[ is_ajax ], $form, resp );

								}

							).fail(
								function() {
									call_fn( options.onAjaxError, $form, $form );

								}

							)
							.always(
								function() {
									$form.data( 'sending', false );

								}

							);
						return false;

					}

				} else {
					$form.data( 'sending', false );

				}

				return is_valid;

			} else {
				return false;

			}

		});
	};

	/*DATA*/
	$.addValidationRule('date', function($el, format, er) {
		var format = (format || 'd/m/a').replace('y','a'),
			mask = format.split(er = /([^\w\d])/gi.exec(format)[0]),
			dataAux = $el.val().split(er),
			dt = { a: 0, m: 0, d: 0 },
			i = mask.length;

		while (i--)
			dt[mask[i]] = ''+dataAux[i];

		var date = new Date(dt.a, dt.m - 1, dt.d),
			a;

		return (dt.m[a='length'] < 3 && dt.d[a] < 3 && dt.a[a] == 4) ? (dt.m == date.getMonth()+1 && !isNaN(+date)) : !1;
	});

	/*EMAIL*/
	$.addValidationRule('email', function($el) {
		return /^[\w\.%\+\-]+@(?:[A-Z0-9\-]+\.)+(?:[A-Z]{2,6})$/i.test($el.val());
	});

	/*REQUIRED (max_length)*/
	$.addValidationRule('required', function($el, maxlength) {
		var mlen = maxlength || 9e6,
			val = $el.val();
		if (val.length <= 0 || val.length > mlen)
			return false;
		return true;
	});

	/*MINIMUM (min_length)*/
	$.addValidationRule('min', function($el, minlength) {
		var mlen = minlength || 0,
			val = $el.val();
		if (val.length < mlen)
			return false;
		return true;
	});

	/*NUMBER*/
	$.addValidationRule('number', function($el) {
		var val = $el.val();
		if (val == '' || isNaN(val))
			return false;
		return true;
	});

	/*MATCH OTHER FIELD (selector)*/
	$.addValidationRule('matches', function($el, comp_el) {
		var val = $el.val();
		return val == $(comp_el).val();
	});

	/*RANGE(min, max) Numbers only*/
	$.addValidationRule('range', function($el, range) {
		var rng = range.split(','),
			val = $el.val();
		if (+val >= +rng[0] && +val <= +rng[1])
			return true;
		return false;
	});

	/*REGULAR EXPRESSION (er)*/
	$.addValidationRule('regex', function($el, er) {
		return RegExp(er).test($el.val());
	});

	/*RADIO BUTTONS & CHECKBOXES*/
	$.addValidationRule('checked', function($el) {
		return $('input[type="' + $el.attr('type') + '"][name="' + $el.attr('name') + '"]:checked').length > 0;
	});
})(jQuery, window);