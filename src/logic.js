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

// при изменении числа производителей добавить в файл to_word.js изменение в функцию generate()
const pr_names = [
  "Дашкин И.А.",
  "Гафуров З.С.",
  "Михайлов Д.Е.",
  "Дибаев Р.Т.",
  "Фадеев И.Н.",
  "Каюмов К.Р.",
  "Карпов В.Г.",
  "Исянбаев Ф.Ф.",
  "Янгиров С.С.",
  "Кашапов Р.Г."
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
function date_format(date_str = '2020-03-29') {
  date_str = date_str.split('-').reverse().join('.')
  return date_str
}

/**
    * Возвращает время в формате 2-х цифр прибавляя ноль для однозначных часов или минут
    *
    * @param {string} str входное время
    * @return {string} str преобразованое время
    */
function time_zero_format(str) {
  str=str.toString()
  if (str.length === 1) {
    str = "0" + str
  }
  return str
}
export { pr_names, date_now, time_calc, date_format,time_zero_format };
