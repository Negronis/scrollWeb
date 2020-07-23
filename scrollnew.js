let divs = document.querySelector('#container').querySelectorAll('div');
function ScrollDiv(div) {
    let pageY = window.pageYOffset;
    let height = div.clientHeight;
    let div_top = div.offsetTop;
    // 如果当前滚动距离 - div距顶部距离 > 0 且 当前滚动距离-div距顶部距离小于div的高度 说明在当前div内
    if (pageY - div_top > 0 && pageY - div_top < height) {
        //  进入了div区域
        div.className='animation'
    } else{
        // 离开了div区域
        div.className=''

    }
};
window.onscroll = function () {
    divs.forEach(e => { 
        ScrollDiv(e);
    })
}