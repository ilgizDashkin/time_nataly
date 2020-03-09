import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import TimeElm from './componets/TimeElm'
import NarydNomer from './componets/NarydName';
import Proizvod from './componets/Proizvod';
import Result from './componets/Result';
import { date_now, pr_names, time_calc } from './logic'
// import generate from './to_word';

function App() {
  let pr_massiv = [];
  let i = 1;
  pr_names.forEach(elem => {
    pr_massiv.push({ id: i, name: elem, nomers: "", hour: 0, minut: 0 });
    i++;
  });
  // console.log("создаем объекты с данными производителей в массив с которым будем работать")
  // console.log(pr_massiv);

  // const [massiv, setState] = useState([{ id: 1, name: "Дашкин И.А.", nomers: "", hour: 0, minut: 0 }])
  const [massiv, setState] = useState(pr_massiv)

  function enter() {
    const nomer = document.getElementById("nomer").value
    const date_start = document.getElementById("date_start").value
    const date_end = document.getElementById("date_end").value
    const time_start = document.getElementById("time_start").value
    const time_end = document.getElementById("time_end").value

    const selind = document.getElementById('proizv').options.selectedIndex;
    const name = document.getElementById('proizv').options[selind].value;

    if (name && nomer && date_start && date_end && time_start && time_end) {
      let [hour_start, minut_start] = time_start.split(":");
      let [hour_end, minut_end] = time_end.split(":");
      let time_obj = time_calc(date_start, date_end, hour_start, minut_start, hour_end, minut_end)

      function insert_data(index) {
        let nomers = massiv[index].nomers + nomer + ": " + time_obj.hour + "ч " + time_obj.minutes + "мин; ";
        let hour = massiv[index].hour + Number(time_obj.hour);
        let minut = massiv[index].minut + Number(time_obj.minutes);
        if (minut >= 60) {
          hour += 1;
          minut -= 60;
        }
        return [nomers, hour, minut]
      }

     let [nomers, hour, minut] = insert_data(0)
     let new_massiv = [
        { id: massiv[0].id, name: massiv[0].name, nomers, hour, minut },
        massiv[1],
        massiv[2],
        massiv[3],
        massiv[4],
        massiv[5],
        massiv[6],
        massiv[7],
        massiv[8],
        massiv[9],
        massiv[10],
        massiv[11]
      ]
      switch (name) {
        case "Габбасов А.Р.":
           [nomers, hour, minut] = insert_data(1)
           new_massiv = [
            massiv[0],
            { id: massiv[1].id, name: massiv[1].name, nomers, hour, minut },
            massiv[2],
            massiv[3],
            massiv[4],
            massiv[5],
            massiv[6],
            massiv[7],
            massiv[8],
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Гафуров З.С.":
          [nomers, hour, minut] = insert_data(2)
          new_massiv = [
            massiv[0],
            massiv[1],
            { id: massiv[2].id, name: massiv[2].name, nomers, hour, minut },
            massiv[3],
            massiv[4],
            massiv[5],
            massiv[6],
            massiv[7],
            massiv[8],
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Михайлов Д.Е.":
          [nomers, hour, minut] = insert_data(3)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            { id: massiv[3].id, name: massiv[3].name, nomers, hour, minut },
            massiv[4],
            massiv[5],
            massiv[6],
            massiv[7],
            massiv[8],
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Абдуллин Р.Р.":
          [nomers, hour, minut] = insert_data(4)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            massiv[3],
            { id: massiv[4].id, name: massiv[4].name, nomers, hour, minut },
            massiv[5],
            massiv[6],
            massiv[7],
            massiv[8],
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Вачаев В.В.":
          [nomers, hour, minut] = insert_data(5)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            massiv[3],
            massiv[4],
            { id: massiv[5].id, name: massiv[5].name, nomers, hour, minut },
            massiv[6],
            massiv[7],
            massiv[8],
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Зайнутдинов Р.Р.":
          [nomers, hour, minut] = insert_data(6)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            massiv[3],
            massiv[4],
            massiv[5],
            { id: massiv[6].id, name: massiv[6].name, nomers, hour, minut },
            massiv[7],
            massiv[8],
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Баландин С.М.":
          [nomers, hour, minut] = insert_data(7)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            massiv[3],
            massiv[4],
            massiv[5],
            massiv[6],
            { id: massiv[7].id, name: massiv[7].name, nomers, hour, minut },
            massiv[8],
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Карпов В.Г.":
          [nomers, hour, minut] = insert_data(8)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            massiv[3],
            massiv[4],
            massiv[5],
            massiv[6],
            massiv[7],
            { id: massiv[8].id, name: massiv[8].name, nomers, hour, minut },
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Исянбаев Ф.Ф.":
          [nomers, hour, minut] = insert_data(9)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            massiv[3],
            massiv[4],
            massiv[5],
            massiv[6],
            massiv[7],
            massiv[8],
            { id: massiv[9].id, name: massiv[9].name, nomers, hour, minut },
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Фадеев И.Н.":
          [nomers, hour, minut] = insert_data(10)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            massiv[3],
            massiv[4],
            massiv[5],
            massiv[6],
            massiv[7],
            massiv[8],
            massiv[9],
            { id: massiv[10].id, name: massiv[10].name, nomers, hour, minut },
            massiv[11]
          ]
          setState(new_massiv)
          break;
        case "Хабибуллин Р.Р.":
          [nomers, hour, minut] = insert_data(11)
          new_massiv = [
            massiv[0],
            massiv[1],
            massiv[2],
            massiv[3],
            massiv[4],
            massiv[5],
            massiv[6],
            massiv[7],
            massiv[8],
            massiv[9],
            massiv[10],
            { id: massiv[11].id, name: massiv[11].name, nomers, hour, minut }
          ]
          setState(new_massiv)
          break;
        default:
          [nomers, hour, minut] = insert_data(0)
          new_massiv = [
            { id: massiv[0].id, name: massiv[0].name, nomers, hour, minut },
            massiv[1],
            massiv[2],
            massiv[3],
            massiv[4],
            massiv[5],
            massiv[6],
            massiv[7],
            massiv[8],
            massiv[9],
            massiv[10],
            massiv[11]
          ]
          setState(new_massiv)
      } 
      console.log(new_massiv);   
    }
    
  }

  // useEffect(()=>{
  //  const raw=localStorage.getItem('massiv')||[]
  //  setMassiv(JSON.parse(raw))
  // },[])

  // useEffect(()=>{
  //   localStorage.setItem('massiv',JSON.stringify(massiv))
  // },[massiv])

  return (
    <div className="container p-2   text-white p-3 bg-secondary">
      <div className="row ">
        <div className="col-md-4 ">
          <NarydNomer />
          <TimeElm timeName="начало работы" idName="start" date_now={date_now} />
          <TimeElm timeName="окончание работы" idName="end" date_now={date_now} />
          <Proizvod />
          <button id="add_button" className="btn btn-success btn-lg btn-block" onClick={enter} >добавить</button>
        </div>
        <div className="col-md-8">
          <Result result_massiv={massiv} />
        </div>
      </div>
      </div>
      )
    
}

export default App;
