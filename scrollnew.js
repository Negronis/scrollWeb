// 函数节流
let throttle = function(func,...args){
    let timer = null;
    return function(){
        if(timer){
            return;
        }
        timer = setTimeout(function(){
            func.call(this,...args);
            timer = null;
        },500)
    }
}
// 滚动到某个区域
function ScrollDiv(div,func,func_outer) {   
    let pageY = window.pageYOffset;
    let height = div.clientHeight;
    let div_top = div.offsetTop;
    // 如果当前滚动距离 - div距顶部距离 > 0 且 当前滚动距离-div距顶部距离小于div的高度 说明在当前div内
    if (pageY - div_top > 0 && pageY - div_top < height) {
        //  进入了div区域 
        if(func) func(div);
        console.log(div)
    } else{
        // 离开了div区域
        if(func_outer) func_outer(div);
    }
};
// div们
let containerFirst = document.querySelector('#containerFirst');
let containerSecond = document.querySelector('#containerSecond');

// 第一个div绑定事件
// 进入第一个div的时候
let thro_scroll_func = function(){  
} 
// 离开第一个div的时候
let thro_scroll_outerFunc = function(){ 
    containerSecond.style.filter = "grayscale(0%)";
    containerSecond.style.color = "#000"; 
}
let thro_scroll_seDivin = ()=>{
    containerSecond.style.filter = "grayscale(0%)";
    containerSecond.style.color = "#000"; 
}
let thro_scroll_seDivOut = ()=>{
    containerSecond.style.filter = "grayscale(100%)";
    containerSecond.style.color = "#fff"; 
}
let thro_scroll = throttle(ScrollDiv,containerFirst,thro_scroll_func,thro_scroll_outerFunc) ;
let thro_scroll_sec = throttle(ScrollDiv,containerSecond,thro_scroll_seDivin,thro_scroll_seDivOut) ;

// 滚动事件绑定
window.onscroll = function () {
    thro_scroll();
    thro_scroll_sec()
}