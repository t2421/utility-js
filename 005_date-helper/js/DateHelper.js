var examples = examples || {};

(function(global) {


    /* =========================================================
    
     DateHelper

     dependent
     moment.js        http://momentjs.com/
     moment-range.js  https://github.com/gf3/moment-range
     
    ========================================================= */
    var DateHelper = (function() {
        DateHelper.DATE_SET_COMPLETE = "dateSetComplete"; //年月日すべてセットされたら
        DateHelper.DATE_CHANGE = "dateChange"; //年月日のいずれかが変更されたら

        function DateHelper(options) {
            this._year = options.year;
            this._month = options.month;
            this._day = options.day;
            this._startDateDiff = options.startDateDiff || 0;
            this._endDateDiff = options.endDateDiff || 365;

            this._reset();

            this._selectOptionData = {};
            /* _selectOptionData example
            {
                "2014":{
                    "8":[1,2,3,4,5,....],
                    "9":[1,2,3,4,5,.....],
                    .
                    .
                    .
                },
                "2015":{
                    "1":[1,2,3,4,5,....],
                    "2":[1,2,3,4,5,.....],
                    .
                    .
                    .
                },
            }
            */
        }

        DateHelper.prototype.init = function() {

            var start = moment().add(this._startDateDiff, 'days');
            var end = start.clone().add(this._endDateDiff, 'days');
            var range = moment.range(start, end);

            this._constructSelectOptionData(range);
            this._initPullDown();


        };

        DateHelper.prototype._constructSelectOptionData = function(rangeData) {
            var that = this;

            rangeData.by('days', function(date) {
                var dateArray = date.toArray();
                var year = String(dateArray[0]);
                var month = String(dateArray[1] + 1);
                var day = String(dateArray[2]);

                if (!that._selectOptionData[year]) {
                    that._selectOptionData[year] = {};
                }

                if (!that._selectOptionData[year][month]) {
                    that._selectOptionData[year][month] = [];
                }
                that._selectOptionData[year][month].push(day);
            });
        }

        DateHelper.prototype._initPullDown = function() {
            var that = this;

            var yearOptions = '<option value="" selected="selected"></option>';
            for (var year in that._selectOptionData) {
                yearOptions += getOption(year);
            }
            this._year.html(yearOptions);

            this._year.off('change');
            this._year.on('change', function(e) {
                that._updateValue();
                $(that).trigger(DateHelper.DATE_CHANGE, [that._selectYear, that._selectMonth, that._selectDay]);
                if ($(this).val() == "") {
                    that._reset();
                    return;
                }
                that._initMonthOption($(this).val())
            });


        }

        DateHelper.prototype._initMonthOption = function(year) {
            var that = this;
            var monthOptions = '<option value="" selected="selected"></option>';
            for (var month in that._selectOptionData[year]) {
                monthOptions += getOption(month);
            }
            this._month.html(monthOptions);
            this._month.off('change');
            this._month.on('change', function(e) {
                that._updateValue();
                $(that).trigger(DateHelper.DATE_CHANGE, [that._selectYear, that._selectMonth, that._selectDay]);
                that._initDayOption(year, $(this).val())
            });
        };


        DateHelper.prototype._initDayOption = function(year, month) {
            var that = this;
            var dayOptions = '<option value="" selected="selected"></option>';
            for (var i = 0; i < that._selectOptionData[year][month].length; i++) {
                dayOptions += getOption(that._selectOptionData[year][month][i]);
            }
            this._day.off('change');
            this._day.on('change', function(e) {
                that._updateValue();
                if (that._year.val() != "" && that._month.val() != "" && that._day.val() != "") {
                    $(that).trigger(DateHelper.DATE_CHANGE, [that._selectYear, that._selectMonth, that._selectDay]);
                    $(that).trigger(DateHelper.DATE_SET_COMPLETE, [that._selectYear, that._selectMonth, that._selectDay]);
                }
            });
            this._day.html(dayOptions);
        };

        DateHelper.prototype._updateValue = function() {
            this._selectYear = this._year.val();
            this._selectMonth = this._month.val();
            this._selectDay = this._day.val();
        };

        DateHelper.prototype._reset = function() {
            this._selectYear = undefined;
            this._selectMonth = undefined;
            this._selectDay = undefined;
            this._month.html("");
            this._day.html("");
        };

        function getOption(num) {
            return '<option value="' + num + '">' + num + '</option>';
        }

        global.DateHelper = DateHelper;

        return DateHelper;
    }());


}(examples));
