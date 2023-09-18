$(document).ready(() => {
    let arr_offset = ['title', 'about', 'stack', 'experience', 'portfolio', 'contact'];

    // Запуск курсора
    cursorMove();

    // Параллакс
    if($(window).width() >= '650') {
        parallax();
    }

    // Слайдер (только мобильные устройства)
    let position = 0;
    let outer_width = 0
    if($(window).width() < '820' && $(window).width() >= '670') {
        outer_width = 2500;
    } else if($(window).width() >= '400' && $(window).width() < '670') {
        outer_width = 1750;
    } else if($(window).width() < '400') {
        outer_width = 1400;
    }

    $('#slider-mobile .prev-slide button').click(() => {
        console.log('prev');
        position += $('#slider-mobile .window-slide').width();
        $('#slider-mobile .slide-holder').css({
            'transform': `translateX(${position}px)`
        });
        if(position > 0) {
            $('#slider-mobile .slide-holder').css({
                'transform': `translateX(-${outer_width}px)`
            });
            position = -outer_width;
        }
    });
    $('#slider-mobile .next-slide button').click(() => { 
        position -= $('#slider-mobile .window-slide').width();
        $('#slider-mobile .slide-holder').css({
            'transform': `translateX(${position}px)`
        })
        if(position < -outer_width) {
            $('#slider-mobile .slide-holder').css({
                'transform': `translateX(0px)`
            });
            position = 0;
        }
    });

    // Вертикальная навигация (разметка)
    for (let i = 0; i < arr_offset.length; i++) {
        let offset_top = $(`#${arr_offset[i]}`).offset().top / $(document).height() * 100;
        console.log(offset_top);
        $(`.vertical-navigation .${arr_offset[i]}`).css({
            'top': offset_top + '%'
        })
        if($(window).scrollTop() >= $(`#${arr_offset[i]}`).offset().top) {
            $(`.vertical-navigation .${arr_offset[i]}`).css({
                'background-color': '#0066ff'
            })
        }
    }

    // Эффекты скролла
    $(window).scroll(() => {
        // Отображение вертикальной навигации
        if($(window).scrollTop() >= ($('#about').offset().top - ($('#about').outerHeight() * 0.5))) {
            $('.vertical-navigation').slideDown('fast');
        } else {
            $('.vertical-navigation').slideUp('fast');
        }

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

        // Вертикальная навигация (заливка)
        for (let i = 0; i < arr_offset.length; i++) {
            if($(window).scrollTop() >= ($(`#${arr_offset[i]}`).offset().top - 100)) {
                $(`.vertical-navigation .${arr_offset[i]}`).css('background-color', '#0066ff')
            } else if($(window).scrollTop() < $(`#${arr_offset[i]}`).offset().top) {
                $(`.vertical-navigation .${arr_offset[i]}`).css('background-color', '#222')
            }
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

        if($(window).width() >= '650')
            $('header nav p').show('fast');
        else {
            $('.nav-mobile').show('slow');
            $('#title .header a').slideUp('fast');
            $('header .header nav').css('transform', 'translateY(-260px)')
        }
    } else {
        $('#nav-control .first').css({
            'transform': 'rotate(0deg) translateX(0px)'
        });
        $('#nav-control .second').css({
            'transform': 'rotate(0deg) translateX(0px)'
        });

        if($(window).width() >= '650')
            $('header nav p').hide('fast');
        else {
            $('.nav-mobile').hide('slow');
            $('#title .header a').slideDown('fast');
            $('header .header nav').css('transform', 'translateY(0px)')
        }
    }
    nav = !nav;
})


// Показать / скрыть навык
const showList = (el) => {
    $(el).find('ul').slideToggle('slow');
    $(el).toggleClass('showList');
}


// Окно детального просмотра сайтов портфолио
let portfolio = [
    {
        title: 'portfolio',
        img: 'portfolio.png',
        description: 'Сайт-портфолио, на котором Вы сейчас находитесь, является моей визитной карточкой. Написан с использованием таких технологий, как <b>SCSS</b>, <b>jQuery</b>, <b>сборщик GULP</b> с основными библиотеками, и немного <b>AJAX+PHP</b> под нужды почты.',
        link: 'https://ltvi.site',
        github: 'https://github.com/VadimLatypov/portfolio'
    },
    {
        title: 'cutdown',
        img: 'cutdown.png',
        description: 'Сервис по сокращению ссылок целиком и полностью написан "<b>чистым</b>" кодом, без использования каких-либо библиотек и фреймворков. В основу взят язык <b>PHP</b> и схема проектирования <b>MVC</b>, а также СУБД <b>MySQL</b>. Содержит систему регистрации, авторизации для удобства пользователя, а также обратную связь через библиотеку <b>PHPMailer</b>.',
        link: 'https://cutdown.ltvi.site',
        github: 'https://github.com/VadimLatypov/cutdown'
    },
    {
        title: 'layout',
        img: 'layout.png',
        description: 'Верстка по шаблону <b>Figma</b> выполнена на основе следующего стека: препроцессор <b>SCSS</b>, фреймворк <b>Vue.js</b>, а также сборщик <b>Webpack</b>. Данный сайт не несет смысловой нагрузки, он лишь показывает работу с Vue и SCSS в рамках реализации заданного шаблона (содержит только пару страниц).',
        link: 'https://layout.ltvi.site',
        github: 'https://github.com/VadimLatypov/layout'
    },
]

const learnMore = (site) => {
    portfolio.forEach(el => {
        if(site == el.title) {
            $('.learn-more img').attr('src', `img/sites/${el.img}`);
            $('.learn-more p').html(el.description);
            $('.learn-more .go-to.site a').attr('href', el.link);
            $('.learn-more .go-to.github a').attr('href', el.github);
            $('.learn-more').slideDown('slow');
            $('.mask').fadeIn('fast');
        } else {
            return;
        }
    });
    if(site == 'portfolio') {
        $('.learn-more .go-to.site').hide('fast');
        $('.learn-more .go-to.github').fadeIn('slow');
    } else {
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