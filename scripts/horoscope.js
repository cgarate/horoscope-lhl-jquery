// See the bottom of the code for activities to practice after reviewing this code.

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
    // The listener is active now, we are assuming that the user will press 'Enter' when they are done
    // typing the zodiac sign name so we set an If block to act when the Enter key is pressed.
    if (event.key === 'Enter') {
      // Calling the ajax method in jQuery and passing an object with the config options needed
      $.ajax({
        cache: false,
        async: true,
        crossDomain: true,
        type: "GET",
        // Retrieve the current value inside the input text box and use it in the URL to call the API
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
          // Clear the content of the input text box
          $("#searchSign")[0].value="";

        } else {
          // when the response contains no data
          $("#horoscopeContainer").html(`
            <article>
              <span>The API did not return data for ${event.target.value}</span>
            </article>
          `);
          // Clear the content of the input text box
          $("#searchSign")[0].value="";
        }
      })
      .fail(function(error) {
        console.log(error);
      })
    }
  });

})

/**
 * First review the code above and its comments, try to follow and understand each of the steps in the process.
 * After reviewing the code you can take it as a starting point and complete the following challenges to put
 * in practice the concepts learned:
 *    1. Validate that the value typed by the user is a valid zodiac sign name before calling the API
 *      - Where do you have to add this condition?
 *      - What will you use to have a list of valid zodiac signs you can compare against?
 *    2. Switch to using a select dropdown instead of the input text box:
 *      - What event do you have to listen to in a select dropdown?
 *      - Are there any advantages of hardcoding the zodiac signs in a dropdown compared
 *        to letting the users type whatever they want?
 *        Hint: did you have to validate the data coming from the dropdown?
 *    3. Style the HTML
 */