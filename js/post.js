var lang;
if (localStorage['lang'] == 'bg') {
    lang = 'bg';
    langData = bg;
    $('#myonoffswitch').prop('checked', false);
} else {
    lang = 'en';
    langData = en;
    $('#myonoffswitch').prop('checked', false);
}
var post = {
    init: function () {
        post.color = "red";
        post.currentTask = false;
        post.currentSaveNum = false;
        post.screenId = 'post';
        return $.get('template/post.html', function (templ) {
            templ = Mustache.render(templ, langData['post']);
            viewManager.addAsyncScreen(post.screenId, templ, false);
        }).then(function () {
            $.get('template/postCommands.html', function (templ) {
                post.commandTemplate = Mustache.render(templ, langData['postCommands']);

            }).then(function () {
                $.get('template/postDebug.html', function (templ) {
                    post.debugTemplate = Mustache.render(templ, langData['postDebug']);
                })
            }).then(function () {
                post.showCommands();
            })
        });




    },
    colorSwitch: function () {
        if (post.color == "red") {
            $(".colorButton").css('background-color', '#66FF99');
            post.color = "green";
        } else {
            $(".colorButton").css('background-color', '#D24958');
            post.color = "red";
        }
    },
    setTask: function (task) {
        if (task == false) {

            post.currentTask = false;
            $("#currentTaskButton").text(langData.post.noTask);
            $(".additionalTask").hide();
            return;
        }
        $(".additionalTask").show();
        post.currentTask = task;
        engine.commands = cmBox.getCommands();
        $("#currentTaskButton").text(taskData[lang][task].name);
        var templ = Mustache.render(taskManager.taskPreview, taskData[lang][task]);
        $("#taskPreviewModal .modal-content").html(templ);
    },
    showCommands: function () {
        return $('#toolsContainer').html(post.commandTemplate);
    },
    showDebug: function () {
        return $('#toolsContainer').html(post.debugTemplate);
    },

};

function initEvents() {
    $(document).on('click', '.homeButton', function () {
        viewManager.showAsyncScreen('home');
    });
    $(document).on('click', '.navPost', function () {
        viewManager.showAsyncScreen('post');
    });
    $(document).on('click', '.navInstr', function () {
        viewManager.showAsyncScreen('instr');
    });
    $(document).on('click', '.navSaves', function () {
        viewManager.showAsyncScreen('saves');
    });
    $(document).on('click', '.navTasks', function () {
        viewManager.showAsyncScreen('tasks');
    });
    $(document).on('click', '.navSettings', function () {
        viewManager.showAsyncScreen('settings');
    })

    //

    $(document).on('keydown', ".ifArgs", function (e) {
        if ((e.which >= 48 && e.which <= 57) || e.which == 8) {
            if ($(this).val() == "" && (e.which == 48 || e.which == 8)) {
                return false;
            }
        } else {
            return false;
        }
    });
    $(document).on('click', '#backButton', function () {
        post.showCommands();
    });
    $(document).on('click', '#debugButton', function () {
        post.showDebug();
    });
    $(document).on('click', '#modalDone', function () {
        if ($("#modalInput").val().length < 3) {
            return;
        }
        if (saveManager.createSave($("#modalInput").val(), cmBox.getCommands(), post.currentTask) == false) {
            alert(langData['post'].nameTaken);
        }
        $("#saveButton").removeClass('btn-default').addClass('btn-success');
        $("#saveModal").modal("hide");
    });
    $(document).on('click', '#saveButton', function () {
        if (post.currentSaveNum !== false && post.currentTask == saveManager.saves[post.currentSaveNum].task) {
            saveManager.updateSave(post.currentSaveNum, cmBox.getCommands());
            return;
        }
        $("#saveModal").modal("show");
    })
    $(document).on('click', '#modalSaveCancel', function () {
        $("#saveModal").modal("hide");
    })
    $(document).on('click', '.save>button', function () { //loadButton 
        var number = $(this).parent().data('savenum');
        saveManager.getSaves();
        cmBox.loadFromSave(saveManager.saves.reverse()[number].data);
        post.setTask(saveManager.saves[number].task);
        post.currentSaveNum = number;
        viewManager.showAsyncScreen('post');
    })
    //currentTaskButton
    $(document).on('touchstart', '#currentTaskButton', function () {
        if (post.currentTask !== false) {
            $("#taskPreviewModal").modal('show');
            $("body").on('touchend', function () {
                $("#taskPreviewModal").modal('hide');
                $("body").off()
            })
        }

    });
    $(document).on('click', '#clearTask', function () {
        post.setTask(false);
    })
    $(document).on('click', '#checkTask', test);
    $(document).on('click', '#currentTaskButton', function () {
        if (post.currentTask == false) {
            viewManager.showAsyncScreen("tasks");
        }
    });
    document.addEventListener("backbutton", function () {
        if (post.shownTools == "command" && viewManager.current == "post") {
            post.showCommands;
            return;
        }
        viewManager.showAsyncScreen('home');
    }, false);
};

function backButtonSimulation() {
    viewManager.showAsyncScreen('home');
}

function test() {
    if (post.currentTask == false) {
        alert('no task selected');
        return;
    }
    var testInput = taskData["solution"][post.currentTask].testInput;
    var testFinal = taskData["solution"][post.currentTask].testFinal;



    strip.reset();
    engine.testCommands(testInput);
    engine.start();
    var current = strip.toBoolArray();
    for (var i = 0; i < testFinal.length; i++) {
        if (testFinal[i] != current[i]) {
            strip.reset();
            alert(langData['post'].testFailed);
            return false;
        }
    }

    strip.reset();
    alert(langData['post'].testSuccess);
}

function square() {
    var h = $('.square').css('width');
    $('.square').css('height', h);
}

function center() {
    $('#listSelector').css('width', $('.listItem').width());
    $('#head').css('top', $(document).height() - strip.cbSize - $('#head').height());
    $('#head').css('left', $(document).width() / 2);
    strip.centerBox();
}