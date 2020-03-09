import React from 'react'

function TimeElm(props) {

    return (
        <div>
            <p>{props.timeName}</p>
            <p><input id={`date_${props.idName}`} type="date" defaultValue={props.date_now}></input><input id={`time_${props.idName}`} type="time"></input></p>                      
        </div>
    )
}

export default TimeElm