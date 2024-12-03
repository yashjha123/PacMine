function drawBorder(top, left, bottom, right) {

    let box_size = 26;

    let border_width = 0;
    let box_width = box_size - (left?border_width:0) - (right?border_width:0);
    let box_height = box_size - (top?border_width:0) - (bottom?border_width:0);
    return {
            // "border_top_width": `${top?border_width:0}px`,
            // "border_right_width": `${right?border_width:0}px`,
            // "border_bottom_width": `${bottom?border_width:0}px`,
            // "border_left_width": `${left?border_width:0}px`,
            "img_name": `${top?"1":"0"}-${right?"1":"0"}-${bottom?"1":"0"}-${left?"1":"0"}.png`,
            "width":`${box_width}px`,
            "height":`${box_height}px`};
}


function visualizeMaze(mazeArray) {
    let mazeImage = document.getElementById("maze-image");
    mazeImage.innerHTML = "";
    for (let row = 0; row < mazeArray.length; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("maze-row-line");
        for (let col = 0 ; col < mazeArray[row][0].length; col++) {
            console.log(row, col);
            let tileDiv = document.createElement("div");
            tileDiv.classList.add("maze-tile");
            let top_border = row == 0 ? false : mazeArray[row-1][0][col] == "X";
            let left_border = col == 0 ? false : mazeArray[row][0][col-1] == "X";
            let bottom_border = row == mazeArray.length-1 ? false : mazeArray[row+1][0][col] == "X";
            let right_border = col == mazeArray[row][0].length-1 ? false : mazeArray[row][0][col+1] == "X";
            // if (row == 0){
            let {
                img_name,
                width, height} = drawBorder(
                    top_border, left_border, bottom_border, right_border);
            
            if (mazeArray[row][0][col] == "X") {
                // tileDiv.style.backgroundColor = "white";
            }
            else if (mazeArray[row][0][col] == "W") {
                tileDiv.style.backgroundColor = "blue";
            }
            else {
                tileDiv.style.backgroundColor = "transparent";
            }

            tileDiv.style.borderWidth = 0; 
            if (mazeArray[row][0][col] == "X") {
                tileDiv.style.backgroundImage = `url(extracted/${img_name})`;
            }
            // tileDiv.style.borderTopWidth = border_top_width;
            // tileDiv.style.borderRightWidth = border_right_width;
            // tileDiv.style.borderBottomWidth = border_bottom_width;
            // tileDiv.style.borderLeftWidth = border_left_width;
            tileDiv.style.width = width;
            tileDiv.style.height = height;
            // }    
            rowDiv.appendChild(tileDiv);
        }
        mazeImage.appendChild(rowDiv);
    }
}