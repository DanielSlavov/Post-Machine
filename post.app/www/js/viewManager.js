var viewManager = {
    addAsyncScreen: function (id, templ, show) {
        $('body').append('<div class="screen" id=' + id + '></div>');
        $('#' + id).html(templ);
        if (show == undefined || show == false) $("#" + id).hide();
    },
    removeAsyncScreen: function (id) {
        $('#' + id).remove();
    },
    updateAsyncScreen: function (id, templ) {
        $('#' + id).html(templ);
    },
    hideAsyncScreen: function (id) {
        $("#" + id).hide();
    },
    showAsyncScreen: function (id) {
        $('.modal').modal('hide');
        $('.screen').hide();
        $("#" + id).show();
        viewManager.current = id;
    },
    stopLoading: function () {
        // $('#loadingScreen').remove();
    }
};
// $.get('template/home.html', function (templ) {
//     console.log(templ)
//     viewManager.addAsyncScreen('home', templ, true);
// })
$(".item").css('height', $('body').height)