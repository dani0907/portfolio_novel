
$("#gnb .gnbList > li").on("mouseenter",function(){
    $("#header").addClass("on");
})
$("#gnb .gnbList > li").on("mouseleave",function(){
    $("#header").removeClass("on");
})

Splitting();

let time01 = gsap.timeline({});
let time02 = gsap.timeline({paused:true});
let time03 = gsap.timeline({paused:true});
time01.from("#mainVisual .visual01 .txt .sub .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    delay:1,
    stagger:{
        each:0.05
    }
})
.from("#mainVisual .visual01 .txt .main .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    stagger:{
        each:0.05
    }
})
time02.from("#mainVisual .visual02 .txt .sub .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    delay:1,
    stagger:{
        each:0.05
    }
})
.from("#mainVisual .visual02 .txt .main .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    stagger:{
        each:0.05
    }
})
time03.from("#mainVisual .visual03 .txt .sub .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    delay:1,
    stagger:{
        each:0.05
    }
})
.from("#mainVisual .visual03 .txt .main .char",{
    duration:1,
    opacity:0,
    x:100,
    ease:"back.out",
    stagger:{
        each:0.05
    }
})

let mainVisual = new Swiper("#mainVisual .mask",{
    speed:1500,
    effect:"fade",
    autoplay:{
        delay:5000,
    },
    navigation:{
        prevEl:"#mainVisual .btnPrev",
        nextEl:"#mainVisual .btnNext",
    },
    on:{
        slideChange:function(){
           if(this.realIndex===0){
               time01.restart();
           }else if(this.realIndex===1){
               time02.restart();
           }
           else if(this.realIndex===2){
               time03.restart();
           }
        }
    }
})


//product

let productDesc = new Swiper("#product .descBox .mask",{
    loop:true,
    effect:"fade",
    fadeEffect:{
        crossFade:true
    },
    allowTouchMove:false,
    speed:1000,
    navigation:{
        prevEl:"#product .btnPrev",
        nextEl:"#product .btnNext",
    }
});
//slidesPerView auto돌리면 css에서 넓이지정해줘야함. 

let product = new Swiper("#product .productBox .mask",{
    loop:true,
    centeredSlides:true,
    slidesPerView:"1",
    //auto를 쓰려면 넓이값이 있어야함. 기본값은 1(화면에 슬라이드 하나 보임)
    spaceBetween:50,
    //allowTouchMove:false,
    speed:1000,
    thumbs:{
        swiper:productDesc
    },
    //thumbs 안에 쓸 변수(let productDesc)가 위로 가야함. allowTouchMove 설명은 끌어서 못 옮기게 
    navigation:{
        prevEl:"#product .btnPrev",
        nextEl:"#product .btnNext",
    },
    breakpoints: {
        // when window width is >= 640px
        1100: {
          slidesPerView: "auto",
          spaceBetween: 250
        }
      }
});
let summaryMotion = gsap.timeline({paused:true});
summaryMotion.from("#summary .contentsBox:nth-child(1)",{
    opacity:0,
    duration:1,
    x:"-100%",
    ease:"power4.out"
})
.from("#summary .contentsBox:nth-child(2) .contents:nth-child(1) .imgBox",{
    opacity:0,
    duration:1,
    x:"-100%",
    ease:"power4.out"
},"-=0.8")
.from("#summary .contentsBox:nth-child(2) .contents:nth-child(1) .infoBox",{
    opacity:0,
    duration:1,
    x:"-100%",
    ease:"power4.out"
},"-=0.8")
.from("#summary .contentsBox:nth-child(2) .contents:nth-child(2) .infoBox",{
    opacity:0,
    duration:1,
    x:"-100%",
    ease:"power4.out"
},"-=0.8")
.from("#summary .contentsBox:nth-child(2) .contents:nth-child(2) .imgBox",{
    opacity:0,
    duration:1,
    x:"-100%",
    ease:"power4.out"
},"-=0.8")

let processMotion = gsap.timeline({paused:true,onComplete:function(){
    console.log("processMotion end");
    let num=0;
    $("#process .icons li").eq(num).addClass("on");
    let iconMove = setInterval(function(){
        num++;
        num=num%8;
        $("#process .icons li").eq(num).addClass("on");
        $("#process .icons li").eq(num).siblings().removeClass("on");
    },2000);
}});
processMotion.from("#process .icons li",{
    opacity:0,
    duration:1,
    x:"-100%",
    ease:"power4.out",
    stagger:{
        each:0.1
    }
},"-=0.8")


$(window).on("scroll",function(){
    let st = $(window).scrollTop();
    let summary = $("#summary").offset().top;
    //위치값, scrollmagic을 써도 됨
    if(st>summary-300){
        if(!$("#summary").hasClass("scroll")){
            $("#summary").addClass("scroll");
            summaryMotion.restart();

        }
    }
    
    let process = $("#process").offset().top;
    if(st>process-300){
        if(!$("#process").hasClass("scroll")){
            $("#process").addClass("scroll");
            processMotion.restart();
        }
        
    }

    if(st>0){
        if(!$("#header").hasClass("scroll")){
            $("#header").addClass("scroll");
        }
    }else{
        if($("#header").hasClass("scroll")){
            $("#header").removeClass("scroll");
        }
    }
})

$(window).on("resize",function(){
    let w = $(window).width()+17;
    if(w<=1240){
        if(!$("body").hasClass("mobile")){
            $("body").addClass("mobile");
        }
        $("#sitemap").hide();
        $("body").addClass("mobile");
        //hide()==display none;
    }
    else{
        if($("body").hasClass("mobile")){
            $("body").removeClass("mobile");
            $(".btnAll").removeClass("on");
            $("#gnb").removeClass("on");
            $("#gnb .gnbList > li .depth02").removeAttr("style");
        }
    }
})

$(window).trigger("resize");
$(window).trigger("scroll");

$(".btnAll").on("click",function(){
    if(!$("body").hasClass("mobile")){
        $("#sitemap").fadeIn(250);
    $("body").addClass("overHidden");
    }
    else{
        $("#gnb").toggleClass("on");
        $(this).toggleClass("on");
    }
    
    return false;
});

$(".btnClose").on("click",function(){
    $("#sitemap").fadeOut(250);
    $("body").removeClass("overHidden");
    return false;
})

$("#gnb .gnbList > li .depth01").on("click",function(){
    if($("body").hasClass("mobile")){
        $(this).next(".depth02").stop().slideToggle();
        $(this).parent().siblings().find(".depth02").stop().slideUp();
        //선택하면 다른 depth02 는 닫히는 거
        $(this).toggleClass("on");
        $(this).parent().siblings().find(".depth01").removeClass("on");
        return false;    
    }
    
})