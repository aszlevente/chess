var h = window.innerHeight;
var w = window.innerWidth;

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

// Alapfelállás

for (let i = 0; i < 8; i++) {
    
    for (let l = 0; l < 8; l++) {
        var pic = "";
        if (i<2) {
            var c = "b";
        } else {
            var c = "w";
        }

        switch (i) { // rejtély
            case 0:
            case 7:
                switch (l) {
                    case 0:
                    case 7:
                        pic = c+"rook";
                        break;
                        
                    case 1:
                    case 6:
                        pic = c+"knight";
                        break;
                        
                    case 2:
                    case 5:
                        pic = c+"bishop";
                        break;
                        
                    case 3:
                        pic = c+"queen";
                        break;
                    
                    case 4:
                        pic = c+"king";
                        break;
            }

            case 1:
            case 6:
                pic = c+"pawn";
                break;
        }
        if (pic != "") {
            var img = document.getElementById(`${l}-${i}`).insertBefore(document.createElement("img"), null);
            img.setAttribute("src", `${pic}.png`);
        }
    }
}

function clickTest(pos) {
    /*console.log(pos)*/

    var abc = "ABCDEFGH"
    var xshow = abc.charAt(parseInt(pos.charAt(0)));
    var x = parseInt(pos.charAt(0))+1;
    var y = 9 - (parseInt(pos.charAt(2))+1);

    console.log(xshow,y)

    showPlaces(x, y)
}

function showPlaces(x, y) {
    // átlátszó zöldre állítja a lehetséges lépések helyét
    // egyenlőre még csak kontrol nélkül
    // switch statment-tel megállapítja a kattintás helyén lévő bábu létezését, típusát
    // ehhez előbb készíts globális "board" nevű 2d-s array-t
    // bábu >> bábu jele    semmi >> null 
}