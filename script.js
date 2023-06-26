//your JS code here. If required.
const quoteDisplay = document.getElementById('quoteText');
const quoteInput = document.getElementById('quoteInput');
const timer = document.getElementById('timer');
let startTime, endTime;

// Fetch a random quote from the API
function fetchRandomQuote() {
	fetch('http://api.quotable.io/random')
		.then(response => response.json())
		.then(data => {
			quoteDisplay.innerText = data.content;
		})
		.catch(error => {
			console.log('Error fetching random quote:', error);
		});
}

// Event listener for typing in the input area
quoteInput.addEventListener('input', () => {
	const quoteArray = quoteDisplay.querySelectorAll('span');
	const inputArray = quoteInput.value.split('');

	let correct = true;
	quoteArray.forEach((characterSpan, index) => {
		const inputChar = inputArray[index];
		if (inputChar == null) {
			characterSpan.classList.remove('red');
			characterSpan.classList.remove('green');
			correct = false;
		} else if (inputChar === characterSpan.innerText) {
			characterSpan.classList.add('green');
			characterSpan.classList.remove('red');
		} else {
			characterSpan.classList.add('red');
			characterSpan.classList.remove('green');
			correct = false;
		}
	});

	// If the entire quote has been typed correctly
	if (correct && inputArray.length === quoteArray.length) {
		endTime = new Date();
		const elapsedTime = Math.floor((endTime - startTime) / 1000);
		timer.innerText = elapsedTime;

		// Wait for 3 seconds and then fetch a new random quote
		setTimeout(() => {
			quoteInput.value = '';
			timer.innerText = 0;
			fetchRandomQuote();
			startTime = new Date();
		}, 3000);
	}
});

// Initialize the application
function init() {
	fetchRandomQuote();
	startTime = new Date();
}

init();
