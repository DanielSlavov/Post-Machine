var clickX = 0;
var strip = {

    init: function (cbSize, cbCount) {
        this.cbSize = cbSize;
        this.cbCount = cbCount;
        for (var i = 0; i < cbCount; i++) {
            $('#strip').append('<input type="checkbox" id="cb' + (i + 1) + '" class="cb">');
        }
        $('#strip').width(cbSize * cbCount);
        //    console.log($('#strip').position().left);
        $('#strip').css('left', $('#strip').width() / -2);
        // console.log($('#strip').position().left);
        $('.cb').width(cbSize);
        $('.cb').height(cbSize);
        $('#head').show();
        $('#head').css('top', $(document).height() - cbSize - $('#head').height());
        $('#head').css('left', $(document).width() / 2);
    },

    initFunctionality: function () {
        strip.reset = function () {
            $('#strip').empty();
            for (var i = 0; i < cbCount; i++) {
                $('#strip').append('<input type="checkbox" id="cb' + (i + 1) + '" class="cb">');
            }
        };
        // strip.centerBox = function () {
        //     var headCenter = $('#head').position().left + ($('#head').width() / 2);
        //     var leftMargin;
        //     var rightMargin;
        //     for (var i = 1; i <= strip.cbCount; i++) {
        //         var leftMargin = $('#cb' + i).offset().left;
        //         var rightMargin = $('#cb' + i).offset().left + strip.cbSize;
        //         if (headCenter >= leftMargin && headCenter < rightMargin) {
        //             var offset = headCenter - ($('#cb' + i).offset().left + (strip.cbSize / 2));
        //             var nwleft = $('#strip').position().left + offset;
        //             $('#strip').css('left', nwleft);
        //             strip.current = $('#cb' + i);
        //             strip.currentNum = i;
        //             break;
        //         }
        //     }
        // };
        strip.reset = function () {
            for (var i = 1; i <= strip.cbCount; i++) {
                $('#cb' + i).prop('checked', false);
            }
        }
        strip.left = function () {
            var nwleft = $('#strip').position().left - strip.cbSize;
            $('#strip').css('left', nwleft);
            strip.centerBox();
        }
        strip.right = function () {
            var nwleft = $('#strip').position().left + strip.cbSize;
            $('#strip').css('left', nwleft);
            strip.centerBox();
        }
        strip.P = function () {
            strip.current.prop('checked', true);
        }
        strip.D = function () {
            strip.current.prop('checked', false);
        }
        strip.check = function () {
            return strip.current.prop('checked');
        }
        strip.centerBox = function (n) {
            var headCenter = $('#head').position().left + ($('#head').width() / 2);
            if (n != undefined) {
                var offset = headCenter - ($('#cb' + n).offset().left + (strip.cbSize / 2));
                var nwleft = $('#strip').position().left + offset;
                $('#strip').css('left', nwleft);
                strip.current = $('#cb' + n);
                strip.currentNum = n;
                return;
            }
            var leftMargin;
            var rightMargin;
            for (var i = 1; i <= strip.cbCount; i++) {
                var leftMargin = $('#cb' + i).offset().left;
                var rightMargin = $('#cb' + i).offset().left + strip.cbSize;
                if (headCenter >= leftMargin && headCenter < rightMargin) {
                    var offset = headCenter - ($('#cb' + i).offset().left + (strip.cbSize / 2));
                    var nwleft = $('#strip').position().left + offset;
                    $('#strip').css('left', nwleft);
                    strip.current = $('#cb' + i);
                    strip.currentNum = i;   
                    break;
                }
            }
        };
        strip.insert = function (count) {
            var current = strip.currentNum;
            for (var i = 0; i < count; i++) {
                $('#cb' + current).prop('checked', true);
                current++;
            };
        };
        strip.toBoolArray = function () {
            var finalArray = new Array();
            var tostart = false
            var j = 0;
            for (i = 1; i < strip.cbCount; i++) {
                if (tostart == false && $("#cb" + i).is(":checked") == true) {
                    tostart = true;
                }
                if (tostart) {
                    finalArray[j] = $("#cb" + i).is(":checked");
                    j++;
                }
            }
            for (i = finalArray.length - 1; i >= 0; i--) {
                if (finalArray[i] == true) {
                    break;
                }
                finalArray.pop();
            }
            return finalArray;
        }
        strip.centerBox(strip.cbCount / 2);

        //DragEvent
        var prevX;
        $("#strip").on('touchstart', function (e) {
            $("body").on('touchmove', function (e) {

                //   console.log($('#cb30').offset().left);
                var offset = 5;
                if (e.originalEvent.touches[0].screenX < prevX) {
                    offset *= -1;
                }
                var nwleft = ($('#strip').position().left) + offset;
                if (nwleft <= 0 && nwleft >= -1 * ($('#strip').width() - $(window).width())) {
                    $('#strip').css('left', nwleft);
                }
                prevX = e.originalEvent.touches[0].screenX;
            });
        });
        $("#strip").on('touchend', function () {
            strip.centerBox();
            clickX = NaN;
            $("body").off();
        })
    }

};
strip.init(20, 500);
strip.initFunctionality();