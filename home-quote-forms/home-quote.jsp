<link type="text/css" rel="stylesheet" href="widgets/home-quote-forms/home-quote.css"/>
<script>
	var initialData;
	<% 
		String calcRef = request.getParameter("ref");
		if(calcRef!=null && !calcRef.equals("{ref}")){
			%>
			initialData = "<quote><calcref><%=calcRef%></calcref></quote>";
			<%
		}
	%>
	rf.loadFlow('widgets/home-quote-forms/home-quote-flow.js', $('.rhinoforms-quote-formContainer'), initialData)
	rf.onEveryFormLoad(function(){
		$('form select').change( function(){
			$(this).addClass('changed');
		});
		$("div.field").first().addClass("on");

		$('form input, form select').focus(function() {
			$("div.field").removeClass("on");
			$(this).closest("div.field").addClass("on")
		});

		$('form input[type="radio"], form input[type="checkbox"]').change(function() {
			$("div.field").removeClass("on");
			$(this).closest("div.field").addClass("on")
		});

		$("input[type='radio'], input[type='text'], input[type='checkbox'], select").change( function() {
			$(this).siblings('.invalid-message').remove();
		});
	});
</script>
<script src="{widgetPath}/../quote-forms-common/js/utils.js" ></script>
<script src="{widgetPath}/js/custom-types.js"></script>
<div class="rhinoforms-quote-formContainer"/>