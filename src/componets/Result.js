import React from 'react'
import ResultItem from './ResultItem';

function Result({result_massiv}) {         
    return (
        <div>
            {result_massiv.map((elm) =><ResultItem key={elm.id} id={elm.id} {...elm}/>)}       
        </div>
    )
}

export default Result