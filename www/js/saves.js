var saveManager = {
    init: function () {
        viewManager.addAsyncScreen('saves');
        saveManager.getSaves();
        saveManager.domSaves();
    },
    getSaveName:function(num){
        return saveManager.saves[num].name;
    },
    deleteSave: function (num) {
        saveManager.saves.splice(num, 1);
        saveManager.domSaves();
        saveManager.storeSaves();
    },
    createSave: function (name, data, task) {
        console.log(name, task);
        for (var i = 0; i < saveManager.saves.length; i++) {
            if (saveManager.saves[i].name == name) {
                return false;
            }
        }
        saveManager.saves.push({
            date: new Date().toJSON().slice(0, 10),
            name: name,
            data: data,
            task: task
        });
        saveManager.storeSaves();
        saveManager.domSaves();
    },
    updateSave: function (num, data) {
        saveManager.saves[num]['date'] = new Date().toJSON().slice(0, 10);
        saveManager.saves[num]['data'] = data;
        saveManager.storeSaves();
        saveManager.domSaves();
    },
    getSaves: function () {
        if (JSON.parse(window.localStorage.getItem('saves')) == null) {
            saveManager.saves = [];
            return;
        }
        saveManager.saves = JSON.parse(window.localStorage.getItem('saves'));
    },
    domSaves: function () {
        $(".save").remove();
        var date, name, task = "";
        for (var i = saveManager.saves.length - 1; i >= 0; i--) {
            date = saveManager.saves[i].date;
            name = saveManager.saves[i].name;
            task = saveManager.saves[i].task
            if (saveManager.saves[i].task != undefined) {
                task = saveManager.saves[i].task;
            }

            $('#saves').append('<div class="save" data-savenum=' + i + '><div class="col-xs-4">' + date + '</div><div class="col-xs-4">' + name + '</div><button type="button" class="btn btn-default col-xs-offset-1">' + langData['post'].load + '</button><span class="glyphicon glyphicon-remove text-warning" aria-hidden="true"></span></div>');
        }
    },
    storeSaves: function () {
        window.localStorage.setItem('saves', JSON.stringify(saveManager.saves));
    }
}
saveManager.init();

//viewManager.addAsyncScreen('saves');
// for (var i = 0; i < 30; i++) {
//     console.log(i);
//     $('#saves').append('<div class="save"><div class="col-xs-4">06/05/2016</div><div class="col-xs-4">gosho</div><button type="button" class="btn btn-default">Load</button></div>');
// }