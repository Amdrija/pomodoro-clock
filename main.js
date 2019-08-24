let time_div = document.querySelector('#time');
let session_length_div = document.querySelector('#session-length');
let break_length_div = document.querySelector('#break-length');
let session_plus_button = document.querySelector('#session-plus');
let session_minus_button = document.querySelector('#session-minus');
let break_plus_button = document.querySelector('#break-plus');
let break_minus_button = document.querySelector('#break-minus');

let start_button = document.querySelector('#start');
let reset_button = document.querySelector('#reset');
let pause_button = document.querySelector('#pause');
let stop_button = document.querySelector('#stop');

let session_length = 25;
let break_length = 5;
let state = 'pause';
let timer_minutes = session_length;
let timer_seconds = 0;

function reset() {
	state = 'pause';
	timer_minutes = session_length;
	timer_seconds = 0;
	time_div.textContent = time_string(timer_minutes, timer_seconds);
}

function stop() {
	if (state == 'session') {
		timer_minutes = session_length;
	} else {
		timer_minutes = break_length;
	}
	timer_seconds = 0;
	time_div.textContent = time_string(timer_minutes, timer_seconds);
	state = 'pause';
}

function pad_number(number) {
	return ('00' + number).slice(-2);
}

function time_string(minutes, seconds) {
	return `${pad_number(minutes)}:${pad_number(seconds)}`;
}

window.setInterval(function() {
	if (state != 'pause') {
		if (timer_minutes == 0 && timer_seconds == 0) {
			if (state == 'session') {
				state = 'break';
				timer_minutes = break_length;
				timer_seconds = 0;
			} else {
				state = 'session';
				timer_minutes = session_length;
				timer_seconds = 0;
			}
		} else if (timer_seconds == 0) {
			timer_minutes--;
			timer_seconds = 59;
		} else {
			timer_seconds--;
		}
		time_div.textContent = time_string(timer_minutes, timer_seconds);
	}
}, 100);

start_button.addEventListener('click', () => (state = 'session'));
pause_button.addEventListener('click', () => (state = 'pause'));
reset_button.addEventListener('click', reset);
stop_button.addEventListener('click', stop);

session_plus_button.addEventListener('click', () => {
	if (state == 'pause' && session_length < 59) {
		session_length++;
		reset();
		session_length_div.textContent = session_length;
	}
});
session_minus_button.addEventListener('click', () => {
	if (state == 'pause' && session_length > 1) {
		session_length--;
		reset();
		session_length_div.textContent = session_length;
	}
});
break_plus_button.addEventListener('click', () => {
	if (state == 'pause' && break_length < 59) {
		break_length++;
		reset();
		break_length_div.textContent = break_length;
	}
});
break_minus_button.addEventListener('click', () => {
	if (state == 'pause' && break_length > 1) {
		break_length--;
		reset();
		break_length_div.textContent = break_length;
	}
});
