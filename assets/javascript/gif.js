// Variables

var baseURL = "http://api.giphy.com/v1/gifs/search?";
var key = "dc6zaTOxFJmzC";
var inputVal = "";
var topics = ["Dog", "Cat", "Duck", "Goose", "Hedgehog", "Giraffe", "Hippopotamus", "Parrot", "Deer"];
var queryURL = "";
var imgURL = "";
var rating = "";

function createButtons() {
	
	for (var i=0; i<topics.length; i++) {
		var newB = $("<button>");
		newB.addClass("allButtons");
		newB.attr("data", topics[i]);
		newB.text(topics[i]);
		$("#buttons").append(newB).append(" ").append(" ");
	}
}

createButtons();

$("#submit").on('click', function(event) {
	// prevent form from trying to submit/refresh the page
    event.preventDefault();

	inputVal = $("#newTopic").val().trim();

	var newB = $("<button>");
	newB.addClass("allButtons");
	newB.attr("data", inputVal);
	newB.text(inputVal);
	$("#buttons").append(newB).append(" ");

});

$(document).on("click", ".allButtons", function(event) {
	// prevent form from trying to submit/refresh the page
    event.preventDefault();

    var topic = $(this).attr("data");
    queryURL = baseURL + "q=" + topic +"&rating=pg&limit=10&api_key=" + key;
    console.log(queryURL);
    $("#gifDisplay").empty();

    $.ajax({
	    url: queryURL,
	    method: "GET"
  	}).done(function(response) {
  		console.log(response);

  		var imgElem;
  		for (var i=0; i<10; i++) {
  			imgURL = response.data[i].images.fixed_width_still.url;
  			gifURL = response.data[i].images.fixed_width.url;
  			rating = response.data[i].rating;
  			// display rating
  			var txt = $("<p>");
  			txt.addClass("rating");
  			txt.text("Rating = "+ rating);
  			$("#gifDisplay").append(txt);
  			
  			// display image
  			imgElem = $("<img>");
  			imgElem.attr("src", imgURL);
  			imgElem.attr("data-still", imgURL);
  			imgElem.attr("data-animate", gifURL);
  			imgElem.attr("data-state", "still");
  			imgElem.addClass("newImg");
  			$("#gifDisplay").append(imgElem);
  		}


  	});
  });

$(document).on("click", ".newImg", function(event) {
	// prevent form from trying to submit/refresh the page
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state === "still") {
    	$(this).attr("src", $(this).attr("data-animate"));
    	$(this).attr("data-state", "animate");
    } else {
    	$(this).attr("src", $(this).attr("data-still"));
    	$(this).attr("data-state", "still");
    }


    });



    