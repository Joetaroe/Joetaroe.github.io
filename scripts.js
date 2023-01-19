$(function(){
	
	$("#tabs").tabs();
	$("#tabs").show(); // to show after styles.css #tabs {display: none;} to avoid flickering. 

	//show the anchors (#) in the url on click
	$("#tabs nav ul li a" ).on('click', function(e){
		window.location.hash = $(this).attr('href'); 
	});

	//random text generator function 
	function randomText(length) {
		var result           = ''; //need this to use += in the "for"
		var characters       = 'abcdefghijklmnopqrstuvwxyz .'; //all characters used
		var charactersLength = characters.length; //the amount of characters typed in the form
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result; //returns the random text.
	}

	//on hitting enter after filling in the <input> element with ID "#characterCount" this is executed
	$("#characterCount").keypress(function(e){
		if (e.which == 13) {
			$("#generated").empty(); //clears pervious creations
			$("#generated").append(randomText($("#characterCount").val())); //adds the randomText to the HTML element with ID "generated"
			$("#part2").show();
			return false;
		}
	});
	
	//on hitting enter after filling in the <input> element with ID "#matchWords" this is executed
	//this is reworked from the probability formula in py script
	$("#matchWords").keypress(function(e){
		if (e.which == 13) {
			var word = $("#matchWords").val()
			var length_word = $("#matchWords").val().length;
			var keys = 28;
			toChance = (28**length_word);
			noChance = 1-(1/toChance);
			$("#chancesAre").html("Chances are " + (1/toChance).toFixed(30) + " (1 in " + toChance.toFixed(0) + ") <b>" + word + "</b> is typed by one monkey when starting to type.");
			$("#part1").show();
		}
	});
	
	//on hitting enter after filling in the <input> element with ID "#matchWords2" this is executed
	$("#matchWords2").keypress(function(e){
		if (e.which == 13) {
			var search_string = $("#generated").html();
			var search_words = $("#matchWords2").val().toLowerCase();
			//this regular expression makes sure to find all.
			search_words = search_words.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*"); //sanitize search word
			var pattern = new RegExp("("+search_words+")", "gi");
			
			search_string = search_string.replace(pattern, "<MARK>$1</MARK>");
			occurences_string = (search_string.match(pattern) || []).length;
			search_string = search_string.replace(/(<MARK>[^<>]*)((<[^>]+>)+)([^<>]*<\/MARK>)/,"$1</mark>$2<mark>$4");
			
			$("#occurences").html(occurences_string + " occurences marked in yellow."); //shows the number of found search words
			$("#generated").html(search_string); //shows the words found highlighted
		}

	});	
	



});