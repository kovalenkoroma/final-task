/******************Animation*************************/
var field1=document.getElementById('first-scalepan');
var field2=document.getElementById('second-scalepan');
var scalepan1=document.getElementsByClassName('scalepan-left');
var scalepan2=document.getElementsByClassName('scalepan-right');
var lever=document.getElementsByClassName('lever');
function delAnimation(){
    scalepan1[0].style.webkitAnimation="";
    scalepan2[0].style.webkitAnimation="";
    lever[0].style.webkitAnimation="";
}
field2.addEventListener('click', function(e){
    scalepan1[0].style.webkitAnimation="scalepan-left1 1s linear 0s forwards";
    scalepan2[0].style.webkitAnimation="scalepan-right1 1s linear 0s forwards";
    lever[0].style.webkitAnimation="animate-lever1 1s linear 0s forwards";
}, false);
field1.addEventListener('click', function(e){
    scalepan1[0].style.webkitAnimation="scalepan-left2 1s linear 0s forwards";
    scalepan2[0].style.webkitAnimation="scalepan-right2 1s linear 0s forwards";
    lever[0].style.webkitAnimation="animate-lever2 1s linear 0s forwards";
}, false);
/************************SWYPE*******************************/
var startX;
document.body.addEventListener('touchstart', function(e){
    startX = event.touches[0].pageX;
}, false);
document.body.addEventListener('touchend', function(e){
    var endX = event.changedTouches[0].pageX;
    var distanceX=endX-startX;
    if(distanceX>0){
        switchingSlides('left');
    }
    else if(distanceX<0){
        switchingSlides('right');
    }
}, false);
var slidesViewModel=function(visibility,name){
    this.visibility=ko.observable(visibility);
    this.name=ko.observable(name);
};
function switchingSlides(direction){
    for(var i=0;i<model.slides().length;i++){
        if(model.slides()[i].visibility()==true){
            model.slides()[i].visibility(false);
            delAnimation();
            var index=i;
            if(direction=='right') {
                index = i + 1;
                if (index == model.slides().length) {
                    index = 0;
                }
            }
            else if(direction=='left'){
                 if (index == 0) {
                    index =  model.slides().length-1;
                 }
                 else{
                    index =  i-1;
                 }
            }
            model.slides()[index].visibility(true);
            break;
        }
    }
}
function ViewModel() {
 /**********************Slides*******************************/
    var that = this;
    that.slides=ko.observableArray([
        new slidesViewModel(true,"Graphics"),
        new slidesViewModel(false,"Calculator"),
        new slidesViewModel(false,"Competitors")
    ]);
    this.showSlide=function(){
        this.visibility(true);
        for(var i=0;i<that.slides().length;i++){
            if(that.slides()[i]!=this){
                that.slides()[i].visibility(false);
                delAnimation();
            }
        }
    };
 /*********************Calculator****************************/
        var a=0.122;
        var b=0.176;
        this.numberDvt=ko.observable();
        this.valueA=function (){
            var total = this.numberDvt();
            if (!this.numberDvt()) {
                return "[A]";
            }
            else {
                return parseFloat(total) * 0.925;
            }
        };
        this.summa=function(){
            var total = this.valueA();
            if(!this.numberDvt()){
                return "[B+C]";
            }
            else{
                return ((182*a*total)+(16*(total-(a*total)))).toFixed(2);
            }
        };
        this.valueE=function() {
            var total = this.valueA();
            if (!this.numberDvt()) {
                return "[E]";
            }
            else {
                return ((total-(total*a))*14).toFixed(2);
            }
        };
        this.valueG=function() {
            var total = this.valueA();
            if (!this.numberDvt()) {
                return "[G]";
            }
            else {
                return (16*(total-(a*total))*0.064).toFixed(2);
            }
        };
        this.valueH=function() {
            var total = this.valueA();
            if (!this.numberDvt()) {
                return "[H]";
            }
            else {
                return (3*0.52*total).toFixed(2);
            }
        };
        this.numberPe=ko.observable();
        this.valueAPe=function() {
            var total = this.numberPe();
            if (!this.numberPe()){
                return "[A]";
            }
            else {
                return parseFloat(total) * 0.85;
            }
        };
        this.summaPe=function(){
            var ape = this.valueAPe();
            if(!this.numberPe()){
                return "[B+C]";
            }
            else{
                return ((182*(ape*b))+(16*(ape-(b*ape)))).toFixed(2);
            }
        };
        this.valueI=function() {
            var ape = this.valueAPe();
            if (!this.numberPe()){
                return "[I]";
            }
            else {
                return ((ape-(ape*b))*14).toFixed(2);
            }
        };
        this.valueJ=function() {
            var ape = this.valueAPe();
            if (!this.numberPe()){
                return "[J]";
            }
            else {
                return (ape*0.896).toFixed(2);
            }
        };
        this.summBc=function() {
            var summa1 = parseFloat(this.summa());
            var summa2 = parseFloat(this.summaPe());
            if (!this.numberPe()||!this.numberDvt()){
                return "[DVT+PE]";
            }
            else {
                return (summa1+summa2);
            }
        };
        this.summEi=function() {
            var e = parseFloat(this.valueE());
            var i = parseFloat(this.valueI());
            if (!this.numberPe()||!this.numberDvt()){
                return "[DVT+PE]";
            }
            else {
                return (e + i).toFixed(2);
            }
        };
        this.summHj=function() {
            var h = parseFloat(this.valueH());
            var j = parseFloat(this.valueJ());
            if (!this.numberPe()||!this.numberDvt()){
                return "[DVT+PE]";
            }
            else {
                return (h + j).toFixed(2);
            }
        };
    }
var model=new ViewModel();
ko.applyBindings(model);

