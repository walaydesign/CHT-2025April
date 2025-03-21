var limitSecond = 10;
var showSecond;
var boxHeight = $(".container").height();
var tumble = 0;
var fail = 0;

// 函式
var limitTimeNum;
var showTime;
var obstacleKeepMoving;

// 倒數10秒
var limitTimeSecond;
var limitTimeMs;
var obstable_1 = $("<img class='obstacle obstacle-1' src='./img/obstacle-1.png'>");
var obstable_2 = $("<img class='obstacle obstacle-2' src='./img/obstacle-2.png'>");
var show;

function countNum(second) {
    limitTimeSecond =  Math.floor(second / 1000);
    limitTimeMs =  second % 1000;
    var limitTimeActiveSecond = document.getElementById("count_second");
    var limitTimeActiveMs = document.getElementById("count_ms");
    limitTimeActiveSecond.innerHTML = limitTimeSecond;
    limitTimeActiveMs.innerHTML = limitTimeMs;

    var limitTimeActiveSecondShow;
    var limitTimeActiveMsShow;

    if(limitTimeSecond < 10 && limitTimeSecond >= 0) {
        limitTimeActiveSecondShow = "0" + limitTimeSecond;
    }else {
        limitTimeActiveSecondShow = limitTimeSecond;
    }

    limitTimeActiveSecond.innerHTML = limitTimeActiveSecondShow;

    if(limitTimeMs <= 99 && limitTimeMs > 9) {
        limitTimeActiveMsShow = "0" + limitTimeMs;
    }else if(limitTimeMs <= 9 && limitTimeMs >= 0) {
        limitTimeActiveMsShow = "00" + limitTimeMs;
    }else {
        limitTimeActiveMsShow = limitTimeMs;
    }

    limitTimeActiveMs.innerHTML = limitTimeActiveMsShow;

    
}

function limitTime() {
    console.log("limitTime");

    clearInterval(limitTimeNum);
    var limitMs = limitSecond * 1000;

    limitTimeNum = window.setInterval(function () {
        // 數字呈現
        limitMs = limitMs - 4;
        // limitTimeSecond = Math.floor(limitMs / 1000);
        // limitTimeMs = limitMs % 1000;
        // var limitTimeActiveSecond = document.getElementById("count_second");
        // var limitTimeActiveMs = document.getElementById("count_ms");
        // limitTimeActiveSecond.innerHTML = limitTimeSecond;
        // limitTimeActiveMs.innerHTML = limitTimeMs;

        countNum(limitMs);
        

        if (limitMs === 0) {
            clearInterval(limitTimeNum);
            setTimeout(function() {
                $(".bg-running").removeClass("active");
                $(".bg-picnic").addClass("active");
                $(".girl").addClass("gopicnic");
            },1000);
            
            setTimeout(function() {
                $(".popup-success").show();
            },2000);
        }

        // if(fail === 1) {
        //     clearInterval(limitTimeNum);
        //     limitSecond = 10;
        // }

    }, 1);

    
    showTime = window.setInterval(function () {
        limitSecond--;
        // 障礙物出現
        if(limitSecond > 1 && limitSecond <= 10) {
            show = random(0,1);
            // console.log("是否出現障礙物：" + show);
            if(show == 1) {
                var thisBox_1 = $("<div class='obstacle-box box-1'><img src='./img/obstacle-1.png'></div>");
                var thisBox_2 = $("<div class='obstacle-box box-2'><img src='./img/obstacle-2.png'></div>");
                if($(".path").hasClass("show-odd")) {
                    $(".path").append(thisBox_1);
                    $(".path").removeClass("show-odd").addClass("show-even");
                    obstacleRun(thisBox_1);
                }else if($(".path").hasClass("show-even")) {
                    $(".path").append(thisBox_2);
                    $(".path").removeClass("show-even").addClass("show-odd");
                    obstacleRun(thisBox_2);
                }
            }
        }
        if (limitSecond === 0) {
            clearInterval(showTime);
        }

        // if(fail === 1) {
        //     clearInterval(showTime);
        // }

    }, 1000);

}

// 隨機
function random(min, max) {
    console.log("random");
    return Math.round(Math.random() * (max - min) + min);
}

// 障礙物往左跑
function obstacleRun(target) {

    console.log("obstacleRun");

    // var running;
    // var runOffset = 1;
    // var boxWidth = $(".container").width();
    var tolerance = 1.5;
    // var tumble = 0;

    setTimeout(function() {
        target.addClass("move");
        setTimeout(function() {
            var KeepMovingTime = 333;
            var girlHeight = $(".girl").height() / boxHeight * 100;
            var girlTop = parseInt($(".girl").css("top")) / boxHeight * 100;
            var girlBottom = girlHeight + girlTop - tolerance;
            var obstacleTop = parseInt($(".path").css("top")) / boxHeight * 100;
            target.removeClass("move");
            target.addClass("keepmoving");
            obstacleKeepMoving = window.setInterval(function() {
                KeepMovingTime--;
                if(girlBottom > obstacleTop) {
                    console.log("girlBottom=" + girlBottom);
                    console.log("obstacleTop=" + obstacleTop);
                    console.log("失敗！");
                    // tumble = 1;
                    $(".girl_tumble").addClass("active").siblings(".girl_pic").removeClass("active");
                    // if(tumble < 1) {
                    // }
                    setTimeout(function() {
                        $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");
                        console.log("run again");
                    },500);
                    clearInterval(obstacleKeepMoving);
                    tumble++;
                    heart(tumble);
                }

                // if(tumble >= 1) {
                //     $(".girl_init").addClass("active").siblings(".girl_pic").removeClass("active");
                // }

                if (KeepMovingTime <= 0) {
                    clearInterval(obstacleKeepMoving);
                    // target.remove();
                }

            }, 1);
            // if($(".girl_tumble").hasClass("active")) {
            //     setTimeout(function() {
            //         $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");
            //     },1000);
            // }

            // if(tumble == 1) {
            //     $(".girl_tumble").addClass("active").siblings(".girl_pic").removeClass("active");
            //     setTimeout(function() {
            //         $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");
            //     },1000);
            // }
        }, 1454);
    }, 1000);
}

// 愛心
function heart(tumble) {
    var num = tumble - 1;
    $(".heart_item").eq(num).addClass("fail");
    if(tumble >= 3) {
        failPopup();
        // console.log("fail=" + fail);
    }
}

// 失敗
function failPopup() {
    console.log("failpopup");

    clearInterval(limitTimeNum);
    clearInterval(showTime);
    clearInterval(obstacleKeepMoving);
    limitSecond = 10;
    var newMs = limitSecond * 1000;
    countNum(newMs);

    $(".popup-fail").show();

    $(".girl_pic").removeClass("active");
    $(".girl_init").addClass("active");

    $(".obstacle-box").each(function() {
        $(this).remove();
        console.log("clean obstacles");
    })
    fail = 1;

    tumble = 0;
    $(".heart_item").each(function() {
        $(this).removeClass("fail");
    })
}

$(".btn-again").click(function() {
    $(".popup-fail").hide();
    fail = 0;
    $(".btn-start").show();
    $(".btn-jump").hide();
    $(".count_colon").addClass("stop");
    $(".popup-success").hide();
    $(".popup-start").show();
})

// 開始遊戲
$(".btn-start").click(function() {
    console.log("click popup-start");

    $(".popup-start").hide();
    $(".btn-jump").show();

    $(".popup-start").hide();

    $(".count_colon").removeClass("stop");
    limitTime();

    // $(".girl_init").removeClass("active");
    $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");

})

$(".btn-jump_main").click(function() {
    jumpUp();
    $(".btn-jump").addClass("jumping");
    $(".girl_jump").addClass("active").siblings(".girl_pic").removeClass("active");
})

// 跳
var jumpingUp, jumpingDown;
var jumpOffset = 0.4;
function jumpUp() {
    console.log("jumpUp");
    jumpingUp = window.setInterval(function() {
        console.log("jumping up!!!");
        var old_top = parseInt($(".girl").css("top")) / boxHeight * 100;
        var new_top = old_top - jumpOffset;
        $(".girl").css("top",new_top + "%");
        if (new_top <= 13.5) {
            clearInterval(jumpingUp);
            jumpDown();
        }
    }, 10);
}

function jumpDown() {
    console.log("jumpDown");

    jumpingDown = window.setInterval(function() {
        console.log("jumping up!!!");
        var old_top = parseInt($(".girl").css("top")) / boxHeight * 100;
        var new_top = old_top + jumpOffset;
        $(".girl").css("top",new_top + "%");
        if (new_top >= 19) {
            clearInterval(jumpingDown);
            $(".girl").css("top","19%");
            $(".btn-jump").removeClass("jumping");
            $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");
        }
    }, 10);
}