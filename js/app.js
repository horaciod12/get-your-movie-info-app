$('#name').focus();

$('form').on('submit', function(event){

	event.preventDefault();

  var name = $("#name").val();
  $('#my-form').trigger('reset');
  $('#name').focus();
  
	var apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=de4143499cc37f504e64762ee5a34844&query=' + name;

 
  $.ajax({

    url: apiUrl,
    method: "GET",

  })

  .done(function(response) {
    
    if(response.total_results == 0) {

      $('.cont').remove();
            
      var divRow = '<div class="row cont"></div>';
      var error1 = '<h2 class="center">Sorry, no results for ' + '<em>' + name + '</em>' + '</h2>';

      $('.container').append(divRow);
      $('.cont').append(error1);
    
    } else {
      
      $('.cont').remove();

      for (var i = 0; i < response.results.length; i++) {
      
          var imgPath = response.results[i].poster_path;
          var title = response.results[i].original_title;
          var date = response.results[i].release_date;
          var description = response.results[i].overview;

          $('.container').append('<div class="row cont"><div class="media"><div class="media-left"><img src="https://image.tmdb.org/t/p/w500' + imgPath + '"' + '></div><div class="media-body"><h2><em>Original Title: </em>' + title + '</h2><p><em>Release Date: </em>' + date + '</p><p>' + description + '</p></div></div></div>');

      }

    }

  })

  .fail(function(response) {

    $('.cont').remove();

    var divRow = '<div class="row cont"></div>';
    var error = '<h2 class="center">Enter a word to search on</h2>';
    
    $('.container').append(divRow);
    $('.cont').append(error);

  });

})