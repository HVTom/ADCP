#! /usr/bin/node

let matrix = [
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 0]
];



let generation = 1;

console.log("Initial:")
displayMatrix(matrix);

function displayNextGeneration() {
    console.log(`\nGeneration ${generation}`);

    // new matrix for the next generation
    const newMatrix = copyMatrix(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let livingCells = getNeighbors(matrix, i, j);

            if (matrix[i][j] === 1) {
                if (livingCells < 2) {
                    newMatrix[i][j] = 0;
                } else if (livingCells === 2 || livingCells === 3) {
                    newMatrix[i][j] = 1;
                } else if (livingCells > 3) {
                    newMatrix[i][j] = 0;
                }
            } else if (matrix[i][j] === 0) {
                if (livingCells === 3) {
                    newMatrix[i][j] = 1;
                }
            }
        }
    }

    matrix = newMatrix;
    displayMatrix(matrix);
    generation++;
    console.log("########################");
}

function copyMatrix(matrix) {
    return matrix.map(row => [...row]);
}

function displayMatrix(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                process.stdout.write("⬛"); //block for 0 ⬛
            } else {
                process.stdout.write("⬜"); //block for 1 ⬜
            }
        }
        console.log();
    }
}


function getNeighbors(grid, rowIdx, colIdx) {
    const neighbors = [];
    const numRows = grid.length;
    const numCols = grid[0].length;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            // Skip the cell itself
            if (i === 0 && j === 0) continue;

            const newRowIdx = rowIdx + i;
            const newColIdx = colIdx + j;

            // Check if the neighbor is within the grid boundaries
            if (newRowIdx >= 0 && newRowIdx < numRows && 
                newColIdx >= 0 && newColIdx < numCols) {
                    neighbors.push(grid[newRowIdx][newColIdx]);
            }
        }
    }

    const liveCount = neighbors.filter(el => el === 1).length;
    return liveCount;
}

const maxGenerations = 100;
const delay = 5000;

function runGenerations() {
    if (generation < maxGenerations) {
        displayNextGeneration();
        setTimeout(runGenerations, delay);
    }
}

runGenerations();
