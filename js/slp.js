$(function(){
  var currentIndex = 0;
  var transcript = [
    {word: null, paragraph: 'start'},
    {word: 'A', ts: 0, te: 327, pos: 'determiner'},
    {word: 'women', ts: 328, te: 800, pos: 'noun'},
    {word: 'is', ts: 801, te: 1097, pos: 'verb'},
    {word: "standing", ts: 1098, te: 1400, pos: 'verb'},
    {word: "next", ts: 1401, te: 1839, pos: 'adjective'},
    {word: "to", ts: 1840, te: 1900, pos: ''},
    {word: "a", ts: 1901, te:2004, pos: 'determiner'},
    {word: "sink", ts: 2005, te: 2549, pos: 'noun'},
    {word: "that", ts: 2550, te: 2730, pos: 'determiner'},
    {word: "is", ts: 2731, te: 2890, pos: 'verb'},
    {word: "overflowing", ts: 2891, te: 3580, pos: 'verb'},
    {word: "with", ts: 3581, te: 3900, pos: 'preposition'},
    {word: "water.", ts: 3901, te: 5499, pos: 'noun'},
    {word: null, paragraph: 'end'},{word: null, paragraph: 'start'},
    {word:"A", ts: 5500, te: 5880, pos: 'noun'},
    {word:"uh", ts: 5981 , te: 6400, pos: null},
    {word:"boy", ts: 6401, te: 6670, pos: 'noun'},
    {word:"is", ts: 6671, te: 6870, pos: 'verb'},
    {word:"reaching", ts: 6871, te: 7200,  pos: 'verb'},
    {word:"for", ts: 7201, te: 7440, pos: 'preposition'},
    {word:"a", ts: 7441, te: 7520,  pos: 'determiner'},
    {word:"cookie.", ts: 7521, te: 8769, pos: 'noun'},
    {word:"The", ts: 8770, te: 8840, pos: 'determiner'},
    {word:"boy", ts: 8841, te: 9170, pos: 'noun'},
    {word:"is", ts: 9171, te: 9340, pos: 'verb'},
    {word:"handing", ts: 9341, te: 9700, pos: 'verb'},
    {word:"a", ts: 9701, te: 9790, pos: 'determiner'},
    {word:"cookie", ts: 9791, te: 10180, pos: 'noun'},
    {word:"to", ts: 10190, te: 10330, pos: null},
    {word:"his", ts: 10340, te: 1050, pos: 'pronoun'},
    {word:"sister", ts: 11010, te: 11000, pos: 'noun'},
    {word:"she", ts: 11340, te: 11530, pos: 'pronoun'},
    {word:"is", ts: 11540, te: 11780, pos: 'verb'},
    {word:"telling", ts:11781, te: 12120, pos: 'verb'},
    {word:"him", ts: 12121, te:12280, pos: 'pronoun'},
    {word:"to", ts: 12281, te: 12360, pos: null},
    {word:"keep", ts:12361 , te: 12690, pos: 'verb'},
    {word:"it", ts: 12691, te: 12780, pos: 'pronoun'},
    {word:"a", ts: 12781, te:12840, pos: 'determiner'},
    {word:"secret.", ts:12841, te: 13340, pos: 'noun'},
    {word: null, paragraph: 'end'}
  ];
  var $marker = $('<div id="marker">');
  var wavesurfer;
  var timer;

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
    timer = setTimeout(function(){
      // if(currentIndex == 3) return
      play();
    }, wordDuration);
  }


  function startWaveForm(){
    wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#337ab7',
      progressColor: 'purple',
      height: 80
    });

    wavesurfer.load('./cookie-theft-short.mp3');
  }

  function playAudioAndWaveForm(){
    wavesurfer.play();
    play();
  }

  function stop(){
    currentIndex = null;
    wavesurfer.stop();
    clearTimeout(timer);
  }

  startWaveForm();
  $('#play').click(playAudioAndWaveForm);
  $('#stop').click(stop);

  buildTranscriptDOM($('#transcript'), transcript);



});
