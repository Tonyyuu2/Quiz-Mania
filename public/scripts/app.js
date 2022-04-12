// Client facing scripts here
$(function() {
  $('#share').click(function(event) {
    event.preventDefault();
    const url = "http://localhost:8080" + $(this).attr("href");
    console.log(url);

  });
});