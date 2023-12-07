const a = [
    [1, 2, 3, 0, 0],
    [0, 4, 5, 6, 0],
    [0, 0, 7, 8, 9]
];

const u = [1, 2, 3];

// declare registers/processing unit structure
class Cell {
    constructor() {
        this.c = 0;    // cell value
        this.ain = 0;  // matrix element input value
        this.aout = 0; // matrix el out val?
        this.uin = 0;  // vector input value
        this.uout = 0; // propagated vector value?
    }
}

// create an array of cell of length a.length
const cells = Array.from({ length: a.length }, () => new Cell());

// start from first element
let inputIndex = 0;

// iterate cells values
function printStates(stepIndex) {
    console.log(`\nStep ${stepIndex + 1}:\n`);
    cells.forEach((cell) => {
        console.log(`c: ${cell.c}, ain: ${cell.ain}, aout: ${cell.aout}, uin: ${cell.uin}, uout: ${cell.uout}`);
    });
}

function step() {
	//for each register
    for (let i = 0; i < cells.length; ++i) {
    	// if i is in bounds?
        if (i < a.length && inputIndex < a[i].length) {
        	// input vlaue for the ith cell is matrix el from column i row inputIndex
            cells[i].ain = a[i][inputIndex];
        } else {
        	// otherwise if we are on 0 element, keep the 0 value for register/cell
            cells[i].ain = 0;
        }
		// if i greater than 0
        if (i > 0) {
        	// propagate value from previous register/cell
            cells[i].uin = cells[i - 1].uout;
        } else {
        	//else, if inputIndex is in u.length bounds
        	//cell keeps cell value else it is 0?
            cells[i].uin = (inputIndex < u.length) ? u[inputIndex] : 0;
        }
    }

	// for each cell
    for (let i = 0; i < cells.length; ++i) {
    	// update cell value / do matrix-vector multiplication
        cells[i].c += cells[i].ain * cells[i].uin; 
        cells[i].aout = cells[i].ain; // propagate matrix value?
        cells[i].uout = cells[i].uin; // propagate vector value?
    }

	// go to next step
    inputIndex++;
}

// display matrix
console.log("A is");
a.forEach((row) => {
    console.log(row.join(' '));
});

//display initial states
console.log("\nInitial states:\n");
printStates(-1);

//do a[0].length/number of columns steps (because we make the multiplication
// column by column)
for (let stepIndex = 0; stepIndex < a[0].length; ++stepIndex) {
    step(); // do the step
    printStates(stepIndex); // print cells states
}

// Print the resulting vector
const resultVector = cells.map(cell => cell.c);
console.log("\nResulting Vector:", resultVector);

