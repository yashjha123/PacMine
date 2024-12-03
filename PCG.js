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

let MAZE_ROWS = 30;
let MAZE_COLS = 28;;
const grammar_config = {
  block: ["#A#", "#BC#", "#D#", "#F#", "#G#", "#plus#", "#U#"],
  safe_block: ["#E#"],
  BC: ["B.0.0,C.3.3"],
  blockgen: [
    "#force#.#value#::#force#.#value#:#force#.#value#::#force#.#value#::#force#.#value#",
  ],
  force: ["U", "L", "R", "D"],
  value: ["1", "2"],
  exit_row: ["2","4","7","9","11","14","17"],
  A: ["A.0.0"],
  B: ["B"],
  C: ["C"],
  D: ["D.0.0"],
  E: ["E.0.0"],
  F: ["F.0.0"],
  G: ["G.0.0"],
  plus: ["P.0.0"],
  U: ["U.0.0"],

  gen: ["gen"],
  center_col: ["#safe_block#"],
  row: ["#block#::#block#::#block#::#block#::#block#::#block#::#block#"],
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
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 8],
    [0, 9],
    [0, 10],
    [0, 11],
  ],


  G: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 10],
    [0, 11],
  ],

  E: [
    [0, 0],
    [0, 1],
    [4, 2],
    [3, 3],
    [2, 4],
  ],

  F: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],

    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],

    [2, 1],
    [2, 2],
    [3, 1],
    [3, 2],
    [4, 1],
    [4, 2],
  ],

  U: [
    // [0, 0],
    // [0, 1],

    // [1, 0],
    // [1, 1],
    
    // [2, 0],
    // [2, 1],
    
    // [3, 0],
    // [3, 1],
    
    [4, 0],
    [4, 1],



    [0, 3],
    [0, 4],

    [1, 3],
    [1, 4],
    
    [2, 3],
    [2, 4],
    
    [3, 3],
    [3, 4],
    
    [4, 3],
    [4, 4],

    [3, 1],
    [3, 2],

    [4, 1],
    [4, 2],
  ],

  P: [
    [0, 2],
    [0, 3],

    [1, 2],
    [1, 3],

    [2, 0],
    [2, 1],

    [3, 0],
    [3, 1],

    [2, 2],
    [2, 3],

    [3, 2],
    [3, 3],

    [4, 2],
    [4, 3],

    [5, 2],
    [5, 3],

    [2, 4],
    [2, 5],

    [3, 4],
    [3, 5],

  ]
};

const mirrorMaze = (maze_array) => {
  for (let row = 0; row < maze_array.length; row++) {
    for (let col = 0; col < maze_array[row].length / 2; col++) {
      maze_array[row][maze_array[row].length - 1 - col] = maze_array[row][col];
    }
  }
};
const drawMazeBorder = (maze_array, exit_row) => {
  for (let row = 0; row < maze_array.length; row++) {
    for (let col = 0; col < maze_array[row].length; col++) {
      if(row==exit_row){
        maze_array[row][0] = " ";
        continue;
      }
      if (row == 0) {
        maze_array[row][col] = "X";
      } else if (row == maze_array.length - 1) {
        maze_array[row][col] = "X";
      } else if (col == 0) {
        maze_array[row][col] = "X";
      } else if (col == maze_array[row].length - 1) {
        maze_array[row][col] = "X";
      } else if (row == 2 && col > 7 && col < maze_array[row].length - 7) {
        maze_array[row][col] = "X";
      } else if (row == (maze_array.length - 3) && (col > 6) && (col < maze_array[row].length - 6)) {
        maze_array[row][col] = "X";
      } else if (row == MAZE_ROWS -1){
        maze_array[row][col] = "o";
      } 
      else if (col == 1) {
        maze_array[row][col] = "o";
      } else if (col == maze_array[row].length - 2) {
        maze_array[row][col] = "o";
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
    } else {
      last = false;
    }
  }
  throw new Error("No free space found");
};

const findUncoveredSpaces = (mazeArray) => {
  let ret_maze_array = new Array(MAZE_ROWS).fill(0);
  for (let row_i = 0; row_i < MAZE_ROWS; row_i++) {
    let row = new Array(MAZE_COLS).fill(0);
    ret_maze_array[row_i] = row;
  }

  // we ignore the columns with the walls
  for (let row_i = 0; row_i < MAZE_ROWS; row_i++) {
    for (let col_i = 0; col_i < MAZE_COLS; col_i++) {
      if (row_i == 0) {
        ret_maze_array[row_i][col_i] = 1;
        continue;
      }
      if (row_i == MAZE_ROWS - 1) {
        ret_maze_array[row_i][col_i] = 1;
        continue;
      }
      if (col_i == 0) {
        ret_maze_array[row_i][col_i] = 1;
        continue;
      }
      if (col_i == MAZE_COLS - 1) {
        ret_maze_array[row_i][col_i] = 1;
        continue;
      }
      if (mazeArray[row_i][col_i] == "X") {
        ret_maze_array[row_i + 1][col_i] = 1;
        ret_maze_array[row_i + 1][col_i + 1] = 1;
        ret_maze_array[row_i + 1][col_i - 1] = 1;
        ret_maze_array[row_i - 1][col_i] = 1;
        ret_maze_array[row_i - 1][col_i - 1] = 1;
        ret_maze_array[row_i - 1][col_i + 1] = 1;
        ret_maze_array[row_i][col_i + 1] = 1;
        ret_maze_array[row_i][col_i - 1] = 1;
      }
    }
  }
  return ret_maze_array;
};

const mergeMazeArrays = (mazeArray, mazeArray2) => {
  for (let row_i = 0; row_i < mazeArray.length; row_i++) {
    for (let col_i = 0; col_i < mazeArray[row_i].length; col_i++) {
      if (mazeArray2[row_i][col_i] == 0) {
        mazeArray[row_i][col_i] = "X";
      }
    }
  }
};
// XXXXXXXX
// X      X
// X      X
// X      X
// XXXXXXXX
//
let centerFill = [
  [" ","X", "X", "X", "X", "X", "X", "X", "X"," "],
  [" "," ", " ", " ", " ", " ", " ", " ", " "," "],
  [" ","X", "X", "X", "X", "X", "X", "X", "X"," "],
  [" ","X", " ", " ", " ", " ", " ", " ", "X"," "],
  [" ","X", " ", " ", " ", " ", " ", " ", "X"," "],
  [" ","X", " ", " ", " ", " ", " ", " ", "X"," "],
  [" ","X", "X", "X", "X", "X", "X", "X", "X"," "],
  [" "," ", " ", " ", " ", " ", " ", " ", " "," "],
];
const drawCenter = (mazeArray) => {
  let midX = Math.floor( mazeArray.length / 2);
  let centerStartX =midX - 5;
  let midY = Math.floor( mazeArray[0].length / 2);
  let centerStartY = midY - 5;
  let centerEndX =midX + 3;
  let centerEndY = midY + 5;
  for (let row = centerStartX; row < centerEndX; row++) {
    for (let col = centerStartY; col < centerEndY; col++) {
      let val = centerFill[row - centerStartX][col - centerStartY];
      console.log(row - centerStartX, col - centerStartY, val);
      mazeArray[row][col] = val;
    }
  }
};

let spawnFill = [
  [" ", "X", "X", "X", "X", "X", "X", "X", " "],
  [" ", "X", "X", "X", "X", "X", "X", "X", " "],
  [" ", "X", "X", "X", "X", "X", "X", "X", " "],
  [" ", " ", " ", " ", "X", " ", " ", " ", " "],
  ["X", "X", "X", " ", "X", " ", "X", "X", "X"],
  ["X", "X", "X", " ", " ", " ", "X", "X", "X"],
  ["X", "X", "X", " ", " ", " ", "X", "X", "X"],
  [" ", "X", " ", " ", "X", " ",  " ", "X", " "],
  ["N", "N", "N", " ", "X", " ",  "N", "N", "N"],
  ["N", "X", "N", "N", "N", "N",  "N", "X", "N"],
]

const drawSpawn = (mazeArray) => {
  let midX = Math.floor( mazeArray.length / 2);
  let spawnStartX = midX + 3;
  let midY = Math.floor( mazeArray[0].length / 2);
  let spawnStartY = midY - 5;
  let spawnEndX = midX + 9;
  let spawnEndY = midY + 9;
  for (let row = spawnStartX; row < spawnEndX; row++) {
    for (let col = spawnStartY; col < spawnEndY; col++) {
      let val = spawnFill[row - spawnStartX][col - spawnStartY];
      if (val == "N") {
         continue;
      }
      console.log(row - spawnStartX, col - spawnStartY, val);
      mazeArray[row][col] = val;
    }
  }
};

// const genToBlocks = (gen) => {
//     let blocks = [];
//     let coords = gen.split(".");

//     for (let i = 0; i < coords.length; i++) {
//         let row = parseInt(coords[i].split(",")[0]);
//         let col = parseInt(coords[i].split(",")[1]);
//         blocks.push(mazeArray[row][col]);
//     }
//     return blocks;
// }


const plotFigures = (bricks, maze_array, exit_row, current_row, current_col) => {
  for (let i = 0; i < bricks.length; i++) {
    for (let k = 0; k < bricks[i].length; k++) {
      const brick_collection = bricks[i][k].split(",").map((e) => e.split("."));
      let last_x = 0;
      for (let j = 0; j < brick_collection.length; j++) {
        let [brick, offsetX, offsetY] = brick_collection[j];
        offsetX = parseInt(offsetX);
        offsetY = parseInt(offsetY);
        console.log(brick, offsetX, offsetY);
        const brick_region = block_regions[brick];
        console.log("brick_region", brick_region);

        for (let k = 0; k < brick_region.length; k++) {
          console.log(brick_region);
          console.log(brick_region[k]);
          const [x, y] = brick_region[k];
          console.log(current_row + x + offsetX);
          if (current_row + x + offsetX < 0 || current_row + x + offsetX >= (MAZE_ROWS-4) || current_col + y + offsetY < 0 || current_col + y + offsetY >= MAZE_COLS) {
            console.log("out of bounds");
            continue;
          }
          maze_array[current_row + x + offsetX][current_col + y + offsetY] =
            "X";
          // maze_array[current_row+x][current_col+y] = brick;

          last_x = Math.max(last_x, x);
          
        }
      }
      current_row += last_x + 2;
      
    }
    current_row = 2;
    current_col += 2;
  }
};

const findClosestPoint = (mazeArray, x, y) => {
  let closestX = 0;
  let closestY = 0;
  let closestDistance = Infinity;
  for (let row = 0; row < mazeArray.length; row++) {
    for (let col = 0; col < mazeArray[row].length; col++) {
      if (mazeArray[row][col] == "o") {
        const distance = Math.sqrt((row - y) ** 2 + (col - x) ** 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestX = col;
          closestY = row;
        }
      }
    } 
  }
  return [closestX, closestY];
}

const placePower = (mazeArray, coords) => {
  const [x, y] = coords;
  mazeArray[y][x] = "O";
}

const PCG = () => {
  const grammar = tracery.createGrammar(grammar_config);
  const result = grammar.flatten("#origin#");

  const exit_row = parseInt(grammar.flatten("#exit_row#"));
  // console.log(blockgen);
  // // break;
  // return;

  console.log(result);

  // split result by :: delimiter
  const bricks = [result.split("::")];

  console.log(bricks);

  let maze_array = new Array(MAZE_ROWS).fill(0);
  for (let row_i = 0; row_i < MAZE_ROWS; row_i++) {
    let row = new Array(MAZE_COLS).fill("o");
    maze_array[row_i] = row;
  }

  // the topmost layer is always a tunnel. RANDOMIZE this flag?
  let current_row = 2;
  let current_col = 2;
  
  
  plotFigures(bricks, maze_array, exit_row, current_row, current_col);
  
  // const centerColBlocks = grammar.flatten("#center_col#").split("::");
  const midY = Math.floor( maze_array[0].length / 2);
  // console.log(centerColBlocks);  
  // plotFigures([centerColBlocks], maze_array, exit_row, 2, midY);
  // plotFigures([["D.0.0"]], maze_array, exit_row, 6, 0);



  console.log(maze_array);
  drawSpawn(maze_array);
  drawMazeBorder(maze_array, exit_row);
  const maze_array2 = findUncoveredSpaces(maze_array);
  mergeMazeArrays(maze_array, maze_array2);
  drawCenter(maze_array);
  mirrorMaze(maze_array);

  const first = findClosestPoint(maze_array, 0, 0);
  placePower(maze_array, first);
  const second = findClosestPoint(maze_array, MAZE_ROWS-1,  0);
  placePower(maze_array, second);
  const third = findClosestPoint(maze_array, MAZE_ROWS-1, MAZE_COLS-1);
  placePower(maze_array, third);
  const fourth = findClosestPoint(maze_array, 0, MAZE_COLS-1);
  placePower(maze_array, fourth);
  
  return maze_array.map((row) => [row.join("")]);
};

// for some reason tracery function needs to be wrapped inside a document.ready
// $(document).ready(function () {
//   setTimeout(function () {
//     PCG();
//   }, 10);
// });
