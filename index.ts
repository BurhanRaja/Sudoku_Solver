let sudoku: Array<Array<number>> = [[0, 0, 4, 5, 6, 0, 0, 0, 9],
[0, 5, 6, 0, 0, 0, 2, 0, 3],
[7, 8, 9, 3, 0, 4, 1, 0, 0],
[3, 0, 0, 0, 5, 0, 0, 7, 4],
[4, 6, 7, 0, 0, 0, 0, 2, 8],
[0, 0, 8, 0, 0, 2, 0, 6, 1],
[6, 2, 0, 8, 1, 0, 4, 0, 5],
[8, 0, 1, 9, 4, 0, 6, 0, 2],
[0, 4, 5, 0, 3, 0, 8, 1, 7]]

// Sudoku Board
let sudokuQuestion = document.querySelector('.container')

// Start Button
let startBtn = document.querySelector('.start-btn button')
let startBtnCont = document.querySelector('.start-btn')

// Choose Board option
let chooseBtn = document.querySelectorAll('.choose-board button')
let chooseBtnCont = document.querySelector('.choose-btn')


const solve = () => {
    let i = 0
    let j = 0

    // Checking for 0 in array
    for (i = 0; i < sudoku.length; i++) {
        let flag: boolean = false
        for (j = 0; j < sudoku.length; j++) {
            if (sudoku[i][j] == 0) {
                flag = true
                break;
            }
        }
        if (flag) {
            break;
        }
    }

    if (i === sudoku.length && j === sudoku.length) {
        return true
    }

    for (let n = 1; n <= sudoku.length; n++) {
        if (isSafe(i, j, n)) {
            sudoku[i][j] = n
            if (solve()) {
                return true
            }
            sudoku[i][j] = 0
        }
    }

    return false
}

const isSafe = (i: number, j: number, n: number) => {

    // Checking in column and row for similar number as 'n'
    for (let k = 0; k < sudoku.length; k++) {
        if (sudoku[k][j] === n || sudoku[i][k] === n) {
            return false
        }
    }

    let s: number = Math.sqrt(sudoku.length)
    let rs: number = i - (i%s)
    let cs: number = j - (j%s)

    // Checking in a particular box for similar number as 'n' 
    for (let k = 0; k < s; k++) {
        for (let l = 0; l < s; l++) {
            if (sudoku[k+rs][l+cs] === n) {
                return false;
            }
        }
    }
    return true
}

solve()

for (let i = 0; i < sudoku.length; i++) {
    console.log(sudoku[i])
}