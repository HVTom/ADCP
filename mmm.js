const a = [
  [1, 2, 3, 0, 0],
  [0, 4, 5, 6, 0],
  [0, 0, 7, 8, 9]
];

const b = [
  [1, 0, 0],
  [2, 4, 0],
  [3, 5, 7],
  [0, 6, 8],
  [0, 0, 9]
];

const cells = Array.from({ length: a.length }, () =>
  Array.from({ length: b[0].length }, () => ({ c: 0, ain: 0, bin: 0, aout: 0, bout: 0 }))
);

let inputIndex = 0;

function step() {
  // Propagate input from matrix a
  for (let i = 0; i < cells.length; ++i) {
    for (let j = 0; j < cells[0].length; ++j) {
      if (j === 0) {
        cells[i][j].ain = inputIndex < a[i].length ? a[i][inputIndex] : 0;
      } else {
        cells[i][j].ain = cells[i][j - 1].aout;
      }
    }
  }

  // Propagate input from matrix b
  for (let i = 0; i < cells.length; ++i) {
    for (let j = 0; j < cells[0].length; ++j) {
      if (i === 0) {
        cells[i][j].bin = inputIndex < b.length ? b[inputIndex][j] : 0;
      } else {
        cells[i][j].bin = cells[i - 1][j].bout;
      }
    }
  }

  for (let i = 0; i < cells.length; ++i) {
    for (let j = 0; j < cells[0].length; ++j) {
      cells[i][j].c += cells[i][j].ain * cells[i][j].bin;
      cells[i][j].aout = cells[i][j].ain;
      cells[i][j].bout = cells[i][j].bin;
    }
  }

  ++inputIndex;
}

console.log("Matrix A is");
a.forEach(row => console.log(row.join(" ")));

console.log("\nMatrix B is");
b.forEach(row => console.log(row.join(" ")));

for (let stepIndex = 0; stepIndex < a.length + b.length - 1; ++stepIndex) {
  console.log(`\nStep ${stepIndex + 1}:`);
  step();

  for (let i = 0; i < cells.length; ++i) {
    for (let j = 0; j < cells[0].length; ++j) {
      console.log(`c: ${cells[i][j].c}, ain: ${cells[i][j].ain}, bin: ${cells[i][j].bin}`);
    }
    console.log("");
  }
}


// Display the final matrix
console.log("\nFinal Matrix is");
cells.forEach(row => console.log(row.map(cell => cell.c).join(" ")));
