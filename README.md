# text-date-picker

#Usage
include bootstrap, jquery and text-date-picker
  <link rel="stylesheet" href="assets/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/date-picker-style.css">
  <script src="js/jquery-1.12.3.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/text-date-picker.js"></script>

  <input id="DatePicker-js" class="form-control date-picker-input" type="text" name="yourname" placeholder="点击选择日期" />

  <div id="DatePicker1-js" class="form-control date-picker-input" style="width:179px;">
    点击选择日期
  </div>

  <script>
  
    $("#DatePicker-js").textDatePicker();
  
  </script>

![TextDatePickerBig](https://raw.githubusercontent.com/the514/text-date-picker/master/assets/img/big-date-picker.png)

  <script>
  
    $("#DatePicker1-js").textDatePicker({"templet":"small"});
  
  </script>

![TextDatePickerSmall](https://raw.githubusercontent.com/the514/text-date-picker/master/assets/img/small.png)

  <script>
  
    $("#DatePicker-js").textDatePicker({

      setDaysInfo:[
        {"Date":"2016-05-03","Price":"158","Style":"background:#dff0d8;","Text":"文字1"},
        {"Date":"2016-05-04","Price":"59","Style":"background:#d9edf7;","Text":"文字2"},
        {"Date":"2016-05-05","Price":"159","Style":"background:#fcf8e3;","Text":"文字3"}
      ],
  
    });
  
  </script>

![TextDatePickerSmall](https://raw.githubusercontent.com/the514/text-date-picker/master/assets/img/day-info.png)

  <script>
  
    $("#DatePicker-js").textDatePicker({

      festival:[
        {"Month":"5","Day":"1", "Name":"国际劳动节"}
      ]
  
    });
  
  </script>

![TextDatePickerSmall](https://raw.githubusercontent.com/the514/text-date-picker/master/assets/img/day-festival.png)