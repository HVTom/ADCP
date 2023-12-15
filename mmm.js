const matrixA = [
  [1, 2, 3, 0, 0],
  [0, 4, 5, 6, 0],
  [0, 0, 7, 8, 9]
];

const matrixB = [
  [1, 0, 0],
  [2, 4, 0],
  [3, 5, 7],
  [0, 6, 8],
  [0, 0, 9]
];

const register = Array.from({ length: matrixA.length }, () =>
  Array.from({ length: matrixB[0].length }, () => ({ val: 0, Ain: 0, Bin: 0, Aout: 0, Bout: 0 }))
);

let vectorIndex = 0;

const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[0m`;

function step() {
  // Propagate matrixA
  for (let i = 0; i < register.length; i++) { //0 1 2
    for (let j = 0; j < register[0].length; j++) { // 0...4
      if (j == 0) {
        register[i][j].Ain = vectorIndex < matrixA[i].length ? matrixA[i][vectorIndex] : 0;
      } else {
        register[i][j].Ain = register[i][j - 1].Aout;
      }
    }
  }

  // Propagate matrixB
  for (let i = 0; i < register.length; i++) {
    for (let j = 0; j < register[0].length; j++) {
      if (i == 0) {
        register[i][j].Bin = vectorIndex < matrixB.length ? matrixB[vectorIndex][j] : 0;
      } else {
        register[i][j].Bin = register[i - 1][j].Bout;
      }
    }
  }

  for (let i = 0; i < register.length; i++) {
    for (let j = 0; j < register[0].length; j++) {
      register[i][j].val += register[i][j].Ain * register[i][j].Bin;
      register[i][j].Aout = register[i][j].Ain;
      register[i][j].Bout = register[i][j].Bin;
    }
  }

  vectorIndex++;
}

// m + n - 1 steps
for (let stepIndex = 0; stepIndex < matrixA.length + matrixB.length - 1; stepIndex++) {
  console.log(colorize(`\nStep ${stepIndex + 1}:`, 33));
  step();

  for (let i = 0; i < register.length; i++) {
    for (let j = 0; j < register[0].length; j++) {
      console.log(`val: ${register[i][j].val}, Ain: ${register[i][j].Ain}, Bin: ${register[i][j].Bin}`);
    }
    console.log("");
  }
}


console.log(colorize("\nResult: ", 33));
register.forEach(row => console.log(row.map(cell => cell.val).join(" ")));
