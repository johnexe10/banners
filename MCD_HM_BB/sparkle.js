    "use strict";
            var starSprite =         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAHCAYAAAD5wDa1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNDNFMzM5REEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNDNFMzM5RUEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0M0UzMzlCQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM0M0UzMzlDQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jzOsUQAAANhJREFUeNqsks0KhCAUhW/Sz6pFSc1AD9HL+OBFbdsVOKWLajH9EE7GFBEjOMxcUNHD8dxPBCEE/DKyLGMqraoqcd4j0ChpUmlBEGCFRBzH2dbj5JycJAn90CEpy1J2SK4apVSM4yiKonhePYwxMU2TaJrm8BpykpWmKQ3D8FbX9SOO4/tOhDEG0zRhGAZo2xaiKDLyPGeSyPM8sCxr868+WC/mvu9j13XBtm1ACME8z7AsC/R9r0fGOf+arOu6jUwS7l6tT/B+xo+aDFRo5BykHfav3/gSYAAtIdQ1IT0puAAAAABJRU5ErkJggg==";

            var options ={
                color: "#FFFFFF",
                count: 0,
                overlap: 0,
                speed: 1,
                minSize: 4,
                maxSize: 7
            };
            
            var canvas = document.getElementById('cvs');
            var ctx = canvas.getContext("2d");
            var sprite = new Image();
                sprite.src = starSprite;
                sprite.spriteCoords = [0, 6, 13, 20];
            
            var particles;
            var fade;
            var fadeCount;
            var fadeIn;
            function initSparkle(w,h,c){ //220 200
                TweenLite.ticker.addEventListener("tick", anim);
                canvas.width = w;
                canvas.height = h;
                options.count = c;
                particles = createSparkles(canvas.width,canvas.height);
                fade = false;
                fadeCount = 0;
                fadeIn=0;
                
            }
            function randomParticleSize() {
                return Math.floor(Math.random()*(options.maxSize-options.minSize+1)+options.minSize);
            }


            function createSparkles(w, h) {
                var tempicles = [];
                for (var i = 0; i < options.count; i++) {
                    var color ='#FFF';
                    var yDelta = Math.floor(Math.random() * 500) - 550;
                    tempicles[i] = {
                        position: {
                            x: Math.floor(Math.random() * w),
                            y: Math.floor(Math.random() * h)
                        },
                        style: sprite.spriteCoords[Math.floor(Math.random() * sprite.spriteCoords.length)],
                        delta: {
                            x: Math.floor(Math.random() * 1000) - 500,
                            y: yDelta
                        },
                        size: randomParticleSize(),
                        color: color
                    };

                }
                return tempicles;
            }

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < particles.length; i++) {
                    ctx.globalAlpha = (fadeIn+=1) * .001;
                    ctx.save();
                    ctx.globalAlpha = particles[i].opacity;
                    ctx.drawImage(sprite, particles[i].style, 0, 7, 7, particles[i].position.x, particles[i].position.y, particles[i].size, particles[i].size);
                    ctx.restore();
                }
            }
            var previous_time = 0,current_time,time = 0;

            function anim(){
                previous_time = current_time
                current_time = TweenLite.ticker.time
                time = (current_time - previous_time) * 1000
                // store a floored version of the time passed
                var flatTime = Math.floor(time);

                for (var i = 0; i < particles.length; i++) {

                    var p = particles[i];
                    var resizeParticle = false;

                    // randomly move particles in the x/y direction
                    // we weight x heavier than y allowing some random
                    // decelleration giving an ethereal floating feeling
                    var randX = (Math.random() > Math.random() * 2);
                    var randY = (Math.random() < Math.random() * 5);

                    // arbitrary position change/speed based on what felt good.
                    if (randX) {
                        p.position.x += ((p.delta.x * options.speed) / 1500);
                    }

                    // arbitrary position change/speed based on what felt good.
                    if (randY) {
                        p.position.y -= ((p.delta.y * options.speed) / 800);
                    }

                    // if particle fell off of canvas, then position it
                    // back at the opposite side... minus 7 pixels which is the
                    // largest size a particle can be.
                    if (p.position.x > canvas.width) {
                        p.position.x = -(options.maxSize);
                        resizeParticle = true;
                    } else if (p.position.x < -(options.maxSize)) {
                        p.position.x = canvas.width;
                        resizeParticle = true;
                    }

                    // if it fell off top or bottom, give it a random x position
                    if (p.position.y > canvas.height) {
                        p.position.y = -(options.maxSize);
                        p.position.x = Math.floor(Math.random() * canvas.width);
                        resizeParticle = true;
                    } else if (p.position.y < -(options.maxSize)) {
                        p.position.y = canvas.height;
                        p.position.x = Math.floor(Math.random() * canvas.width);
                        resizeParticle = true;
                    }

                    // if the particle left the canvas, let's resize it
                    if ( resizeParticle ) {
                        p.size = randomParticleSize();
                        p.opacity = 0.4;
                    }

                    // if we're trying to fade out fast because
                    // of a _out_ event, increase opacity delta
                    if (fade) {
                        p.opacity -= 0.035;
                    } else {
                        p.opacity -= 0.005;
                    }

                    // if the opacity went below 0, then
                    // set it back to 1.2 (this gives slightly longer brightness)
                    if (p.opacity <= 0.15) {
                        p.opacity = (fade) ? 0 : 1.2;
                    }

                    // basically we want to randomly change the sparkles
                    // sprite position, this arbitrary number _felt_ right.
                    if (flatTime % Math.floor((Math.random() * 7)+1) === 0) {
                        p.style = sprite.spriteCoords[Math.floor(Math.random() * sprite.spriteCoords.length)];
                    }

                }

                // draw all the particles.
                draw();
                if (fade) {
                    fadeCount -= 1;
                    ctx.globalAlpha = fadeCount * .01;
                    if (fadeCount < 0) {
                        TweenLite.ticker.removeEventListener("tick", anim);
                    } else {
                        //update();
                    }
                } else {
                    //update();
                }
            };

            function stopSparkle(){
                fade = true;
                fadeCount = 100;
            }
