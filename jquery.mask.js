(function($, w, d, u){
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
}(jQuery, window, document));

/*
(function(e,h,k,l){e.fn.mask=function(){var g={a:"[a-zA-Z]",9:"[0-9]","*":"[a-zA-Z0-9]"};return e(this).on("input",function(){for(var c=e(this).data("mask"),f=e(this).val().split(""),b="",d,a=0;a<c.length&&0<f.length;)d=f.shift(),g[c[a]]?(er=RegExp(g[c[a]]),er.test(d)&&(b+=d,a++)):""!=c[a]&&(c[a]==d?b+=d:(b+=c[a],f.unshift(d)),a++);e(this).val(b)})}})(jQuery,window,document);
*/