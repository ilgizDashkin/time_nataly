import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import TimeElm from './componets/TimeElm'
import NarydNomer from './componets/NarydName';
import Proizvod from './componets/Proizvod';
import Result from './componets/Result';
import { date_now, pr_names, time_calc, date_format, time_zero_format } from './logic'
// import generate from './to_word';

function App() {
  let pr_massiv = [];
  let i = 1;
  pr_names.forEach(elem => {
    pr_massiv.push({ id: i, name: elem, nomers: "", hour: 0, minut: 0, hour_part: 0 });
    i++;
  });
  // console.log("создаем объекты с данными производителей в массив с которым будем работать")
  // console.log(pr_massiv);

  // const [massiv, setState] = useState(pr_massiv)

  let init_state = pr_massiv
  // если есть данные в локал сторадже то присваеваем
  const lastState = localStorage.time_naryd
  if (lastState) {
    // console.log(lastState)
    init_state = JSON.parse(lastState)
  }

  const [massiv, setState] = useState(init_state)

  function enter() {
    const nomer = document.getElementById("nomer").value
    const date_start = document.getElementById("date_start").value
    const date_end = document.getElementById("date_end").value
    const time_start = document.getElementById("time_start").value
    const time_end = document.getElementById("time_end").value
    const selind = document.getElementById('proizv').options.selectedIndex;
    const name = document.getElementById('proizv').options[selind].value;
    const status = document.getElementById("status")

    if (name && nomer && date_start && date_end && time_start && time_end) {
      let [hour_start, minut_start] = time_start.split(":");
      let [hour_end, minut_end] = time_end.split(":");
      let time_obj = time_calc(date_start, date_end, hour_start, minut_start, hour_end, minut_end)

      function insert_data(index) {
        let nomers = massiv[index].nomers + " дата " + date_format(date_start) + " " + "№" + nomer + " начало " + hour_start + ":" + minut_start + " окончание " + hour_end + ":" + minut_end + " всего " + time_zero_format(time_obj.hour) + ":" + time_zero_format(time_obj.minutes) + "  ";
        let hour = massiv[index].hour + Number(time_obj.hour);
        let minut = massiv[index].minut + Number(time_obj.minutes);
        if (minut >= 60) {
          hour += 1;
          minut -= 60;
        }
        let hour_part
        minut ? hour_part = (minut / 60).toFixed(2) : hour_part = hour
        return [nomers, hour, minut, hour_part, hour_start, minut_start, hour_end, minut_end]
      }

      const new_massiv = massiv.map(function (proizv, index) {
        if (proizv.name === name) {
          [proizv.nomers, proizv.hour, proizv.minut, proizv.hour_part, proizv.hour_start, proizv.minut_start, proizv.hour_end, proizv.minut_end] = insert_data(index)
          status.textContent = `добавлено ${proizv.name} наряд: ${nomer} ${time_obj.hour}:${time_obj.minutes}`
        }
        return proizv
      })
      // устанавливаем новый массив в стайте
      setState(new_massiv)
      // console.log(new_massiv);
      localStorage.time_naryd = JSON.stringify(new_massiv);//сохраняем стейт в локалсторадже
    }

  }

  function del_all() {
    setState(pr_massiv)
  }

  function dateChange() {
    const date_start = document.getElementById("date_start").value
    document.getElementById("date_end").value = date_start
  }

  function del_naryd() {
    // эта функция удаляет наряд если введены номер наряда и имя производителя
    const status = document.getElementById("status")
    const nomer = document.getElementById("nomer").value
    const selind = document.getElementById('proizv').options.selectedIndex;
    const name = document.getElementById('proizv').options[selind].value;
    const nomer_naryd = '№' + nomer
    let del_hour = 0//время которое надо удалить
    let del_minut = 0

    if (name && nomer) {
      console.log(massiv[selind])
      console.log(massiv[selind].nomers)
      const arr_nomers = massiv[selind].nomers.split('дата')//создаем массив деля текст по разделителю слова " дата "
      console.log(`массив нарядов до удаления = ${arr_nomers}`)
      if (arr_nomers.length) {
        arr_nomers.shift()//нужно сместится относительно пустого элемента
        console.log(`длинна массива нарядов = ${arr_nomers.length} ${arr_nomers}`)
        let del_index_naryd = 0//индекс наряда который надо удалить
        arr_nomers.forEach((element, index) => {
          console.log(`номер наряда для удаления ${nomer_naryd}`)
          if (element.search(nomer_naryd) !== -1) {
            console.log('содержит номер наряда' + element + index)
            let vsego = element.match(/ всего \S+/)[0].replace(/ всего /, '')
            console.log('vsego ' + vsego)
            del_index_naryd = index
            console.log(`массив нарядов до удаления = ${arr_nomers}`)
            arr_nomers.splice(del_index_naryd, 1)
            console.log(`массив нарядов после удаления = ${arr_nomers}`)
            let arr_vsego = vsego.split(':')
            console.log('arr_vsego ' + arr_vsego[0])
            del_hour = arr_vsego[0]
            del_minut = arr_vsego[1]
            console.log('удалить часов ' + del_hour)
            console.log('удалить минут ' + del_hour)
          }
        }
        )
        if (del_hour || del_minut) {
          // использую метод map для преобразования массива так как только этот метод возвращает новый преобразованный  массив а не forEach!!!!!!!!! 
          massiv[selind].nomers = arr_nomers.map((element, index) => {
            return ` дата ${element}`
          }).join('')

          console.log(`massiv[selind].nomers= ${massiv[selind].nomers}`)

          console.log(`выполнено условие время удаления ${del_hour} ${del_minut}  массив nomers =${massiv[selind]}`)
          massiv[selind].hour = Number(massiv[selind].hour) - Number(del_hour);
          massiv[selind].minut = Number(massiv[selind].minut) - Number(del_minut);
          if (massiv[selind].minut < 0) {
            massiv[selind].hour -= 1;
            massiv[selind].minut += 60;
          }

          massiv[selind].minut ? massiv[selind].hour_part = (massiv[selind].minut / 60).toFixed(2) : massiv[selind].hour_part = massiv[selind].hour

          function insert_data(index) {
            let nomers = massiv[index].nomers
            let hour = massiv[index].hour
            let minut = massiv[index].minut
            let hour_part = massiv[index].hour_part
            let hour_start = massiv[index].hour_start
            let minut_start = massiv[index].minut_start
            let hour_end = massiv[index].hour_end
            let minut_end = massiv[index].minut_end
            return [nomers, hour, minut, hour_part, hour_start, minut_start, hour_end, minut_end]
          }

          const new_massiv = massiv.map(function (proizv, index) {
            if (proizv.name === name) {
              [proizv.nomers, proizv.hour, proizv.minut, proizv.hour_part, proizv.hour_start, proizv.minut_start, proizv.hour_end, proizv.minut_end] = insert_data(index)
              status.textContent = `удалено ${name} наряд: ${nomer} ${del_hour}:${del_minut}`
            }
            return proizv
          })
          // устанавливаем новый массив в стайте
          setState(new_massiv)
          // console.log(new_massiv);
          localStorage.time_naryd = JSON.stringify(new_massiv);//сохраняем стейт в локалсторадже
        }

      }

    } else {
      alert('введите номер наряда и выберите производителя с этим номером')
    }
  }

  return (
    <div className="container p-2   text-white p-3 bg-secondary">
      <div className="row ">
        <div className="col-md-4 ">
          <NarydNomer />
          <TimeElm timeName="начало работы" idName="start" date_now={date_now} onChange={dateChange} />
          <TimeElm timeName="окончание работы" idName="end" date_now={date_now} />
          <Proizvod />
          <button id="add_button" className="btn btn-success btn-lg btn-block" onClick={enter} >добавить</button>
          <p id="status">введите номер наряда, время начала работы и окончания, выберите производителя и нажмите кнопку добавить</p>
          <button id="del_button" className="btn btn-danger " onClick={del_all} >удалить всё!</button>
          <p>если случайно нажали кнопку "удалить все!" и не нажали кнопку "добавить", можно востановить просто перезагрузив страницу в браузере</p>
          <button id="del_naryd" className="btn btn-danger " onClick={del_naryd} >удалить наряд №</button>
        </div>
        <div className="col-md-8">
          <Result result_massiv={massiv} />
        </div>
      </div>
    </div>
  )

}

export default App;
