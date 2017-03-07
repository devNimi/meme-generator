function textChangeListener (evt) {
  // console.log(evt);
  var id = evt.target.id;
  var text = evt.target.value;

  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }

  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
  // Get Canvas2DContext
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");
  // Your code here
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  ctx.font = "36pt Impact"
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineWidth = 3;
  ctx.fillText(topLine, (image.width/2) , (image.height/6));
  ctx.strokeText(topLine, (image.width/2) , (image.height/6));

  ctx.fillText(bottomLine, (image.width/2) , (image.height/1.1));
  ctx.strokeText(bottomLine, (image.width/2) , (image.height/1.1));

}

function saveFile() {
  window.open(document.querySelector('canvas').toDataURL());
}


function handleFileSelect(evt) {
  // console.log(evt);
  var canvasWidth = 500;
  var canvasHeight = 500;
  var file = evt.target.files[0];


  // https://developer.mozilla.org/en/docs/Web/API/FileReader
  var reader = new FileReader();
  reader.onload = function(fileObject) {
    var data = fileObject.target.result;

    // Create an image object
    var image = new Image();
    image.onload = function() {

      window.imageSrc = this;
      redrawMeme(window.imageSrc, '', '');
      //removes background-color when user's image gets loaded
      $('.image-container').css('background-color', 'inherit');
    }

    // Set image data to background image.
    image.src = data;
    // console.log(fileObject);
    // console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file)
}

window.topLineText = "";
window.bottomLineText = "";
var input1 = document.getElementById('topLineText');
var input2 = document.getElementById('bottomLineText');
// to get an idea what's going on you may visit the links below
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/oninput
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;

// document.getElementById('user-file').addEventListener('change', handleFileSelect, false);
$('#user-file').change(handleFileSelect);
// document.getElementById('save-button').addEventListener('click', saveFile, false);
$('#save-button').click(saveFile);




// thr folowing script get executed when user click browse button
$('.browse-button').click(function(){
  var file = $(this).parents('.user-upload').find('.user-file');
  file.trigger('click');
});
$('.user-file').change(function(){
  $(this).parent().find('.user-file-name').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});
