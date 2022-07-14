// ====================
//      TIMER
// ====================

//Call this function to start a timer that lasts X many seconds, where X is the argument passed through the function
export function countdown(timeAllowance) {
  console.log('Timer on stand-by');
  var timeInterval = setInterval(function () {
      if (timeAllowance > -1) {
          timerUI.innerHTML = timeAllowance;
          timeAllowance--;
    } else {
      timerUI.innerHTML = ' Done! ';
      clearInterval(timeInterval);
      // displayMessage();  //commented out so the alert doesnt interupt me trying stuff out
    }
  }, 1000);
}

//a bs function to make sure timer is functional
function displayMessage() {
    console.log('timer is done');
}




      //BASIC TIMER CODE; I am keeping this here for easy access to notes, essentially
      // function countdown() {
      
      //     // var timeLeft = 5; Commented out because we're using 'timeAllowance' which I've abstracted into being part of the 'quiz object'
      //     var timeInterval = setInterval(function () {
      
      //         if (quizAsset.timeAllowance > 1) {
      //             timerUI.innerHTML = quizAsset.timeAllowance;
      //             quizAsset.timeAllowance--;
      //       } else {
      //         // Once `timeLeft` gets to 0, set `timerUI` to DONE mssg
      //         timerUI.innerHTML = ' Done! ';
      //         // Use `clearInterval()` to stop the timer
      //         clearInterval(timeInterval);
      //         // Call the `displayMessage()` function
      //         displayMessage();
      //       }
      //     }, 1000); // Makes `setInterval()` method to call a function to be executed every 1000 milliseconds. Basically determines how long the app considers a second.
      //   }