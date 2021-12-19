// создаем таблицу в word из матрицы
function table_from_matrix(doc, matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]) {
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

    let text_arr = []
    for (let i = 1; i < 11; i++) {//здесь вносим число производителей +1 иначе не будет сохранять ворд файл
        let str = String(i);
        const elem = document.getElementById(str).textContent
        let s_text = elem.split(',')
        text_arr.push(s_text)
    }

    table_from_matrix(doc, text_arr)

    const packer = new Packer();
    packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, `время нарядов ${getDateNow()}.docx`);
        console.log("Document created successfully");
    });
}

// (document.getElementById("save").addEventListener("click", generate()))()