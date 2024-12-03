// const grammar_config = {
//   brick: ["#E##E##E##E##E#\n#E##R##R##R##E#\n#E##R##R##R##E#\n#E##E##E##E##E#\n#E##E##E##E##E#"],
//   R: ["X", "X", "X", "o"],
//   E: ["o"],
//   row: ["#brick#::#brick#::#brick#::#brick#::#brick#"],
//   grid: ["#row#::#row#::#row#::#row#"],
//   origin: ["#grid#"],
// };

// Note to mention
// We don't need extraneous spaces in the grammar because we already split apart the grid

// FOR THE BLOCKS I CAN ALLOW THEM TO DELETE SOME OF THE SPACES, for example Block A can be ---- or X---
const grammar_config = {
  block: ["#A#", "#BC#","#D#"],
  BC: ["B.0.0,C.3.3"],
  A: ["A.0.0"],
  B: ["B"],
  C: ["C"],
  D: ["D.0.0"],
  E: ["E"],
  R: ["X", "X", "X", "o"],
  // row: ["#block#::#block#::#block#"],
  row: ["#block#::#block#::#block#::#block#"],
  grid: ["#row#"],
  // grid: ["#row#::#row#"],
  origin: ["#grid#"],
};

const block_regions = {
  A: [
    [0, 0],
    [1, 0],
    [2, 0],

    [0, 1],
    [1, 1],
    [2, 1],
    
    [0, 2],
    [1, 2],
    [2, 2],
    
    [0, 3],
    [1, 3],
    [2, 3],
  ],
  B: [
    [0, 0],
    [0, 1],


    [1, 0],
    [1, 1],


    [2, 0],
    [2, 1],


    [3, 0],
    [3, 1],


    [4, 0],
    [4, 1],

    [5, 0],
    [5, 1],

    [6, 0],
    [6, 1],


    [7, 0],
    [7, 1],


    [3, 2],
    [4, 2],

    [3, 3],
    [4, 3],

],
  C: [
    [3, 0],
    [4, 0],
    [3, 1],
    [4, 1],

    [0, 2],
    [0, 3],


    [1, 2],
    [1, 3],


    [1, 2],
    [1, 3],


    [2, 2],
    [2, 3],


    [3, 2],
    [3, 3],


    [4, 2],
    [4, 3],
  ],
  D: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [0, 9],
    [0, 10],
    [0, 11],


    // [1, 0],
    // [1, 1],
    // [1, 2],
    // [1, 3],
    // [1, 4],
    // [1, 5],
    // [1, 6],
    // [1, 7],
    // [1, 8],
    // [1, 9],
    // [1, 10],
    // [1, 11]
  ],

  E: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]
};


const mirrorMaze = (maze_array) => {
    for (let row = 0; row < maze_array.length; row++) {
        for (let col = 0; col < (maze_array[row].length/2); col++) {
            maze_array[row][maze_array[row].length - 1 - col] = maze_array[row][col];
        }
    }
}
const drawMazeBorder = (maze_array) => {
  for (let row = 0; row < maze_array.length; row++) {
    for (let col = 0; col < maze_array[row].length; col++) {
      if (row == 0) {
        maze_array[row][col] = "X";
      } else if (row == maze_array.length - 1) {
        maze_array[row][col] = "X";
      } else if (col == 0) {
        maze_array[row][col] = "X";
      } else if (col == maze_array[row].length - 1) {
        maze_array[row][col] = "X";
      }
    }
  }
  return maze_array;
};

const findFirstFreeSpace = (maze_array, col) => {
    let last = false;
    for (let row = 0; row < maze_array.length; row++) {
        if (maze_array[row][col] == "o") {
            if (last) {
                return row;
            }
            last = true;
        }
        else {
            last = false;
        }
    }
    throw new Error("No free space found");
}

const findUncoveredSpaces = (mazeArray) => {
    
  let ret_maze_array = new Array(30).fill(0);
  for (let row_i = 0; row_i < 30; row_i++) {
    let row = new Array(28).fill(0);
    ret_maze_array[row_i] = row;
  }

  
  // we ignore the columns with the walls
  for (let row_i = 0; row_i < 30; row_i++) {
    
    for (let col_i = 0; col_i < 28; col_i++) {
      if(row_i==0){
        ret_maze_array[row_i][0] = 1;
        continue;
      }
      if(row_i==29){
        ret_maze_array[row_i][27] = 1;
        continue;
      }
      if(col_i==0){
        ret_maze_array[row_i][col_i] = 1;
        continue;
      }
      if(col_i==27){
        ret_maze_array[row_i][col_i] = 1;
        continue;
      }
      if (mazeArray[row_i][col_i] == "X") {
        ret_maze_array[row_i+1][col_i] = 1;
        ret_maze_array[row_i+1][col_i+1] = 1;
        ret_maze_array[row_i+1][col_i-1] = 1;
        ret_maze_array[row_i-1][col_i] = 1;
        ret_maze_array[row_i-1][col_i-1] = 1;
        ret_maze_array[row_i-1][col_i+1] = 1;
        ret_maze_array[row_i][col_i+1] = 1;
        ret_maze_array[row_i][col_i-1] = 1;
      }
    }
  }
  return ret_maze_array;
}

const mergeMazeArrays = (mazeArray, mazeArray2) => {
    for (let row_i = 0; row_i < 30; row_i++) {
        for (let col_i = 0; col_i < 28; col_i++) {
            if(mazeArray2[row_i][col_i]==0){
                mazeArray[row_i][col_i] = "X";
            }
        }
    }
}

const PCG = () => {
  const grammar = tracery.createGrammar(grammar_config);
  const result = grammar.flatten("#origin#");

  console.log(result);

  // split result by :: delimiter
  const bricks = [result.split("::")];

  console.log(bricks);

  let maze_array = new Array(30).fill(0);
  for (let row_i = 0; row_i < 30; row_i++) {
    let row = new Array(28).fill("o");
    maze_array[row_i] = row;
  }

  // the topmost layer is always a tunnel. RANDOMIZE this flag?
  let current_row = 2;
  let current_col = 2;
  for (let i = 0; i < bricks.length; i++) {
    for (let k = 0; k < bricks[i].length; k++) {
      const brick_collection = bricks[i][k].split(",").map(e=>e.split("."));
      let last_x = 0;
      for (let j = 0; j < brick_collection.length; j++) {
        let [brick, offsetX, offsetY] = brick_collection[j];
        offsetX = parseInt(offsetX);
        offsetY = parseInt(offsetY);
        console.log(brick, offsetX, offsetY);
        const brick_region = block_regions[brick];
        console.log("brick_region", brick_region);

        for (let k = 0; k < brick_region.length; k++) {
          const [x, y] = brick_region[k];
          maze_array[current_row + x + offsetX][current_col + y + offsetY] = "X";
          // maze_array[current_row+x][current_col+y] = brick;

          last_x = Math.max(last_x, x);
        }
    }
    current_row += last_x + 2;
    }
    current_row = 2;
    current_col += 2;
  }
  mirrorMaze(maze_array);
  console.log(maze_array);
  maze_array = drawMazeBorder(maze_array);
  const maze_array2 = findUncoveredSpaces(maze_array);
  mergeMazeArrays(maze_array, maze_array2);
  return maze_array.map((row) => [row.join("")]);
};

// for some reason tracery function needs to be wrapped inside a document.ready
// $(document).ready(function () {
//   setTimeout(function () {
//     PCG();
//   }, 10);
// });
