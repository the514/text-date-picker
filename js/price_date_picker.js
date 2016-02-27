/**
 * Created by the514 on 2016/2/21.
 */
var objDate = { date: new Date(), year: -1, month: -1, day: [], boxArr: [] };
var datePicker = {
    html:"",
    handleBoxArr:function(setPrice){
        objDate.boxArr = setPrice;
    },
    load:function(thisIdName,width,height,setPrice,skin){
        this.handleBoxArr(setPrice);
        var dayMap = {
            day:[],
            date:[],
            price:[],
            priceNum:[],
            priceClass:[],
            style:[],
            text:[]
        };
        for(var prevDays=this.getPrevDays().mNum - this.getFirstDayWeek(objDate.year,objDate.month);prevDays<this.getPrevDays().mNum;prevDays++){
            dayMap.day.push(prevDays+1);
            dayMap.date.push(this.getPrevDays().Y+"-"+
                ((this.getPrevDays().M+1)<10?"0"+(this.getPrevDays().M+1):(this.getPrevDays().M+1))+"-"+
                (prevDays+1));
        }
        for(var days=1;days<=this.getMonthNum(objDate.year,objDate.month);days++){
            dayMap.day.push(days);
            dayMap.date.push(objDate.year+"-"+
                ((objDate.month+1)<10?"0"+(objDate.month+1):(objDate.month+1))+"-"+
                (days<10?"0"+days:days));
        }
        for(var nextDays=1;nextDays<=this.getNextDays().mNum;nextDays++){
            dayMap.day.push(nextDays);
            dayMap.date.push(this.getNextDays().Y+"-"+
                ((this.getNextDays().M+1)<10?"0"+(this.getNextDays().M+1):(this.getNextDays().M+1))+"-"+
                (nextDays<10?"0"+nextDays:nextDays));
        }
        var pickerWidth="";
        var pickerHeight="";
        var skinClass = "";
        if(width!=""){
            pickerWidth=width;
        }
        if(height!=""){
            pickerHeight=height;
        }
        if(skin=="big"){
            skinClass=skin;
        }
        for(var boxIndex=0;boxIndex<objDate.boxArr.length;boxIndex++){
            for(var dateIndex=0;dateIndex<dayMap.date.length;dateIndex++){
                if(objDate.boxArr[boxIndex].Date==dayMap.date[dateIndex]){
                    if(dayMap.priceNum[dateIndex]==""||dayMap.priceNum[dateIndex]==undefined){
                        dayMap.price[dateIndex]="<span class='price'>¥"+objDate.boxArr[boxIndex].Price+"</span>";
                        dayMap.priceNum[dateIndex]=objDate.boxArr[boxIndex].Price;
                        dayMap.priceClass[dateIndex]=" has-price";

                        if(objDate.boxArr[boxIndex].Style!=undefined){
                            dayMap.style[dateIndex]="style='"+objDate.boxArr[boxIndex].Style+"width:"+pickerWidth+"px;"+"height:"+pickerHeight+"px;'";
                        }
                        if(objDate.boxArr[boxIndex].Text!=undefined){
                            dayMap.text[dateIndex]="<span class='holiday'>"+objDate.boxArr[boxIndex].Text+"</span>";
                        }
                    }
                }else{
                    if(dayMap.priceNum[dateIndex]==undefined){
                        if(skinClass=="big"){
                            dayMap.price[dateIndex]="";
                        }else{
                            dayMap.price[dateIndex]="<span class='price'>&nbsp;</span>";
                        }
                        dayMap.priceNum[dateIndex]="";
                        dayMap.priceClass[dateIndex]="";
                    }
                    if(dayMap.style[dateIndex]==undefined){
                        dayMap.style[dateIndex]="style='width:"+pickerWidth+"px;"+"height:"+pickerHeight+"px;'";
                    }
                    if(dayMap.text[dateIndex]==undefined){
                        if(skinClass=="big"){
                            dayMap.text[dateIndex]="";
                        }else{
                            dayMap.text[dateIndex]="<span class='text'>&nbsp;</span>";
                        }
                    }
                }
            }
         }
        if(objDate.year==-1){
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        this.html = "<div id='"+thisIdName+"-price-date-picker' class='price-date-picker "+skinClass+"'>"+
            "<div>"+
            "<span id='"+thisIdName+"-price-date-picker-prev' class='price-date-picker-prev glyphicon glyphicon-arrow-left' aria-hidden='true'></span>"+
            "<span id='"+thisIdName+"-price-date-picker-next' class='price-date-picker-next glyphicon glyphicon-arrow-right' aria-hidden='true'></span>"+
            "<table>"+
            "<tbody>"+
            "<tr>"+
            "<td class='date' colspan='7'>"+objDate.year+"年"+(objDate.month+1)+"月</td>"+
            "</tr>"+
            "<tr class='week'>"+
            "<td><strong>日</strong></td>"+
            "<td><strong>一</strong></td>"+
            "<td><strong>二</strong></td>"+
            "<td><strong>三</strong></td>"+
            "<td><strong>四</strong></td>"+
            "<td><strong>五</strong></td>"+
            "<td><strong>六</strong></td>"+
            "</tr>";
        var index = 0;
        for(var i=1;i<43;i++){
            if(index==0){
                this.html+="<tr>";
            }else if(index==7){
                this.html+="</tr>";
                index=0;
            }
            if(objDate.date.getFullYear()+"-"+((objDate.date.getMonth()+1)<10?"0"+(objDate.date.getMonth()+1):(objDate.date.getMonth()+1))+
                "-"+(objDate.date.getDate()<10?"0"+objDate.date.getDate():objDate.date.getDate())==dayMap.date[i-1]){
                this.html+="<td class='day"+dayMap.priceClass[i-1]+"' "+dayMap.style[i-1]+" date='"+dayMap.date[i-1]+"' price='"+dayMap.priceNum[i-1]+"'>"+
                    "<span class='day_num'>今天</span>"+
                    dayMap.text[i-1]+
                    dayMap.price[i-1]+"</span>"+
                    "</td>";
            }else{
                this.html+="<td class='day"+dayMap.priceClass[i-1]+"' "+dayMap.style[i-1]+" date='"+dayMap.date[i-1]+"' price='"+dayMap.priceNum[i-1]+"'>"+
                    "<span class='day_num'>"+dayMap.day[i-1]+"</span>"+
                    dayMap.text[i-1]+
                    dayMap.price[i-1]+"</span>"+
                    "</td>";
            }
            index++;
        }
        this.html += "<tr>" +
            "<td colspan='7' id='"+thisIdName+"-backToday' class='back-today'>" +
            "<span class='glyphicon glyphicon-time' aria-hidden='true'></span>&nbsp;&nbsp;回到今天" +
            "</td>" +
            "</tr>"+
            "</tbody>" +
            "</table>" +
            "</div>";
    },
    show:function(thisIdName,width,height,setPrice,skin){
        this.remove(thisIdName);
        this.load(thisIdName,width,height,setPrice,skin);
        $("body").append(this.html);
    },
    remove:function(thisIdName){
        $("#"+thisIdName+"-price-date-picker").remove();
    },
    getPrevDays:function(){
        if (objDate.year == -1) {
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        if(objDate.month<=0){
            return {
                mNum:this.getMonthNum((objDate.year-1),11),
                M:11,
                Y:objDate.year-1
            }
        }else{
            return {
                mNum:this.getMonthNum(objDate.year,(objDate.month-1)),
                M:objDate.month-1,
                Y:objDate.year
            }
        }

    },
    getNextDays:function(){
        if (objDate.year == -1) {
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        if(objDate.month>=11){
            return {
                mNum:this.getMonthNum((objDate.year + 1), 11),
                M:0,
                Y:objDate.year+1
            }
        }else{
            return {
                mNum:this.getMonthNum(objDate.year,(objDate.month+1)),
                M:objDate.month+1,
                Y:objDate.year
            }
        }
    },
    prevMonth:function(thisIdName,width,height,setPrice,skin){
        if(objDate.year == -1){
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        if(objDate.month<=0){
            objDate.year-=1;
            objDate.month=11;
        }else{
            objDate.month-=1;
        }
        this.remove(thisIdName);
        this.show(thisIdName,width,height,setPrice,skin);
    },
    nextMonth:function(thisIdName,width,height,setPrice,skin){
        if(objDate.year == -1){
            objDate.year = objDate.date.getFullYear();
            objDate.month = objDate.date.getMonth();
        }
        if(objDate.month >= 11){
            objDate.year += 1;
            objDate.month = 0;
        }else{
            objDate.month += 1;
        }
        this.remove(thisIdName);
        this.show(thisIdName,width,height,setPrice,skin);
    },
    getMonthNum:function(year,month){
        return new Date(year, (month+1), 0).getDate();
    },
    getFirstDayWeek:function(year,month){
        return new Date(year, month, 1).getDay();
    }
};
(function($) {
    $.fn.priceDatePicker = function(object) {
        var thisId = $(this);
        var thisIdName = $(this).attr("id");
        $(this).click(function(){
            if(thisId.is(":input")&&$(this).val()!=""){
                var showThisDate = new Date($(this).val());
                objDate.year = showThisDate.getFullYear();
                objDate.month = showThisDate.getMonth();
            }else if($(this).text()!=""){
                showThisDate = new Date($(this).text());
                if(showThisDate.toString()!="Invalid Date"){
                    objDate.year = showThisDate.getFullYear();
                    objDate.month = showThisDate.getMonth();
                }else{
                    objDate.year = -1;
                    objDate.month = -1;
                }
            }else{
                objDate.year = -1;
                objDate.month = -1;
            }
            datePicker.show(thisIdName,object.width,object.height,object.dayFormat,object.skin);
            datePickerOffset();
        });
        $(document).on("click","#"+thisIdName+"-price-date-picker-prev",function(){
            datePicker.prevMonth(thisIdName,object.width,object.height,object.dayFormat,object.skin);
            datePickerOffset();
        }).on("click","#"+thisIdName+"-price-date-picker-next",function(){
            datePicker.nextMonth(thisIdName,object.width,object.height,object.dayFormat,object.skin);
            datePickerOffset();
        }).on("click","#"+thisIdName+"-backToday",function(){
            objDate.year = -1;
            objDate.month = -1;
            datePicker.show(thisIdName,object.width,object.height,object.dayFormat,object.skin);
            datePickerOffset();
        });
        $(document).on("click","#"+thisIdName+"-price-date-picker td",function(){
            if($(this).attr("date") && $(this).attr("price")){
                //alert($(this).attr("date"));
                //alert($(this).attr("price"));
                //alert($(this).attr("holiday"));
                if(thisId.is(":input")){
                    thisId.val($(this).attr("date"));
                }else{
                    thisId.text($(this).attr("date"));
                }
                datePicker.remove(thisIdName);
            }
        });
        $(document).mouseup(function(e){
            var _con = thisId;
            var _con_bd = $("#"+thisIdName+"-price-date-picker");
            if(!_con.is(e.target) && _con.has(e.target).length === 0 && !_con_bd.is(e.target) && _con_bd.has(e.target).length === 0){
                datePicker.remove(thisIdName);
            }
        });
        function datePickerOffset(){
            $("#"+thisIdName+"-price-date-picker").css({"top":thisId.offset().top+thisId.height()+parseInt(thisId.css("padding-top"))+parseInt(thisId.css("padding-bottom")),"left":thisId.offset().left});
        }
    };
})(jQuery);