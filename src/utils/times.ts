// 封装的函数
function getTimeOfDay() {
  var currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 6) {
    return "凌晨";
  } else if (currentHour >= 6 && currentHour < 12) {
    return "早上";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "下午";
  } else {
    return "晚上";
  }
}
var timeOfDay = getTimeOfDay();
export default timeOfDay