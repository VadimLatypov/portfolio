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



        if($(window).scrollTop() >= ($('#stack').offset().top - ($('#stack').outerHeight() / 2))) {
            $('#stack .skill div').addClass('active');
        } 
        if($(window).scrollTop() < ($('#stack').offset().top - ($(window).height())) || $(window).scrollTop() >= ($('#stack').offset().top + ($('#stack').outerHeight()))) {
            $('#stack .skill div').removeClass('active');
            $('#stack .skill').find('ul').slideUp('fast');
            $('#stack .skill').removeClass('showList');
        }



        // console.log($(window).scrollTop() + ', ' + ($('#stack').offset().top + ($('#stack').outerHeight())))

        if($(window).scrollTop() >= $(document).height() - $(window).height() - 1) {
            console.log("страница прокручена");
        }
        // if($(window).scrollTop() - $(window).height() > 1248) {
        //     alert('OK')
        // }
        // console.log($(window).scrollTop() + ', ' + $(window).scrollTop() - $(window).height())
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
        $('#mountain1').css('transform', `translateY(-${scrollY * 0.3}px)`);
        $('#mountain2').css('transform', `translateY(-${scrollY * 0.5}px)`);
        $('#mountain3').css('transform', `translateY(-${scrollY * 0.7}px)`);
        $('#mountain4').css('transform', `translateY(-${scrollY * 1}px)`);
    })
}


// Навигация
let nav = false;

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
