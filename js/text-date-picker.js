(function($) {

  var objDate = { date: new Date(), year: -1, month: -1, daysInfo: [], festival: [] }

  var theDatePicker = {

    contentHtml:"",
    calendarDaysClass:[],
    calendarDays:[],
    calendarDate:[],

    init:function(thisIdName, obj, daysInfo, festival){

      this.contentHtml = "";
      this.calendarDays = [];
      this.calendarDate = [];
      this.calendarDaysClass = [];
      this.isSetDate();
      this.calendarMap();
      this.remove(thisIdName);

      objDate.daysInfo = daysInfo;
      objDate.festival = festival;
      this.show(thisIdName, obj);

    },

    show:function(thisIdName, obj){

      this.contentHtml = ""+
          "<div id='"+thisIdName+"-text-date-picker' class='text-date-picker'>"+
            "<div>"+
              "<span id='"+thisIdName+"-text-date-picker-prev' class='text-date-picker-prev glyphicon glyphicon-chevron-left' aria-hidden='true'></span>"+
              "<span id='"+thisIdName+"-text-date-picker-next' class='text-date-picker-next glyphicon glyphicon-chevron-right' aria-hidden='true'></span>"+            
              "<table class='table'>"+
                "<tbody>"+
                  "<tr class='date-hd'>"+
                    "<td class='date text-center' colspan='7'>"+
                      "<div>"+objDate.year+"年"+(objDate.month+1)+"月<span class='caret'></span></div>"+
                      "<div id='date-pop-append'></div>"+
                    "</td>"+
                  "</tr>"+
                  "<tr class='week'>"+
                    "<td class='text-center'><strong>日</strong></td>"+
                    "<td class='text-center'><strong>一</strong></td>"+
                    "<td class='text-center'><strong>二</strong></td>"+
                    "<td class='text-center'><strong>三</strong></td>"+
                    "<td class='text-center'><strong>四</strong></td>"+
                    "<td class='text-center'><strong>五</strong></td>"+
                    "<td class='text-center'><strong>六</strong></td>"+
                  "</tr>";
      var day_line = 0
      for (var day = 1; day <= 42; day++){

        if(day_line==0){

          this.contentHtml += "<tr>";

        }else if (day_line==7) {

          this.contentHtml += "</tr>";
          day_line = 0;

        };

        this.contentHtml += ""+
          "<td date='"+ this.calendarDate[day-1] +"' class='text-center "+this.calendarDaysClass[day-1]+" "+this.isToday(this.calendarDate[day-1]).todayClass+"' style='"+this.matchDate(this.calendarDate[day-1]).style+"'>"+
          "<span class='day'>"+this.calendarDays[day-1]+"</span>"+
          this.isToday(this.calendarDate[day-1]).text+
          this.matchDate(this.calendarDate[day-1]).text+
          this.matchFestival(this.calendarDate[day-1]).festival+
          this.matchDate(this.calendarDate[day-1]).price+
          "</td>";
        day_line++;

      };
      this.contentHtml += "<tr>" +
                            "<td colspan='7' id='"+thisIdName+"-backToday' class='back-today text-center'>" +
                              "<span class='glyphicon glyphicon-time' aria-hidden='true'></span>&nbsp;&nbsp;回到今天" +
                            "</td>" +
                          "</tr>";
      this.contentHtml +=       "</tbody>"+
                              "</table>"+
                            "</div>"+
                          "</div>";
      
      $("body").append(this.contentHtml);
      this.datePickerOffset(thisIdName, obj);

    },

    remove:function(thisIdName){

      $("#"+thisIdName+"-text-date-picker").remove();

    },

    isSetDate:function(){

      if(objDate.year==-1){
        objDate.year = objDate.date.getFullYear();
        objDate.month = objDate.date.getMonth();
      };

    },

    isToday:function(date){

      if(date == this.formatDate("", new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear())){
        return {
          text: "<span class='clearfix'>今天</span>",
          todayClass: "today"
        };
      }else{
        return {
          text: "",
          todayClass: ""          
        };
      }

    },

    getDayOfTheWeek:function(year, month, day){

      return new Date(year, month, day).getDay();

    },

    getDayNumOfTheMonth:function(year, month){

      return new Date(year, (month+1), 0).getDate();

    },

    getDayNumOfLastMonth:function(year, month){

      return new Date(year, (month), 0).getDate();

    },

    getLastMonthDays:function(){

      var firstDayOfTheWeek = this.getDayOfTheWeek(objDate.year, objDate.month, 1);
      var lastMonthDays = this.getDayNumOfLastMonth(objDate.year, objDate.month) - firstDayOfTheWeek;
      
      if(firstDayOfTheWeek==0){
        lastMonthDays -= 6;
      }else{
        lastMonthDays += 1;
      };

      for (var i = lastMonthDays; i <= this.getDayNumOfLastMonth(objDate.year, objDate.month); i++) {
        this.calendarDays.push(i);
        this.calendarDate.push(this.formatDate("last", i, "", ""));
        this.calendarDaysClass.push("last-month-day");
      };

    },

    getCurrentMonthDays:function(){

      var currentMonthDaysNum = this.getDayNumOfTheMonth(objDate.year, objDate.month)
      for (var i = 1; i < currentMonthDaysNum+1; i++) {
        this.calendarDays.push(i);
        this.calendarDate.push(this.formatDate("", i, objDate.month + 1, objDate.year));
        this.calendarDaysClass.push("current-month-day");
      };

    },

    getNextMonthDays:function(){

      var daysCount = this.calendarDays.length;
      for (var i = 1; i <= (42 - daysCount); i++) {
        this.calendarDays.push(i);
        this.calendarDate.push(this.formatDate("next", i, "", ""));
        this.calendarDaysClass.push("next-month-day");
      };

    },

    getPrev:function(thisIdName, obj, daysInfo, festival){

      objDate.year = parseInt(objDate.year)
      objDate.month = parseInt(objDate.month)

      if((objDate.month-1)<0){
        objDate.year -= 1;
        objDate.month = 11;
      }else{
        objDate.year = objDate.year;
        objDate.month = objDate.month - 1;
      }
      this.remove(thisIdName);
      this.init(thisIdName, obj, daysInfo, festival);

    },

    getNext:function(thisIdName, obj, daysInfo, festival){

      objDate.year = parseInt(objDate.year)
      objDate.month = parseInt(objDate.month)      

      if((objDate.month+1)>11){
        objDate.year = objDate.year + 1;
        objDate.month = 0;
      }else{
        objDate.year = objDate.year;
        objDate.month += 1;
      }
      this.remove(thisIdName);
      this.init(thisIdName, obj, daysInfo, festival);

    },

    formatDate:function(whichDate, day, month, year){
      
      if(whichDate=="last"){

        if((objDate.month-1)<0){
          year = objDate.year - 1;
          month = 12;
        }else{
          year = objDate.year;
          month = objDate.month; // -1 +1
        }

      }else if(whichDate=="next"){

        if((objDate.month+1)>11){
          year = objDate.year + 1;
          month = 1;
        }else{
          year = objDate.year;
          month = objDate.month + 2; // +1 +1
        }

      }
      return year +"-"+ (month < 9?"0" + month : month) +"-"+ (day < 10?"0" + day : day);

    },

    matchDate:function(date){

      var price = "";
      var style = "";
      var text = "";
      $.each(objDate.daysInfo, function(i, n){
        if(date==n.Date){

          if(n.Price) price = "<span class='clearfix price' price='"+ n.Price +"'>¥"+ n.Price +"</span>";
          if(n.Style) style = n.Style;
          if(n.Text) text = "<span class='clearfix text' price='"+ n.Text +"'>"+ n.Text +"</span>";
        
        }      
      });
      return {
        price: price,
        style: style,
        text: text
      };

    },

    matchFestival:function(date){

      var festival = "";
      $.each(objDate.festival, function(i, n){
        if(date==theDatePicker.formatDate("", n.Day, parseInt(n.Month), objDate.year)){

          if(n.Name) festival = "<span class='clearfix festival'>"+ n.Name +"</span>";

        }      
      });
      return {
        festival: festival,
      };

    },    

    calendarMap:function(){
      
      this.getLastMonthDays();
      this.getCurrentMonthDays();
      this.getNextMonthDays();

    },

    datePickerOffset: function(id, obj){

        $("#"+id+"-text-date-picker").css({"top":obj.offset().top+obj.height()+parseInt(obj.css("padding-top"))+parseInt(obj.css("padding-bottom")),"left":obj.offset().left});
    
    }

  }

  $.fn.textDatePicker = function(object) {

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

      theDatePicker.init(thisIdName, thisId, object.setDaysInfo, object.festival);
      (object.templet=="small")?$("#"+thisIdName+"-text-date-picker").addClass("small"):"";

    });

    $(document).mouseup(function(e){

        var _con = thisId;
        var _con_bd = $("#"+thisIdName+"-text-date-picker");

        if(!_con.is(e.target) && _con.has(e.target).length === 0 && !_con_bd.is(e.target) && _con_bd.has(e.target).length === 0){
            theDatePicker.remove(thisIdName);
        }

    });

    $(document).on("click","#"+thisIdName+"-text-date-picker td",function(){

        if($(this).attr("date")){

            if(thisId.is(":input")){
                thisId.val($(this).attr("date"));
            }else{
                thisId.text($(this).attr("date"));
            }
            theDatePicker.remove(thisIdName);
        }

    }).on('click', "#"+thisIdName+"-text-date-picker .date div:eq(0)", function() {

      if($("#"+thisIdName+"-text-date-picker .date-pop").length==0){

        var year = "";
        var month = "";

        for(var i = 1900; i <= 2050; i++){
          year += "<option value="+i+">"+ i +"</option>";
        }

        for(var i = 1; i <= 12; i++){
          month += "<option value="+i+">"+ i +"</option>";
        }

        $("#"+thisIdName+"-text-date-picker #date-pop-append").append('<div class="date-pop"><span>年：</span><select class="year-select form-control">'+year+'</select><span>月：</span><select class="month-select form-control">'+month+'</select><span class="glyphicon glyphicon glyphicon-ok-sign"></span><span class="glyphicon glyphicon-remove-sign"></span></div>');
        
        $("#"+thisIdName+"-text-date-picker .year-select").find("option[value='"+objDate.year+"']").attr({
          "selected": 'selected'
        });

        $("#"+thisIdName+"-text-date-picker .month-select").find("option[value='"+(objDate.month+1)+"']").attr({
          "selected": 'selected'
        });

        $("#"+thisIdName+"-text-date-picker .date-pop").stop().animate({"height": 50},100);
      
      }else{

        $("#"+thisIdName+"-text-date-picker .date-pop").stop().animate({"height": 0}, 100, function(){
           
          $("#"+thisIdName+"-text-date-picker .date-pop").remove();
        
        });
      
      }

    }).on('click', "#"+thisIdName+"-text-date-picker span.glyphicon-remove-sign", function() {

      $("#"+thisIdName+"-text-date-picker .date-pop").stop().animate({"height": 0}, 100, function(){
         
        $("#"+thisIdName+"-text-date-picker .date-pop").remove();
      
      });

    }).on('change', "#"+thisIdName+"-text-date-picker .year-select", function() {

      objDate.year = $(this).val();

    }).on('change', "#"+thisIdName+"-text-date-picker .month-select", function() {

      objDate.month = parseInt($(this).val()) - 1;

    }).on('click', "#"+thisIdName+"-text-date-picker span.glyphicon-ok-sign", function() {

      theDatePicker.init(thisIdName, thisId, object.setDaysInfo, object.festival);
      (object.templet=="small")?$("#"+thisIdName+"-text-date-picker").addClass("small"):"";

    });;


    $(document).on('click', '#'+thisIdName+'-text-date-picker-prev', function() {

      theDatePicker.getPrev(thisIdName, thisId, object.setDaysInfo, object.festival);
      (object.templet=="small")?$("#"+thisIdName+"-text-date-picker").addClass("small"):"";

    }).on('click', '#'+thisIdName+'-text-date-picker-next', function() {

      theDatePicker.getNext(thisIdName, thisId, object.setDaysInfo, object.festival);
      (object.templet=="small")?$("#"+thisIdName+"-text-date-picker").addClass("small"):"";

    }).on("click","#"+thisIdName+"-backToday",function(){

      objDate.year = -1;
      objDate.month = -1;
      theDatePicker.init(thisIdName, thisId, object.setDaysInfo, object.festival);
      (object.templet=="small")?$("#"+thisIdName+"-text-date-picker").addClass("small"):"";

    });
 
  };

})(jQuery);