
// data 
var trending_data = {
	0 : 'Where are you from',
	1 : 'Are Llamas and Alpacas the same',
	2 : 'Whats your life span',
	3 : 'Do you spit',
	4 : 'Are Llamas easy to train',
	5 : 'What is your scientific name',
	6 : 'What do you eat',
	7 : 'How much do you weigh',
	8 : 'What are some of your unique characteristics',
	9 : 'What sounds do Llamas make?',

};

var trending_answers = {
	0 : 'We have originated from the central plains of North America about 40 million years ago. Later we migrated to South America about three million years ago during the Great American Interchange. ',
	1 : 'Noooo! They are my cousins. Their faces are not as sharp as ours. Also, they like to live in groups while we are more independent minded.',
	2 : 'If everything goes well I can live up to 25 years. Oh BTW, I turn 17 next month!',
	3 : 'Yes, only if you or my brothers piss me off! Some of us get trained to not spit at humans.',
	4 : 'Yes! we are super intelligent and are very fast learners.',
	5 : 'Scientists calls us Lama glama. Sounds cool, doesnt it? ',
	6 : 'We eat Grasses for main course and Lichens for dessert',
	7 : 'It is rude to ask someone how much they weigh. Anyway, we weigh around 25 – 30 lbs at birth. 250 – 500 lbs at maturity.',
	8 : 'We have our babies during daylight hours (usually between 8 a.m. and 4 p.m.), we dung pile (go in only one or two spots in the pasture), we have an extra elliptical blood cell so that we are automatically adapted to working at high altitudes, and we have wide set eyes which can see almost 260 degrees. This makes us very kinetically aware and we rarely trip or knock things over in tight spaces.',
	9 : 'We hum, orgle when breeding and have a high pitched alarm call.',
};


var random_replies = {
	0 : 'I do not know about that. But did you know that Llamas are the camel’s hippie cousins. They belong to a group of animals called camelids that also includes alpacas. All camelids spit or stick out their tongue when they are annoyed.',
	1 : 'I do not quite get it. But did you know that Llama poop has almost no odor. Llama farmers refer to llama manure as "llama beans." It makes for a great, eco-friendly fertilizer. Historically, the Incas in Peru burned dried llama poop for fuel.',
	2 : 'Did you know that Llamas are social animals and prefer to live with other llamas or herd animals. The social structure of llamas changes frequently and a male llama can move up the social ladder by picking, and winning, small fights with the leader of the group.',
	3 : 'No idea. But did you know that Llamas are very gentle, shy, and curious animals.',
	4 : '*spits* Do not ask me intimidating questions',
	5 : 'No clue. But here is a fun fact: When one llama has an issue with another llama, it will stick its tongue out to express its displeasure. They’ll also spit on other llamas.',
	6 : 'I dont get the question. But here is a random fact for you: According to legend, the Spaniards, who had never seen llamas before, kept asking what they were called (“Cómo se llama?”)—and so the Incans thought “llama” was the Spanish name for the animals. But according to the BBC, this story is “not quite accurate. In fact the expression llama was there before the Spanish arrived. It’s of Quechuan origin and was borrowed by many languages, together with other Quechuan words such as condor or puma.',
};



var main = document.getElementById('main');
var trendingBox = document.getElementById("trending");
var input_user = document.getElementById('input-user');
var close_overlay = document.getElementById('close-overlay');
var overlay = document.getElementById('overlay');
var close_main = document.getElementById('close-main');
var call_bot = document.getElementById('call-bot');


//array of time of every msg in chat
var post_times = [];

close_overlay.addEventListener('click', function(){
	overlay.style.display = 'none';
});

close_main.addEventListener('click', function(){
	overlay.style.display ='block';
});


$(document).ready(function() {

    //input enter key is pressed
    $("#input-user").keyup(function (event) {
        event.preventDefault();
	    if (event.keyCode === 13) {
            call_bot.click();
	    }

	    //close the typing pop-up when ESC is pressed
	    if(event.keyCode === 27){
	    	let typing = document.getElementById('typing');
			if(typing){
				typing.parentNode.removeChild(typing);
				main.style.paddingBottom = 0;	
			}
	    }

	})

	call_bot.addEventListener('click', function(){
		
		var current_search = input_user.value;
		//empty search field
		input_user.value = "";
		main.style.paddingBottom = 0;

	

		let typing = document.getElementById('typing');
		if(typing){
			typing.parentNode.removeChild(typing);
			main.style.paddingBottom = 0;	
		}

		if(current_search !== '')
			setQuestion(current_search)
	});


	// sets the question properly and calls the bot
	function setQuestion(quest){

		$('#main').append(questionConstructor(quest));
		//making main scroll to bottom
		main.scrollTop = main.scrollHeight;

	
			var temp = random_replies[Math.floor( Math.random()*Object.keys(random_replies).length )];
			callBot(temp);	
	
		
	}

	//rightly to be started after receiving json data
	loadTrending();

});

// trending questions
function loadTrending(){

	for(let i = 0; i < Object.keys(trending_data).length; i++){
		$('#trending').append(
			'<p class="trending-question">' + trending_data[i] + '?' );    
	}

	for(let i = 0; i < Object.keys(trending_data).length; i++){
		$('.trending-question').eq(i).click(function(){
			$('#main').append(questionConstructor(trending_data[i]));
			//making main scroll to bottom
  			main.scrollTop = main.scrollHeight;
  			//unchecks toggle to close hamburger menu after selecting question	
  			toggle.checked=false;
  			callBot(trending_answers[i]);
		});
	}
}


//empties placeholder when the search input is empty
input_user.addEventListener('keyup', function(){
	if(this.value === ''){

		//if empty close typing pop-up
		let typing = document.getElementById('typing');
		if(typing){
			typing.parentNode.removeChild(typing);
			main.style.paddingBottom = 0;	
		}

    	main.style.paddingBottom = 0;
	}
});


input_user.addEventListener('input', function(){
	// declaring locally because its destroyed and created at times
	let typing = document.getElementById('typing');
	if(!typing){
		$('#main').append('<div id="typing" class="msg-right">\
			<div><div></div><div></div><div></div></div>\
		</div> ');
		//making main scroll to bottom
		main.scrollTop = main.scrollHeight;
	}
});

input_user.addEventListener('focusout', function(){

	// declaring locally because its destroyed and created at times
	let typing = document.getElementById('typing');
	if(typing){
		typing.parentNode.removeChild(typing);
		main.style.paddingBottom = 0;		
	}
	
});



function callBot(msg, x){
	var searching = document.getElementById('searching');

	if(!searching){
		$('#main').append('<div id="searching" class="msg-left">\
			<div><div></div><div></div><div></div></div>\
		</div> ');	
	}
	//making main scroll to bottom
	main.scrollTop = main.scrollHeight;

	setTimeout(function(){
		var searching = document.getElementById('searching');
		if(searching)
			searching.parentNode.removeChild(searching);

		if(x === undefined){
			$('#main').append(messageConstructor(msg));	
		}

		main.scrollTop = main.scrollHeight;

	}, 2000);	
}


// reply message constructor
function messageConstructor(msg){

	post_times.push(new Date());
	$('#main').append('<div class="msg-left reply">'
			+ '<p>' + msg +'</p>'
			+'<span class="time">' + 'Just now' +'</span>'
		+'</div>');
}



// search question constructor
function questionConstructor(quest){

	post_times.push(new Date());
	return '<div class="msg-right question">\
			<span class="time">' + 'Just now' +'</span>\
				<p>' + quest +'</p>\
		</div>';
}


// returns current time
function getTime(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}
		

//sets the time of messages
setInterval(function(){

	var times = document.getElementsByClassName('time');
	for(let i = 0; i <  times.length; i++){
		//time elapsed from it was posted
		var elapsed_time = new Date() - post_times[i];
		//two conditions because we dont want to update the old ones
		if( elapsed_time >= 5000 && elapsed_time <= 10000)
			times[i].innerHTML = getTime(post_times[i]);
	}

}, 2000);







