$(document).ready(function() {

  function findExisting(name) {
    var found = false;
    for (var i = 0; i < scores.length; i++) {
      if(scores[i].name == name) {
        found = true;
        return scores[i];
      }
    }
  }

  function compare(a,b) {
    if (a.points < b.points)
      return 1;
    if (a.points > b.points)
      return -1;
    return 0;
  }

  var scores = [];

  var Score = function (name, points) {
    this.name = name;
    this.points = points;
    this.rank = null;
  };

  $("#add").click(function(){
    var input = $("input").val().split(",");
    var name = input[0];
    var points = parseInt(input[1]);

    if (findExisting(name)) {
      var player = findExisting(name);
      player.points += points;
    } else {
      var newScore = new Score(name, points);
      scores.push(newScore);
    }

    $("#rankings").empty();
    $("input").val("");

    scores.sort(compare);

    scores[0].rank = 1;
    if (scores.length > 1 ) {
      for (var i = 1; i < scores.length; i++) {
        if (scores[i].points === scores[i-1].points) {
          scores[i].rank = scores[i-1].rank;
        } else {
          scores[i].rank = scores[i-1].rank + 1;
        }
      }
    }

    _(scores).forEach(function(n) {
      $("#rankings").append("<li>" + "<b>"+ n.rank + ". " + "</b>" + n.name + ", " + n.points + " pts." + "</li>");
    });
  });

  $("#clear").click(function(){
    scores.length = 0;
    $("#rankings").empty();
  });
});
