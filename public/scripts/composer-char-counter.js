$(document).ready(function () {
  $("#tweet-text").on("keydown", function (e) {
    //Get current count of the string in the text area
    const currCount = $(this).val().length;
    //Get the value of the couter
    const counter = $(this)
      .parent()
      .parent()
      .children(".tweet-additions")
      .children(".counter");
    const count = 140 - currCount;
    //Update the counter
    counter.text(count);
    if (count < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }
  });
});
