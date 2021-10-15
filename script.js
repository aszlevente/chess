var h = window.innerHeight;
var w = window.innerWidth;

var table = document.getElementById("tabla");
table.setAttribute("style", "width: "+(h*0.7)+"px"+";height: "+(h*0.7)+"px")

for (let i = 0; i < 8; i++) {
    var row = table.appendChild(document.createElement("tr"));
    for (let l = 0; l < 8; l++) {
        if ((l+i) % 2 == 0) {
            row.appendChild(document.createElement("td"))setAttribute("id", (l+1)+"-"+(i+1));
            console.log("ok");
        } else {
            row.appendChild(document.createElement("td")).setAttribute("id", (l+1)+"-"+(i+1));
            console.log("ok");
        }
    }
}
// .setAttribute("class", "white").
// Ezeket applied-old rá!

// Alapfelállás

for (let i = 0; i < 8; i++) {
    
    for (let l = 0; l < 8; l++) {
        var pic = "";
        if (l<2) {
            var c = "b";
        } else {
            var c = "w";
        }

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


    }
}