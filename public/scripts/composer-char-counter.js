
let xTriggered = 0;
$(document).ready(function () {
  $("#textInput").on("keyup", function () {
    // Calculate chars left
    let textLength = $(this).val().length;
    let charsLeft = 140 - textLength;

    // Set new counter value
    let counterElem = $("#counter");
    counterElem.text(charsLeft);

    // Change color to red if less than 0, black otherwise
    if (charsLeft < 0) {
      counterElem.removeClass('counterBlack');
      counterElem.addClass('counterRed');
    } else {
      counterElem.removeClass('counterRed');
      counterElem.addClass('counterBlack');
    }
  });
});
