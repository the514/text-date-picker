/**
 * Created by the514 on 2016/2/16.
 */
var objDate = { date: new Date(), year: -1, month: -1, priceArr: [] };
var getDate = {
    getTodayDay:function(){
        return objDate.date.getFullYear()+"-"+
            ((objDate.date.getMonth()+1)<10?"0"+(objDate.date.getMonth()+1):(objDate.date.getMonth()+1))+"-"+
            (objDate.date.getDate()<10?"0"+objDate.date.getDate():objDate.date.getDate());
    },
    getMonthNum:function(year,month){
        return new Date(year, (month+1), 0).getDate();
    },
    getFirstDayWeek:function(year,month){
        return new Date(year, month, 1).getDay();
    }
};

var DatePicker = {
    Init:function(setPrice,thisIdName){
        if(objDate.year==-1){
            console.log(getDate.getMonthNum(objDate.date.getFullYear(),objDate.date.getMonth()));
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        this.showPrice(setPrice);
        this.remove(thisIdName);
        this.show(thisIdName);
    },
    getPrevDays:function(){
        if (objDate.year == -1) {
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        if(objDate.month<=0){
            return {
                monthNum:getDate.getMonthNum((objDate.year-1),11),
                getPrevDaysMonth:11,
                getPrevDaysYear:objDate.year-1
            };
        }else{
            return {
                monthNum:getDate.getMonthNum(objDate.year,(objDate.month-1)),
                getPrevDaysMonth:objDate.month-1,
                getPrevDaysYear:objDate.year
            };
        }
    },
    getNextDays:function(){
        if (objDate.year == -1) {
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        if(objDate.month>=11){
            return {
                //monthNum:getDate.getMonthNum((objDate.year+1),11),
                getNextDaysMonth:0,
                getNextDaysYear:objDate.year+1
            };
        }else{
            return {
                //monthNum:getDate.getMonthNum(objDate.year,(objDate.month+1)),
                getNextDaysMonth:objDate.month+1,
                getNextDaysYear:objDate.year
            };
        }
    },
    getPrev:function(thisIdName){
        if (objDate.year == -1) {
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        if(objDate.month<=0){
            objDate.year-=1;
            objDate.month=11;
        }else{
            objDate.month-=1;
        }
        console.log(getDate.getMonthNum(objDate.year,objDate.month));
        console.log(objDate.year+"-"+(objDate.month+1));
        this.remove(thisIdName);
        this.show(thisIdName);
    },
    getNext:function(thisIdName){
        if (objDate.year == -1) {
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        if (objDate.month >= 11) {
            objDate.year += 1;
            objDate.month = 0;
        } else {
            objDate.month += 1;
        }
        console.log(getDate.getMonthNum(objDate.year, objDate.month));
        console.log(objDate.year + "-" + (objDate.month + 1));
        this.remove(thisIdName);
        this.show(thisIdName);
    },
    showPrice:function(setPrice){
        objDate.priceArr = setPrice;
    },
    show:function(thisIdName){
        var html = "<div id='"+thisIdName+"price-date-picker' style='width:280px;border:1px #ddd solid;background:#fff;border-radius:10px;box-shadow: 0 5px 10px rgba(0,0,0,0.2);position: absolute;z-index:999;'>" +
            "<div style='position: relative;'>" +
            "<span id='"+thisIdName+"price-date-picker-prev' class='glyphicon glyphicon-arrow-left' aria-hidden='true' style='position: absolute;left:13px;top:12px;cursor: pointer;'></span>" +
            "<span id='"+thisIdName+"price-date-picker-next' class='glyphicon glyphicon-arrow-right' aria-hidden='true' style='position: absolute;right:13px;top:12px;cursor: pointer;'></span>" +
            "<table>" +
            "<tbody>" +
            "<tr>"+
            "<td align='center' height='40' colspan='7'>"+objDate.year+"年"+(objDate.month+1)+"月</td>"+
            "</tr>" +
            "<tr>" +
            "<td align='center' width='40' height='40'><strong>日</strong></td>" +
            "<td align='center' width='40' height='40'><strong>一</strong></td>" +
            "<td align='center' width='40' height='40'><strong>二</strong></td>" +
            "<td align='center' width='40' height='40'><strong>三</strong></td>" +
            "<td align='center' width='40' height='40'><strong>四</strong></td>" +
            "<td align='center' width='40' height='40'><strong>五</strong></td>" +
            "<td align='center' width='40' height='40'><strong>六</strong></td>" +
            "</tr>";
        var index = 0;
        var dayNum = 1;
        var nextMonthDays = 1;
        for(var i=1;i<43;i++){

            if(index==0){
                html+="<tr>";
            }else if(index==7){
                html+="</tr>";
                index=0;
            }
            if(i<=getDate.getFirstDayWeek(objDate.year, objDate.month)){

                html+="<td align='center' width='40' height='40' style='color:#999;' date='" +
                    DatePicker.getPrevDays().getPrevDaysYear + "-" +
                    ((DatePicker.getPrevDays().getPrevDaysMonth+1)<10?
                    "0"+(DatePicker.getPrevDays().getPrevDaysMonth+1):
                        (DatePicker.getPrevDays().getPrevDaysMonth+1)) + "-" +
                    ((DatePicker.getPrevDays().monthNum-getDate.getFirstDayWeek(objDate.year, objDate.month)+i)<10?
                    "0"+(DatePicker.getPrevDays().monthNum-getDate.getFirstDayWeek(objDate.year, objDate.month)+i):
                        (DatePicker.getPrevDays().monthNum-getDate.getFirstDayWeek(objDate.year, objDate.month)+i)) +
                    "'>"+
                    (DatePicker.getPrevDays().monthNum-getDate.getFirstDayWeek(objDate.year, objDate.month)+i)+
                    "<br/><span class='text-danger' style='font-weight:700;'>&nbsp;</span></td>";

            }else if(dayNum<=getDate.getMonthNum(objDate.year, objDate.month)){
                if(getDate.getTodayDay() == objDate.year + "-" + ((objDate.month + 1)<10?"0"+(objDate.month + 1):(objDate.month + 1)) + "-" + (dayNum<10?"0"+dayNum:dayNum)){
                    html += "<td align='center' width='40' height='40' style='border-radius:5px;color:#999;' date='" + objDate.year + "-" + ((objDate.month + 1)<10?"0"+(objDate.month + 1):(objDate.month + 1)) + "-" +
                        (dayNum<10?"0"+dayNum:dayNum) + "'>今天<br/><span class='text-danger' style='font-weight:700;'>&nbsp;</span></td>";
                }else{
                    html += "<td align='center' width='40' height='40' style='color:#999;' date='" + objDate.year + "-" + ((objDate.month + 1)<10?"0"+(objDate.month + 1):(objDate.month + 1)) + "-" +
                        (dayNum<10?"0"+dayNum:dayNum) + "'>" + dayNum + "<br/><span class='text-danger' style='font-weight:700;'>&nbsp;</span></td>";
                }

                dayNum++;

            }else if(dayNum>getDate.getMonthNum(objDate.year, objDate.month)){

                html+="<td align='center' width='40' height='40' style='color:#999;' date='" + DatePicker.getNextDays().getNextDaysYear + "-" +
                    ((DatePicker.getNextDays().getNextDaysMonth+1)<10?
                    "0"+(DatePicker.getNextDays().getNextDaysMonth+1):
                        (DatePicker.getNextDays().getNextDaysMonth+1)) + "-" +
                    (nextMonthDays<10? "0"+nextMonthDays:nextMonthDays) + "'>"+nextMonthDays+"<br/><span class='text-danger' style='font-weight:700;'>&nbsp;</span></td>";
                nextMonthDays++;

            }
            index++;
        }
        html += "<tr>" +
            "<td align='center' height='40' colspan='7' id='"+thisIdName+"backToday' style='cursor: pointer;'>" +
            "<span class='glyphicon glyphicon-time' aria-hidden='true'></span>&nbsp;&nbsp;回到今天" +
            "</td>" +
            "</tr>";
        html += "</tbody>" +
            "</table>" +
            "</div>";
        $("body").append(html);

        for(var y=0;y<objDate.priceArr.length;y++){
            $("#"+thisIdName+"price-date-picker").find("[date]").each(function() {
                if($(this).attr("date") == objDate.priceArr[y].Date) {
                    $(this).css({"color":"#333","cursor":"pointer"});
                    $(this).attr("price",objDate.priceArr[y].Price);
                    $(this).find(".text-danger").text("¥"+objDate.priceArr[y].Price);
                }
            });
        }
    },
    remove:function(thisIdName){
        $("#"+thisIdName+"price-date-picker").remove();
    }
};

(function($) {
    $.fn.priceDatePicker = function(setPrice) {
        var thisId = $(this);
        var thisIdName = $(this).attr("id");
        $(this).click(function(){
            if($(this).val()!=""){
                var showThisDate = new Date($(this).val());
                objDate.year = showThisDate.getFullYear();
                objDate.month = showThisDate.getMonth();
            }else{
                objDate.year = -1;
                objDate.month = -1;
            }
            DatePicker.Init(setPrice,thisIdName);
            datePickerOffset();
        });
        $(document).on("click","#"+thisIdName+"price-date-picker-next",function(){
            DatePicker.getNext(thisIdName);
            datePickerOffset();
        }).on("click","#"+thisIdName+"price-date-picker-prev",function(){
            DatePicker.getPrev(thisIdName);
            datePickerOffset();
        }).on("click","#"+thisIdName+"backToday",function(){
            objDate.year = -1;
            objDate.month = -1;
            DatePicker.Init(setPrice,thisIdName);
            datePickerOffset();
        });
        $(document).on("click","#"+thisIdName+"price-date-picker td",function(){
            if($(this).attr("date") && $(this).attr("price")){
                //alert($(this).attr("date"));
                //alert($(this).attr("price"));
                thisId.val($(this).attr("date"));
                DatePicker.remove(thisIdName);
            }
        });
        $(document).mouseup(function(e){
            var _con = thisId;
            var _con_bd = $("#"+thisIdName+"price-date-picker");
            if(!_con.is(e.target) && _con.has(e.target).length === 0 && !_con_bd.is(e.target) && _con_bd.has(e.target).length === 0){
                DatePicker.remove(thisIdName);
            }
        });
        function datePickerOffset(){
            $("#"+thisIdName+"price-date-picker").css({"top":thisId.offset().top+thisId.height()+20,"left":thisId.offset().left});
        }
    };
})(jQuery);