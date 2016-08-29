$(document).ready(function()
{
createQuizLayout();
initQuiz();

$('#reset').on('click', function()
{
$('#source li').draggable('destroy');
$('#target li').droppable('destroy');
createQuizLayout();
initQuiz();
});



});


function createQuizLayout()
{
//declare arrays of countries and their capitals.
var countries = ["USA", "UK", "Pakistan", "Germany", "Turkey", "France",
"Nepal", "Japan", "South Africa", "Maldives"];
var capitals = ["Washington", "London", "Islamabad", "Berlin", "Istanbul",
"Paris", "Kathmandu", "Tokyo", "Capetown", "Male"];
var arrayCountry = [];
for(var i=0; i<countries.length; i++)
{
arrayCountry.push('<li class="list-group-item" data-index="' + (i+1) + '">' + countries[i]
+'</li>');
}
var arrayCapital = [];
for(var i=0; i<capitals.length; i++)
{
arrayCapital.push('<li class="list-group-item" data-index="' + (i+1) + '">' + capitals[i]
+'</li>');
}


//shuffle the arrays
arrayCountry = shuffleArray(arrayCountry);
arrayCapital = shuffleArray(arrayCapital);
// once country and capital items are ready, we insert them into DOM
$('#source').html(arrayCountry.join(''));
$('#target').html(arrayCapital.join(''));

}

// shuffleArray function
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// draggable functions
function initQuiz()
{
$('#source li').draggable(
	{
		revert : true,
		revertDuration: 300,
		cursor: "move"
	});

var totalScore = 0;
	$('#score').text(totalScore + ' points.');
	$('#target li').droppable(
		{
		accept : function(draggable)
		{
			if(parseInt(draggable.data('index'), 10) ===
			parseInt($(this).data('index'), 10))
			{
			return true;
		}
	else
			{

			return false;
			}
		},
	drop: function( event, ui )
	{
		var that = $(this);
		that.addClass( "list-group-item-success" ).html( 'Correct!'
		).addClass('animated flash');
		that.droppable('disable');
		ui.draggable.addClass('answer list-group-item-warning');
		(ui.draggable).draggable('disable');
		totalScore++;
		$('#score').text(totalScore + ' points.');
		if($('li.answer').length == 3)
		{

			$( "#dialog-complete" ).dialog({
				resizable: false,
				modal: true
				});
		}
	}
});




}

// droppable functions

