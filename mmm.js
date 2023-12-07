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

class Cell {
    constructor() {
        this.c = 0;
        this.ain = 0;
        this.aout = 0;
        this.uin = 0;
        this.uout = 0;
    }
}

const numRowsA = matrixA.length;
const numColsA = matrixA[0].length;
const numRowsB = matrixB.length;
const numColsB = matrixB[0].length;

const cells = Array.from({ length: numRowsA }, () => Array(numColsB).fill(new Cell()));

function printStates(stepIndex) {
    console.log(`\nStep ${stepIndex + 1}:\n`);
    cells.forEach((row) => {
        row.forEach((cell) => {
            console.log(`c: ${cell.c}, ain: ${cell.ain}, aout: ${cell.aout}, uin: ${cell.uin}, uout: ${cell.uout}`);
        });
    });
}

function step() {
    for (let i = 0; i < numRowsA; ++i) {
        for (let j = 0; j < numColsB; ++j) {
            if (i < numRowsA && j < numColsA) {
                cells[i][j].ain = matrixA[i][j];
            } else {
                cells[i][j].ain = 0;
            }

            if (i > 0) {
                cells[i][j].uin = cells[i - 1][j].uout;
            } else {
                cells[i][j].uin = (j < numColsB) ? matrixB[0][j] : 0;
            }
        }
    }

    for (let i = 0; i < numRowsA; ++i) {
        for (let j = 0; j < numColsB; ++j) {
            cells[i][j].c += cells[i][j].ain * cells[i][j].uin;
            cells[i][j].aout = cells[i][j].ain;
            cells[i][j].uout = cells[i][j].uin;
        }
    }
}

console.log("Matrix A is");
matrixA.forEach((row) => {
    console.log(row.join(' '));
});

console.log("\nMatrix B is");
matrixB.forEach((row) => {
    console.log(row.join(' '));
});

console.log("\nInitial states:\n");
printStates(-1);

for (let stepIndex = 0; stepIndex < numColsA; ++stepIndex) {
    step();
    printStates(stepIndex);
}

// Print the resulting matrix
const resultMatrix = cells.map(row => row.map(cell => cell.c));
console.log("\nResulting Matrix:");
console.log(resultMatrix);

