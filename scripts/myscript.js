$(document).ready(function () {
    
    // function getUrlVars(href) {
    //     var vars = [], hash;
    //     var hashes = href.slice(href.indexOf('?') + 1).split('&');
    //     for (var i = 0; i < hashes.length; i++) {
    //         hash = hashes[i].split('=');
    //         vars.push(hash[0]);
    //         vars[hash[0]] = hash[1];
    //     }
    //     return vars;
    // }


    // var v = getUrlVars(document.URL);
    // var q = v.q;
    // console.log("q : " + q);
    // if (q + "" == "happy+birthday+jeckay") {
    //     startSurprise();
    // }
    console.log("url : " + document.URL);
    startSurprise();
});

function startSurprise() {
    imgUrl1 = chrome.extension.getURL('images/image1.png');
    imgUrl2 = chrome.extension.getURL('images/image2.png');
    imgUrl3 = chrome.extension.getURL('images/image3.png');
    imgUrl4 = chrome.extension.getURL('images/image4.png');
    imgUrl5 = chrome.extension.getURL('images/image5.png');
    imgUrl6 = chrome.extension.getURL('images/image6.png');
    imgUrl7 = chrome.extension.getURL('images/image7.png');
    imgUrl8 = chrome.extension.getURL('images/image8.png');
    imgUrl9 = chrome.extension.getURL('images/image9.png');

    document.body.innerHTML = "<div id=\"surprise_content\"><div id=\"surprise_slideshow\"><img src=\"" + imgUrl1 + "\" /><img src=\"" + imgUrl2 + "\" /><img src=\"" + imgUrl3 + "\" /><img src=\"" + imgUrl4 + "\" /><img src=\"" + imgUrl5 + "\" /><img src=\"" + imgUrl6 + "\" /><img src=\"" + imgUrl7 + "\" /><img src=\"" + imgUrl8 + "\" /><img src=\"" + imgUrl9 + "\" /></div><canvas id=\"surprise_confetti\"></canvas><div id=\"surprise_message\"></div></div>";
    startConfetti();
    startMessage();
}

function startMessage() {

    var fader = new Fader("surprise_slideshow");
    $("#surprise_message").typed({
         strings: [ "It's the time of the year nga ma-acquire na nimo ang jersey number ni michael jordan. yipeey! \\0\/", 
                    "Today, you've just achieved the lowest prime number ever existed with digits that are also prime numbers. amazing! -0-0-",
                    "Di mapugngan ang panahon, magkaanam jud og katiguwang ang mga human. OTL.",
                    "Pero ika nga sa isang kasabihan, age is just a state of mind, right?. o.O",
                    "I know nga mo-disagree ka kon ingnon ka'g tiguwang na ka (tinuod man pud). bwahaha :>",
                    "Donchawori, you're free to say that you're 23 years young (fact). hehehe :P",
                    "Without furher ado, HAPPY NATAL DAY, JECKAY! Stay healthy and drink yakult everyday. Wishing you many more birthdays to come. :)",
                    "Have fun and enjoy your special day! alright! rakenrol! \\(o-o)/",
                    "P.S. If you like to disable this message for a while, just approach The Maker or The Accomplice. :)" ],
        typeSpeed: 20, // typing speed
        backDelay: 2000, // pause before backspacing
        loop: true,
        sentence_ending: function (sentence, index) {
            console.log("sentence :" + sentence + ", index: " + index);
            fader.setTarget(index);
        }
    });
}

function startConfetti() {
    (function () {
        var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

        NUM_CONFETTI = 350;

        COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

        PI_2 = 2 * Math.PI;

        canvas = document.getElementById("surprise_confetti");

        context = canvas.getContext("2d");

        window.w = 0;

        window.h = 0;

        resizeWindow = function () {
            window.w = canvas.width = window.innerWidth;
            return window.h = canvas.height = window.innerHeight;
        };


        window.addEventListener('resize', resizeWindow, false);

        resizeWindow();
        /*window.onload = function () {
            return setTimeout(resizeWindow, 0);
        };*/

        range = function (a, b) {
            return (b - a) * Math.random() + a;
        };

        drawCircle = function (x, y, r, style) {
            context.beginPath();
            context.arc(x, y, r, 0, PI_2, false);
            context.fillStyle = style;
            return context.fill();
        };


        xpos = 0.5;

        document.onmousemove = function (e) {
            return xpos = e.pageX / w;
        };

        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
        })();

        Confetti = (function () {
            function Confetti() {
                this.style = COLORS[~~range(0, 5)];
                this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
                this.r = ~~range(2, 6);
                this.r2 = 2 * this.r;
                this.replace();
            }

            Confetti.prototype.replace = function () {
                this.opacity = 0;
                this.dop = 0.03 * range(1, 4);
                this.x = range(-this.r2, w - this.r2);
                this.y = range(-20, h - this.r2);
                this.xmax = w - this.r;
                this.ymax = h - this.r;
                this.vx = range(0, 2) + 8 * xpos - 5;
                return this.vy = 0.7 * this.r + range(-1, 1);
            };

            Confetti.prototype.draw = function () {
                var _ref;
                this.x += this.vx;
                this.y += this.vy;
                this.opacity += this.dop;
                if (this.opacity > 1) {
                    this.opacity = 1;
                    this.dop *= -1;
                }
                if (this.opacity < 0 || this.y > this.ymax) {
                    this.replace();
                }
                if (!((0 < (_ref = this.x) && _ref < this.xmax))) {
                    this.x = (this.x + this.xmax) % this.xmax;
                }
                return drawCircle(~~this.x, ~~this.y, this.r, "" + this.rgb + "," + this.opacity + ")");
            };

            return Confetti;

        })();

        confetti = (function () {
            var _i, _results;
            _results = [];
            for (i = _i = 1; 1 <= NUM_CONFETTI ? _i <= NUM_CONFETTI : _i >= NUM_CONFETTI; i = 1 <= NUM_CONFETTI ? ++_i : --_i) {
                _results.push(new Confetti);
            }
            return _results;
        })();

        window.step = function () {
            var c, _i, _len, _results;
            requestAnimationFrame(step);
            context.clearRect(0, 0, w, h);
            _results = [];
            for (_i = 0, _len = confetti.length; _i < _len; _i++) {
                c = confetti[_i];
                _results.push(c.draw());
            }
            return _results;
        };

        step();

    }).call(this);
}


