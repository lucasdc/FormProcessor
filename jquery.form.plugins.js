/*!
 * jQuery Form Processor v0.1
 *
 * Copyright (c) 2013 Lucas Dupke; Dual licensed: MIT/GPL
 */

(function($, w, u){
	//plugin de mascara
	$.fn.mask = function(){
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
					i = 0;

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
	var ValidationRules = function(){};
	var AjaxResponses = function(){};

	var formProc_default_options = {
		stopOnError : true,
		onError : function(input, form) {
			input.focus();
			console.log(input);
		},
		onStart : function(form) {
			console.clear();
		},
		onSuccess : function(form) {
			console.log('Feitooooo');
		},
		onAjaxError : function(form) {
			console.log('Erro no ajax');
		},
		formFilter : 'input[data-req], select[data-req], textarea[data-req]',
		debug : false,
		autoMask : true
	};

	$.addValidationRule = function(name, fn) {
		ValidationRules.prototype[name] = fn;
	}

	$.addAjaxResponse = function(name, fn) {
		AjaxResponses.prototype[name] = fn;
	}

	$.fn.validateForm = function(opts) {
		var options = $.extend(formProc_default_options, opts || {}),
			$form = $(this),
			$inputs = $form.find(options.formFilter),
			IsValid = true,
			Rules = new ValidationRules(),
			AjaxR = new AjaxResponses();

		if($form.data('status') != 'sending') {

			$form.data('status', 'sending');

			if($.isFunction(options.onStart))
					options.onStart.call($form, $form);

			$inputs.each(function(){
				if(IsValid || !options.stopOnError) {
					var $el = $(this),
						elrules = $el.data('req').split('|'),
						elruleslen = elrules.length,
						i = 0, aux, fn, args;

					while(i < elruleslen) {
						aux = elrules[i].replace('}', '').split('{');
						fn = aux[0];
						args = aux[1];

						if( $.isFunction( Rules[ fn ] ) ) {
							if( !Rules[ fn ]($el, args) ) {
								IsValid = false;
								if($.isFunction(options.onError))
									options.onError.call($el, $el, $form);

								if(options.stopOnError)
									break;
							}
						} else {
							//log(fn + ": Não Existe", args);
						}

						i++;
					}
				}

			});
		}

		return IsValid;
	}

	$.fn.formProc = function(opts) {

		var options = $.extend(formProc_default_options, opts || {}),
			log = function(){
				if (window.console && console.log && options.debug)
					console.log('[Form Processor] ' + Array.prototype.join.call(arguments, ' '));
			};

		if(options.autoMask) {
			$(this).find('input[data-mask]').mask();
		}

		var formValidate = function() {

			var $form = $(this),
			IsValid = $form.validateForm(options);

			if(IsValid) {
				log('Form Valid');
				if($form.data('ajax')) {
					log('Send data via ajax');
					$.post($form.prop('action'), $form.serialize())
						.done(function(html){
							log('Ajax done succesfuly');
							var fn = $form.data('ajax');
							if($.isFunction(AjaxR[fn])) {
								AjaxR[fn].call($form, html);
							} else {
								if($.isFunction(options.onSuccess))
									options.onSuccess.call($form, $form);
							}

							$form.data('status', 'idle');
						})
						.fail(function(){
							log('Ajax failed');
							if($.isFunction(options.onAjaxError))
									options.onAjaxError .call($form, $form);

							$form.data('status', 'idle');
						});

					return false;
				} else {
					log('Send data normaly (GET, POST)');
					if($.isFunction(options.onSuccess))
						options.onSuccess.call($form, $form);

					$form.data('status', 'idle');

					return true;
				}
			} else {
				log('Form Invalid');
				$form.data('status', 'idle');
			}

			return false;
		};


		return $(this).each(function(){
			$(this).data('status', 'idle');
		}).on('submit.FormProc', formValidate);

	};

	/*DATA*/
	$.addValidationRule('date', function($el, format, er){
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
	$.addValidationRule('email', function($el){
		return /^[\w\.%\+\-]+@(?:[A-Z0-9\-]+\.)+(?:[A-Z]{2,6})$/i.test($el.val());
	});

	/*REQUIRED (max_length)*/
	$.addValidationRule('required', function($el, maxlength){
		var mlen = maxlength || 9e6,
			val = $el.val();
		if (val.length <= 0 || val.length >= mlen)
			return false;
		return true;
	});

	/*MINIMUM (min_length)*/
	$.addValidationRule('min', function($el, minlength){
		var mlen = minlength || 0,
			val = $el.val();
		if (val.length < mlen)
			return false;
		return true;
	});

	/*NUMBER*/
	$.addValidationRule('number', function($el){
		var val = $el.val();
		if (val == '' || isNaN(val))
			return false;
		return true;
	});

	/*MATCH OTHER FIELD (selector)*/
	$.addValidationRule('matches', function($el, comp_el){
		var val = $el.val();
		return val == $(comp_el).val();
	});

	/*RANGE(min, max) Numbers only*/
	$.addValidationRule('range', function($el, range){
		var rng = range.split(','),
			val = $el.val();
		if (+val >= +rng[0] && +val <= +rng[1])
			return true;
		return false;
	});

	/*REGULAR EXPRESSION (er)*/
	$.addValidationRule('regex', function($el, er){
		return RegExp(er).test($el.val());
	});

	/*RADIO BUTTONS & CHECKBOXES*/
	$.addValidationRule('checked', function($el){
		return $('input[type="' + $el.attr('type') + '"][name="' + $el.attr('name') + '"]:checked').length > 0;
	});
})(jQuery, window);

/*
(function(b,p,q){var f=function(){},g=function(){},m={stopOnError:!0,onError:function(a,c){a.focus();console.log(a)},onStart:function(a){console.clear()},onSuccess:function(a){console.log("Feitooooo")},onAjaxError:function(a){console.log("Erro no ajax")},formFilter:"input[data-req], select[data-req], textarea[data-req]",debug:!1};b.addValidationRule=function(a,c){f.prototype[a]=c};b.addAjaxResponse=function(a,c){g.prototype[a]=c};b.fn.validateForm=function(a){var c=b.extend(m,a||{}),d=b(this);a=d.find(c.formFilter); var e=!0,n=new f;new g;"sending"!=d.data("status")&&(d.data("status","sending"),b.isFunction(c.onStart)&&c.onStart.call(d,d),a.each(function(){if(e||!c.stopOnError)for(var a=b(this),f=a.data("req").split("|"),g=f.length,k=0,h,l;k<g;){h=f[k].replace("}","").split("{");l=h[0];h=h[1];if(b.isFunction(n[l])&&!n[l](a,h)&&(e=!1,b.isFunction(c.onError)&&c.onError.call(a,a,d),c.stopOnError))break;k++}}));return e};b.fn.formProc=function(a){var c=b.extend(m,a||{}),d=function(){window.console&&console.log&& c.debug&&console.log("[Form Processor] "+Array.prototype.join.call(arguments," "))};return b(this).each(function(){b(this).data("status","idle")}).on("submit.FormProc",function(){var a=b(this);if(a.validateForm(c))if(d("Form Valid"),a.data("ajax"))d("Send data via ajax"),b.post(a.prop("action"),a.serialize()).done(function(f){d("Ajax done succesfuly");var g=a.data("ajax");b.isFunction(AjaxR[g])?AjaxR[g].call(a,f):b.isFunction(c.onSuccess)&&c.onSuccess.call(a,a);a.data("status","idle")}).fail(function(){d("Ajax failed"); b.isFunction(c.onAjaxError)&&c.onAjaxError.call(a,a);a.data("status","idle")});else return d("Send data normaly (GET, POST)"),b.isFunction(c.onSuccess)&&c.onSuccess.call(a,a),a.data("status","idle"),!0;else d("Form Invalid"),a.data("status","idle");return!1})};b.addValidationRule("date",function(a,c,b){c=(c||"d/m/a").replace("y","a");c=c.split(b=/([^\w\d])/gi.exec(c)[0]);b=a.val().split(b);a={a:0,m:0,d:0};for(var e=c.length;e--;)a[c[e]]=""+b[e];c=new Date(a.a,a.m-1,a.d);return 3>a.m.length&&3>a.d.length&& 4==a.a.length?a.m==c.getMonth()+1&&!isNaN(+c):!1});b.addValidationRule("email",function(a){return/^[\w\.%\+\-]+@(?:[A-Z0-9\-]+\.)+(?:[A-Z]{2,6})$/i.test(a.val())});b.addValidationRule("required",function(a,c){var b=c||9E6,e=a.val();return 0>=e.length||e.length>=b?!1:!0});b.addValidationRule("min",function(a,c){var b=c||0;return a.val().length<b?!1:!0});b.addValidationRule("number",function(a){a=a.val();return""==a||isNaN(a)?!1:!0});b.addValidationRule("matches",function(a,c){return a.val()==b(c).val()}); b.addValidationRule("range",function(a,c){var b=c.split(","),e=a.val();return+e>=+b[0]&&+e<=+b[1]?!0:!1});b.addValidationRule("regex",function(a,b){return RegExp(b).test(a.val())});b.addValidationRule("checked",function(a){return 0<b('input[type="'+a.attr("type")+'"][name="'+a.attr("name")+'"]:checked').length})})(jQuery,window);
*/