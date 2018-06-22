
var mission = 0;
$("#user-text-mission" ).on( "click", function() {
	if (mission == 0){mission = 1}else{mission = 0}
});

function saveUserText(){
	var author = $("#user-text-author").val();
	var nwords = $("#user-text-nwords").val();
	var link = $("#user-text-link").val();
	link = encodeURIComponent(link);
	var comments = $("#user-text-comments").val();

	// console.log(author+'\n');
	// console.log(nwords+'\n');
	// console.log(link+'\n');
	// console.log(mission+'\n');
	// console.log(comments+'\n');

	$.ajax({
		type	: 'post',
		url		: "php/text.php",
		data	: "author="+author+"&nwords="+nwords+"&link="+link+"&comments="+comments+"&mission="+mission,
		success	: function(results){
			results = JSON.parse(results);
			//console.log(results);
			if (results == 1){
				$('#done').fadeIn();
				setTimeout(function(){ $('#done').fadeOut(); }, 2000);
			}
		}
	});
	return false;
}
