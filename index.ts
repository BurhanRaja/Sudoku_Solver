// Test Arrays
let sudoku: Array<Array<number>> = [[0, 0, 4, 5, 6, 0, 0, 0, 9],
[0, 5, 6, 0, 0, 0, 2, 0, 3],
[7, 8, 9, 3, 0, 4, 1, 0, 0],
[3, 0, 0, 0, 5, 0, 0, 7, 4],
[4, 6, 7, 0, 0, 0, 0, 2, 8],
[0, 0, 8, 0, 0, 2, 0, 6, 1],
[6, 2, 0, 8, 1, 0, 4, 0, 5],
[8, 0, 1, 9, 4, 0, 6, 0, 2],
[0, 4, 5, 0, 3, 0, 8, 1, 7]]

let sudokuAnswerArray: Array<Array<number>> = [[0, 0, 4, 5, 6, 0, 0, 0, 9],
[0, 5, 6, 0, 0, 0, 2, 0, 3],
[7, 8, 9, 3, 0, 4, 1, 0, 0],
[3, 0, 0, 0, 5, 0, 0, 7, 4],
[4, 6, 7, 0, 0, 0, 0, 2, 8],
[0, 0, 8, 0, 0, 2, 0, 6, 1],
[6, 2, 0, 8, 1, 0, 4, 0, 5],
[8, 0, 1, 9, 4, 0, 6, 0, 2],
[0, 4, 5, 0, 3, 0, 8, 1, 7]]

// Sudoku Board
let boardCont = document.querySelector('.body-container')
let sudokuQuestion = document.querySelector('.question-container')
let sudokuAnswer = document.querySelector('.answer-question')

// Start Button
let startBtn = document.querySelector('.start-btn-active button')
let startBtnCont = document.querySelector('.start-btn-active')

// To get Check and Get Answer Btn
let answerCont = document.querySelector('.check-answer')

// To Start the Game
startBtn?.addEventListener('click', (): void => {
    startBtnCont?.classList.remove('start-btn-active')
    startBtnCont?.classList.add('start-btn')

    createBoard(sudoku.length * sudoku.length)
})


// To create the board for question
const createBoard = (n: number): void => {
    sudokuQuestion?.classList.remove('question-container')
    sudokuQuestion?.classList.add('question-container-active')

    boardCont?.classList.remove('body-container')
    boardCont?.classList.add('body-container-active')

    answerCont?.classList.remove('check-answer')
    answerCont?.classList.add('check-answer-active')

    let questionBoard = document.querySelector('.question-container-active .container')

    let divTag = `<div></div>`
    for (let i = 1; i <= n; i++) {
        questionBoard?.insertAdjacentHTML('beforeend', divTag)
    }
    let numBoard = document.querySelectorAll('.question-container-active .container div')

    let count: number = 0
    for (let i = 0; i < sudoku.length && count <= n; i++) {
        for (let j = 0; j < sudoku.length && count <= n; j++) {
            if (sudoku[i][j] === 0) {
                numBoard[count].insertAdjacentHTML("beforeend", `<input id="${count}" type="text" />`)
            }
            else {
                numBoard[count].insertAdjacentHTML("beforeend", `${sudoku[i][j]}`)
            }
            count++
        }
    }
    getData()
}

// To get the data from input
let inputArray: Array<number> = new Array(81).fill(0)

const getData = () => {
    let inputNum = document.querySelectorAll('.question-container-active .container div input')
    inputNum.forEach(inp => {
        inp.addEventListener("change", () => {

            let input = <HTMLInputElement>inp
            inputArray.splice(Number(input.id), 1, Number(input.value))
        })
    })
}

// To Check the given answer
let checkAnsBtn = document.querySelector('.check')
let wrongAns = document.querySelector('.wrong')
let correctAns = document.querySelector('.correct')

checkAnsBtn?.addEventListener('click', () => {
    let answer: boolean = checkAns()
    if (answer) {
        correctAns?.classList.remove('correct')
        correctAns?.classList.add('correct-active')
    }
    else {
        wrongAns?.classList.remove('wrong')
        wrongAns?.classList.add('wrong-active')
    }
})

// Check answer function
const checkAns = (): boolean => {
    solve()
    let count: number = 0
    for (let i = 0; i < sudoku.length; i++) {
        let flag: boolean = false
        for (let j = 0; j < sudoku.length; j++) {
            if (inputArray[count] !== 0 && inputArray[count] == sudokuAnswerArray[i][j]) {
                flag = true
                console.log(true)
            }
            if (inputArray[count] !== 0 && inputArray[count] !== sudokuAnswerArray[i][j]) {
                flag = false
                break
            }
            count++
        }
        if (!flag) {
            return false
        }
    }
    return true
}


// Solve Sudoku
const solve = (): boolean => {
    let i = 0
    let j = 0

    // Checking for 0 in array
    for (i = 0; i < sudokuAnswerArray.length; i++) {
        let flag: boolean = false
        for (j = 0; j < sudokuAnswerArray.length; j++) {
            if (sudokuAnswerArray[i][j] == 0) {
                flag = true
                break;
            }
        }
        if (flag) {
            break;
        }
    }

    if (i === sudokuAnswerArray.length && j === sudokuAnswerArray.length) {
        return true
    }

    for (let n = 1; n <= sudokuAnswerArray.length; n++) {
        if (isSafe(i, j, n)) {
            sudokuAnswerArray[i][j] = n
            if (solve()) {
                return true
            }
            sudokuAnswerArray[i][j] = 0
        }
    }

    return false
}

const isSafe = (i: number, j: number, n: number): boolean => {

    // Checking in column and row for similar number as 'n'
    for (let k = 0; k < sudokuAnswerArray.length; k++) {
        if (sudokuAnswerArray[k][j] === n || sudokuAnswerArray[i][k] === n) {
            return false
        }
    }

    let s: number = Math.sqrt(sudokuAnswerArray.length)
    let rs: number = i - (i % s)
    let cs: number = j - (j % s)

    // Checking in a particular box for similar number as 'n' 
    for (let k = 0; k < s; k++) {
        for (let l = 0; l < s; l++) {
            if (sudokuAnswerArray[k + rs][l + cs] === n) {
                return false;
            }
        }
    }
    return true
}
