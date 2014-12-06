	<footer>
		<h4>Copyright © 2014 UIBrush.</h4>
	</footer>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.js"></script>
	<script src="js/script.js"></script>
</body>
</html>
<?
$pageContents = ob_get_contents ();
ob_end_clean ();

echo str_replace ('%TITLE%', $pageTitle, $pageContents);
?>