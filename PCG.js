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
  block: ["#A##B#::#C#", "#D#::#D#", "#E#"],
  A: ["A"],
  B: ["B"],
  C: ["C"],
  D: ["D"],
  E: ["E"],
  R: ["X", "X", "X", "o"],
  // row: ["#block#::#block#::#block#"],
  row: ["#block#,#block#"],
  grid: ["#row#"],
  // grid: ["#row#::#row#"],
  origin: ["#grid#"],
};

const block_regions = {
  A: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  B: [
    [0, 0],
    [1, 0],
    [1, 1],
  ],
  C: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  D: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ],

  E: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]
};

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

const PCG = () => {
  const grammar = tracery.createGrammar(grammar_config);
  const result = grammar.flatten("#origin#");

  console.log(result);

  // split result by :: delimiter
  const bricks = result.split(",").map((x) => x.split("::"));

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
      const brick_collection = bricks[i][k].split("");
      for (let j = 0; j < brick_collection.length; j++) {
        const brick = brick_collection[j];
        const brick_region = block_regions[brick];
        console.log("brick_region", brick_region);

        let last_x = 0;
        for (let k = 0; k < brick_region.length; k++) {
          const [x, y] = brick_region[k];
          maze_array[current_row + x][current_col + y] = "X";
          // maze_array[current_row+x][current_col+y] = brick;

          last_x = Math.max(last_x, x);
        }
        current_row += last_x + 2;
      }
    }
    current_row = 2;
    current_col += 2;
  }
  console.log(maze_array);
  maze_array = drawMazeBorder(maze_array);
  return maze_array.map((row) => [row.join("")]);
};

// for some reason tracery function needs to be wrapped inside a document.ready
// $(document).ready(function () {
//   setTimeout(function () {
//     PCG();
//   }, 10);
// });
