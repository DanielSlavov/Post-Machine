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
                $('.taskSmall button').text(langData['post'].load);
                $('.taskBig button').text(langData['post'].load);


            }
        });
        $.get('template/taskPreview.html', function (templ) {
            taskManager.taskPreview = templ;
        })

        $(document).on('click', '.taskLoadButton', function () {
            post.setTask($(this).parent().parent().attr('id'));
            viewManager.showAsyncScreen('post');
        })
        $(document).on('click', '.taskContainer', taskManager.switchTask)
        console.log('taskManager initialized')
    },
    switchTask: function () {
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