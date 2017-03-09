var home = {
    init: function () {
        return $.get("template/home.html", function (templ) {
            templ = Mustache.render(templ, langData['home']);
            viewManager.addAsyncScreen('home', templ, true);
            if (localStorage['lang'] == 'bg') {
                $('#myonoffswitch').prop('checked', false);
            } else {
                $('#myonoffswitch').prop('checked', true);
            }
            $("#myonoffswitch").change(function () {
                if ($(this).prop('checked')) {
                    localStorage['lang'] = 'en'
                    setTimeout(function () {
                        location.reload();
                    }, 400);
                } else {
                    localStorage['lang'] = 'bg'
                    setTimeout(function () {
                        location.reload();
                    }, 400);
                }
            })
        })

    }
};