<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Orientador educatiu</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
		<link rel="stylesheet" href="css/style.css"/>
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
		<script type="text/javascript" src="js/bsn.AutoSuggest_c_2.0.js"></script>
		<link rel="stylesheet" href="css/autosuggest_inquisitor.css" type="text/css" media="screen" charset="utf-8" />
	</head>
	<body>
		<div class="container">
			<h1 class="text-center">Orientador educatiu</h1><br><br>
			<div class="row">
				<div class="col-md-6 text-center">
					<h2>Ja sé què estudiar</h2>
					<div class="ui-widget">
						<form method="get" action="">
							<input style="width: 200px" type="text" id="testinput" value="" /> 
							<input type="submit" value="submit" />
						</form>
					</div>
				</div>
				<div class="col-md-6 text-center">
					<h2>No sé què estudiar</h2>
					<button>Anar al qüestionari</button>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			var options = {
				script:"test.php?json=true&",
				varname:"input",
				json:true,
				callback: function (obj) { document.getElementById('testid').value = obj.id; }
			};
			var as_json = new AutoSuggest('testinput', options);
		</script>
	</body>
</html>