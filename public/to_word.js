// создаем таблицу в word из матрицы
function table_from_matrix(doc, matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]) {
    console.log(matrix.length, matrix[0].length)
    const table = doc.createTable(matrix.length, matrix[0].length);
    for (let i = 0; i < matrix.length; i++) {
        let matrix_row = matrix[i]
        for (let j = 0; j < matrix_row.length; j++) {
            table.getCell(i, j).addContent(new Paragraph(`${matrix[i][j]}`));
        }
    }
}
// сегодняшняя дата
function getDateNow() {
    let todayDate = new Date();
    let currYear = todayDate.getFullYear();
    let currMonth = todayDate.getMonth() + 1;
    let currDay = todayDate.getDate();
    if (currMonth < 10) {
        currMonth = "0" + currMonth
    }
    if (currDay < 10) {
        currDay = "0" + currDay
    }
    return `${currDay}.${currMonth}.${currYear}`
}
function generate() {
    const doc = new Document();
    const paragraph0 = new Paragraph();
    const paragraph2 = new Paragraph();
    const institutionText2 = new TextRun("                                            ")
    const institutionText21 = new TextRun(`время работы по нарядам ${getDateNow()}`).bold().size(28).underline();
    paragraph2.addRun(institutionText2);
    paragraph2.addRun(institutionText21);
    doc.addParagraph(paragraph2);
    doc.addParagraph(paragraph0)

    //важно!!!!!!!!!!!!!!!!!!!!!!!!!
    const num_proizv = 11//здесь вносим число производителей +1 иначе не будет сохранять ворд файл

    const text_arr = []
    for (let i = 1; i < num_proizv; i++) {
        let str = String(i);
        const elem = document.getElementById(str).textContent
        let s_text = elem.split(',')
        // s_text.unshift(i)
        // s_text.unshift(i)
        text_arr.push(s_text)
    }

    console.log(`массив текста ${text_arr}`)

    /**
    * Возвращает массив из с данными для таблицы учета времени производителя из массива времени работы по нарядам.
    *
    * @param {array} massiv входной 1-мерный массив
    * @param {string} sp слово разделитель.
    * @param {string} a регулярное выражение для поиска.
    * @param {string} a1 регулярное выражение для удаления из таблицы лишних слов.
    * @return {array} result итоговый 2-мерный массив
    */
    function search_and_split_to_arr(result = [], massiv, sp = ' дата ', a = /\S+/, b = /№\w+/, c = / начало \S+/, d = / окончание \S+/, e = / всего \S+/, b1 = /№/, c1 = / начало /, d1 = / окончание /, e1 = / всего /) {
        const arr=Array.from(massiv)
        const time_arr = arr[3].split(sp)//создаем массив деля текст по разделителю слова " дата "
        time_arr.shift()//первый элемент удаляем так как он пустой
        //для каждого элемента находим искомые данные и заносим в массив
        time_arr.forEach(element => {
            let data = element.match(a)[0]
            let nomer = element.match(b)[0].replace(b1, '')
            let begin = element.match(c)[0].replace(c1, '')
            let end = element.match(d)[0].replace(d1, '')
            let vsego = element.match(e)[0].replace(e1, '')
            result.push([data, nomer, begin, end, vsego, arr[0]])//arr[0] это фамилия производителя
        }
        )
        result.push([" Всего "," часов "," за "," месяц ",arr[1],arr[0]])
        // console.log(result)
        return result
    }

    let golovina = [["Дата выполнения работ", "Номер наряда-допуска (распоряжения)", "Время начала работ", "Время окончания работ", "Количество часов", 'Фамилия исполнителя работ']]//создаем загаловок для таблицы учета 
    

    for (let i = 0; i < num_proizv - 1; i++) {
        //хитрый трюк результирующая таблица задается с загаловком и изменяется при каждом вызове цикла
        search_and_split_to_arr(result = golovina, massiv = text_arr[i])
    }

    console.log(golovina)

    table_from_matrix(doc, text_arr)//рисуем 1 таблицу подсчета времени

    doc.addParagraph(paragraph0)
    const paragraph3 = new Paragraph();
    const institutionText31 = new TextRun(`Журнал количества часов ОИЗП ${getDateNow()}`).bold().size(28).underline();
    paragraph3.addRun(institutionText2);
    paragraph3.addRun(institutionText31);
    doc.addParagraph(paragraph3);
    doc.addParagraph(paragraph0)

    
    table_from_matrix(doc, golovina)//рисуем 2 таблицу журнала работы по нарядам
    
    console.log(doc)

    const packer = new Packer();
    packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, `время нарядов ${getDateNow()}.docx`);
        console.log("Document created successfully");
    });
}

// (document.getElementById("save").addEventListener("click", generate()))()