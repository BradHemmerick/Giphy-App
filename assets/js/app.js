//var for the url with the search param
var url = "https://api.giphy.com/v1/gifs/search?q="
//var for my api and to limit the gifs returned to 10
var apiKey = "&api_key=QojwKSxliVDmh43hz6o74hPDnQxo31oW&limit=10"
//an array of buttons that will already be made
var preGifs= [
    "spider-man",
    "music",
    "how i met your mother",
    "family guy",
    "funny dog",
    "deadpool"
]
//function to make buttons
function makeButtons() {
    //emptys the forButtons div to prevent the multiple repeats of a button when the user searches
    $("#forButtons").empty();
    //for loop to run through the array above
    for (var i = 0; i < preGifs.length; i++) {
        //sets up a var called button that makes a button
        var button = $("<button>");
        //gives the bata a attribute of data-gif
        button.attr("data-gif", preGifs[i])
        //makes a button for every index of of preGifs
        button.append(preGifs[i])
        //adds the button to the forButtons div
        button.appendTo("#forButtons");
    }
}

$("#findGifs").on("click", function(event){
    //prevents the default behavior of clicking button
    event.preventDefault();
//    //grab user input and make put it into a var
//     var searchTerm = $("#userInput").val();
//     // push it to our array
//     preGifs.push(searchTerm);
    makeButtons();

});

makeButtons();

//on click of button a function will run
$("button").on("click", function(showGif) {
    //makes a  var called gif that gives
    var gif = $(this).attr("data-gif");
    //sets up a var called quereyURL so i dont need to repeatedly call all the vars in it
    var queryURL = url + gif + apiKey
    //check and see if it is getting the right url
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response){
          //make a var so i wont need to type out resonse.data
      var results = response.data;

      //for loop to runthrough response.data
      for(var i = 0; i < results.length; i++) {
        //make a var to create a div with a class of gifHere
          var gifDiv = $("<div", {class:"gifHere"})
        //make a var to get the rating for the gif
          var rate = results[i].rating;
          // make a p tag to put the rating in and put the rating inside
          var holdRate = $("<p>").text("Rating: " + rate);
          //var to create an img tag
          var gifPic = $("<img>");
          //gives the image a source to get the image
          gifPic.attr("src", results[i].images.fixed_height.url);
          //make sure it works
          console.log(gifPic)
          console.log(rate)
          gifDiv.prepend(gifPic);
          $("#gifsHome").append(gifDiv);
      }
    });
});

// showGif();

// function showGif() {
//     gifDiv.prepend(gifPic);
//     $("#gifsHome").append(gifDiv);
// }
