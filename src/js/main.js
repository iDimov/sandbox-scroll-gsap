jQuery(function () {

  var controller = new ScrollMagic.Controller();

  var tween = new TimelineLite() 
.add([TweenMax.to("#item_1", 1, {x: '240px', y: '210px', borderRadius: '100px', backgroundColor: 'pink', rotation: 160, ease: Linear.easeNone}),
TweenMax.to("#item_2", 1, {x: '20px', y: '700px', borderRadius: '100px', backgroundColor: 'green', rotation: 300, ease: Linear.easeNone}, "-=1"),
TweenMax.to("#item_3", 1, {x: '-290px', y: '700px', borderRadius: '100px', backgroundColor: 'red', rotation: 300, ease: Linear.easeNone}, "-=1.7"),
TweenMax.to("#item_4", 1, {x: '90px', y: '560px', borderRadius: '100px', backgroundColor: 'blue', rotation: 300, ease: Linear.easeNone}, "-=2.4"),
TweenMax.to("#item_5", 1, {x: '-120px', y: '500px', borderRadius: '100px', backgroundColor: 'black', rotation: 300, ease: Linear.easeNone}, "-=4")
])
;


  var scene = new ScrollMagic.Scene({
    triggerElement: ".footer",
    triggerHook: .35,
    duration: 800
  })
    .setTween(tween)
    .addIndicators({
        name: "1 (duration: 0)"
      }) // add indicators (requires plugin)
    .addTo(controller);

  // var scene = new ScrollMagic.Scene({
  //     triggerElement: "#trigger1"
  //   })
  //   .setTween("#animate1", 0.5, {
  //     backgroundColor: "green",
  //     scale: 2.5
  //   }) // trigger a TweenMax.to tween
  //   .addIndicators({
  //     name: "1 (duration: 0)"
  //   }) // add indicators (requires plugin)
  //   .addTo(controller);

  // var scene2 = new ScrollMagic.Scene({
  //     triggerElement: "#trigger2",
  //     duration: 300
  //   })
  //   // animate color and top border in relation to scroll position
  //   .setTween("#animate2", {
  //     borderTop: "30px solid white",
  //     backgroundColor: "blue",
  //     scale: 0.7
  //   }) // the tween durtion can be omitted and defaults to 1
  //   .addIndicators({
  //     name: "2 (duration: 300)"
  //   }) // add indicators (requires plugin)
  //   .addTo(controller);
});