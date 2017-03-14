var cmBox = {
    init: function (lineCount) { //visible line count,  default lineSize = 
        cmBox.lineCount = lineCount;
        cmBox._commands = [];
        cmBox.current = 0;
        $('.listItem').outerHeight(20);
        $('#commandListFrame').css('height', (lineCount * $('.listItem').outerHeight()));
        $('#commandList').append("<div id='listSelector' class='col-xs-3' ></div>");
        $('#listSelector').css('height', $('.listItem').outerHeight() + 2);
        $('#listSelector').css('top', ((cmBox.lineCount / 2) * $('#listSelector').height()));
        $('#listSelector').css('width', $('.listItem').width());

    },
    initFunctionality: function () {
        //centers the blue selector on an exact commands
        cmBox.centerSelector = function () {
            var matched = false;
            var selectorCenter = $('#listSelector').offset().top + ($('#listSelector').height() / 2);
            var upperMargin;
            var lowerMargin;
            for (var i = 0; i <= cmBox._commands.length; i++) {
                upperMargin = $('#li' + i).offset().top;
                lowerMargin = $('#li' + i).offset().top + $('#li' + i).height();
                if (selectorCenter >= upperMargin - 1 && selectorCenter <= lowerMargin + 1) {
                    var nwtop = $('#listSelector').offset().top - $('#li' + i).offset().top;
                    $('#commandList').css('top', $('#commandList').position().top + nwtop);
                    cmBox.current = i - 1;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                var nwtop = $('#listSelector').offset().top - $('#li' + cmBox._commands.length).offset().top;
                $('#commandList').css('top', $('#commandList').position().top + nwtop);
            }
        }
        //loads commands into the box from a save
        cmBox.loadFromSave = function (newCommands) { //loads command list from a save
            cmBox._commands = newCommands;
            cmBox.refreshCommands();
        }
        //centers a the selector on a certain command 'id'
        cmBox.goTo = function (id) { //for debugger
            if (id === false) return;
            id = id + 1;
            try {
                var nwtop = $('#listSelector').offset().top - $('#li' + id).offset().top;
            } catch (err) {
                return;
            }
            $('#commandList').css('top', $('#commandList').position().top + nwtop);

        }
        //adds the commands to the DOM from the array cmBox._commands
        cmBox.refreshCommands = function () {
            for (var i = 1; i <= cmBox._commands.length + 1; i++) {
                $('#li' + i).remove();
            }
            for (var i = 1; i <= cmBox._commands.length; i++) {
                $('#commandList').append("<div id='li" + i + "'class='listItem'>" + i + "&nbsp;" + cmBox._commands[i - 1] + "</div>");
            }
            cmBox.centerSelector();
            engine.commands = cmBox.getCommands();
        }
        cmBox.getCommands = function () {
            return cmBox._commands;
        }
        //moves the selector down once
        cmBox.down = function () {
            var nwtop = $('#commandList').position().top;
            $('#commandList').css('top', nwtop);
        }
        //moves the selector up once
        cmBox.up = function () {
            var nwtop = $('#commandList').position().top - $('.listItem').outerHeight() + 2;
            $('#commandList').css('top', nwtop);
        }
        cmBox.addCommand = function (command) {

            if (command === undefined) {
                return;
            }
            for (var i = 0; i < cmBox._commands.length; i++) {
                if (cmBox._commands[i].length > 1) {
                    var commandTemp = cmBox._commands[i].split(' ');
                    if (parseInt(commandTemp[1]) > cmBox.current) {
                        if (commandTemp[1] < cmBox._commands.length)
                            commandTemp[1]++;
                    };
                    if (parseInt(commandTemp[2]) > cmBox.current) {
                        if (commandTemp[2] < cmBox._commands.length)
                            commandTemp[2]++;
                    };
                    cmBox._commands[i] = commandTemp.join(' ');
                }
            }
            cmBox._commands.splice(cmBox.current + 1, 0, command);
            cmBox.refreshCommands();
            cmBox.up();
            cmBox.centerSelector();
        };
        cmBox.editCommand = function (command) {
            if (command === undefined || cmBox._commands[cmBox.current] == "") {
                return;
            }
            cmBox._commands[cmBox.current] = command;
            cmBox.refreshCommands();

        }
        cmBox.clearAll = function () {

            for (var i = 1; i <= cmBox._commands.length + 1; i++) {
                $('#li' + i).remove();
            }
            cmBox._commands = [];
            engine.commands = cmBox.getCommands();
        }
        cmBox.deleteCommand = function () {
            cmBox.centerSelector();
            if (cmBox.current == -1) return;
            for (var i = 0; i < cmBox._commands.length; i++) {
                if (cmBox._commands[i].length > 1) {
                    var commandTemp = cmBox._commands[i].split(' ');
                    if (parseInt(commandTemp[1]) == cmBox.current + 1) {
                        commandTemp[1] = "X";
                    } else if (parseInt(commandTemp[1]) > cmBox.current) {
                        commandTemp[1]--;
                    };
                    if (parseInt(commandTemp[2]) == cmBox.current + 1) {
                        commandTemp[2] = "X";
                    } else if (parseInt(commandTemp[2]) > cmBox.current) {
                        commandTemp[2]--;
                    };
                    cmBox._commands[i] = commandTemp.join(' ');
                }
            }
            cmBox._commands.splice(cmBox.current, 1);
            cmBox.refreshCommands();
            cmBox.centerSelector();
        }

        cmBox.centerSelector();
        //event listeners for the custom made scrolling
        var prevY;
        $("#commandList").on('touchstart', function (e) {

            $("body").on('touchmove', function (e) {
                var offset = 2;
                if (e.originalEvent.touches[0].screenY < prevY) {
                    offset *= -1;
                }
                var nwtop = ($('#commandList').position().top) + offset;
                if ((($('#li0').offset().top + offset) > $('#listSelector').offset().top) || ($('#li' + cmBox._commands.length).offset().top + offset + 3) < ($('#listSelector').offset().top)) {
                    return;
                }
                $('#commandList').css('top', nwtop);
                prevY = e.originalEvent.touches[0].screenY;
            });
        });
        $("#commandList").on('touchend', function () {
            cmBox.centerSelector();
            clickY = NaN;
            $("body").off();
        })
        //

    }
};
cmBox.init(12);
cmBox.initFunctionality();