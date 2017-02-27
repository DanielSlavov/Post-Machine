home.init()
post.init().done(function () {
    initEvents();
    // setTimeout(viewManager.stopLoading, 1000);
})
$(function () {
    FastClick.attach(document.body);
});
