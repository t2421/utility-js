var examples = examples || {};

/* =========================================================

 CookieCtrl
 
========================================================= */
(function(namespace) {
    var CookieCtrl = (function() {

        function CookieCtrl(options) {
        	this.setting = {
        		path:"/",
        		expires:9999,
        		numMaxCookie:10,//cookieを最大何個まで持つか
        		limitByte:3500,//一つのcookieに保持するbyteのリミット
        		prefix:"cookie_prefix_",
        		splitter:","
        	}
        	this.useCookieInfo = this.getUseCookieData();
        	$.extend(this.setting,options);
        }

        CookieCtrl.prototype.set = function(val){
           	this.useCookieInfo.data.push(val);
			this.setCookieData(this.useCookieInfo);
        };

        CookieCtrl.prototype.isExist = function(val){
			for (var i = 0; i < this.setting.numMaxCookie; i++) {
			    var cookie = $.cookie(this.setting.prefix + i);
			    if (!cookie) {
			        return false;
			    }
			    if (cookie.indexOf(val) > -1) {
			        return true;
			    }
			};
        };

        CookieCtrl.prototype.getUseCookieData = function(){
        	var numMaxCookie = this.setting.numMaxCookie;
			for (var i = 0; i < numMaxCookie; i++) {
			    var cookie = $.cookie(this.setting.prefix + i);
			    if (!cookie) {
			        return { data: [], index: i };
			    }
			    if (cookie.length < this.setting.limitByte) {
			        return { data: cookie.split(this.setting.splitter), index: i };
			    }
			};
        };

        CookieCtrl.prototype.setCookieData = function(useCookieInfo){
           var str = useCookieInfo.data.join(this.setting.splitter);
			$.cookie(this.setting.prefix+useCookieInfo.index,str,{expires:this.setting.expires});
        };
      
        CookieCtrl.prototype.dispose = function(){

        }

        namespace.CookieCtrl = CookieCtrl;
        return CookieCtrl;
    }());
    
}(examples));