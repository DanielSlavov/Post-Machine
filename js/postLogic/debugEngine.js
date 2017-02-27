var engine = {
    commands: cmBox.getCommands(),
    next: 0,
    loopCheck: function () {
        if (strip.currentNum < 20 || strip.currentNum > 480) {
            return true;
        } else {
            return false;
        }
    },
    step: function () {
        if (engine.next === 0) {
            engine.commands = cmBox.getCommands();
        }
        if (engine.commands[engine.next] === undefined) {
            engine.next = false;
            return;
        }
        var command = engine.commands[engine.next].split(' ');
        if (command[0] == 'S') {
            cmBox.goTo(engine.next);
            engine.next = false;
        }

        switch (command[0]) {
            case 'L':
                strip.left();
                break;
            case 'R':
                strip.right();
                break;
            case 'P':
                if (strip.check() && !$("#debugIgnore").is(":checked")) {
                    alert(langData.postDebug.pError);
                    engine.next = false;
                    return;
                }
                strip.P();
                break;
            case 'D':
                if (!strip.check() && !$("#debugIgnore").is(":checked")) {
                    alert(langData.postDebug.dError);
                    engine.null();
                    return;
                }
                strip.D();
                break;
            default:

                if (command[1] == "X" || command[2] == "X") {
                    alert(langData.postDebug.editX + (engine.next + 1));
                    engine.next = false;
                    return;
                } else {
                    if (strip.check()) {

                        engine.next = command[1] - 2;
                        console.log(engine.next)
                    } else {
                        engine.next = command[2] - 2;
                        console.log(engine.next)
                    }
                }


        }
        cmBox.goTo(engine.next + 1);

        if (engine.next - 1 != false) {
            $('#backButton').attr("disabled", true);
            $('#strip').css('pointer-events', 'none');
        }
        if (engine.next >= engine.commands.length - 1) {
            $('#backButton').attr("disabled", false);
            $('#strip').css('pointer-events', 'auto');
        }
        engine.next++;

    },
    start: function () {
        var count = 0;
        engine.next = 0;
        while (true) {
            if (strip.currentNum < 20 || strip.currentNum > 480) {
                alert(langData.postDebug.loopError)
                engine.null();
                return;
            }
            if (engine.next === false) {
                return;
            };
            count++;
            engine.step();
        }
    },
    startInterval: function () {
        setInterval(engine.step, 1500);
    },
    testCommands: function (newCommands) {
        engine.commands = newCommands;
        engine.start();
        engine.commands = cmBox.getCommands();
    },
    null: function () {
        engine.commands = cmBox.getCommands();
        engine.next = 0;
        $('#backButton').attr("disabled", false);
        $('#strip').css('pointer-events', 'auto');
    }
}

$(document).on('click', '#startButton', function () {
    strip.reset();
    engine.start();
});
$(document).on('click', '#stepButton', function () {
    engine.step();
});
$(document).on('click', '#startOverButton', function () {
    cmBox.goTo(0);
    engine.null();
});