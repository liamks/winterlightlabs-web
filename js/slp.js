$(function(){
  var currentIndex = 0;
  var transcript = [
    {word: null, paragraph: 'start'},
    {word: 'A', ts: 0, te: 327},
    {word: 'women', ts: 328, te: 800},
    {word: 'is', ts: 801, te: 1097},
    {word: "standing", ts: 1098, te: 1400},
    {word: "next", ts: 1401, te: 1829},
    {word: "to", ts: 1840, te: 1900},
    {word: "a", ts: 1901, te:2004},
    {word: "sink", ts: 2005, te: 2480},
    {word: "that", ts: 2550, te: 2730},
    {word: "is", ts: 2731, te: 2890},
    {word: "overflowing", ts: 2891, te: 3580},
    {word: "with", ts: 3581, te: 3900},
    {word: "water.", ts: 3901, te: 4390},
    {word: null, paragraph: 'end'},{word: null, paragraph: 'start'},
    {word:"A", ts: 5500, te: 5880},
    {word:"uh", ts: 5980 , te: 6400},
    {word:"boy", ts: 6401, te: 6670},
    {word:"is", ts: 6671, te: 6870},
    {word:"reaching", ts: 6871, te: 7200},
    {word:"for", ts: , te:},
    {word:"a", ts: , te:},
    {word:"cookie.", ts: , te:},
    {word:"The", ts: , te:},
    {word:"boy", ts: , te:},
    {word:"is"},
    {word:"handing", ts: , te:},
    {word:"a", ts: , te:},
    {word:"cookie", ts: , te:},
    {word:"to", ts: , te:},
    {word:"his", ts: , te:},
    {word:"sister", ts: , te:},
    {word:"she", ts: , te:},
    {word:"is", ts: , te:},
    {word:"telling", ts: , te:},
    {word:"him", ts: , te:},
    {word:"to", ts: , te:},
    {word:"keep", ts: , te:},
    {word:"it", ts: , te:},
    {word:"a", ts: , te:},
    {word:"secret.", ts: , te:},
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
