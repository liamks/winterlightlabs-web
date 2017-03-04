$(function(){
  var currentIndex = 0;
  var transcript = [
    {word: null, paragraph: 'start'},
    {word: 'A', ts: 0, te: 327},
    {word: 'women', ts: 328, te: 800},
    {word: 'is', ts: 801, te: 1097},
    {word: "standing", ts: 1098, te: 1400},
    {word: "next", ts: 1401, te: 1646},
    {word: "to"},
    {word: "a"},
    {word: "sink"},
    {word: "that"},
    {word: "is"},
    {word: "overflowing"},
    {word: "with"},
    {word: "water."},
    {word: null, paragraph: 'end'},{word: null, paragraph: 'start'},
    {word:"A"},
    {word:"uh"},
    {word:"boy"},
    {word:"is"},
    {word:"reaching"},
    {word:"for"},
    {word:"a"},
    {word:"cookie."},
    {word:"The"},
    {word:"boy"},
    {word:"is"},
    {word:"handing"},
    {word:"a"},
    {word:"cookie"},
    {word:"to"},
    {word:"his"},
    {word:"sister"},
    {word:"she"},
    {word:"is"},
    {word:"telling"},
    {word:"him"},
    {word:"to"},
    {word:"keep"},
    {word:"it"},
    {word:"a"},
    {word:"secret."},
    {word: null, paragraph: 'end'}, {word: null, paragraph: 'start'},
    {word:"The"},
    {word:"mom"},
    {word:"mother"},
    {word:"is"},
    {word:"looking"},
    {word:"out"},
    {word:"the"},
    {word:"window"},
    {word:"into"},
    {word:"the"},
    {word:"yard"},
    {word:"the"},
    {word:"backyard."},
    {word: null, paragraph: 'end'}
  ];
  var $marker = $('<div id="marker">');

  function buildTranscriptDOM($transcript, t){
    var $paragraph = null;
    t.forEach(function(w){

      if(w.word == null){
        if(w.paragraph == 'start'){
          $paragraph = $('<p>');
        }else{
          $transcript.append($paragraph);
        }
      }
      if(w.word){
        w.$ = $('<span class="word">').text(w.word)
        $paragraph.append(w.$);
        $paragraph.append(' ');
      }
    });
  }

  function play(){

    var currentWord = transcript[currentIndex];
    if(!currentWord){
      currentIndex = 0;
      return;
    }
    currentIndex += 1;
    if(currentWord.word == null){
      return play();
    }
    $marker.width(currentWord.$.width());
    $marker.height(currentWord.$.height());
    var wordDuration = currentWord.te - currentWord.ts;
    currentWord.$.append($marker);
    setTimeout(function(){
      // if(currentIndex == 3) return
      play();
    }, wordDuration);
  }

  $('#play').click(play);

  buildTranscriptDOM($('#transcript'), transcript);



});
