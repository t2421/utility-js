var examples = examples || {};

/* =========================================================

 UADetect
 
========================================================= */
(function(global) {

    function inherit(p){
        if(p==null) throw TypeError();
        if(Object.create) return Object.create(p);

        var t = typeof p;
        if(t !== "object" && t!== "function") throw TypeError();

        function f(){};
        f.prototype = p;
        return new f();
    }

    global.inherit = inherit;


    /* =========================================================
    
     SuperClass
     
    ========================================================= */
    var SuperClass = (function() {
        function SuperClass() {
          this.name = "super";
        }

        SuperClass.prototype.greeting = function() {
          console.log("my name is "+this.name);
        };


        global.SuperClass = SuperClass;

        return SuperClass;
    }());


    /* =========================================================
    
     SubClass
     
    ========================================================= */
    var SubClass = (function(_super) {

        function SubClass(dom) {
          _super.apply(this,arguments);
          this.greetingAdd = "yeah!!!!!!!";
        }

        SubClass.prototype = inherit(_super.prototype);
        SubClass.prototype.constructor = SubClass;


        SubClass.prototype.greeting = function() {
          _super.prototype.greeting.apply(this);
          console.log(this.greetingAdd);
        };

        global.SubClass = SubClass;

        return SubClass;
    }(SuperClass));


}(examples));