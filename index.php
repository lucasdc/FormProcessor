<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST') {
		sleep(5);
		echo 'ok';
		exit();
	}
?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title></title>
	<style>
	html { font-size: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background: #F0F0F0; }
	html, button, input, select, textarea { font-family: sans-serif; color: #333; }
	body { margin: 0; font-size: 1em; line-height: 1.4; }

	::-moz-selection { background: #FF9933; color: #fff; text-shadow: none; }
	::selection { background: #FF9933; color: #fff; text-shadow: none; }

	/* =============================================================================
	   Links
	   ========================================================================== */
	a { color: #00e; }
	a:visited { color: #551a8b; }
	a:hover { color: #06e; }
	a:focus { outline: thin dotted; }
	a:hover, a:active { outline: 0; }

	/* =============================================================================
	   Typography
	   ========================================================================== */
	abbr[title] { border-bottom: 1px dotted; }
	b, strong { font-weight: bold; }
	blockquote { margin: 1em 40px; }
	dfn { font-style: italic; }
	hr { display: block; height: 1px; border: 0; border-top: 1px solid #ccc; margin: 1em 0; padding: 0; }
	ins { background: #ff9; color: #000; text-decoration: none; }
	mark { background: #ff0; color: #000; font-style: italic; font-weight: bold; }
	pre, code, kbd, samp { font-family: monospace, serif; _font-family: 'courier new', monospace; font-size: 1em; }
	pre { white-space: pre; white-space: pre-wrap; word-wrap: break-word; }
	q { quotes: none; }
	q:before, q:after { content: ""; content: none; }
	small { font-size: 85%; }
	sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }
	sup { top: -0.5em; }
	sub { bottom: -0.25em; }

	/* =============================================================================
	   Lists
	   ========================================================================== */
	ul, ol { margin: 1em 0; padding: 0 0 0 40px; }
	dd { margin: 0 0 0 40px; }
	nav ul, nav ol { list-style: none; list-style-image: none; margin: 0; padding: 0; }

	/* =============================================================================
	   Embedded content
	   ========================================================================== */
	img { border: 0; -ms-interpolation-mode: bicubic; vertical-align: middle; }
	svg:not(:root) { overflow: hidden; }

	/* =============================================================================
	   Figures
	   ========================================================================== */
	figure { margin: 0; }

	/* =============================================================================
	   Forms
	   ========================================================================== */
	form { margin: 0; }
	fieldset { border: 0; margin: 0; padding: 0; }
	label { cursor: pointer; }
	legend { border: 0; *margin-left: -7px; padding: 0; white-space: normal; }
	button, input, select, textarea { font-size: 100%; margin: 0; vertical-align: baseline; *vertical-align: middle; }
	button, input { line-height: normal; }
	button, input[type="button"], input[type="reset"], input[type="submit"] { cursor: pointer; -webkit-appearance: button; *overflow: visible; }
	button[disabled], input[disabled] { cursor: default; }
	input[type="checkbox"], input[type="radio"] { box-sizing: border-box; padding: 0; *width: 13px; *height: 13px; }
	input[type="search"] { -webkit-appearance: textfield; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; }
	input[type="search"]::-webkit-search-decoration, input[type="search"]::-webkit-search-cancel-button { -webkit-appearance: none; }
	button::-moz-focus-inner, input::-moz-focus-inner { border: 0; padding: 0; }
	textarea { overflow: auto; vertical-align: top; resize: vertical; }
	input:valid, textarea:valid {  }
	input:invalid, textarea:invalid { background-color: #f0dddd; }

	/* =============================================================================
	   Tables
	   ========================================================================== */
	table { border-collapse: collapse; border-spacing: 0; }
	td { vertical-align: top; }


	/* =============================================================================
	   General Styles
	   ========================================================================== */
	h1 { text-align: center; }
	.center { width: 860px; margin: 0 auto; padding: 20px; }
	pre { font-size: .8em; border: 1px solid #DDD; background: #FCFCFC; padding: 6px 8px; color: #333; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; }
	table { width: 100%; background: #FCFCFC; }
	table td { border: 1px solid #DDD; padding: 6px 8px; }

	form { width: 960px; margin: 10px auto; }
	label { display: block; padding: 10px; font-size: 12px; line-height: 32px; border-bottom: 1px solid #DDD; }
	label + label { border-top: 1px solid #FFF; }
	label span { display: block; width: 100px; text-align: right; float: left; margin-right: 5px; }
	label input[type="text"] { border: 1px solid #CCC; border-radius: 4px; padding: 5px; height: 20px; width: 340px; }
	label input[type="checkbox"], label input[type="radio"] { margin-right: 2px; position: relative; top: 1px; *overflow: hidden; }
	form button {
		border: 1px solid #444;
		border-radius: 3px;
		background-color: #333; /* Old browsers */
		background-image: -moz-linear-gradient(top, #666 0%, #333 100%); /* FF3.6+ */
		background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#666), color-stop(100%,#333)); /* Chrome,Safari4+ */
		background-image: -webkit-linear-gradient(top, #666 0%,#333 100%); /* Chrome10+,Safari5.1+ */
		background-image: -o-linear-gradient(top, #666 0%,#333 100%); /* Opera 11.10+ */
		background-image: -ms-linear-gradient(top, #666 0%,#333 100%); /* IE10+ */
		background-image: linear-gradient(to bottom, #666 0%,#333 100%); /* W3C */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#666666', endColorstr='#333333',GradientType=0 ); /* IE6-9 */
		-webkit-box-shadow: inset 0 1px 0 0 #888, 0 0 1px 0 #444;
				box-shadow: inset 0 1px 0 0 #888, 0 0 1px 0 #444;
		color: #FFF;
		font-size: 12px;
		padding: 10px 30px;
		text-transform: uppercase;
		text-shadow: 1px 1px 0 #222;
		filter: dropshadow(color=#222, offx=1, offy=1);
		margin: 20px 0 0 115px;
		background-repeat: no-repeat;
		-webkit-transition: all .2s ease; -moz-transition: all .2s ease; -ms-transition: all .2s ease; -o-transition: all .2s ease; transition: all .2s ease;
	}
	form button:hover { background-position: 0 -10px; }
	</style>
</head>
<body>

	<form action="index.php" data-ajax="formOK">
		<div id="test">
			<label>
				<span>Nome</span>
				<input type="text" name="name" data-req="required{5}">
			</label>

			<label>
				<span>É 20</span>
				<input type="text" name="name" data-req="e20">
			</label>

			<label>
				<span>É 100</span>
				<input type="text" name="name" data-req="e100">
			</label>

			<label>
				<span>E-mail</span>
				<input type="text" name="mail" data-req="email">
			</label>

			<label>
				<span>Data</span>
				<input type="text" name="date" data-req="date{a/m/d}" data-mask="99/99/9999">
			</label>
	</div>
		<label>
			<span>Numero</span>
			<input type="text" name="number" data-req="number|range{100,200}" data-mask="999">
		</label>

		<label>
			<span>ER</span>
			<input type="text" name="regex" data-req="regex{\D}">
		</label>

		<label>
			<span>Senha</span>
			<input type="text" name="senha" data-req="required">
		</label>
		<label>
			<span>Senha2</span>
			<input type="text" name="senha2" data-req="required|matches{input[name='senha']}">
		</label>

		<label>
			<span>Categoria 1</span>
			<input type="checkbox" name="categoria" value="cat1" data-req="checked">
		</label>
		<label>
			<span>Categoria 2</span>
			<input type="checkbox" name="categoria" value="cat2">
		</label>
		<label>
			<span>Categoria 3</span>
			<input type="checkbox" name="categoria" value="cat3">
		</label>
		<label>
			<span>Categoria 4</span>
			<input type="checkbox" name="categoria" value="cat4">
		</label>

		<button type="submit">Enviar</button>

	</form>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="jquery.form.plugins.js"></script>
	<script>
		$(function(){

			$.addValidationRule('formOK',function(html) {
				console.log(html);
			});

			$.addValidationRule('e20', function($el){
				return $el.val() == '20';
			});

			$('form').formProc({ stopOnError : false, debug : true, autoMask : false });

			$.addValidationRule('e100', function($el){
				return $el.val() == '100';
			});
		})
	</script>
</body>
</html>