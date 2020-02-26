let stepCount=0;
let startTime=new Date().getTime();
let gameover=0;

function startGame(images,gridSize){
    setImage(images,gridSize);
    $('#playPanel').show();
    $('#sortable').randomize();
    enableSwapping('#sortable li');

}

function setImage(images,gridSize){
    gridSize=gridSize || 3;
    let percentage=100/(gridSize-1);
    let image=images[Math.floor(Math.random() * images.length)];
    console.log(percentage);
    $('#imgTitle').html(image.title);
    $('#actualImage').attr('src', image.src);
    $('#sortable').empty(); // to empty image before showing the image.
    for (var i = 0; i < gridSize * gridSize; i++) {
        var xpos = (percentage * (i % gridSize)) + '%';
        var ypos = (percentage * Math.floor(i / gridSize)) + '%';
        console.log(xpos,ypos)
        
        var li = $('<li class="item" data-value="' + (i) + '"></li>').css({
            'background-image': 'url(' + image.src + ')',
            'background-size': (gridSize * 100) + '%',
            'background-position': xpos + ' ' + ypos,
            'width': 400 / gridSize,
            'height': 400 / gridSize
        });
        $('#sortable').append(li);
    }
     
    $('#sortable').randomize();
}

$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children();
    for (var i = $elems.length; i >= 0; i--) {
        //console.log(Math.random() * i);
        console.log($elems[Math.random() * i | 0])
      $(this).append($elems[Math.random() * i | 0]);
    }
  
    return this;
  }

  function enableSwapping(elem){
    $(elem).draggable({
        /*snap: '#droppable',
        snapMode: 'outer',*/
        revert: 'invalid',
        helper: "clone"
    });
    $(elem).droppable({
        drop: function (event, ui) {
            //console.log($dragElem.attr('data-value'))
            //console.log(this)
            var $dragElem = $(ui.draggable).clone().replaceAll(this);
            
            $(this).replaceAll(ui.draggable);
        currentList = $('#sortable > li').map(function (i, el) { return $(el).attr('data-value'); });
           console.log(currentList);
            if (isSorted(currentList)){
                $('#actualImageBox').empty().html($('#gameOver').html());
                gameover=1;
            }
            else {
                var now = new Date().getTime();
                stepCount++;
                $('.stepCount').text(stepCount);
                //$('.timerCount').text(parseInt((now - startTime) / 1000, 10));
            }

            enableSwapping(this);
            enableSwapping($dragElem);
        }
    });
}

function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] != i)
            return false;
    }
    return true;
}

setInterval(function(){
    if(gameover==0){
    let now = new Date().getTime();
   $('.timerCount').text(parseInt((now - startTime) / 1000, 10));
    }
    else{
    clearInterval();
    }

        
},1000)