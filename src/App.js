import React from 'react';
import $ from 'jquery';
//import anime from 'animejs';

//import waypoint from './libs/jquery.waypoints.js';

import './styles/fonts.scss';
import './styles/animations.scss';
import './styles/hamburgers.scss';
import './styles/transitions.scss';

import './styles/generic.scss';

import './styles/ipad.scss';
import './styles/desktop.scss';

import './styles/brand.scss';

//import './App.scss';

import Section from './components/Section';

//import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
   constructor(props) {
      super(props);
      // Don't call this.setState() here!
      var data = require('./data/content.json');
      this.state = { data: data };
      //this.handleClick = this.handleClick.bind(this);
   }
   componentDidMount() {

      //console.log("data here", this);

      var app  = {
        init : function(data){
          //console.log("in the app init", data)
          this.menuNav(data);
          //this.imageAnim();
          //this.svgShapeMorph();
          this.augmentedReality();
          this.hamburgers();
          this.plcHandler();
        },/*
        imageAnim: function() {

            var waypointHandler = {
              init: function(){

                console.log("start animations -- ");

                //var animationArray = ['vision0', 'work3', 'work4', 'culture5', 'culture6', 'culture7']

                //var that = this;
                //animationArray.map((item, key) =>
                //  that.process(item)
                //);

              },
              process: function(elem){

                  var $el = $('.'+elem);
                  //var $win = $(window);

                  $el.waypoint(function(direction) {
                    if (direction === 'down') {
                      $el.addClass("js-"+elem+"-animate");
                    } else {
                      $el.removeClass("js-"+elem+"-animate");
                    }
                  }, {
                    offset: '50%'
                  });

              }
            }

            waypointHandler.init();

        },*/
        plcHandler: function(){
          //plc
          $('.js-plc').on("click", function(event, salutation, name) {
            //console.log("clicked on plc button");
            //window.close();
            window.location = $(this).data("href");
          });
        },
        hamburgers: function(){
          $(".hamburger" ).on( "click", function() {
            $(this).toggleClass("is-active");

            if($(this).hasClass("is-active")){
                $(".btns").addClass("open");              
            } else {
                $(".btns").removeClass("open");
            }
          });
        },/*
        brandAnimate2: function(){

          var brandTrigger = {
            init : function(){
              console.log("brand animation triggered");

              $('.brand-logo .plus').removeClass("js-animate").removeClass("finish-off");
              $('.brand-logo .smith').removeClass("js-animate");
              $('.brand-logo .nephew').removeClass("js-animate");

              setTimeout(function(){ 
                $('.brand-logo .plus').addClass("js-animate");

                setTimeout(function(){ 
                  $('.brand-logo .plus').addClass("finish-off");
                }, 3400);

                setTimeout(function(){ 
                  $('.brand-logo .smith').addClass("js-animate");
                  $('.brand-logo .nephew').addClass("js-animate");
                }, 2400);

              }, 1500);

            },
            reset: function(){
              //unanimate images in place
              //el.find('.img-obj').removeClass('js-animate').removeClass("finish-off");
            }
          }

          brandTrigger.init();
          
        },*/
        menuNav: function(data){

          var menuHandler = {
            skipEvents: function(){
              var that = this;
              $('.js-skip-btn').on("click", function(event, salutation, name) {
                that.setCurrentSection($('.js-section').eq($(this).data("jump-pos")), 'skipped', null);               
              });
            },
            videoControllers: {
              startVideo: function(parent){
                //console.log("start video", parent);
                let videoEl = parent.find('.video')[0];

                console.log("new catch and try");

                  setTimeout(function(){ 
                      // Show loading animation.
                      var playPromise = videoEl.play();
                      //console.log("playPromise", playPromise);
                     
                      if(playPromise !== undefined) {
                        playPromise.then(_ => {
                          // Automatic playback started!
                          // Show playing UI.
                          // We can now safely pause video...
                          //videoEl.pause();
                          //console.log("+++++startVideo videoEl", videoEl);
                          videoEl.play();
                          parent.find('.ended-video .element-wrapper').removeClass("show");
                        })
                        .catch(error => {
                          // Auto-play was prevented
                          // Show paused UI.
                          //console.log("Auto play was prevented")
                          //videoEl.play();
                        });
                      }
                  }, 100);
                //videoEl.play()

                /*
                videoEl.addEventListener('ended',myHandler,false);
                function myHandler(e) {
                // What you want to do after the event
                  console.log("video ended")
                }
                */

                $(videoEl).on("ended", function( event ) {
                  event.stopPropagation();
                  //console.log("ended again");
                  parent.find('.ended-video .element-wrapper').addClass("show");

                });

                if(videoEl.paused){
                  //console.log("the video was paused");
                }

              },
              pauseAllOtherVideos: function() {

                $('.js-section').each(function(){
                    
                    if(!$(this).hasClass("current") && $(this).data("has-video") === true) {
                      //if($(this).parents('[class*="current"]').length==0){
                      //console.log("NOT current and has a video -PAUSE!", $(this));

                      let videoEl = $(this).find('.video')[0];
                      //console.log("++++++pauseAllOtherVideos videoEl", videoEl);
                      videoEl.pause();

                      /*
                      // Show loading animation.
                      var playPromise2 = videoEl.play();
                     
                      if (playPromise2 !== undefined) {
                        playPromise2.then(_ => {
                          // Automatic playback started!
                          // Show playing UI.
                          // We can now safely pause video...
                          videoEl.pause();
                        })
                        .catch(error => {
                          // Auto-play was prevented
                          // Show paused UI.
                        });
                      }*/


                      if (videoEl.paused){
                        //console.log("the video was paused as expected");
                      }


                    }
                })

              }
            },/*
            videoEvents: function() {
              console.log("run vids");

                var myVideo = $(".video1")[0]; 


                console.log("duration", myVideo.duration);
                console.log("ended", myVideo.ended);

                myVideo.load();
                myVideo.play(); 

                function playPause() { 
                  if (myVideo.paused) 
                    myVideo.play(); 
                  else 
                    myVideo.pause(); 
                } 

                function makeBig() { 
                    myVideo.width = 560; 
                } 

                function makeSmall() { 
                    myVideo.width = 320; 
                } 

                function makeNormal() { 
                    myVideo.width = 420; 
                } 


            },*/
            init: function(data){
              var that = this;

              //console.log("check here", data)

              this.thresholds = data;//require('./data/thresholds.json');

              this.skipEvents();

              $('.js-btn').on("click", function(event, salutation, name) {
                var type = $(this).data("type");
                var firstChild = $(".section."+type).eq(0);
                
                that.setCurrentSection(firstChild, 'skipped', null);
                that.closeMobileMenu();                  
              });

              // Trigger the scroll event
              $(window).scroll();

              var position = $(window).scrollTop();
              //should start at 0
              if(position === 0) {
                this.setCurrentSection($('.js-section').eq(0), 'skipped', null);
              }

              //evaluate scroll direction
              $(window).scroll(function() {
                var scroll = $(window).scrollTop();

                if (scroll > position) {
                  console.log("going down");
                  that.transitions(position, "down-direction");
                  //find next frame
                } else {
                  console.log("going up");
                  that.transitions(position, "up-direction");
                  //find prev frame
                }
                position = scroll;
              });
            },
            closeMobileMenu: function(){
              $('.btns').removeClass("open");
              $('.hamburger').removeClass("is-active");
            },
            scrollIt: function(element) {
              //get element pos in parent
              var pos = element.index();
              window.scrollTo(0, this.thresholds[pos].start);
            },
            transitions: function(position, direction){
              //handles the current section
              $('.js-section').removeClass("current");

              let thresh = 150;
              var that = this;

              $.each(this.thresholds, function(key, value) {
                if(that.thresholds.length-1 !== value.index){
                  if(position >= value.start && position < value.end) {
                    that.setCurrentSection($('.js-section').eq(value.index), "", direction);

                    //this attempts to end animations just before the user scrolls off this section -REVIEW-
                    if(position >value.end - thresh && direction === "down-direction"){
                      that.endAnimation($('.js-section').eq(value.index), 100);
                    }
                  }
                } else{                                                        
                  if(position > value.start) {
                    that.setCurrentSection($('.js-section').eq(value.index), "", direction);
                  }
                }
              });

            },
            setNoScroll: function(el, direction) {
                //-REVIEW- --- this is the no scroll hijacking - I advise against using this
                function Remove_ScrollBars(){
                  let xLeft = document.body.scrollLeft
                    , yTop  = document.body.scrollTop;


                    //var oldWidth = $(window).width();


                  //console.log("before no scroll", $(window).width());

                  document.body.classList.add('noScroll');

                  //var newWidth = $(window).width();

                  //var difference = newWidth-oldWidth;
                  //$('body').css("right", difference);

                  //console.log("after no scroll", $(window).width());

                  //console.log("xLeft", xLeft);
                  //console.log("newLeft",document.body.scrollLeft);

                  //document.body.scrollLeft = xLeft;
                  //document.body.scrollTop  = yTop;
                }

                function Return_ScrollBars(){
                  let xLeft = document.body.scrollLeft
                    , yTop  = document.body.scrollTop

                  document.body.classList.remove('noScroll');
                  //console.log("xLeft", xLeft);

                  document.body.scrollLeft = xLeft;
                  document.body.scrollTop  = yTop;
                }


                var animationDuration = el.data("animation-duration");
                //console.log("animationDuration", animationDuration);
                
                               
                    Remove_ScrollBars()
                    setTimeout(function(){
                      Return_ScrollBars()
                    }, animationDuration);
                
                


                //noScrollBar.onclick = Remove_ScrollBars
                //ScrollBar.onclick   = Return_ScrollBars

                /*

              var scrollStopper = {
                noScroll: function(el){
                  let startTop = el.data("start-top");
                  console.log("no scrollllllllllll", startTop);
                  window.scrollTo(0, startTop);
                }
              }

                let animationTime = 1000; //holder

                // add listener to disable scroll
                //window.addEventListener('scroll', scrollStopper.noScroll(el));

                let scrollStopperTimeout = setTimeout(function(){
                  // Remove listener to re-enable scroll
                  //window.removeEventListener('scroll', scrollStopper.noScroll(el));
                }, animationTime);

                if(direction === "up-direction") {
                    window.clearTimeout(scrollStopperTimeout);
                }
                */


            },/*
            brandAnimate: function(){
              console.log("brand animation triggered");
              this.brand1 = setTimeout(function(){ 
                $('.brand-logo .plus').addClass("js-animate");

                this.brand2 = setTimeout(function(){ 
                  $('.brand-logo .smith').addClass("js-animate");
                  $('.brand-logo .nephew').addClass("js-animate");

                  this.brand3 = setTimeout(function(){ 
                    $('.brand-logo .plus').addClass("finish-off");
                  }, 950);
                }, 2400);
              }, 500);

            },*/
            /*
            resetBrand:function(){
              $('.brand-logo .plus').removeClass("js-animate").removeClass("finish-off");
              $('.brand-logo .smith').removeClass("js-animate");
              $('.brand-logo .nephew').removeClass("js-animate");

              window.clearTimeout(this.brand1);
              window.clearTimeout(this.brand2);
              window.clearTimeout(this.brand3);
            },*/
            startAnimation: function(el){
              el.addClass('start-animations');

              //array of animation order [svg, img, text]
              let animations = el.data("animation");

              $.each(animations, function(key, value) {

                if(value.type === "text" ||
                  value.type === "img" ||
                  value.type === "threesixty") {
                  
                  //loop over animation transitions to add the various classes
                  $.each(value.transition, function(k, v) {
                    el.find('.'+value.type+'-obj').addClass(v);
                  });

                  setTimeout(function(){
                    el.find('.'+value.type+'-obj').addClass('animate');
                  }, value.delay);

                } else{
                  //loop over animation transitions to add the various classes
                  $.each(value.children, function(i, j) {
                    //loop over animation transitions to add the various classes
                    $.each(j.transition, function(k, v) {
                      el.find('.'+j.name).addClass(v);
                    });

                    setTimeout(function(){
                      el.find('.'+j.name).addClass('animate');
                    }, j.delay);
                  });
                }

              });


              //disable scroll temp
              //$('body').addClass("noScroll");

              /*
              setTimeout(function(){
                $('body').removeClass("noScroll");
              }, 2500);
              */

            },
            endAnimation: function(el , delays){
                //unanimate images in place
                el.find('.img-obj').removeClass('animate');

                //unanimate images in place
                el.find('.svg-obj .svg-wrapper').removeClass('animate');

                //unanimate threesixty
                el.find('.threesixty-obj').removeClass('animate');

                //text is the last element to fade out by a split second
                setTimeout(function(){
                  //unanimate text
                  el.find('.text-obj').removeClass('animate');
                }, delays);

            },
            resetAnimation: function(){
              var that = this;
              that.endAnimation($('.js-section'), 0);

              //that.resetBrand();
            },
            lastSection: "",
            setCurrentSection: function(el, skipped, direction){
              var that = this;

              //console.log("el", el);
              //console.log("skipped", skipped);
              //console.log("direction", direction);

              $('.section').removeClass('current');
              el.addClass('current');

              if ($('.js-section.fixed').hasClass('current')) {
                this.isFixedSection(el.data("index"));
              } else {
                this.removeStyles($('.fixed'));
              }

              //if hide small logo on first screen
              if(!el.data("show-sm-logo")) {
                $('.acronym-obj').addClass("fadeoutlogo");
              } else {
                $('.acronym-obj').removeClass("fadeoutlogo");
              }

              //console.log('el.data("has-video")', el.data("has-video"));

              if(el.data("has-video") === true) {
                //this.videoEvents();//run video
                //console.log("video true");  
                this.videoControllers.startVideo(el);                
              } else {
                //console.log("video false");
                //this.videoControllers.pauseVideo(el);
                this.videoControllers.pauseAllOtherVideos(el);
              }
              
              if(typeof this.lastSection === "undefined"){
                this.lastSection = el;
              }

              if(typeof this.lastSection !== "undefined"){

                var last = this.lastSection;

                if($(last).data("index") !== el.data("index")){


                  console.log("-----------sectionchanged give a pause-------", direction);
                  //that.setNoScroll(el, direction);

                  //remove all animations globally
                  this.resetAnimation();

                  //start animations
                  that.startAnimation(el);

                  //start brand animation
                  //that.brandAnimate();
                }
              } 

              //if jump -- clicking on menu item or startup
              if(skipped){                
                that.scrollIt(el);
                this.startAnimation(el);

                setTimeout(function(){
                  that.setCurrentSection(el, "", null);
                }, 10);
              }

              this.lastSection = el;

              //updates the menu
              $('.js-btn, .btn-wrap').removeClass("active");
              $('.js-btn.'+el.data("type")+', .btn-wrap.'+el.data("type")).addClass("active");

            },            
            setStyles: function(el, attr, value){
              el.css(attr, value);
            },
            removeStyles: function(el){
              //remove appended styles
              var attr = el.attr('style');
              // For some browsers, `attr` is undefined; for others,`attr` is false.  Check for both.
              if (typeof attr !== typeof undefined && attr !== false) {
                  el[0].removeAttribute("style");
              }
            },
            isFixedSection: function(index) {
              this.setStyles($('.section.fixed.current'), 'top', this.thresholds[index].start + "px");   
            }
          }

          menuHandler.init(data);
        },
        augmentedReality: function(){
          //animates the augmented reality image so it spins depending on scroll and speed -REVIEW- -- be good to tidy up the 0 + frame parts
          var reel = {
            init: function(el, startFrame, totalFrames, path){
              this.el = el;
              this.totalFrames = totalFrames;
              this.frame = startFrame;
              this.path = path;
            },
            setImage: function(frame){
              //add zeros for smaller or larger digits
              if(frame < 10){
                frame = "000"+frame;
              }
              if(frame >= 10){
                frame = "00"+frame;
              }
              if(frame > 99){
                frame = "0"+frame;
              }

              //get path of image
              let pathx = this.path.replace("####", frame);
              const images = `img/${pathx}`;

              //replace path of element
              $(this.el).attr("src", images);
            },
            next: function(){
              this.frame++;

              if(this.frame > this.totalFrames){
                this.frame = 1;
              }

              reel.setImage(this.frame);
            },  
            prev: function(){
              this.frame--;

              if(this.frame < 1){
                this.frame = this.totalFrames;
              }

              reel.setImage(this.frame);
            }
          }

          reel.init($('.threesixty'), 0, 40, '600px/S&N_360_ipad_01_####.png')
          
          var position = $(window).scrollTop();
          // should start at 0

          //evaluate scroll direction and spin the object accordingly
          $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll > position) {
              reel.next();
              //find next frame
            } else {
              reel.prev();
              //find prev frame
            }
            position = scroll;
          });

        }/*,
        svgShapeMorph: function(){

            let shapes1 = [
                {
                    d: "m119.500005,386.437509c217,-104.817685 143.720992,-191.000009 232.499997,-262.000009c88.779005,-71 101.499998,-38.817676 189.499998,108.000009c88,146.817685 -30.720993,203.000008 -120.499998,203.000008c-89.779004,0 -518.499997,55.817676 -301.499997,-49.000008z"
                },
                {
                    d: "m250.500005,375.437509c63,-81.817685 116.720992,-64.000009 163.499997,-80.000009c46.779005,-16 55.499998,-88.817676 121.499998,3.000009c66,91.817685 -24.720993,138.000008 -114.499998,138.000008c-89.779004,0 -233.499997,20.817677 -170.499997,-61.000008z"
                }
            ]

            var morph1 = anime({
                targets: '.morph-path1',
                d: [
                    {value: shapes1[0].d},
                    {value: shapes1[1].d}
                ],
                duration: 5000,
                direction: 'alternate',
                autoplay: true,
                easing: 'linear',
                elasticity: 100,
                loop: true
            });

            let shapes2 = [
                {
                    d: "m-9.937731,63.466227c0,-138.30483 18.85851,-202.01065 78.62516,-202.01065c59.76666,0 34.33493,99.2947 108.17765,250.33176c73.84272,151.03706 106.59491,336.91966 -74.51755,311.16352c-181.11245,-25.75614 -112.28526,-221.17978 -112.28526,-359.48463z"
                },
                {
                    d: "m-9.237731,63.466227c0,-138.30483 18.85851,-202.01065 78.62516,-202.01065c59.76666,0 34.33493,99.2947 108.17765,20.33176c73.84272,151.03706 106.59491,336.91966 -74.51755,311.16352c-181.11245,-25.75614 -112.28526,-221.17978 -112.28526,-359.48463z"
                }
            ]

            var morph1 = anime({
                targets: '.morph-path2',
                d: [
                    {value: shapes2[0].d},
                    {value: shapes2[1].d}
                ],
                duration: 5000,
                direction: 'alternate',
                autoplay: true,
                easing: 'linear',
                elasticity: 100,
                loop: true
            });
        }*/
      }

      app.init(this.state.data);
   }
   render() {

      const items = this.state.data.map((item, key) =>
        <Section key={key} data={item} index={key} />
      );

      return (
         <div className="screenview">
            <div className="free-elements">
              <div className="acronym-obj fadeoutlogo">
                <img className="acronym" src={`logo/S&N_Logo.svg`} alt="" />
              </div>
              <button className="hamburger hamburger--collapse" type="button">
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              {/*
              <div className="plcs">
                <div className="plc-wrap"><button className="plc js-plc" data-href="http://www.smith-nephew.com/">PLC</button></div>
              </div>
              */}
              <div className="btns">
                <div className="btnwrapper">
                  <div className="btn-wrap vision"><button className="btn js-btn vision" data-type="vision">Our vision</button></div>
                  <div className="btn-wrap work"><button className="btn js-btn work" data-type="work">Our work</button></div>
                  <div className="btn-wrap culture"><button className="btn js-btn culture" data-type="culture">Our culture</button></div>
                  <div className="btn-wrap brand"><button className="btn js-btn brand" data-type="brand">Our brand</button></div>
                  <div className="plc-wrap"><button className="plc js-plc" data-href="http://www.smith-nephew.com/">Back to main site</button></div>
                </div>
              </div>
            </div>
            <div className="core">
              {items}
            </div>
         </div>
      );
   }
}

export default App;
