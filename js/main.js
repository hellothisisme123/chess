class game {
    constructor(
        toMove,
        row1,
        row2,
        row3,
        row4,
        row5,
        row6,
        row7,
        row8
    ) {
        this.toMove = toMove; // for example, true, would be white to move
        this.row2 = row2; // for example, [bp, bp, bp, bp, bp, bp, bp, bp] // they would be arrays of pieces
        this.row1 = row1; // for example, [br, bn, bb, bq, bk, bb, bn, br] // they would be arrays of pieces
        this.row3 = row3; // for example, [xx, xx, xx, xx, xx, xx, xx, xx] // they would be arrays of pieces
        this.row4 = row4; // for example, [xx, xx, xx, xx, xx, xx, xx, xx] // they would be arrays of pieces
        this.row5 = row5; // for example, [xx, xx, xx, xx, xx, xx, xx, xx] // they would be arrays of pieces
        this.row6 = row6; // for example, [xx, xx, xx, xx, xx, xx, xx, xx] // they would be arrays of pieces
        this.row7 = row7; // for example, [wp, wp, wp, wp, wp, wp, wp, wp] // they would be arrays of pieces
        this.row8 = row8; // for example, [wr, wn, wb, wq, wk, wb, wn, wr] // they would be arrays of pieces
        this.wholeBoard = [row1, row2, row3, row4, row5, row6, row7, row8] // the above table of arrays
    }

    display() {
        const cells = document.querySelectorAll("table td")
        cells.forEach((cell, i) => {
            cell.classList.remove('pawn')
            cell.classList.remove('rook')
            cell.classList.remove('knight')
            cell.classList.remove('bishop')
            cell.classList.remove('queen')
            cell.classList.remove('king')
            cell.classList.remove('black')
            cell.classList.remove('white')
            
            let cellRow = Math.floor(i / 8)
            let cellCol = i % 8

            // console.log("-----------------");
            // console.log(this.wholeBoard);
            // console.log("{row, col}", `{${cellRow}, ${cellCol}}`);
            // console.log("-----------------");

            if (this.row1 != undefined && this.wholeBoard[cellRow][cellCol] != 'x') {
                cell.classList.add(this.wholeBoard[cellRow][cellCol].getColorClass())
                cell.classList.add(this.wholeBoard[cellRow][cellCol].getPieceName())
            }
        })
    }
}

class piece {
    constructor(
        white
    ) {
        this.white = white; // for example, true, would be a white piece
    }

    getColorClass() {
        let color = ''
        if (this.white) color = 'white'
        else color = 'black'
        return color
    }

    getPieceName() {
        return 'piece'
    }
}

class pawn extends piece {
    constructor(white, position, lastPosition) {
        super(white, position)
    }
    
    move () {
        // do stuff
        
        setBoard()
    }

    getPieceName() {
        return 'pawn'
    }

    getColorClass() {
        let color = ''
        if (this.white) color = 'white'
        else color = 'black'
        return color
    }
}

class rook extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'rook'
    }

    getColorClass() {
        let color = ''
        if (this.white) color = 'white'
        else color = 'black'
        return color
    }
}

class knight extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'knight'
    }

    getColorClass() {
        let color = ''
        if (this.white) color = 'white'
        else color = 'black'
        return color
    }
}

class bishop extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'bishop'
    }

    getColorClass() {
        let color = ''
        if (this.white) color = 'white'
        else color = 'black'
        return color
    }
}

class queen extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'queen'
    }

    getColorClass() {
        let color = ''
        if (this.white) color = 'white'
        else color = 'black'
        return color
    }
}

class king extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'king'
    }

    getColorClass() {
        let color = ''
        if (this.white) color = 'white'
        else color = 'black'
        return color
    }
}

const resetBoardButton = document.querySelector('.buttons button.resetBoard')
const clearConsoleButton = document.querySelector('.buttons button.clearConsole')
const clearBoardButton = document.querySelector('.buttons button.clearBoard')
let board = new game()

const newBoard = {
    'toMove': true,
    'row1': [new rook(false), new knight(false), new bishop(false), new queen(false), new king(false), new bishop(false), new knight(false), new rook(false)],
    'row2': [new pawn(false), new pawn(false),   new pawn(false),   new pawn(false),  new pawn(false), new pawn(false),   new pawn(false),   new pawn(false)],
    'row3': ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    'row4': ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    'row5': ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    'row6': ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    'row7': [new pawn(true), new pawn(true),   new pawn(true),   new pawn(true),  new pawn(true), new pawn(true),   new pawn(true),   new pawn(true)],
    'row8': [new rook(true), new knight(true), new bishop(true), new queen(true), new king(true), new bishop(true), new knight(true), new rook(true)]
}

const emptyBoard = new game()

resetBoardButton.addEventListener("click", (e) => {
    console.log("----------------------------Reset Board----------------------------")

    console.log(board);
    board = new game(newBoard.toMove, newBoard.row1, newBoard.row2, newBoard.row3, newBoard.row4, newBoard.row5, newBoard.row6, newBoard.row7, newBoard.row8)
    board.display()
    console.log(board);
    
    console.log("----------------------------Reset Board----------------------------")
})

if (clearConsoleButton) {
    clearConsoleButton.addEventListener("click", (e) => {
        console.clear()
        console.log("---------------------------Clear Console---------------------------")
    })
}

if (clearBoardButton) {
    clearBoardButton.addEventListener("click", (e) => {
        console.log("----------------------------Clear Board----------------------------")
        board = new game(emptyBoard.toMove, emptyBoard.row1, emptyBoard.row2, emptyBoard.row3, emptyBoard.row4, emptyBoard.row5, emptyBoard.row6, emptyBoard.row7, emptyBoard.row8)
        board.display()
        console.log(board);
        console.log("----------------------------Clear Board----------------------------")
    })
}