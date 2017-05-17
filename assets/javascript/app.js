
// ********* GOLOBAL VARIABLES **********************************************//

// Before you can make any part of our site work, you need to create an array of strings, 
// each one related to a topic that interests you. Save it to a variable called `topics`. 
var topics = ["Colbert", "Spiderman", "Superman", "Wonderwoman", "Batman", 
				"Ironman", "Hulk", "Wolverine", "Thor" ];


window.onload = function() {

	// ********* PAGE SETUP *****************************************************//
	createButtons();

	// ********* EVENT LISTENERs ************************************************//

	// When the user clicks on a button, the page should grab 10 static, non-animated 
	// gif images from the GIPHY API and place them on the page. 
	$(".heros").on("click", function() {
	
	  // Name of button created
	  var searchTerm = $(this).attr("data-hero");
	  
	  // Set a query string to find dance styles on the giphy api
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&tag=&limit=100";
      
      // Complete an ajax call to GET super hero images
      $.ajax({
         url: queryURL,
         method: "GET"
       })

      // Promise gets instantiated.  After the call has been made, create an image and add it to 
      .done(function(response) {

        //  store the image url in a variable from the ajax response
        // Choose a random giphy from the selected
        var i = Math.floor(Math.random() * 101);  
        var imageUrl = response.data[i].images.original.url;
        console.log(response.data[i]);
        var static_imageUrl = response.data[i].images.original_still.url;


        // store the rating in a variable
        // Under every gif, display its rating (PG, G, so on). 
        var rating = response.data[i].rating;

        // Create the figure, image, and figcaption html
        var heroFigure = $("<figure>");
        var heroImage = $("<img>");
        var heroCaption = $("<figcaption>");

        // Include the image attributes source and alt
        heroImage.attr("src", static_imageUrl);
        heroImage.attr("data-state", 'animate');
        heroImage.attr("data-animate", imageUrl);
        heroImage.attr("data-still", static_imageUrl);
        heroImage.attr("alt", "hero image");
        heroImage.attr("class", "heroImages");

        // Write the rating to the figcaption
        heroCaption.html("Rating: " + rating);

        // Append the caption to the image and the image to the figure
        heroFigure.append(heroImage);
        heroFigure.append(heroCaption);


        // Prepend the images to the previous images
        $("#images").prepend(heroFigure);


      }); // end of ajax call with done function

	}); // End of button click 

	// // When the user clicks on the clear button, the gifs disappear
	$("#clear").on("click", function() {
		$("#images").empty();
	}); // End of clear button click


// When the user clicks one of the still GIPHY images, the gif should animate. If 
// the user clicks the gif again, it should stop playing.
	$("#images").delegate(".heroImages", "click", function() {
		console.log("yes!");
	}); // End of giphy images click


// ********* FUNCTIONS ******************************************************//

 	// Your app should take the topics in this array and create buttons in your HTML.
 	function createButtons() {
 		for(var i = 0; i < topics.length; i++) {

 			// create button label
 			var button = $('<button>').html(topics[i]);
 			button.attr('class', 'heros');

 			button.attr('data-hero', topics[i]);
 			$('#buttons').append(button);
 		}

 	}; // end of createButtons function

 // Add a form to your page takes the value from a user input box and adds it into 
 // your `topics` array. Then make a function call that takes each topic in the array 
 // remakes the buttons on the page.


}; // end of window load