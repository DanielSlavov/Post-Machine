var taskManager = {
    init: function () {
        viewManager.addAsyncScreen('tasks');
        $.get('template/taskSmall.html', function (templ) {
            taskManager.taskTemplate = templ;
        }).then(function () {
            for (var task in taskData[lang]) {
                console.log(task);
                $('#tasks').append("<div id=" + task + " class='taskContainer' ></div>");
                $('#' + task).html(Mustache.render(taskManager.taskTemplate, taskData[lang][task]));
                $('.taskSmall .taskLoad').text(langData['tasks'].load);
                $('.taskBig .taskLoad').text(langData['tasks'].load);
                $('.taskBig .taskLoadSolution').text(langData['tasks'].loadSolution);
            }
        });
        $.get('template/taskPreview.html', function (templ) {
            taskManager.taskPreview = templ;
        })
        $(document).on('click', '.taskLoad', function () {
            var task = $(this).closest('.taskContainer').attr('id');
            post.setTask(task);
            viewManager.showAsyncScreen('post');
        })
        $(document).on('click', '.taskLoadSolution', function () {
            _this = this;
            navigator.notification.confirm(langData["post"].loadSolutionPromt, function (index) {
                if (index !== 1) return;
                var task = $(_this).closest('.taskContainer').attr('id');
                cmBox.loadFromSave(taskData["solution"][task].solution);
                post.setTask(task);
                viewManager.showAsyncScreen('post');
            }, "", langData['post'].okCancel)

        })
        $(document).on('click', '.taskContainer', taskManager.switchTask)
        console.log('taskManager initialized')
    },
    switchTask: function (e) {
        if (e.target.tagName == "BUTTON") return;
        if (taskManager.currentBig === $(this).attr('id').toString()) {
            $(this).children().eq(0).show();
            $(this).children().eq(1).hide();
            taskManager.currentBig = undefined;
        } else {
            $('#' + taskManager.currentBig).children().eq(1).hide();
            $('#' + taskManager.currentBig).children().eq(0).show();
            taskManager.currentBig = $(this).attr('id');
            $(this).children().eq(0).hide();
            $(this).children().eq(1).show();
        }
    }

}
taskManager.init();