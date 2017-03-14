home.init()
post.init().done(function () {
    initEvents();
    // setTimeout(viewManager.stopLoading, 1000);
    StatusBar.hide()
    FastClick.attach(document.body);
    
})
// $(function () {
//     FastClick.attach(document.body);
// });

//setTimeout(viewManager.stopLoading, 1500);

// #commandForm>button;input
// #commandButtonContainer>button
// #debugContainer
// #homeContainer   
// #navPost