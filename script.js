var h = window.innerHeight;
var w = window.innerWidth;

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

    var abc = "ABCDEFGH";

    var x = parseInt(pos.charAt(0));
    var y = parseInt(pos.charAt(2));

    var xshow = abc.charAt(parseInt(pos.charAt(0)));
    var yshow = 8 - y;

    console.log(xshow,yshow);

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
    x += 1;
    y += 1;


    opts = checkPlaces(prevPos[0], prevPos[1], false);
    console.log(x, y, opts)
    if (opts.includes([x, y])) {    // actual moving
        var board = fenToBoard(fenR);
        console.log("check1")   // valamiért nem engedi át az if statement  derítsd ki, mmiért nem!
        for (position in board) {
            if (position[0] == prevPos[0] && position[1] == prevPos[1]) {
                console.log("check2")
                var pos = document.getElementById(position[0] + "-" + position[1]);
                var p = pos.insertBefore(document.createElement("img"), null);
                p.setAttribute("src", pieces[position[2]] + ".png");

                document.getElementById(x + "-" + y).getElementsByTagName("img").remove();

                break;
            }
        }
    }
    
    moving = false;
    
}

function initChess() {
    var fenR = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    showBoard(fenToBoard(fenR));
}
