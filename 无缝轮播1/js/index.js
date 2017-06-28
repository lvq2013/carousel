/*
 *carousel 轮播图
 *
 * */
$(document).ready(function () {
    carouselImg();
});
function carouselImg() {
    var carousel = $("#carousel-content"),
        curImgIdx = 1,
        timer = null,
        oDots = $(".dots"),
        isAnimating = false;
    // 存放图片的数组
    var json = [
        "BingWallpaper-2017-05-16.jpg",
        "BingWallpaper-2017-05-13.jpg",
        "BingWallpaper-2017-05-14.jpg",
        "BingWallpaper-2017-05-15.jpg",
        "BingWallpaper-2017-05-16.jpg",
        "BingWallpaper-2017-05-17.jpg",
        "BingWallpaper-2017-05-13.jpg"
    ];
    var json_length = json.length;
    carousel.css("width", json_length * 800 + "px"); //设置相框的宽度
    // 创建图片标签
    $(json).each(function (idx, data) {
        $("<img/>").appendTo(carousel).attr({"src": "images/" + data, "class": "fl-l"});

    });
    // 创建小圆点
    for (var k = 0; k < json_length - 2; k++) {
        $("<li></li>").appendTo(oDots).attr({"class": "fl-l"});
    }
    oDots.children().first().addClass("selected");

    // 执行动画
    play();

    // 鼠标移入暂停，移出执行动画
    $(".carousel").on(
        {
            "mouseover": stop,
            "mouseout": play
        }
    );

    $(".prev").click(function () {
        if (isAnimating) {
            return;
        }
        if (curImgIdx === 1) {
            curImgIdx = json_length - 2;
        } else {
            curImgIdx--;
        }
        tab(800);
        changeDots(curImgIdx);
    });
    $(".next").click(function () {
        if (isAnimating) {
            return;
        }
        if (curImgIdx === json_length - 2) {
            curImgIdx = 1;
        } else {
            curImgIdx++;
        }
        tab(-800);
        changeDots(curImgIdx);
    });

    // 帧动画
    function tab(offset) {
        var duration = 400;
        var interval = 10;
        var speed = Math.ceil(offset / (duration / interval));
        // console.log(speed);
        var desOffset = parseInt(carousel.css("left")) + offset;
        // console.log("目标位置：" + desOffset);
        var t = setInterval(function () {
            isAnimating = true;
            var curOffset = parseInt(carousel.css("left"));
            // console.log("初始的当前位置：" + curOffset);
            if ((offset < 0 && curOffset > desOffset) || (offset > 0 && curOffset < desOffset)) {
                curOffset = curOffset + speed + "px";
                carousel.css("left", curOffset);
            } else {
                isAnimating = false;
                desOffset = desOffset + "px";
                carousel.css("left", desOffset);
                // console.log(json.length - 2)
                if (parseInt(carousel.css("left")) < -800 * (json.length - 2)) {
                    carousel.css("left", "-800px");
                } else if (parseInt(carousel.css("left")) > -800) {
                    carousel.css("left", "-3200px");
                }
                clearInterval(t);
            }
        }, interval);
    }

    //添加小圆点下标
    var aDots = oDots.children();
    var length = aDots.length;
    for (var i = 0; i < length; i++) {
        aDots[i].idx = i + 1;
    }

    //添加小圆点点击事件
    $(".dots li").click(function () {

        if (event.target.idx === curImgIdx || isAnimating) {
            return;
        }
        var offset = -800 * (event.target.idx - curImgIdx);
        curImgIdx = event.target.idx;
        tab(offset);
        changeDots(curImgIdx);

    });
    //改变小圆点选中状态
    function changeDots(curImgIdx) {
        var aDots = oDots.children();
        var length = aDots.length;
        for (var i = 0; i < length; i++) {
            if (aDots[i].classList.contains("selected")) {
                aDots[i].classList.remove("selected");
                break;
            }
        }
        aDots[curImgIdx - 1].classList.add("selected");
        // $(eve).addClass("selected").siblings().removeClass("selected");
    }

    function play() {
        timer = setInterval(function () {
            $(".next").click();
        }, 4000)
    }

    function stop() {
        clearInterval(timer);
    }


}






