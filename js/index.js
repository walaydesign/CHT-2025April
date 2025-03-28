var limitSecond = 0;
var boxHeight = $(".container").height();
var girlWidth = $(".girl").width();
var girlHeight = girlWidth * 1.47 / boxHeight * 100;
var pathTop = parseInt($(".path").css("top"));
var tumble = 0;
var fail = 0;
var girlHeightPx = girlWidth * 1.47;

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

    limitTimeSecond = limitTimeSecond + 50;
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

    clearInterval(limitTimeNum);
    var limitMs = limitSecond * 1000;

    limitTimeNum = window.setInterval(function () {
        // 數字呈現
        limitMs = limitMs + 4;
        countNum(limitMs);
        

        if (limitMs >= 10000) {
            clearInterval(limitTimeNum);
            clearInterval(obstacleKeepMoving);

            $(".btn-jump").hide();

            var activeSecond = document.getElementById("count_second");
            var activeMinute = document.getElementById("count_minute");
            var activeHour = document.getElementById("count_hour");
            activeSecond.innerHTML = "00";
            activeMinute.innerHTML = "00";
            activeHour.innerHTML = "10";

            if(fail === 0) {

                runPicnic();
                
                setTimeout(function() {
                    success();
                },2000);
            }
        }


    }, 1);

    
    showTime = window.setInterval(function () {

        limitSecond++;
        // 障礙物出現
        if(limitSecond > 1 && limitSecond < 8) {
            show = random(1,10);
            if(show >= 1 && show <=7) {
                if(tumble < 3) {
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
                }else {
                    tumble = 0;
                }
            }
        }

        if (limitSecond >= 10) {
            clearInterval(showTime);
        }

    }, 1000);

}

// 隨機
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 障礙物往左跑
function obstacleRun(target) {

    var tolerance = 20;
    var targetTop = parseInt(target.css("top"));
    var targetTopTotal = targetTop + pathTop;


    setTimeout(function() {
        target.addClass("move");
        setTimeout(function() {
            var KeepMovingTime = 121;
            target.removeClass("move");
            target.addClass("keepmoving");
            
            obstacleKeepMoving = window.setInterval(function() {


                KeepMovingTime--;

                if (KeepMovingTime > 106) {
                    var girlTop = parseInt($(".girl").css("top"));
                    var girlBottom = girlHeightPx + girlTop - tolerance;
    
                    if(girlBottom > targetTopTotal) {
    
                        clearInterval(obstacleKeepMoving);
                        tumble++;
                        heart(tumble);
    

                        if(tumble <= 3) {

                            $(".girl_tumble").addClass("active").siblings(".girl_pic").removeClass("active");
                            setTimeout(function() {
                                $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");
                            },500);
                        }
                    }
                }

                if (KeepMovingTime <= 0) {
                    clearInterval(obstacleKeepMoving);
                    target.remove();
                }

            }, 1);
        }, 1454);
    }, 1000);
}

// 愛心
function heart(tumble) {
    var num = tumble - 1;
    $(".heart_item").eq(num).addClass("fail");
    if(tumble === 3) {
        failPopup();
    }
}

// 失敗
function failPopup() {

    clearInterval(limitTimeNum);
    clearInterval(showTime);
    clearInterval(obstacleKeepMoving);

    // 重新計時
    limitSecond = 0;
    var newMs = limitSecond * 1000;
    countNum(newMs);

    $(".popup-fail").show();
    setTimeout(function() {
        $(".popup-fail").addClass("valid");
    }, 1500);

    $(".girl_pic").removeClass("active");


    $(".obstacle-box").each(function() {
        $(this).remove();
    })
    fail = 1;

    $(".heart_item").each(function() {
        $(this).removeClass("fail");
    })

}

// 成功
function success() {
    $(".popup-success").show();

    clearInterval(limitTimeNum);
    clearInterval(showTime);
    clearInterval(obstacleKeepMoving);
}

// 女孩跑去野餐
function runPicnic() {
    setTimeout(function() {
        clearInterval(jumpingUp);
        clearInterval(jumpingDown);
        $(".girl").css("top","17%");

        $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");

        $(".bg-running").removeClass("active");
        $(".bg-picnic").addClass("active");
        $(".girl").addClass("gopicnic");

        setTimeout(function() {
            $(".girl_init").addClass("active").siblings(".girl_pic").removeClass("active");
        }, 1000);
    },1000);
}

$(".btn-again").click(function() {
    clearInterval(limitTimeNum);
    clearInterval(showTime);
    clearInterval(obstacleKeepMoving);
    $(".popup-fail").hide();
    fail = 0;
    $(".btn-start").show();
    $(".btn-jump").hide();
    $(".count_colon").addClass("stop");
    $(".popup-success").hide();
    $(".popup-start").show();


    $(".girl_pic").each(function() {
        $(this).removeClass("active");
    })
})

// 開始遊戲
$(".btn-start").click(function() {

    $(".popup-start").hide();
    $(".btn-jump").show();

    $(".popup-start").hide();

    $(".count_colon").removeClass("stop");
    limitTime();


    $(".heart_item").each(function() {
        $(this).removeClass("fail");
    })
    tumble = 0;

    $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");

    $(".popup-fail").removeClass("valid");
})

$(".btn-jump_main").click(function() {

    jumpUp();
    $(".btn-jump").addClass("jumping");
    $(".girl_jump").addClass("active").siblings(".girl_pic").removeClass("active");
})

// 跳
var jumpingUp, jumpingDown;
var jumpUpOffset = 0.5;
var jumpDownOffset = 0.5;
function jumpUp() {
    jumpingUp = window.setInterval(function() {
        var old_top = parseInt($(".girl").css("top")) / boxHeight * 100;
        var new_top = old_top - jumpUpOffset;
        $(".girl").css("top",new_top + "%");
        if (new_top <= 12) {
            clearInterval(jumpingUp);
            jumpDown();
        }
    }, 10);
}

function jumpDown() {

    jumpingDown = window.setInterval(function() {
        var old_top = parseInt($(".girl").css("top")) / boxHeight * 100;
        var new_top = old_top + jumpDownOffset;
        $(".girl").css("top",new_top + "%");
        if (new_top >= 17) {
            clearInterval(jumpingDown);
            $(".girl").css("top","17%");
            $(".btn-jump").removeClass("jumping");
            $(".girl_run").addClass("active").siblings(".girl_pic").removeClass("active");
        }
    }, 20);
}