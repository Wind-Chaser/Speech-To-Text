function initPage ()
{
  var _mic = $('#microphone'); var _stop = $("#stop");
    _mic.addClass("mic_enabled");
    _stop.addClass("mic_disabled");
  _mic.on("click", function ()
    {
      var _className = this.className;
      if(this.className == "mic_enabled")
      {
        _mic.addClass("mic_disabled");
        _mic.removeClass("mic_enabled");
        _stop.addClass("mic_enabled");
        _stop.removeClass("mic_disabled");
        $.when($.get('/api/speech-to-text/token')).done(
          function (token) {
            stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
               token: token,
               outputElement: '#speech'
             });
            stream.on('error', function(err) { console.log(err); });
          });
        }
      });

  _stop.on("click",  function() {
    console.log("Stopping text-to-speech service...");
    if (!((typeof(stream) == "undefined") || (stream == null))) {stream.stop(); }
    _mic.addClass("mic_enabled");
    _mic.removeClass("mic_disabled");
    _stop.addClass("mic_disabled");
    _stop.removeClass("mic_enabled");
  });
 }
  var request = new XMLHttpRequest();
  request.open('GET','/user');
  request.send();
  request.addEventListener('load',function (){
        if(request.status===200)
        {
              var data=JSON.parse(request.responseText);
            document.getElementById("pic").setAttribute("src",data.profilepic);
            document.getElementById("name").innerHTML=data.name;
        }
  });
