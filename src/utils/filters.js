export function dateFormat(time, format = "YY-MM-DD hh:mm:ss") {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return "0" + index;
  });

  return format
    .replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec);
}

//格式化时间
//dateTime：时间戳；  flag：取值为true/false，用于判断是否需要显示时分秒
export function getFormtTime(dateTime, flag) {
  if (dateTime != null) {
    //若传入的dateTime为字符串类型，需要进行转换成数值，若不是无需下面注释代码
    //var time = parseInt(dateTime)
    var date = new Date();
    //获取年份
    var YY = date.getFullYear();
    //获取月份
    var MM =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    //获取日期
    var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    if (flag) {
      //flag为true，显示时分秒格式
      //获取小时
      var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      //获取分
      var mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      ///获取秒
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      //返回时间格式： 2020-11-09 13:14:52
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
    } else {
      //返回时间格式： 2020-11-09
      return YY + "-" + MM + "-" + DD;
    }
  } else {
    return "";
  }
}
