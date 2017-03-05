$(function(){
  var currentIndex = 0;
  var transcript = [
    {word: null, paragraph: 'start'},
    {word: 'A', ts: 0, te: 327},
    {word: 'women', ts: 328, te: 800},
    {word: 'is', ts: 801, te: 1097},
    {word: "standing", ts: 1098, te: 1400},
    {word: "next", ts: 1401, te: 1839},
    {word: "to", ts: 1840, te: 1900},
    {word: "a", ts: 1901, te:2004},
    {word: "sink", ts: 2005, te: 2549},
    {word: "that", ts: 2550, te: 2730},
    {word: "is", ts: 2731, te: 2890},
    {word: "overflowing", ts: 2891, te: 3580},
    {word: "with", ts: 3581, te: 3900},
    {word: "water.", ts: 3901, te: 5499},
    {word: null, paragraph: 'end'},{word: null, paragraph: 'start'},
    {word:"A", ts: 5500, te: 5880},
    {word:"uh", ts: 5981 , te: 6400},
    {word:"boy", ts: 6401, te: 6670},
    {word:"is", ts: 6671, te: 6870},
    {word:"reaching", ts: 6871, te: 7200},
    {word:"for", ts: 7201, te: 7440},
    {word:"a", ts: 7441, te: 7520},
    {word:"cookie.", ts: 7521, te: 8769},
    {word:"The", ts: 8770, te: 8840},
    {word:"boy", ts: 8841, te: 9170},
    {word:"is", ts: 9171, te: 9340},
    {word:"handing", ts: 9341, te: 9700},
    {word:"a", ts: 9701, te: 9790},
    {word:"cookie", ts: 9791, te: 10180},
    {word:"to", ts: 10190, te: 10330},
    {word:"his", ts: 10340, te: 1050},
    {word:"sister", ts: 11010, te: 11000},
    {word:"she", ts: 11340, te: 11530},
    {word:"is", ts: 11540, te: 11780},
    {word:"telling", ts:11781, te: 12120},
    {word:"him", ts: 12121, te:12280},
    {word:"to", ts: 12281, te: 12360},
    {word:"keep", ts:12361 , te: 12690},
    {word:"it", ts: 12691, te: 12780},
    {word:"a", ts: 12781, te:12840},
    {word:"secret.", ts:12841 , te: 13340},
    {word: null, paragraph: 'end'}
  ];
  var $marker = $('<div id="marker">');
  var wavesurfer;

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


  function startWaveForm(){
    wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
      height: 80
    });

    wavesurfer.load('cookie-theft.mp3');
  }

  function playAudioAndWaveForm(){
    wavesurfer.play();
    play();
  }

  startWaveForm();
  $('#play').click(playAudioAndWaveForm);

  buildTranscriptDOM($('#transcript'), transcript);



});
