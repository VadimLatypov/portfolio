$(document).ready(() => {
    console.log('Сайт запущен!!!');

    // Запуск курсора
    cursorMove();

    // Параллакс
    parallax();

    $(window).scroll(() => {
        // здесь можно делать эффекты для блоков
        // if($(window).scrollTop() == $('#about').offset().top - 100) {
        //     printText(text_about, $('#about')[0]);
        // }

        // Вывод about
        if($(window).scrollTop() >= ($('#about').offset().top - ($('#about').outerHeight() * 0.8))) {
            $('#about .about-text').slideDown('slow');
        } else {
            $('#about .about-text').slideUp('slow');
        }

        // Вывод stack
        if($(window).scrollTop() >= ($('#stack').offset().top - ($('#stack').outerHeight() / 2))) {
            $('#stack .skill div').addClass('active');
        } 
        if($(window).scrollTop() < ($('#stack').offset().top - ($(window).height())) || $(window).scrollTop() >= ($('#stack').offset().top + ($('#stack').outerHeight()))) {
            $('#stack .skill div').removeClass('active');
            setTimeout(() => {
                $('#stack .skill').find('ul').slideUp('fast');
                $('#stack .skill').removeClass('showList');
            }, 1000)
        }



        // console.log($(window).scrollTop() + ', ' + ($('#stack').offset().top + ($('#stack').outerHeight())))

        if($(window).scrollTop() >= $(document).height() - $(window).height() - 1) {
            console.log("страница прокручена");
        }
    });
})


// Курсор
const cursorMove = () => {
    $(window).on('mousemove', e => {
        if(!e.target)
            return

        $("body").hover(function(){
            $("#cursor").addClass("show");
        }, function () {
            $("#cursor").removeClass("show");
        });

        $('#cursor').css('left', e.pageX + 'px');
        $('#cursor').css('top', e.pageY + 'px');

        $(".activeMouse").hover(() => {
            $("#cursor").addClass("active");
        }, () => {
            $("#cursor").removeClass("active");
        });
    })
}


// Переход к разделу
const toElement = (id) => {
    $('html, body').animate({
        scrollTop: ($(id).offset().top - 50)
    }, 1500)
}


// Параллакс эффект
const parallax = () => {
    $(window).scroll(() => {
        $('#mountain1').css('transform', `translateY(-${scrollY * 0.1}px)`);
        $('#mountain2').css('transform', `translateY(-${scrollY * 0.3}px)`);
        $('#mountain3').css('transform', `translateY(-${scrollY * 0.7}px)`);
        $('#mountain4').css('transform', `translateY(-${scrollY * 1}px)`);
    })
}


// Навигация
let nav = true;

$('#nav-control').click(() => {
    if(nav) {
        $('#nav-control .first').css({
            'transform': 'rotate(315deg) translateX(-6px)'
        });
        $('#nav-control .second').css({
            'transform': 'rotate(-315deg) translateX(-6px)'
        });
        $('header nav p').show('fast');
    } else {
        $('#nav-control .first').css({
            'transform': 'rotate(0deg) translateX(0px)'
        });
        $('#nav-control .second').css({
            'transform': 'rotate(0deg) translateX(0px)'
        });
        $('header nav p').hide('fast');
    }
    nav = !nav;
})


// Показать / скрыть навык
const showList = (el) => {
    $(el).find('ul').slideToggle('slow');
    $(el).toggleClass('showList');
}


// Узнать больше (элемент портфолио)
let portfolio = [
    {
        title: 'portfolio',
        img: 'portfolio.png',
        description: 'Сайт-портфолио, на котором Вы сейчас находитесь, является моей визитной карточкой. Написан с использованием таких технологий, как <b>SCSS</b>, <b>jQuery</b>, <b>сборщик GULP</b>, и немного <b>AJAX+PHP</b> под нужды почты.',
        link: 'https://ltvi.site'
    },
    {
        title: 'cutdown',
        img: 'cutdown.png',
        description: 'Сервис по сокращению ссылок целиком и полностью написан "<b>чистым</b>" кодом, без использования каких-либо библиотек и фреймворков. В основу взят язык <b>PHP</b> и схема проектирования <b>MVC</b>, а также СУБД <b>MySQL</b>.',
        link: 'https://cutdown.ltvi.site'
    },
]

const learnMore = (site) => {
    portfolio.forEach(el => {
        if(site == el.title) {
            $('.learn-more img').attr('src', `img/sites/${el.img}`);
            $('.learn-more p').html(el.description);
            $('.learn-more .go-to a').attr('href', el.link);
            $('.learn-more').slideDown('slow');
            $('.mask').fadeIn('fast');
        } else {
            return;
        }
    });
    if(site == 'portfolio')
        $('.learn-more .go-to').hie('fast');
    else {
        setTimeout(() => {
            $('.learn-more .go-to').fadeIn('slow');
        }, 500);
    }
    
}

const closeLearnMore = () => {
    $('.learn-more .go-to').fadeOut('fast');
    $('.learn-more').slideUp('slow');
    $('.mask').fadeOut('fast');
}

$('.mask').click(() => {
    closeLearnMore();
});

$('.learn-more .close').click(() => {
    closeLearnMore();
})




















// Самопечатающийся текст
let text = 'Привет';
let element = $("#result")[0];

const printText = (text, element) => {
    if(text.length > 0) {
        element.innerHTML += text[0];
        setTimeout(() => {
            printText(text.slice(1), element); 
        }, 1);
    }
}
// printText(text, element);





// Пример скролла
// $(window).scroll(() => {
//     let scroll_top = scrollY
//     let el = $('#about').offset().top
//     let docHeight = $(document).height()
//     let winHeight = $(window).height()

//     // Пример применения свойств
//     // if(scroll_top >= el) {
//     //     $('#about').css({
//     //         'color': 'red'
//     //     })
//     // } 
//     // if(scroll_top < el) {
//     //     $('#about').css({
//     //         'color': '#ededed'
//     //     })
//     // }

//     console.log(`Скрол от начала страницы: ${scroll_top}\n
//         Положение элемента: ${el}\n
//         Высота документа: ${docHeight}
//         Высота окна: ${winHeight}`)
// })


// $(document).ready(function() {
//     // MODAL
//     var modalText = {
//       discover: {
//         title: 'ChowNow Discover',
//         tag: 'FOOD ORDERING PLATFORM.',
//         detail:
//           'ChowNow Discover is a platform that lets customers discover new local restaurants and provides business owners with tools to convert first time orders into lifelong diners.',
//         link: 'https://eat.chownow.com/'
//       }
//     };
  
//     $('#gallery .button').on('click', function() {
//       fillModal(this.id);
//       $('.modal-wrap').addClass('visible');
//     });
  
//     $('.close').on('click', function() {
//       $('.modal-wrap, #modal .button').removeClass('visible');
//     });
  
//     $('.mask').on('click', function() {
//       $('.modal-wrap, #modal .button').removeClass('visible');
//     });
  
//     var carousel = $('#carousel'),
//       slideWidth = 700,
//       threshold = slideWidth / 3,
//       dragStart,
//       dragEnd;
  
//     setDimensions();
  
//     $('#next').click(function() {
//       shiftSlide(-1);
//     });
//     $('#prev').click(function() {
//       shiftSlide(1);
//     });
  
//     carousel.on('mousedown', function() {
//       if (carousel.hasClass('transition')) return;
//       dragStart = event.pageX;
//       $(this).on('mousemove', function() {
//         dragEnd = event.pageX;
//         $(this).css('transform', 'translateX(' + dragPos() + 'px)');
//       });
//       $(document).on('mouseup', function() {
//         if (dragPos() > threshold) {
//           return shiftSlide(1);
//         }
//         if (dragPos() < -threshold) {
//           return shiftSlide(-1);
//         }
//         shiftSlide(0);
//       });
//     });
  
//     function setDimensions() {
//       if (
//         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//           navigator.userAgent
//         )
//       ) {
//         slideWidth = $(window).innerWidth();
//       }
//       $('.carousel-wrap, .slide').css('width', slideWidth);
//       $('.modal').css('max-width', slideWidth);
//       $('#carousel').css('left', slideWidth * -1);
//     }
  
//     function dragPos() {
//       return dragEnd - dragStart;
//     }
  
//     function shiftSlide(direction) {
//       if (carousel.hasClass('transition')) return;
//       dragEnd = dragStart;
//       $(document).off('mouseup');
//       carousel
//         .off('mousemove')
//         .addClass('transition')
//         .css('transform', 'translateX(' + direction * slideWidth + 'px)');
//       setTimeout(function() {
//         if (direction === 1) {
//           $('.slide:first').before($('.slide:last'));
//         } else if (direction === -1) {
//           $('.slide:last').after($('.slide:first'));
//         }
//         carousel.removeClass('transition');
//         carousel.css('transform', 'translateX(0px)');
//       }, 700);
//     }
  
//     function fillModal(id) {
//       $('#modal .title').text(modalText[id].title);
//       $('#modal .detail').text(modalText[id].detail);
//       $('#modal .tag').text(modalText[id].tag);
//       if (modalText[id].link)
//         $('#modal .button')
//           .addClass('visible')
//           .parent()
//           .attr('href', modalText[id].link);
  
//       $.each($('#modal li'), function(index, value) {
//         $(this).text(modalText[id].bullets[index]);
//       });
//       $.each($('#modal .slide'), function(index, value) {
//         $(this).css({
//           background:
//             "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
//           backgroundSize: 'cover'
//         });
//       });
//     }
//   });
  