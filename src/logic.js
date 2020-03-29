// сегодняшняя дата
const date_now = (function getDateNow() {
  let todayDate = new Date();
  let currYear = todayDate.getFullYear();
  let currMonth = todayDate.getMonth() + 1;
  let currDay = todayDate.getDate();
  // document.write("Сегодняшняя дата: ");
  // console.log( typeof currDay)
  if (currMonth < 10) {
    currMonth = "0" + currMonth;
  }
  if (currDay < 10) {
    currDay = "0" + currDay;
  }
  return currYear + "-" + currMonth + "-" + currDay;
})();

const pr_names = [
  "Дашкин И.А.",
  "Габбасов А.Р.",
  "Гафуров З.С.",
  "Михайлов Д.Е.",
  "Абдуллин Р.Р.",
  "Вачаев В.В.",
  "Зайнутдинов Р.Р.",
  "Баландин С.М.",
  "Карпов В.Г.",
  "Исянбаев Ф.Ф.",
  "Фадеев И.Н.",
  "Хабибуллин Р.Р."
];

function time_calc(
  date_start,
  date_end,
  hour_start,
  minut_start,
  hour_end,
  minut_end
) {
  let start = new Date(date_start);
  start.setHours(hour_start);
  start.setMinutes(minut_start);
  let end = new Date(date_end);
  end.setHours(hour_end);
  end.setMinutes(minut_end);
  let res_time = (end - start) / 3600000;
  let hour = Math.trunc(res_time);
  let minutes = Number(((res_time % 1) * 60).toFixed(1));
  console.log({ hour: hour, minutes: minutes });
  return { hour: hour, minutes: minutes };
}
// time_calc("2020-02-28", "2020-02-29", 23, 30, 0, 45);

// форматируем дату наряда
function date_format(date_str='2020-03-29'){
  date_str=date_str.split('-').reverse().join('.')
return date_str
}
export { pr_names, date_now,time_calc,date_format};
