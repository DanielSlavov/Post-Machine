var engine = {
    commands: cmBox.getCommands(),
    next: 0,
    //checks if the user has entered an infinite loop
    loopCheck: function () {
        if (strip.currentNum < 20 || strip.currentNum > 480) {
            return true;
        } else {
            return false;
        }
    },
    //step executes a single command
    step: function () {

        if (engine.commands[engine.next] === undefined) {
            engine.next = false;
            return;
        }
        cmBox.goTo(engine.next);
        var command = engine.commands[engine.next].split(' ');
        switch (command[0]) {
            case 'L':
                strip.right();
                break;
            case 'R':
                strip.left();
                break;
            case 'P':
                if (strip.check() && !$("#debugIgnore").is(":checked")) {
                    navigator.notification.alert(langData.postDebug.pError + (engine.next + 1), function () {}, "");
                    engine.next = false;
                    return;
                }
                strip.P();
                break;
            case 'D':
                if (!strip.check() && !$("#debugIgnore").is(":checked")) {
                    //alert(langData.postDebug.dError + (engine.next + 1));
                    navigator.notification.alert(langData.postDebug.dError + (engine.next + 1), function () {}, "");
                    engine.next = false;
                    return;
                }
                strip.D();
                break;
            case 'S':
                return true;
            default:

                if (command[1] == "X" || command[2] == "X") {
                    //alert(langData.postDebug.editX + (engine.next + 1));
                    navigator.notification.alert(langData.postDebug.editX + (engine.next + 1), function () {}, "");
                    engine.next = false;
                    return;
                } else {
                    if (strip.check()) {

                        engine.next = command[1] - 2;
                    } else {
                        engine.next = command[2] - 2;
                    }
                }


        }
        // cmBox.goTo(engine.next);
        if (engine.next - 1 != false) {
            $('#backButton').attr("disabled", true);
            $('#strip').css('pointer-events', 'none');
        }
        if (engine.next >= engine.commands.length - 1) {
            $('#backButton').attr("disabled", false);
            $('#strip').css('pointer-events', 'auto');
        }
        engine.next++;
        if (engine.next == engine.commands.length) {

            return true;
        }

    },
    //steps through all commands
    start: function () {
        var count = 0;
        engine.next = 0;
        while (true) {
            count++;
            if ((strip.currentNum < 20 || strip.currentNum > (strip.cbCount - 20)) || count > strip.cbCount) {
                if (count > 1000) {
                   // alert(langData.postDebug.loopError)
                    navigator.notification.alert(langData.postDebug.loopError, function () {}, "");
                    engine.null();
                    strip.centerBox(strip.cbCount / 2);
                    return;
                }
                if (engine.next === false) {
                    engine.null();
                    return;
                };
                if (engine.step() === true) {
                    if (!engine.isTesting) {
                       // alert(langData.postDebug.noErrors);
                        navigator.notification.alert(langData.postDebug.noErrors, function () {}, "");
                    }
                    engine.null();
                    return;
                }
            }
        }
    },
    //steps a command through some interval
    startInterval: function () {
        setInterval(engine.step, 1500);
    },
    //executes an array of commands, witouth affecting the commands entered by the user
    testCommands: function (newCommands) {
        engine.isTesting = true;
        engine.commands = newCommands;
        engine.start();
        engine.commands = cmBox.getCommands();
        engine.isTesting = false;
    },
    //stops the engine
    null: function () {
        engine.next = 0;
        $('#backButton').attr("disabled", false);
        $('#strip').css('pointer-events', 'auto');
    }
}
//event listeners
$(document).on('click', '#startButton', function () {
    engine.start();
});
$(document).on('click', '#stepButton', function () {
    engine.step();
});
$(document).on('click', '#startOverButton', function () {
    cmBox.goTo(0);
    engine.null();
});