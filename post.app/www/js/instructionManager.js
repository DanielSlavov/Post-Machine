$.get('template/instr.html', function (templ) {
    viewManager.addAsyncScreen('instr', Mustache.render(templ, langData['instructions']));
}).then(function () {
    $('#myCarousel .item').css('height', $(window).height() + 'px')
})
var prx;
$(document).on('touchstart', '#instr', function (e) {
    prx = e.originalEvent.touches[0].screenX
    $('body').on('touchmove', function (e) {
        var offset = prx - e.originalEvent.touches[0].screenX;
        if (offset > 50) {
            $("#myCarousel").carousel("next");
            $("body").off();
            return;
        }
        if (offset < -50) {
            $("#myCarousel").carousel("prev");
            $("body").off();
            return;
        }

    })

})