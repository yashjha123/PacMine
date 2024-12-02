const grammar_config = {
  brick: ["#E##E##E##E##E#\n#E##R##R##R##E#\n#E##R##R##R##E#\n#E##E##E##E##E#\n#E##E##E##E##E#"],
  R: ["X", "X", "X", "o"],
  E: ["o"],
  row: ["#brick#::#brick#::#brick#::#brick#::#brick#"],
  grid: ["#row#::#row#::#row#::#row#"],
  origin: ["#grid#"],
};

// for some reason

const PCG = () => {
  const grammar = tracery.createGrammar(grammar_config);
  const result = grammar.flatten("#origin#");

  console.log(result);

  // split result by :: delimiter
  const bricks = result.split("::").map((brick) => brick.split("\n"));

  console.log(bricks);

  // Better way to do this? Yes, but this makes it easier to understand
  let result_arr = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
  ];

  let maze_array = new Array(20).fill(0);
  for(let row_i = 0; row_i<20;row_i++){
      let row = new Array(25).fill(0);
      maze_array[row_i] = row;
  }

  for (let i = 0; i < result_arr.length; i++) {
    for (let j = 0; j < result_arr[i].length; j++) {
      const brick = bricks[result_arr[i][j]];
    //   console.log("result_arr",result_arr[i][j]);

      // print the bricks to the maze array
      for (let k = 0; k < brick.length; k++) {
        for (let l = 0; l < brick[k].length; l++) {
        //   console.log(brick[k][l]);
          const val = brick[k][l];
        //   console.log(i,j, result_arr[i][j]);
          maze_array[5 * i + k][5 * j + l] = val;
          console.log(maze_array[5 * i + k]);
        }
      }
    }
  }
  return (maze_array.map((row) => [row.join("")]));
};

// for some reason tracery function needs to be wrapped inside a document.ready
$(document).ready(function () {
  setTimeout(function () {
    PCG();
  }, 10);
});
