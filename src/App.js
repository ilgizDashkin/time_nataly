import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import TimeElm from './componets/TimeElm'
import NarydNomer from './componets/NarydName';
import Proizvod from './componets/Proizvod';
import Result from './componets/Result';
import { date_now, pr_names, time_calc, date_format } from './logic'
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
    const status = document.getElementById("status")
    const selind = document.getElementById('proizv').options.selectedIndex;
    const name = document.getElementById('proizv').options[selind].value;

    if (name && nomer && date_start && date_end && time_start && time_end) {
      let [hour_start, minut_start] = time_start.split(":");
      let [hour_end, minut_end] = time_end.split(":");
      let time_obj = time_calc(date_start, date_end, hour_start, minut_start, hour_end, minut_end)

      function insert_data(index) {
        let nomers = massiv[index].nomers +"Дата " +date_format(date_start)+" " +  "№" + nomer +" начало "+hour_start+":"+ minut_start+" окончание "+hour_end+":"+minut_end+ " продолжительность " + time_obj.hour + "ч " + time_obj.minutes + "мин. ";
        let hour = massiv[index].hour + Number(time_obj.hour);
        let minut = massiv[index].minut + Number(time_obj.minutes);
        if (minut >= 60) {
          hour += 1;
          minut -= 60;
        }
        let hour_part
        minut ? hour_part = (minut / 60).toFixed(2) : hour_part = hour
        return [nomers, hour, minut, hour_part,hour_start, minut_start, hour_end, minut_end]
      }

      const new_massiv = massiv.map(function (proizv, index) {
        if (proizv.name === name) {
          [proizv.nomers, proizv.hour, proizv.minut, proizv.hour_part] = insert_data(index)
          status.textContent = `добавлено ${proizv.name} наряд: ${nomer} ${time_obj.hour}ч. ${time_obj.minutes}мин.`
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

  function dateChange(){
    const date_start = document.getElementById("date_start").value
    document.getElementById("date_end").value=date_start
  }

  return (
    <div className="container p-2   text-white p-3 bg-secondary">
      <div className="row ">
        <div className="col-md-4 ">
          <NarydNomer />
          <TimeElm timeName="начало работы" idName="start" date_now={date_now} onChange={dateChange}/>
          <TimeElm timeName="окончание работы" idName="end" date_now={date_now} />
          <Proizvod />
          <button id="add_button" className="btn btn-success btn-lg btn-block" onClick={enter} >добавить</button>
          <p id="status">введите номер наряда, время начала работы и окончания, выберите производителя и нажмите кнопку добавить</p>
          <button id="del_button" className="btn btn-danger " onClick={del_all} >удалить всё!</button>
          <p>если случайно нажали кнопку "удалить все!" и не нажали кнопку "добавить", можно востановить просто перезагрузив страницу в браузере</p>
        </div>
        <div className="col-md-8">
          <Result result_massiv={massiv} />
        </div>
      </div>
    </div>
  )

}

export default App;
