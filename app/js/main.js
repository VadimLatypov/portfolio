$(document).ready(() => {
    console.log('Сайт запущен!!!');

    // Запуск курсора
    cursorMove();

    // Параллакс
    parallax();

    $(window).scroll(() => {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            alert("страница прокручена");
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
        scrollTop: $(id).offset().top
    }, 2000)
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
        $('#nav-control div:first-of-type').css({
            'transform': 'rotate(315deg) translateX(6px)'
        });
        $('#nav-control div:last-of-type').css({
            'transform': 'rotate(-315deg) translateX(6px)'
        }, 500);
        $('header nav a').show('fast');
    } else {
        $('#nav-control div:first-of-type').css({
            'transform': 'rotate(0deg) translateX(0px)'
        });
        $('#nav-control div:last-of-type').css({
            'transform': 'rotate(0deg) translateX(0px)'
        }, 500);
        $('header nav a').hide('fast');
    }
    nav = !nav;
})




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
