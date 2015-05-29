$(document).ready(function() {
  var scores = [];

  var Score = function (name, points) {
    this.name = name;
    this.points = points;
  };

  $("#add").click(function(){
    var input = $("input").val().split(",");
    var name = input[0];
    var points = parseInt(input[1]);

    var newScore = new Score(name, points);
    scores.push(newScore);

    var sorted = _(scores).sortBy("points").reverse();

    $("#rankings").empty();
    $("input").val("");

    _(sorted).forEach(function(n) {
      $("#rankings").append("<li>" + n.name + ", " + n.points + " pts." + "</li>");
    });
  });
});
