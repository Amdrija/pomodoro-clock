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

function pad_number(number) {
    return ('00' + number).slice(-2);
}

function time_string(minutes, seconds) {
    return `${pad_number(minutes)}:${pad_number(seconds)}`;
}


let timer = {
    session_length: 25,
    break_length: 5,
    state: 'pause',
    minutes: 25,
    seconds: 0,

    reset: function () {
        this.state = 'pause';
        this.minutes = this.session_length;
        this.seconds = 0;

        return this;
    },

    stop: function () {
        if (this.state != "pause") {
            if (this.state == 'session') {
                this.minutes = this.session_length;
            } else {
                this.minutes = this.break_length;
            }
            this.seconds = 0;
            this.state = 'pause';
        }

        return this;
    },

    thick: function () {
        if (this.state != 'pause') {
            if (this.minutes == 0 && this.seconds == 0) {
                if (this.state == 'session') {
                    this.state = 'break';
                    this.minutes = this.break_length;
                    this.seconds = 0;
                } else {
                    this.state = 'session';
                    this.minutes = this.session_length;
                    this.seconds = 0;
                }
            } else if (this.seconds == 0) {
                this.minutes--;
                this.seconds = 59;
            } else {
                this.seconds--;
            }
        }
        return this;
    },

    play: function () {
        this.state = "session";
        return this;
    },

    pause: function () {
        this.state = "pause";
        return this;
    },

    inc_session_length: function () {
        if (this.state == 'pause' && this.session_length < 59) {
            this.session_length++;
            this.reset();
        }
        return this;
    },

    dec_session_length: function () {
        if (this.state == 'pause' && this.session_length > 1) {
            this.session_length--;
            this.reset();
        }
        return this;
    },

    inc_break_length: function () {
        if (this.state == 'pause' && this.break_length < 59) {
            this.break_length++;
            this.reset();
        }
        return this;
    },

    dec_break_length: function () {
        if (this.state == 'pause' && this.break_length > 1) {
            this.break_length--;
            this.reset();
        }
        return this;
    }
}


window.setInterval(() => {
    timer.thick();
    time_div.textContent = time_string(timer.minutes, timer.seconds);
}, 1000);


start_button.addEventListener('click', () => timer.play());
pause_button.addEventListener('click', () => timer.pause());

reset_button.addEventListener('click', () => {
    timer.reset();
    time_div.textContent = time_string(timer.minutes, timer.seconds);
});

stop_button.addEventListener('click', () => {
    timer.stop();
    time_div.textContent = time_string(timer.minutes, timer.seconds);
});

session_plus_button.addEventListener('click', () => {
    timer.inc_session_length();

    session_length_div.textContent = timer.session_length;
    /*
     * The next line was added because the contents of time_dive would update
     * on the next iteration of set interval and so it would appear like
     * the app was lagging
     */
    time_div.textContent = time_string(timer.minutes, timer.seconds);
});

session_minus_button.addEventListener('click', () => {
    timer.dec_session_length();

    session_length_div.textContent = timer.session_length;
    time_div.textContent = time_string(timer.minutes, timer.seconds);
});


break_plus_button.addEventListener('click', () => {
    timer.inc_break_length();

    break_length_div.textContent = timer.break_length;
    time_div.textContent = time_string(timer.minutes, timer.seconds);
});

break_minus_button.addEventListener('click', () => {
    timer.dec_break_length();

    break_length_div.textContent = timer.break_length;
    time_div.textContent = time_string(timer.minutes, timer.seconds);
});