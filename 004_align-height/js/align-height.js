var examples = examples || {};

(function(global) {

    /* =========================================================
    
     BoxHeightAlign
     heightが決められないけれど横並びのときに美しく配置するための処理
     
    ========================================================= */
    var BoxHeightAlign = (function() {
        BoxHeightAlign.LAYOUT_CHANGE = "boxHeightLayoutChange";
        BoxHeightAlign.LAYOUT_INIT = "boxHeightLayoutInit";

        function BoxHeightAlign(dom,options) {
            this.dom = dom;
            this.alignItems = this.dom.find(".boxheight-align-item");
            this.prevAlignNum = undefined;
            var defaultOptions = {
                isAll:false
            }
            this.options = $.extend(defaultOptions, options);
        }

        BoxHeightAlign.prototype.init = function() {
            var that = this;
            this.update();
            this._checkImgLoad(this.update.bind(this));
        };

        BoxHeightAlign.prototype._checkImgLoad = function(callback){
            var that = this;
            var numImage = this.dom.find(".boxheight-align-item img").length;
            var count = 0;

            if(numImage == 0){
                $(that).trigger(BoxHeightAlign.LAYOUT_INIT);
            }

            this.dom.find(".boxheight-align-item img").each(function(index, el) {
                var src = $(el).attr("src");
                var image = new Image();
                image.onload = function(){
                    checkComplete();
                }
                image.onerror = function(){
                    checkComplete();
                }
                image.src = src;
            });

            function checkComplete(){
                count++;
                if(count == numImage){
                    $(that).trigger(BoxHeightAlign.LAYOUT_INIT);
                    callback();
                }
            }
        }

        BoxHeightAlign.prototype.update = function() {
            var alignNum = this._getAlignNum();
            if(this.prevAlignNum != alignNum){
                $(this).trigger(BoxHeightAlign.LAYOUT_CHANGE,[alignNum]);
            }
            this.prevAlignNum = alignNum;
            
            if(this.options.isAll){
                alignNum = this.alignItems.length;
            }
            var boxSet = [];
            this.alignItems.each(function(index, el) {
                var boxIndex = Math.floor(index/(alignNum));
                if(!boxSet[boxIndex]){
                    boxSet[boxIndex] = [];
                }
                boxSet[boxIndex].push($(el));
            });
            for (var i = 0; i < boxSet.length; i++) {
                this._alignHeight(boxSet[i]);
            };
            
            
        }
        BoxHeightAlign.prototype._alignHeight = function(boxSet){
            var max = 0;
            for (var i = 0; i < boxSet.length; i++) {
                boxSet[i].css("height","auto");
                max = boxSet[i].height() > max ? boxSet[i].height() : max;
            };
            for (var i = 0; i < boxSet.length; i++) {
                boxSet[i].height(max);
            };
        }
        
        BoxHeightAlign.prototype._getAlignNum = function() {
            var count = 0;
            var prevElementPos = undefined;
            this.alignItems.each(function(index, el) {
                if(prevElementPos !== undefined){
                    if($(el).offset().top != prevElementPos){
                        return false;
                    }
                }
                count++;
                prevElementPos = $(el).offset().top;
            });
            return count;
        }

        global.BoxHeightAlign = BoxHeightAlign;

        return BoxHeightAlign;
    }());

}(examples));
