const numDivs = 36;
const maxHits = 10;
let divSelector;

let hits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  divSelector = randomDivId();
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");
  $(divSelector).addClass("target");

  // TODO: помечать target текущим номером
  $(".target").text(hits);

  console.log('divSelector = ' + divSelector);

  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) { 
    firstHitTime = getTimeStamp(); 
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-field").hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".target").text("");
    // $(".target").removeClass("target");
    // $(".target").addClass("game-field");
    console.log('divSelector = ' + divSelector);
    round();
  }
  else {
    // $(".target").text("");
    $(event.target).addClass('miss');
    // round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $(".target").text("");
  round();

  $(".game-field").click(handleClick);
  $("#button-begin").click(function() {
    location.reload();
  });
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
