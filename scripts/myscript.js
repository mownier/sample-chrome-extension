$(document).ready(function () {
    
    function getUrlVars(href) {
        var vars = [], hash;
        var hashes = href.slice(href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }


    var v = getUrlVars(document.URL);
    var q = v.q;
    console.log("q : " + q);
    if (q + "" == "happy+birthday+mounir") {
        imgUrl1 = chrome.extension.getURL('images/image1.png');
        imgUrl2 = chrome.extension.getURL('images/image2.png');
        imgUrl3 = chrome.extension.getURL('images/image3.png');
        document.body.innerHTML = "<div id=\"slideshow\"><img src=\"" + imgUrl1 + "\" /><img src=\"" + imgUrl2 + "\" /><img src=\"" + imgUrl3 + "\" /></div><canvas id=\"world\"></canvas><div id=\"element\"></div>";
        startConfetti();
        startMessage();
    }
});

function startMessage() {

    var fader = new Fader("slideshow");
    $("#element").typed({
         strings: [ "It's the time of the year nga ma-acquire na nimo ang jersey ni michael jordan. yipeey! \\0\/", 
                    "Today, you've just achieved the lowest prime number having prime number digits. wooaah! -0-0-",
                    "Di mapugngan ang panahon, magkatiguwang jud ang human. hehehe.",
                    "Pero ika nga sa isang kasabihan, age is just a state of mind.",
                    "Naay ubang tao nga ganahan nga naa gihapon ang bata-bataon nga attitude, naa puy ganahan nga mo-grow-up kay naa pa'y mga nindot nga things beyond sa bata-bataon nga state.",
                    "Ikaw, asa man ka sa duha? hahaha if i know naa ka sa duha, di ba? :P" ],
        typeSpeed: 20, // typing speed
        backDelay: 2000, // pause before backspacing
        loop: true,
        sentence_ending: function (sentence, index) {
            console.log("sentence :" + sentence + ", index: " + index);
            fader.setTarget(index%3);
        }
    });
}

function startConfetti() {
    (function () {
        var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

        NUM_CONFETTI = 350;

        COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

        PI_2 = 2 * Math.PI;

        canvas = document.getElementById("world");

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


