(function() {
    function c(g) {
        if (g.nodeType != 1 && g.nodeType != 9) {
            return
        }
        e(g)
    }

    function b(i) {
        var j = $(".title_wrap", i).text().trim();
        var g;
        if ($(".play_btn", i).length > 0) {
            g = "9px 0px 9px 9px"
        } else {
            g = "6px 0px 6px 6px"
        }
        var h = $('<div style="margin-left:20px; position:absolute; padding: ' + g + ';"><a style="height: 16px; width: 16px; background: url(' + chrome.extension.getURL("download-icon.png") + ') no-repeat 0 0; padding-right: 9px; float: left;" download="' + j + '.mp3" href="' + $("input[type=hidden]", i).val() + "?/" + j + '.mp3" class="download_button"></a></div>');
        $(h).insertBefore($(".play_btn_wrap", i));
        $(h).click(function(l) {
            l.cancelBubble = true;
            l.stopPropagation();
            var k = $("<div></div>");
            $(k).html($(h).clone());
            chrome.runtime.sendMessage({
                html: $(k).html()
            }, function(m) {});
            return false
        });
        $(".play_btn_wrap", i).css("padding-right", "25px").css("float", "left");
        $(".info", i).width("auto");
        $(".title_wrap", i).width(($(".title_wrap", i) - 24) + "px");
        $(i).attr("data-vk-downloader-active", 1)
    }

    function e(g) {
        $("div.audio[data-vk-downloader-active!=1]", g).each(function() {
            b(this)
        })
    }
    var f = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var a = document.body;
    var d = new f(function(g) {
        g.forEach(function(j) {
            if (j.type === "childList") {
                for (var h = 0; h < j.addedNodes.length; h++) {
                    if ($(j.addedNodes[h]).hasClass("audio")) {
                        b(j.addedNodes[h])
                    } else {
                        c(j.addedNodes[h])
                    }
                }
            }
            d.observe(document.body, {
                childList: true,
                subtree: true
            })
        })
    });
    d.observe(a, {
        childList: true,
        subtree: true
    });
    e(document.body)
})();