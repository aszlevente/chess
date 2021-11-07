var h = window.innerHeight;
var w = window.innerWidth;

var fenR = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

var pieces = {
    "p": "bpawn",
    "r": "brook",
    "n": "bknight",
    "b": "bbishop",
    "q": "bqueen",
    "k": "bking",

    "P": "wpawn",
    "R": "wrook",
    "N": "wknight",
    "B": "wbishop",
    "Q": "wqueen",
    "K": "wking"
};

var table = document.getElementById("tabla");
table.setAttribute("style", "width: "+(h*0.7)+"px"+";height: "+(h*0.7)+"px")

for (let i = 0; i < 8; i++) {
    var row = table.insertBefore(document.createElement("tr"), null);

    for (let l = 0; l < 8; l++) {
        if ((l+i) % 2 == 0) { // Fehér
            var square = row.insertBefore(document.createElement("td"), null);
            square.setAttribute("class", "white");
            square.setAttribute("id", `${l}-${i}`);
            square.setAttribute("onclick", `clickTest(\"${square.id}\")`)
        } else { // Fekete
            var square = row.insertBefore(document.createElement("td"), null);
            square.setAttribute("class", "black");
            square.setAttribute("id", `${l}-${i}`);
            square.setAttribute("onclick", `clickTest(\"${square.id}\")`)
        }
    }
}

function includesArr(container, arr) {
    return container.find(
        element =>
            {
                for (i = 0; i < element.length; i++) {
                if (element[i] != arr[i]) return false;
            }return true;
        }
    ) != undefined;
}

function fenChanger(col, row, piece, act) { // col és row index alapú érték
    var nums = "123456789";
    var fenPosition = fenR.split(" ")[0].split("/");
    var fenRow = fenPosition[row];
    console.log(fenPosition)
    var fullRow = [];
    for (i = 0; i < fenRow.length; i++) {
        if (i == col) {
            if (act == 'make') {
               fullRow.push(piece); 
            } else {
                fullRow.push('');
            }
        } else if (nums.includes(fenRow[i])) {
            for (let n = 0; n < fenRow[i]; n++) {
                fullRow.push('');
            }
        } else {
            fullRow.push(fenRow[i]);
        }
    }

    //vissza fen-né
    var blankCounter = 0;
    var finalFen = [];
    for (i in fullRow) {
        if (blankCounter > 0 && i != '') {
            finalFen.push(blankCounter.toString()); // valami nagy gebasz van errefelé
            blankCounter = 0;
        }

        if (i != '') {
            finalFen.push(i);
        } else {
            blankCounter++;
        }
    }

    fenPosition.splice(row, 0, finalFen);
    fenPosition = fenPosition.join('/');

    var fenRemainer = fenR.split(" ");
    fenRemainer.splice(0, 1);
    fenRemainer = fenRemainer.join(' ');
    console.log(true, fenPosition);
    fenR = fenPosition.concat(' ').concat(fenRemainer);
}

function fenToBoard(fen) {
    var board = [];

    var fenPosition = fen.split(" ")[0].split("/");
    var nums = "123456789";


    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            
            if (nums.includes(fenPosition[i].charAt(j))) {
                j += parseInt(fenPosition[i].charAt(j)) - 1;
                continue;
            }
            board.push([j,i,fenPosition[i].charAt(j)]);
            
        }   
    }

    return board;
}

function showBoard(board) {
    
    for (var pieceI = 0; pieceI < board.length; pieceI++) {
        var piece = board[pieceI];
        var pos = document.getElementById(piece[0] + "-" + piece[1]);
        var p = pos.insertBefore(document.createElement("img"), null);
        p.setAttribute("src", pieces[piece[2]] + ".png");
    }
}

var moving = false;
var movingPiece = [];

function clickTest(pos) {
    console.log('You clicked \n')
    /*var abc = "ABCDEFGH";*/

    var x = parseInt(pos.charAt(0));
    var y = parseInt(pos.charAt(2));
/*
    var xshow = abc.charAt(parseInt(pos.charAt(0)));
    var yshow = 8 - y;

    console.log(xshow,yshow);*/

    if (moving == false) {
        moving = true;
        movingPiece = [x,y];
        checkPlaces(x, y, true);
    } else {
        movePiece(movingPiece, x, y)
    }

}


function checkPlaces(x, y, draw) {
    // átlátszó zöldre állítja a lehetséges lépések helyét
    // egyenlőre még csak kontrol nélkül
    // switch statment-tel megállapítja a kattintás helyén lévő bábu létezését, típusát

    var options = [];

    for (var i=1;i<=8;i++) {
        for (var j=1;j<=8;j++) {
            options.push([j,i]);
        }   
    }

    return options;
}

function movePiece(prevPos, x, y) {

    opts = checkPlaces(prevPos[0], prevPos[1], false);
    if (includesArr(opts, [x, y])) {    // actual moving
        var board = fenToBoard(fenR);
        for (i = 0; i < board.length; i++) {
            if (board[i][0] == prevPos[0] && board[i][1] == prevPos[1]) {
                var pos = document.getElementById(x + "-" + y);
                var p = pos.insertBefore(document.createElement("img"), null);
                p.setAttribute("src", pieces[board[i][2]] + ".png");

                var img = document.getElementById(board[i][0] + "-" + board[i][1]).getElementsByTagName("img")[0];
                img.parentNode.removeChild(img);
                
                fenChanger(prevPos[0], prevPos[1], board[i][2], 'del');
                fenChanger(x, y, board[i][2], 'make');

                break;
            }
        }
    }
    
    moving = false;
    
}

function initChess() {
    
    showBoard(fenToBoard(fenR));
}