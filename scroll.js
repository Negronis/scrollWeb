(function () {
    // 函数节流
    let throttle = function (func) {
        let timer = null;
        return function () {
            if (!timer) {
                timer = setTimeout(function () {
                    func();
                    timer = null;
                }, 500)
            }
        }
    }
    // 通过一个对象来判断向上/下滚动以及滚动参数的设定
    let Scroll = {
        lastTop: 0,
        thisTop: 0,
        thisDiv: 0,                      //当前div的index值
        scrollTopAll: 0,              //整体高度
        currentDivHeight: 0,    //当前div高度
        prevDivHeight: 0          //上一个div高度
    }
    // 元素隐藏以及高度总和计算
    let divs = document.querySelector('#container').querySelectorAll('div');
    let currentHeight = window.pageYOffset; 
    divs.forEach((e, i, arr) => {
        // e.style.opacity = 0;
        Scroll['scrollTopAll'] += e['clientHeight'];
    })
    // 刚进入页面的时候，计算当前定位 
    for(let a = 0 ; a < divs.length ; a++){
        if (currentHeight != 0) {
            currentHeight -= divs[a]['clientHeight']; 
            console.log(currentHeight) 
            if (currentHeight <= 0) {
                Scroll['thisDiv'] = a;  
                console.log(a)
                Scroll['prevDivHeight'] = a == 0 ? divs[0]['clientHeight'] : divs[a-1]['clientHeight']; 
                Scroll['currentDivHeight'] = divs[a]['clientHeight'];
                break; 
            }
 
        }
    }
    let handler = function () {
        console.log(Scroll)
        Scroll['lastTop'] = Scroll['thisTop'];
        Scroll['thisTop'] = window.pageYOffset;
        // 设定当前div 默认是0
        let thisDiv = divs[Scroll['thisDiv']] || undefined;
        // 当前div高度
        if (thisDiv) Scroll['currentDivHeight'] = thisDiv['clientHeight'];
        if (Scroll['thisTop'] > Scroll['lastTop']) {
            // 如果移动距离大于当前div高度+上一个div高度之和，则代表向下滚进入第二个div
            if (Scroll['thisTop'] > Scroll['currentDivHeight'] + Scroll['prevDivHeight']) {
                // 赋值上次的div高度
                if (Scroll['thisDiv'] < divs.length - 1) {
                    Scroll['prevDivHeight'] = Scroll['currentDivHeight'];
                    Scroll['thisDiv']++;
                }
            }
            //向下滚动  
            if (thisDiv) {

            }
        } else {
            //向上滚动  
            
        }
    }
    var throttle_scroll = throttle(handler);
    window.onscroll = function (e) { 
        throttle_scroll();
    }

})();