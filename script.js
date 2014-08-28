var field1=document.getElementById('first-scalepan');
var field2=document.getElementById('second-scalepan');
var scalepan1=document.getElementsByClassName('scalepan-left');
var scalepan2=document.getElementsByClassName('scalepan-right');
var lever=document.getElementsByClassName('lever');

field1.addEventListener('click', function(e){
    scalepan1[0].style.webkitAnimationName="scalepan-left1";
    scalepan1[0].style.webkitAnimationDuration="1s";
    scalepan1[0].style.webkitAnimationDelay="0s";
    scalepan1[0].style.webkitAnimationFillMode="forwards";
    scalepan2[0].style.webkitAnimationName="scalepan-right1";
    scalepan2[0].style.webkitAnimationDuration="1s";
    scalepan2[0].style.webkitAnimationDelay="0s";
    scalepan2[0].style.webkitAnimationFillMode="forwards";
    lever[0].style.webkitAnimationName="animate-lever1";
    lever[0].style.webkitAnimationDuration="1s";
    lever[0].style.webkitAnimationDelay="0s";
    lever[0].style.webkitAnimationFillMode="forwards";
}, false);

field2.addEventListener('click', function(e){
    scalepan1[0].style.webkitAnimationName="scalepan-left2";
    scalepan1[0].style.webkitAnimationDuration="1s";
    scalepan1[0].style.webkitAnimationDelay="0s";
    scalepan1[0].style.webkitAnimationFillMode="forwards";
    scalepan2[0].style.webkitAnimationName="scalepan-right2";
    scalepan2[0].style.webkitAnimationDuration="1s";
    scalepan2[0].style.webkitAnimationDelay="0s";
    scalepan2[0].style.webkitAnimationFillMode="forwards";
    lever[0].style.webkitAnimationName="animate-lever2";
    lever[0].style.webkitAnimationDuration="1s";
    lever[0].style.webkitAnimationDelay="0s";
    lever[0].style.webkitAnimationFillMode="forwards";
}, false);

function ViewModel(){
    var a=0.122;
    var b=0.176;
    this.numberDvt=ko.observable();
    this.valueA=function() {
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
  this.graphicsSlide=ko.observable(true);
  this.calculatorSlide=ko.observable(false);
  this.competitorsSlide=ko.observable(false);
  this.showSlide=function(a,b,c){
        this.graphicsSlide(a);
        this.calculatorSlide(b);
        this.competitorsSlide(c);
    };
  this.showGraphics=function(){
     this.showSlide(true,false,false);
  };
  this.showCalculator=function(){
        this.showSlide(false,true,false);
    };
  this.showCompetitors=function(){
        this.showSlide(false,false,true);
};
}
ko.applyBindings(new ViewModel());

