jQuery(document).ready(function($) {
    var DateHelper = examples.DateHelper;

    var dateHelper = new DateHelper({
        year:$("#year1"),
        month:$("#month1"),
        day:$("#day1"),
        startDateDiff:14,
        endDateDiff:365
    });

    dateHelper.init();

    $(dateHelper).on(DateHelper.DATE_SET_COMPLETE,function(e,year,month,day){
        console.log(DateHelper.DATE_SET_COMPLETE);
        console.log(year,month,day);
    })

    $(dateHelper).on(DateHelper.DATE_CHANGE,function(e,year,month,day){
        console.log(DateHelper.DATE_CHANGE);
        console.log(year,month,day);
    })

    console.log(dateHelper)
});