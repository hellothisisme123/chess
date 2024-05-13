function removeAllClasses(ele) {
    ele.classList.remove('pawn')
    ele.classList.remove('rook')
    ele.classList.remove('knight')
    ele.classList.remove('bishop')
    ele.classList.remove('queen')
    ele.classList.remove('king')
    ele.classList.remove('white')
    ele.classList.remove('black')
    ele.classList.remove('greyed')
}

class game {
    constructor(
        toMove,
        whiteOnBottom,
        row1,
        row2,
        row3,
        row4,
        row5,
        row6,
        row7,
        row8,
        selectedPieceLocation
    ) {
        this.toMove = toMove; // for example, true, would be white to move
        this.whiteOnBottom = whiteOnBottom; // for example, true, would mean white is on the bottom
        this.row2 = row2; // for example, [bp, bp, bp, bp, bp, bp, bp, bp] // they would be arrays of pieces
        this.row1 = row1; // for example, [br, bn, bb, bq, bk, bb, bn, br] // they would be arrays of pieces
        this.row3 = row3; // for example, [xx, xx, xx, xx, xx, xx, xx, xx] // they would be arrays of pieces
        this.row4 = row4; // for example, [xx, xx, xx, xx, xx, xx, xx, xx] // they would be arrays of pieces
        this.row5 = row5; // for example, [xx, xx, xx, xx, xx, xx, xx, xx] // they would be arrays of pieces
        this.row6 = row6; // for example, [xx, xx, xx, xx, xx, xx, xx, xx] // they would be arrays of pieces
        this.row7 = row7; // for example, [wp, wp, wp, wp, wp, wp, wp, wp] // they would be arrays of pieces
        this.row8 = row8; // for example, [wr, wn, wb, wq, wk, wb, wn, wr] // they would be arrays of pieces
        this.wholeBoard = [row1, row2, row3, row4, row5, row6, row7, row8] // the above table of arrays
        this.selectedPieceLocation = selectedPieceLocation; // for example, [0, 0], would be the position of the selected piece
        
        if (this.toMove == undefined) {
            this.toMove = true
            this.whiteOnBottom = true
            this.row1 = [new rook(false), new knight(false), new bishop(false), new queen(false), new king(false), new bishop(false), new knight(false), new rook(false)]
            this.row2 = [new pawn(false), new pawn(false),   new pawn(false),   new pawn(false),  new pawn(false), new pawn(false),   new pawn(false),   new pawn(false)]
            this.row3 = [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()]
            this.row4 = [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()]
            this.row5 = [new piece(), new piece(), new piece(), new king(true), new piece(), new piece(), new piece(), new piece()]
            this.row6 = [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()]
            this.row7 = [new pawn(true), new pawn(true),   new pawn(true),   new pawn(true),  new pawn(true), new pawn(true),   new pawn(true),   new pawn(true)]
            this.row8 = [new rook(true), new knight(true), new bishop(true), new queen(true), new king(true), new bishop(true), new knight(true), new rook(true)]
            this.selectedPieceLocation = undefined
            this.wholeBoard = [this.row1, this.row2, this.row3, this.row4, this.row5, this.row6, this.row7, this.row8] // the above table of arrays
        }
    }

    display() {
        const cells = document.querySelectorAll("table td")
        cells.forEach((cell, i) => {
            removeAllClasses(cell)
            
            let cellRow = Math.floor(i / 8)
            let cellCol = i % 8

            // console.log("-----------------");
            // console.log(this.wholeBoard);
            // console.log("{row, col}", `{${cellRow}, ${cellCol}}`);
            // console.log("-----------------");

            cell.classList.add(this.wholeBoard[cellRow][cellCol].getColorClass())
            cell.classList.add(this.wholeBoard[cellRow][cellCol].getPieceName())
        })
    }
}

class piece {
    constructor(
        white,
        selected
    ) {
        this.white = white; // for example, true, would be a white piece
    }

    getColorClass() {
        let color = ''
        if (this.white) color = 'white'
        else if (!this.white) color = 'black'
        else color = ''
        return color
    }

    getPieceName() {
        return 'empty'
    }

    clickCell(row, col, ele) {
        console.log('----------Click Cell----------')
        if (board.wholeBoard[row][col].isEmpty() && !ele.classList.contains('greyed')) {
            board.display()
        } else if (ele.classList.contains('greyed')) {
            this.makeMove(row, col, ele)
        } else if (ele.classList.contains('black') || ele.classList.contains('white')) {
            this.selectPiece(row, col, ele)
        }

        console.log('----------Click Cell----------')
    }

    selectPiece(row, col, ele) {
        // this is for if the user clicks on the piece
        console.log('\t', '----------Select Piece----------')
        board.display()
        this.position = [row, col]
        board.selectedPieceLocation = this.position
        console.log('\t', this.position, this);
        
        const availableMoves = this.getAvailableMoves()
        
        const cells = document.querySelectorAll("table td")
        cells.forEach((cell, i) => {
            let cellRow = Math.floor(i / 8)
            let cellCol = i % 8
            
            availableMoves.forEach(move => {
                if (cellRow == move[0] && cellCol == move[1]) {
                    // ----- Greyed selected possible moves -----
                    // removeAllClasses(cell)
                    // cell.classList.add(this.getColorClass())
                    // cell.classList.add(this.getPieceName())
                    cell.classList.add('greyed')
                }
            });
        })

        console.log('\t', '----------Select Piece----------')
    }

    makeMove(row, col, ele) { // row, and col, are for the pieces new position
        console.log('\t', '\t', '----------Make Move----------')
        board.wholeBoard[row][col] = board.wholeBoard[board.selectedPieceLocation[0]][board.selectedPieceLocation[1]]
        board.wholeBoard[board.selectedPieceLocation[0]][board.selectedPieceLocation[1]] = new piece()
        board.display()
        board.toMove = !board.toMove
        console.log('\t', '\t', '----------Make Move----------')
    }

    isEmpty() {
        return true
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

    getAvailableMoves() {
        console.log('\t', '\t', '----------Get Available Moves----------')
        let availableMoves = []

        if (board.toMove == this.white) { // only move when its your turn
            let direction = 1
            if (this.getColorClass() == "white") direction = -1
            
            // on block forward
            if (board.wholeBoard[this.position[0] + direction][this.position[1]].white == undefined) {
                availableMoves.push([this.position[0] + direction, this.position[1]])
            }

            // capture diagonal pieces
            if (this.position[0] + 1 < 8 && this.position[0] - 1 >= 0) {
                if (this.position[1] - 1 >= 0) {
                    if (board.wholeBoard[this.position[0] + direction][this.position[1] - 1].white != undefined && board.wholeBoard[this.position[0] + direction][this.position[1] - 1].white != this.white) {
                        availableMoves.push([this.position[0] + direction, this.position[1] - 1])
                    }
                }
                
                if (this.position[1] + 1 < 8) {
                    if (board.wholeBoard[this.position[0] + direction][this.position[1] + 1].white != undefined && board.wholeBoard[this.position[0] + direction][this.position[1] + 1].white != this.white) {
                        availableMoves.push([this.position[0] + direction, this.position[1] + 1])
                    }
                }
            }  

            // 2 blocks forward
            if (this.position[0] == 1 && !this.white && board.whiteOnBottom || this.position[0] == 6 && this.white && board.whiteOnBottom) {
                if (board.wholeBoard[this.position[0] + direction][this.position[1]].white == undefined) {
                    if (board.wholeBoard[this.position[0] + 2 * direction][this.position[1]].white == undefined) {
                        availableMoves.push([this.position[0] + 2 * direction, this.position[1]])
                    }
                }
            }

            // En Passant -- not added

            // Promotion -- not added 
        }
        
        console.log('\t', '\t', 'Available Moves:', availableMoves);
        console.log('\t', '\t', '----------Get Available Moves----------')
        return availableMoves // array of available move locations
    }

    isEmpty() {
        return false
    }
}

class rook extends piece {
    constructor(white, position, hasMoved) {
        super(white, position)
    }

    getPieceName() {
        return 'rook'
    }

    isEmpty() {
        return false
    }

    getAvailableMoves() {
        console.log('\t', '\t', '----------Get Available Moves----------')
        let availableMoves = []

        if (board.toMove == this.white) { // only move when its your turn
            let left = true
            let lefti = 0
            while (left) {                
                lefti++
                
                if (this.position[1] - lefti >= 0) {
                    if (board.wholeBoard[this.position[0]][this.position[1] - lefti].white == undefined) { // there is no 
                        availableMoves.push([this.position[0], this.position[1] - lefti])
                    } else if (board.wholeBoard[this.position[0]][this.position[1] - lefti].white != this.white) { // the piece intercepting is enemy
                        left = false
                        availableMoves.push([this.position[0], this.position[1] - lefti])
                    } else { // the piece intercepting is ally
                        left = false
                    }
                } else { // the edge of the board
                    left = false
                }
            }

            let right = true
            let righti = 0
            while (right) {                
                righti++
                
                if (this.position[1] + righti <= 7) {
                    if (board.wholeBoard[this.position[0]][this.position[1] + righti].white == undefined) { // there is no 
                        availableMoves.push([this.position[0], this.position[1] + righti])
                    } else if (board.wholeBoard[this.position[0]][this.position[1] + righti].white != this.white) { // the piece intercepting is enemy
                        right = false
                        availableMoves.push([this.position[0], this.position[1] + righti])
                    } else { // the piece intercepting is ally
                        right = false
                    }
                } else { // the edge of the board
                    right = false
                }
            }

            let up = true
            let upi = 0
            while (up) {                
                upi++
                
                if (this.position[0] - upi >= 0) {
                    if (board.wholeBoard[this.position[0] - upi][this.position[1]].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] - upi, this.position[1]])
                    } else if (board.wholeBoard[this.position[0] - upi][this.position[1]].white != this.white) { // the piece intercepting is enemy
                        up = false
                        availableMoves.push([this.position[0] - upi, this.position[1]])
                    } else { // the piece intercepting is ally
                        up = false
                    }
                } else { // the edge of the board
                    up = false
                }
            }

            let down = true
            let downi = 0
            while (down) {                
                downi++
                
                if (this.position[0] + downi <= 7) {
                    if (board.wholeBoard[this.position[0] + downi][this.position[1]].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] + downi, this.position[1]])
                    } else if (board.wholeBoard[this.position[0] + downi][this.position[1]].white != this.white) { // the piece intercepting is enemy
                        down = false
                        availableMoves.push([this.position[0] + downi, this.position[1]])
                    } else { // the piece intercepting is ally
                        down = false
                    }
                } else { // the edge of the board
                    down = false
                }
            }
        }
        
        console.log('\t', '\t', 'Available Moves:', availableMoves);
        console.log('\t', '\t', '----------Get Available Moves----------')
        return availableMoves // array of available move locations
    }
}

class knight extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'knight'
    }

    isEmpty() {
        return false
    }

    getAvailableMoves() {
        console.log('\t', '\t', '----------Get Available Moves----------')
        let availableMoves = []

        if (board.toMove == this.white) { // only move when its your turn
            if (this.position[0] + 2 <= 7 && this.position[1] + 1 <= 7) {
                if (board.wholeBoard[this.position[0] + 2][this.position[1] + 1].white != this.white) availableMoves.push([this.position[0] + 2, this.position[1] + 1]) 
            }
            if (this.position[0] + 2 <= 7 && this.position[1] - 1 >= 0) {
                if (board.wholeBoard[this.position[0] + 2][this.position[1] - 1].white != this.white) availableMoves.push([this.position[0] + 2, this.position[1] - 1]) 
            }
            if (this.position[0] - 2 >= 0 && this.position[1] + 1 <= 7) {
                if (board.wholeBoard[this.position[0] - 2][this.position[1] + 1].white != this.white) availableMoves.push([this.position[0] - 2, this.position[1] + 1]) 
            }
            if (this.position[0] - 2 >= 0 && this.position[1] - 1 >= 0) {
                if (board.wholeBoard[this.position[0] - 2][this.position[1] - 1].white != this.white) availableMoves.push([this.position[0] - 2, this.position[1] - 1]) 
            }
            if (this.position[0] + 1 <= 7 && this.position[1] + 2 <= 7) {
                if (board.wholeBoard[this.position[0] + 1][this.position[1] + 2].white != this.white) availableMoves.push([this.position[0] + 1, this.position[1] + 2]) 
            }
            if (this.position[0] + 1 <= 7 && this.position[1] - 2 >= 0) {
                if (board.wholeBoard[this.position[0] + 1][this.position[1] - 2].white != this.white) availableMoves.push([this.position[0] + 1, this.position[1] - 2]) 
            }
            if (this.position[0] - 1 >= 0 && this.position[1] + 2 <= 7) {
                if (board.wholeBoard[this.position[0] - 1][this.position[1] + 2].white != this.white) availableMoves.push([this.position[0] - 1, this.position[1] + 2]) 
            }
            if (this.position[0] - 1 >= 0 && this.position[1] - 2 >= 0) {
                if (board.wholeBoard[this.position[0] - 1][this.position[1] - 2].white != this.white) availableMoves.push([this.position[0] - 1, this.position[1] - 2]) 
            }
        }
        
        console.log('\t', '\t', 'Available Moves:', availableMoves);
        console.log('\t', '\t', '----------Get Available Moves----------')
        return availableMoves // array of available move locations
    }
}

class bishop extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'bishop'
    }

    isEmpty() {
        return false
    }

    getAvailableMoves() {
        console.log('\t', '\t', '----------Get Available Moves----------')
        let availableMoves = []

        if (board.toMove == this.white) { // only move when its your turn
            let leftup = true
            let leftupi = 0
            while (leftup) {
                leftupi++
                
                if (this.position[0] - leftupi >= 0 && this.position[1] - leftupi >= 0) {
                    if (board.wholeBoard[this.position[0] - leftupi][this.position[1] - leftupi].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] - leftupi, this.position[1] - leftupi])
                    } else if (board.wholeBoard[this.position[0] - leftupi][this.position[1] - leftupi].white != this.white) { // the piece intercepting is enemy
                        leftup = false
                        availableMoves.push([this.position[0] - leftupi, this.position[1] - leftupi])
                    } else { // the piece intercepting is ally
                        leftup = false
                    }
                } else { // the edge of the board
                    leftup = false
                }
            }

            let rightdown = true
            let rightdowni = 0
            while (rightdown) {                
                rightdowni++
                
                if (this.position[0] + rightdowni <= 7 && this.position[1] + rightdowni <= 7) {
                    if (board.wholeBoard[this.position[0] + rightdowni][this.position[1] + rightdowni].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] + rightdowni, this.position[1] + rightdowni])
                    } else if (board.wholeBoard[this.position[0] + rightdowni][this.position[1] + rightdowni].white != this.white) { // the piece intercepting is enemy
                        rightdown = false
                        availableMoves.push([this.position[0] + rightdowni, this.position[1] + rightdowni])
                    } else { // the piece intercepting is ally
                        rightdown = false
                    }
                } else { // the edge of the board
                    rightdown = false
                }
            }

            let rightup = true
            let rightupi = 0
            while (rightup) {                
                rightupi++
                
                if (this.position[0] - rightupi >= 0 && this.position[1] + rightupi <= 7) {
                    if (board.wholeBoard[this.position[0] - rightupi][this.position[1] + rightupi].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] - rightupi, this.position[1] + rightupi])
                    } else if (board.wholeBoard[this.position[0] - rightupi][this.position[1] + rightupi].white != this.white) { // the piece intercepting is enemy
                        rightup = false
                        availableMoves.push([this.position[0] - rightupi, this.position[1] + rightupi])
                    } else { // the piece intercepting is ally
                        rightup = false
                    }
                } else { // the edge of the board
                    rightup = false
                }
            }

            let leftdown = true
            let leftdowni = 0
            while (leftdown) {                
                leftdowni++
                
                if (this.position[0] + leftdowni <= 7 && this.position[1] - leftdowni >= 0) {
                    if (board.wholeBoard[this.position[0] + leftdowni][this.position[1] - leftdowni].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] + leftdowni, this.position[1] - leftdowni])
                    } else if (board.wholeBoard[this.position[0] + leftdowni][this.position[1] - leftdowni].white != this.white) { // the piece intercepting is enemy
                        leftdown = false
                        availableMoves.push([this.position[0] + leftdowni, this.position[1] - leftdowni])
                    } else { // the piece intercepting is ally
                        leftdown = false
                    }
                } else { // the edge of the board
                    leftdown = false
                }
            }
        }
        
        console.log('\t', '\t', 'Available Moves:', availableMoves);
        console.log('\t', '\t', '----------Get Available Moves----------')
        return availableMoves // array of available move locations
    }
}

class queen extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'queen'
    }

    isEmpty() {
        return false
    }

    getAvailableMoves() {
        console.log('\t', '\t', '----------Get Available Moves----------')
        let availableMoves = []

        if (board.toMove == this.white) { // only move when its your turn
            let left = true
            let lefti = 0
            while (left) {                
                lefti++
                
                if (this.position[1] - lefti >= 0) {
                    if (board.wholeBoard[this.position[0]][this.position[1] - lefti].white == undefined) { // there is no 
                        availableMoves.push([this.position[0], this.position[1] - lefti])
                    } else if (board.wholeBoard[this.position[0]][this.position[1] - lefti].white != this.white) { // the piece intercepting is enemy
                        left = false
                        availableMoves.push([this.position[0], this.position[1] - lefti])
                    } else { // the piece intercepting is ally
                        left = false
                    }
                } else { // the edge of the board
                    left = false
                }
            }

            let right = true
            let righti = 0
            while (right) {                
                righti++
                
                if (this.position[1] + righti <= 7) {
                    if (board.wholeBoard[this.position[0]][this.position[1] + righti].white == undefined) { // there is no 
                        availableMoves.push([this.position[0], this.position[1] + righti])
                    } else if (board.wholeBoard[this.position[0]][this.position[1] + righti].white != this.white) { // the piece intercepting is enemy
                        right = false
                        availableMoves.push([this.position[0], this.position[1] + righti])
                    } else { // the piece intercepting is ally
                        right = false
                    }
                } else { // the edge of the board
                    right = false
                }
            }

            let up = true
            let upi = 0
            while (up) {                
                upi++
                
                if (this.position[0] - upi >= 0) {
                    if (board.wholeBoard[this.position[0] - upi][this.position[1]].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] - upi, this.position[1]])
                    } else if (board.wholeBoard[this.position[0] - upi][this.position[1]].white != this.white) { // the piece intercepting is enemy
                        up = false
                        availableMoves.push([this.position[0] - upi, this.position[1]])
                    } else { // the piece intercepting is ally
                        up = false
                    }
                } else { // the edge of the board
                    up = false
                }
            }

            let down = true
            let downi = 0
            while (down) {                
                downi++
                
                if (this.position[0] + downi <= 7) {
                    if (board.wholeBoard[this.position[0] + downi][this.position[1]].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] + downi, this.position[1]])
                    } else if (board.wholeBoard[this.position[0] + downi][this.position[1]].white != this.white) { // the piece intercepting is enemy
                        down = false
                        availableMoves.push([this.position[0] + downi, this.position[1]])
                    } else { // the piece intercepting is ally
                        down = false
                    }
                } else { // the edge of the board
                    down = false
                }
            }

            let leftup = true
            let leftupi = 0
            while (leftup) {                
                leftupi++
                
                if (this.position[0] - leftupi >= 0 && this.position[1] - leftupi >= 0) {
                    if (board.wholeBoard[this.position[0] - leftupi][this.position[1] - leftupi].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] - leftupi, this.position[1] - leftupi])
                    } else if (board.wholeBoard[this.position[0] - leftupi][this.position[1] - leftupi].white != this.white) { // the piece intercepting is enemy
                        leftup = false
                        availableMoves.push([this.position[0] - leftupi, this.position[1] - leftupi])
                    } else { // the piece intercepting is ally
                        leftup = false
                    }
                } else { // the edge of the board
                    leftup = false
                }
            }

            let rightdown = true
            let rightdowni = 0
            while (rightdown) {                
                rightdowni++
                
                if (this.position[0] + rightdowni <= 7 && this.position[1] + rightdowni <= 7) {
                    if (board.wholeBoard[this.position[0] + rightdowni][this.position[1] + rightdowni].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] + rightdowni, this.position[1] + rightdowni])
                    } else if (board.wholeBoard[this.position[0] + rightdowni][this.position[1] + rightdowni].white != this.white) { // the piece intercepting is enemy
                        rightdown = false
                        availableMoves.push([this.position[0] + rightdowni, this.position[1] + rightdowni])
                    } else { // the piece intercepting is ally
                        rightdown = false
                    }
                } else { // the edge of the board
                    rightdown = false
                }
            }

            let rightup = true
            let rightupi = 0
            while (rightup) {                
                rightupi++
                
                if (this.position[0] - rightupi >= 0 && this.position[1] + rightupi <= 7) {
                    if (board.wholeBoard[this.position[0] - rightupi][this.position[1] + rightupi].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] - rightupi, this.position[1] + rightupi])
                    } else if (board.wholeBoard[this.position[0] - rightupi][this.position[1] + rightupi].white != this.white) { // the piece intercepting is enemy
                        rightup = false
                        availableMoves.push([this.position[0] - rightupi, this.position[1] + rightupi])
                    } else { // the piece intercepting is ally
                        rightup = false
                    }
                } else { // the edge of the board
                    rightup = false
                }
            }

            let leftdown = true
            let leftdowni = 0
            while (leftdown) {                
                leftdowni++
                
                if (this.position[0] + leftdowni <= 7 && this.position[1] - leftdowni >= 0) {
                    if (board.wholeBoard[this.position[0] + leftdowni][this.position[1] - leftdowni].white == undefined) { // there is no 
                        availableMoves.push([this.position[0] + leftdowni, this.position[1] - leftdowni])
                    } else if (board.wholeBoard[this.position[0] + leftdowni][this.position[1] - leftdowni].white != this.white) { // the piece intercepting is enemy
                        leftdown = false
                        availableMoves.push([this.position[0] + leftdowni, this.position[1] - leftdowni])
                    } else { // the piece intercepting is ally
                        leftdown = false
                    }
                } else { // the edge of the board
                    leftdown = false
                }
            }
        }
        
        console.log('\t', '\t', 'Available Moves:', availableMoves);
        console.log('\t', '\t', '----------Get Available Moves----------')
        return availableMoves // array of available move locations
    }
}

class king extends piece {
    constructor(white, position) {
        super(white, position)
    }

    getPieceName() {
        return 'king'
    }

    isEmpty() {
        return false
    }

    getAvailableMoves() {
        console.log('\t', '\t', '----------Get Available Moves----------')
        let availableMoves = []

        if (board.toMove == this.white) { // only move when its your turn
            if (this.position[0] + 1 <= 7 && this.position[1] + 1 <= 7) {
                if (board.wholeBoard[this.position[0] + 1][this.position[1] + 1].white != this.white) availableMoves.push([this.position[0] + 1, this.position[1] + 1])
            }
            if (this.position[0] + 1 <= 7 && this.position[1] - 1 >= 0) {
                if (board.wholeBoard[this.position[0] + 1][this.position[1] - 1].white != this.white) availableMoves.push([this.position[0] + 1, this.position[1] - 1])
            }
            if (this.position[0] - 1 >= 0 && this.position[1] + 1 <= 7) {
                if (board.wholeBoard[this.position[0] - 1][this.position[1] + 1].white != this.white) availableMoves.push([this.position[0] - 1, this.position[1] + 1])
            }
            if (this.position[0] + 1 <= 7) {
                if (board.wholeBoard[this.position[0] + 1][this.position[1]].white != this.white) availableMoves.push([this.position[0] + 1, this.position[1]])
            }
            if (this.position[1] + 1 <= 7) {
                if (board.wholeBoard[this.position[0]][this.position[1] + 1].white != this.white) availableMoves.push([this.position[0], this.position[1] + 1])
            }
            if (this.position[0] - 1 >= 0) {
                if (board.wholeBoard[this.position[0] - 1][this.position[1]].white != this.white) availableMoves.push([this.position[0] - 1, this.position[1]])
            }
            if (this.position[1] - 1 >= 0) {
                if (board.wholeBoard[this.position[0]][this.position[1] - 1].white != this.white) availableMoves.push([this.position[0], this.position[1] - 1])
            }
            if (this.position[0] - 1 >= 0 && this.position[1] - 1 >= 0) {
                if (board.wholeBoard[this.position[0] - 1][this.position[1] - 1].white != this.white) availableMoves.push([this.position[0] - 1, this.position[1] - 1])
            }
        }

        availableMoves.forEach(move => {
            
        })
        
        console.log('\t', '\t', 'Available Moves:', availableMoves);
        console.log('\t', '\t', '----------Get Available Moves----------')
        return availableMoves // array of available move locations
    }
}

// let newBoard = {
//     'toMove': true,
//     'whiteOnBottom': true,
//     'row1': [new rook(false), new knight(false), new bishop(false), new queen(false), new king(false), new bishop(false), new knight(false), new rook(false)],
//     'row2': [new pawn(false), new pawn(false),   new pawn(false),   new pawn(false),  new pawn(false), new pawn(false),   new pawn(false),   new pawn(false)],
//     'row3': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
//     'row4': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
//     'row5': [new piece(), new piece(), new piece(), new rook(true), new piece(), new piece(), new piece(), new piece()],
//     'row6': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
//     'row7': [new pawn(true), new pawn(true),   new pawn(true),   new pawn(true),  new pawn(true), new pawn(true),   new pawn(true),   new pawn(true)],
//     'row8': [new rook(true), new knight(true), new bishop(true), new queen(true), new king(true), new bishop(true), new knight(true), new rook(true)],
//     'selectedPieceLocation': undefined
// }

let emptyBoard = {
    'toMove': true,
    'whiteOnBottom': true,
    'row1': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
    'row2': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
    'row3': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
    'row4': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
    'row5': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
    'row6': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
    'row7': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
    'row8': [new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece(), new piece()],
    'selectedPieceLocation': undefined
}

emptyBoard = new game(emptyBoard.toMove, emptyBoard.whiteOnBottom, emptyBoard.row1, emptyBoard.row2, emptyBoard.row3, emptyBoard.row4, emptyBoard.row5, emptyBoard.row6, emptyBoard.row7, emptyBoard.row8, emptyBoard.selectedPieceLocation)
// newBoard = new game(newBoard.toMove, newBoard.whiteOnBottom, newBoard.row1, newBoard.row2, newBoard.row3, newBoard.row4, newBoard.row5, newBoard.row6, newBoard.row7, newBoard.row8, newBoard.selectedPieceLocation)

const resetBoardButton = document.querySelector('.buttons button.resetBoard')
const clearConsoleButton = document.querySelector('.buttons button.clearConsole')
const clearBoardButton = document.querySelector('.buttons button.clearBoard')
let board = new game()
board = new game(emptyBoard.toMove, emptyBoard.whiteOnBottom, emptyBoard.row1, emptyBoard.row2, emptyBoard.row3, emptyBoard.row4, emptyBoard.row5, emptyBoard.row6, emptyBoard.row7, emptyBoard.row8, emptyBoard.selectedPieceLocation)


resetBoardButton.addEventListener("click", (e) => {
    console.log("----------------------------Reset Board----------------------------")
    board = new game()
    board.display()
    console.log(board);
    console.log("----------------------------Reset Board----------------------------")
})

if (clearBoardButton) {
    clearBoardButton.addEventListener("click", (e) => {
        console.log("----------------------------Clear Board----------------------------")
        board = new game(emptyBoard.toMove, emptyBoard.whiteOnBottom, emptyBoard.row1, emptyBoard.row2, emptyBoard.row3, emptyBoard.row4, emptyBoard.row5, emptyBoard.row6, emptyBoard.row7, emptyBoard.row8, emptyBoard.selectedPieceLocation)
        board.display()
        console.log(board);
        console.log("----------------------------Clear Board----------------------------")
    })
}

if (clearConsoleButton) {
    clearConsoleButton.addEventListener("click", (e) => {
        console.clear()
        console.log("---------------------------Clear Console---------------------------")
    })
}

// piece onclick
const cells = document.querySelectorAll("table td")
cells.forEach((cell, i) => {
    cell.addEventListener('click', (e) => {
        let cellRow = Math.floor(i / 8)
        let cellCol = i % 8

        board.wholeBoard[cellRow][cellCol].clickCell(cellRow, cellCol, cell)
    })
})