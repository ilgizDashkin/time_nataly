import React from 'react'

function ResultItem({id,name,hour,minut,nomers}) {        
    return (
        <div className="border  bg-dark"  id={id}>
            <span className="bg-info">{name}, {hour} ч {minut} мин,</span>  наряды: {nomers}
        </div>
    )
}

export default ResultItem