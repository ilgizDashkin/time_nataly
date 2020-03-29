import React from 'react'

function ResultItem({id,name,hour,minut,nomers,hour_part}) {        
    return (
        <div className="border  bg-dark"  id={id}>
            <span className="bg-info">{name}, {hour}ч{minut}мин, {Number(hour)+Number(hour_part)},</span>{nomers}
        </div>
    )
}

export default ResultItem