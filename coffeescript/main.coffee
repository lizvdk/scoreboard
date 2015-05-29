class Score
  constructor: (@name, @points, @rank = null) ->

findExisting = (scores, name) ->
  for score in scores
    if score.name == name
      return score

compare = (a,b) ->
  if a.points < b.points
    return 1
  if a.points > b.points
    return -1
  return 0

determineRanks = (scores) ->
  scores[0].rank = 1
  if scores.length > 1
    i = 1
    while i < scores.length
      if scores[i].points == scores[i - 1].points
        scores[i].rank = scores[i - 1].rank
      else
        scores[i].rank = scores[i - 1].rank + 1
      i++

displayScores = (scores) ->
  $("#rankings").slideUp(300, "swing", ->
    $("#rankings").empty()
    for score in scores
      $("#rankings").append("<li><b>#{score.rank}.<b> #{score.name}, #{score.points} pts.</li>");
    $("#rankings").slideDown(400, "swing")
    $("#clear").removeClass("disabled")
  )

$ ->
  scores = []
  $("#add").click ->
    input = $("input").val().split(",")
    name = input[0]
    points = parseInt(input[1], 10)

    if findExisting(scores, name)
      player = findExisting(scores, name)
      player.points += points
    else
      newScore = new Score(name, points)
      scores.push(newScore);

    $("input").val("")
    scores.sort(compare)
    determineRanks(scores)
    displayScores(scores)

  $("#clear").click ->
    $("#rankings").slideUp(300, "swing", ->
      scores.length = 0
      $("#rankings").empty()
      $("#{clear}").addClass("disabled")
    )
