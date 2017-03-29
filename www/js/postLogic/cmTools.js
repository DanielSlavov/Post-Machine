var cmTools = {
    init: function () {
        $("#commandForm button").on("click", function () {
            $("#commandForm button").removeClass("btn-info");
            $(this).addClass("btn-info");
        })
        $("#L").click(function () {
            cmTools.selection = "L";
        })
        $("#R").click(function () {
            cmTools.selection = "R";
        })
        $("#P").click(function () {
            cmTools.selection = "P";
        })
        $("#D").click(function () {
            cmTools.selection = "D";
        })
        $("#F").click(function () {
            cmTools.selection = "S";
        })
        $("#IF").click(function () {
            cmTools.selection = "?";
            if ($("#ifTrue").val() == "") {
                $("#ifTrue").focus();
            } else {
                $("#ifFalse").focus();
            }
        })
        $("#ifTrue").click(function () {
            cmTools.selection = "?";
            $("#commandForm button").removeClass("btn-info");
            $("#IF").addClass("btn-info");
        })
        $('#add').click(function () {
            if (cmTools.selection == '?') {
                var first = parseInt($('#ifTrue').val());
                var last = parseInt($('#ifFalse').val());
                if (first > 0 && last > 0) {
                    cmBox.addCommand(cmTools.selection + ' ' + first + ' ' + last);
                }
                $('.ifArgs').val('');
            } else {
                cmBox.addCommand(cmTools.selection);
            }
        })
        $('#del').click(function () {
            cmBox.deleteCommand();

        })
        $('#del').on('mousedown', function (e) {
            interval = setInterval(function () {
                navigator.notification.confirm(langData['postCommands'].deleteAll, function (index) {
                    if (index !== 1) return;
                    cmBox.clearAll();
                    strip.reset();
                }, "", langData['post'].okCancel)
                clearInterval(interval);
            }, 800);
        });
        $('#del').on('mouseup', function (e) {
            clearInterval(interval);
        });
        $('#edit').click(function () {
            if (cmTools.selection == '?') {
                var first = parseInt($('#ifTrue').val());
                var last = parseInt($('#ifFalse').val());
                if (first > 0 && last > 0) {
                    cmBox.editCommand(cmTools.selection + ' ' + first + ' ' + last);
                }
                $('.ifArgs').val('');
            } else {
                cmBox.editCommand(cmTools.selection);
            }
        })
    }
}
cmTools.init();