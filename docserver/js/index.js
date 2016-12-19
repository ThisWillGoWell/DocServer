$(function() {

	var indicator = $('#prompt-indicator');
	var expression = $('#prompt-expression');
	var input = $('#prompt-input');

	var trackLength = $('.race-track').width();

	var players = [{
			name: 'racer1',
			position: 0,
			questionNum: 0,
			won: false,
		}, {
			name: 'racer2',
			position: 0,
			questionNum: 0,
			won: false,
		}, {
			name: 'racer3',
			position: 0,
			questionNum: 0,
			won: false,
		}, {
			name: 'racer4',
			position: 0,
			questionNum: 0,
			won: false,
		},

	];
	

	var questionStack = [{
		q: "1 + 1",
		a: "2"
	}, {
		q: "2 + 2",
		a: "4"
	}, {
		q: "3 + 3",
		a: "6"
	}, {
		q: "4 + 4",
		a: "8"
	}, {
		q: "5 + 5",
		a: "10"
	}, {
		q: "6 + 6",
		a: "12"
	}, {
		q: "7 + 7",
		a: "14"
	}, {
		q: "8 + 8",
		a: "16"
	}, {
		q: "9 + 9",
		a: "18"
	}, {
		q: "10 + 10",
		a: "20"
	}, ];

	//DISREGARD
	var t = 0;

	function moveIt() {
		t += 0.05;

		var r = 20;
		var xcenter = 0;
		var ycenter = 0;
		var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
		var newTop = Math.floor(ycenter + (r * Math.sin(t)));
		$('.btn-reset').css({
			"transform": "translate3d(" + newLeft + "px, " + newTop + "px, 0px)"
		});
	}

	function incrementRacer(target, val) {
		var nextPosition = parseFloat(players[target].position + val);
		nextPosition = parseFloat(nextPosition.toFixed(2));
		if (nextPosition <= 1) {
			players[target].position = nextPosition;
		}

		//console.log(players[0].position)
	}

	function evalResponse(playerNum, response) {
		var targetQuestion = players[playerNum].questionNum;

		if (questionStack[targetQuestion]) {
			var currentQuestion = questionStack[targetQuestion];
			console.log("EVAL: " + currentQuestion.a.localeCompare(response));
			return currentQuestion.a.localeCompare(response);
		}
	}

	function displayQuestion(playerNum) {
		var targetQuestion = players[playerNum].questionNum;
		if (questionStack[targetQuestion]) {

			return questionStack[targetQuestion].q;
		}
	}

	var rate = 0.1;
	$('.btn-increment').click(function() {
		incrementRacer(0, rate);
		incrementRacer(1, rate / 2);
		incrementRacer(2, rate / 4);
		incrementRacer(3, rate / 8);
	});

	$(document).keypress(function(e) {
		if (e.which == 13) {

			var currentResponse = input.val();
			console.log(currentResponse);
			var result = evalResponse(0, currentResponse);
			input.val('');
			if (result === 0) {
				console.log("correct");
				players[0].questionNum++;
				incrementRacer(0, rate);
				indicator.addClass('correct');
				expression.text(displayQuestion(0));
			} else {
				indicator.removeClass('correct');
				console.log("wrong");

			}
		}
	});

	function initGame() {
		for (i = 0; i < players.length; i++) {
			players[i].position = 0;
			players[i].questionNum = 0;
			players[i].won = false;
		}
		expression.text(questionStack[players[0].questionNum].q);
	}
	initGame();

	$('.btn-reset').click(function() {
		$('#racer1 .indicator-winner').removeClass('expanded');
		initGame();
	});
	var update = function() {

		for (i = 0; i < players.length; i++) {
			var currentPlayer = players[i];
			$('#' + currentPlayer.name + ' .indicator').css({
				"transform": "translate3d(" + (currentPlayer.position * trackLength) + "px, 0px, 0px)"
			});
			//win condition
			if (currentPlayer.position >= 0.98 && !currentPlayer.won) {
				console.log('winner' + currentPlayer.name);

				currentPlayer.won = true;
				var pId = '#' + currentPlayer.name + ' .indicator-winner'
				$('' + pId + '').addClass('expanded');
			} 
			
		}
		//moveIt();
	}

	setInterval(update, 15);

});