/**
 * Created by Administrator on 2016/11/4.
 */


$(function(){
    /*获取ul*/
    var ul=$(".nav-product_tabs");
    /*获取ul的所有子元素li*/
    var lis=ul.find("li");
    /*循环遍历每一个li，将宽度和累加*/
    var totalWidth=0; //总宽度
    lis.each(function(index,value){
        /*width():仅仅得到内容的宽度
        * innerWidth():得到内容+padding
        * outerWidth():得到内容+padding+border
        * outerWidth(true):得到内容+padding+border+margin*/
        totalWidth+=$(value).outerWidth(true);
    });
    /*为ul设置真实的宽度*/
    ul.width(totalWidth);

    /*添加滑动效果*/
    itcast.iScroll({
        swipeDom:$(".ptabs-parent")[0],
        swipeType:"x",
        swipeDistace:50
    });
});