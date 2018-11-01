

// Begin jQuery onReady code:
$(function() {

  /**
   * What is happening in the next lines:
   * We start by selecting the HTML element with ID 'searchSign' (it is the input text field)
   * Then we add a listener to the input text field, we are setting it to listen to the 'keydown' event
   * The callback function is setup to receive the event once it's captured by the listener
   *    If the key pressed is 'Enter' then we make the ajax call to the API
   *    If the ajax call is successful, insert the horoscope data to our HTML element.
   *    If not console.log the error.
  */

  $("#searchSign").on("keydown", function(event) {
    if (event.key === 'Enter') {
      // Calling the ajax method in jQuery and passing an object with the config options needed
      $.ajax({
        cache: false,
        async: true,
        crossDomain: true,
        type: "GET",
        url: `http://horoscope-lhl.herokuapp.com/horoscopes/${event.target.value}`,
        dataType: "JSON"
      })
      .done(function(response) {
        // Check to make sure the response has valid data.
        // Response.horoscope might be empty when the sign name is not valid.
        // Try typing an invalid zodiac sign in the input text, console.log the response to see what happens.
        if (response.horoscope !== '') {

          // Insert HTML markup inside the horoscopeContainer with the response content
          $("#horoscopeContainer").html(`
            <article>
              <span>${response.sign}</span>
              <p>${response.horoscope}</p>
            </article>
          `);
          // Clean up the content of the input text box
          $("#searchSign")[0].value="";

        } else {
          // when the response contains no data
          $("#horoscopeContainer").html(`
            <article>
              <span>The API did not return data for ${event.target.value}</span>
            </article>
          `);
          // Clean up the content of the input text box
          $("#searchSign")[0].value="";
        }
      })
      .fail(function(error) {
        console.log(error);
      })
    }
  });

})