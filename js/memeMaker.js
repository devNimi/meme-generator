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

//draws on image and text on canvas
function redrawMeme(image, topLine, bottomLine) {
  // Get Canvas2DContext
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");
  if(image != null) {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  }
  ctx.font = "36pt Impact"
  ctx.textAlign = "center";
  ctx.strokeStyle = 'black'
  ctx.fillStyle = "white";
  ctx.lineWidth = 3;

  if(topLine != null) {
    ctx.fillText(topLine, (image.width/2) , (image.height/6));
    ctx.strokeText(topLine, (image.width/2) , (image.height/6));
  }

  if(bottomLine!= null) {
    ctx.fillText(bottomLine, (image.width/2) , (image.height/1.1));
    ctx.strokeText(bottomLine, (image.width/2) , (image.height/1.1));
  }

}

function saveFile() {
  window.open(document.querySelector('canvas').toDataURL());
}


function handleFileSelectInput(evt) {
  var files = evt.target.files;
  // although at last we are specifically passing files[0] to canvas, but this is for the case where even if user select multiple files, then also we'll only process image files
  for (var i = 0; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }
    handleFileSelect(evt, files);
  }
}

//drag and drop (DnD)
function handleFileSelectDnD(evt) {
  // var files= evt.dataTransfer.files; // FileList object, for traditional event handler
  // http://stackoverflow.com/questions/8189918/javascript-to-drag-and-drop-in-html5
  // http://stackoverflow.com/questions/16674963/event-originalevent-jquery
  var files= evt.originalEvent.dataTransfer.files; // FileList object
  // although at last we are specifically passing files[0] to canvas, but this is for the case where even if user select multiple files, then also we'll only process image files
  for (var i = 0; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }
    handleFileSelect(evt, files);
  }
}

function handleFileSelect(evt, files) {
  evt.stopPropagation();
  evt.preventDefault();
  var reader = new FileReader();
  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
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
  };
  // Read in the image file as a data URL.
//please not we want to have one image at time to specifically we are going for the file stored at 0th index in fileList object
  reader.readAsDataURL(files[0]);
}


// when user drag and drop image
function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  // evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  // http://stackoverflow.com/questions/8189918/javascript-to-drag-and-drop-in-html5
  // http://stackoverflow.com/questions/16674963/event-originalevent-jquery
  evt.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
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
$('#user-file').change(handleFileSelectInput);

// Setup the drag and drop listeners.
//traditional way
// var dropZone = document.getElementById('drop-zone');
// dropZone.addEventListener('dragover', handleDragOver, false);
// dropZone.addEventListener('drop', handleFileSelectDnD, false);
$('#drop-zone').on('dragover', handleDragOver);
$('#drop-zone').on('drop', handleFileSelectDnD);

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
