$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$.mask.definitions['~'] = '[234]';
$.mask.definitions['*'] = '[3459]';

$("[name = 'phone']").click(function () {
    $(this).setCursorPosition(5);
}).mask("+375(~*)999-99-99");
$("#center_not_ok").mask("+375(~*)999-99-99");

const swiperGalary = new Swiper('.swiperGalary', {
    watchSlidesProgress: true,
    pagination: {
        el: ".swiperGalary .swiper-pagination",
        type: "progressbar",
    },
    breakpoints : {
        1024 : {
            slidesPerView: 5,
        },
        800 : {
            slidesPerView: 4,
        },
        600 : {
            slidesPerView: 3,
        },
        0 : {
            slidesPerView: 1,
        }
    }
})

const swiperReview = new Swiper('.swiperReview', {
    watchSlidesProgress: true,
    simulateTouch: false,
    allowTouchMove: false,
    observer: true,
    observeParents: true,
    navigation: {
        nextEl: ".section-review .swiper-button-next",
        prevEl: ".section-review .swiper-button-prev",
    },
    slidesPerView: 5,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    breakpoints : {
        1024 : {
            slidesPerView: 5,
        },
        800 : {
            slidesPerView: 4,
        },
        0 : {
            slidesPerView: 3,
            spaceBetween: 0,
        },
    }
})

$('.list-question > li').click(function () {
    $(this).toggleClass('open');
    $(this).children('.list-question > li p').toggleClass('active').slideToggle(300);
})

$('.button.open_order_atv').click(function(){
    $('.section-modal_order_atv').fadeIn();
    $('.section-modal .modal').addClass('active');
})

$('button.open_call_back').click(function(){
    $('.section-modal_call_back').fadeIn();
    $('.section-modal .modal').addClass('active');
})

$('.close-modal').click(function(){
    $('.section-modal .modal').removeClass('active');
    $('.section-modal').fadeOut();
})

$('.section-modal').mouseup(function (e) {
    if (!$('.modal').is(e.target) && $('.modal').has(e.target).length === 0) {
        $('.section-modal .modal').removeClass('active');
        $('.section-modal').fadeOut();
    }
});

$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.section-modal .modal').removeClass('active');
        $('.section-modal').fadeOut();
    }
});

function myScrollTo(ellement, marginPx) {
    const ell = document.querySelector(`${ellement}`);
    $('html, body').animate({
        scrollTop: ($(ell).first().offset().top - marginPx),
    }, 500);
    if (window.innerWidth < 1024 && document.querySelector('nav')) {
        $('nav').removeClass('active');
    }
}

$('.open-menu').click(()=>{
    $('nav').addClass('active');
})

$('.close-menu').click(()=>{
    $('nav').removeClass('active');
})

if(document.querySelector('.scroll-home') && window.innerWidth > 1024){
    let scrollPos = 1;
    $(window).scroll(function(){
       var st = $(this).scrollTop();
       if (st < scrollPos){
            $('.scroll-home').addClass('active');
       } else {
        $('.scroll-home').removeClass('active');
       }
       scrollPos = st;
    });
}


$(".form").submit(function (event) {
    $('.form button[type="submit"]').attr('disabled', 'disabled');
    event.preventDefault();
    var the_form = $(this);
    var data = the_form.serialize();

    $.ajax({
        url: '/send.php',
        type: 'POST',
        cache: false,
        data: data,
        dataType: 'html',
        success: function (data) {
            $('.section-modal ').fadeOut(500);
            $('.section-thank').fadeIn(500);
            $('.form button[type="submit"]').removeAttr('disabled');
            $('form').trigger("reset");
            
            setTimeout(()=>{
                $('.section-thank').fadeOut(500);
            }, 3000)
        }
    });
});

var windowHeight = $(window).height();
$(document).on('scroll', function() {
    $('.section-advantages').each(function() {
        var self = $(this),
        height = self.offset().top + self.height();
        if ($(document).scrollTop() + windowHeight >= height) {
            self.addClass('active');
        }
    });
});


