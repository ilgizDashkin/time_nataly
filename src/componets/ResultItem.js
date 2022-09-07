import React from 'react'
import {time_zero_format } from '../logic'

// функция нужна для преобразавания времени в 4-х значный формат, домолняет нулями если часы 1 цифра
function ResultItem({id,name,hour,minut,nomers,hour_part}) {        
    return (
        <div className="border  bg-dark"  id={id}>
            <span className="bg-info">{name}, {time_zero_format(hour)}:{time_zero_format(minut)}, {(Number(hour)+Number(hour_part)).toFixed(2)},</span>{nomers}
        </div>
    )
}

export default ResultItem