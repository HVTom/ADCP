const matrix = [
    [1, 2, 3, 4, 0, 0],
    [0, 5, 6, 7, 8, 0],
    [0, 0, 9, 10, 11, 12]
];

const vector = [1, 2, 3, 4];

class Cell {
    constructor() {
        this.val = 0;    // cell value
        this.matrixIn = 0;  // matrix element input value
        this.matrixOut = 0; // matrix el out val
        this.vectorIn = 0;  // vector input value
        this.vectorOut = 0; // propagated vector value
    }
}

const register = Array.from({ length: matrix.length }, () => new Cell());

let vectorIndex = 0;

const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[0m`;
// iterate register values
function printStep(col) {
    console.log(colorize(`\n${'='.repeat(30)}`, '33'));
    console.log(colorize(`Round ${col + 1}:`, '33'));
    console.log(`  Column: ${col}`);
    console.log(colorize(`  VectorIndex: ${vectorIndex}`, '33'));
    register.forEach((cell) => {
        console.log(`  val: ${cell.val}, matrixIn: ${cell.matrixIn}, matrixOut: ${cell.matrixOut}, vectorIn: ${cell.vectorIn}, vectorOut: ${cell.vectorOut}`);
    });

    // Display resultVector for each step
    const resultVector = register.map(cell => cell.val);
    console.log(colorize(`  Result Vector: [ ${resultVector.join(', ')} ]`, '33'));
}

function MVM() {
    for (let row = 0; row < register.length; row++) {
        if (vectorIndex < matrix[row].length) { // load matrix column
            register[row].matrixIn = matrix[row][vectorIndex];
        } else {
            register[row].matrixIn = 0; // keep 0 if out of bounds
        }

        // Propagate vector item based on the row index
        if (row > 0) { 
        	// take as input prev cell's output
            register[row].vectorIn = register[row - 1].vectorOut;
        } else { // push vector into register 1 val forward
            register[row].vectorIn = (vectorIndex < vector.length) ? vector[vectorIndex] : 0;
        }
    }

	// mandatory iteration to ensure good value propagation and complete result
    for (let row = 0; row < register.length; row++) {
        register[row].val += register[row].matrixIn * register[row].vectorIn;
        register[row].matrixOut = register[row].matrixIn; // propagate matrix val
        register[row].vectorOut = register[row].vectorIn; // propagate vector val
    }

    // go to the next column
    vectorIndex++;
}

for (let col = 0; col < matrix[0].length; col++) {
    MVM(); // do the step
    printStep(col); // print register states
}
console.log(vector.length)
const finalResult = register.map(cell => cell.val);
console.log(colorize(`\nFinal Result: [ ${finalResult.join(', ')} ]`, '33'));
