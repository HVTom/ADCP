const matrix = [
    [1, 2, 3, 4, 0, 0],
    [0, 5, 6, 7, 8, 0],
    [0, 0, 9, 10, 11, 12]
];

const vector = [1, 2, 3, 4];
const register = [0, 0, 0];
const result = [0, 0, 0];

// inline function -> colorize and format text with ANSI escape codes
const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[0m`;

for (let col = 0; col < matrix[0].length; col++) {
    console.log(colorize(`\n${'='.repeat(30)}`, '33'));
    console.log(colorize(`Round ${col + 1}:`, '33'));
    
    for (let row = 0; row < matrix.length; row++) {
        // vectorIndex - corresponds to the current row and col in the matrix
        // align vector el with current matrix column
        const vectorIndex = col - row; // assures right to left vector iteration
        // Load the vector value into the register or set to 0 if out of bounds
        if (vectorIndex >= 0 && vectorIndex < vector.length) {
            register[row] = vector[vectorIndex];
        } else {
            register[row] = 0;
        }
        
        const product = matrix[row][col] * register[row];
        result[row] += product;

        console.log(`  Col: ${col}`);
        console.log(`  Row: ${row}`);
        console.log(`  Vector index: ${vectorIndex}`);
        console.log(`  Load vector[${vectorIndex}] = ${vector[vectorIndex]} into register[${row}]`);
        console.log(`  Multiply matrix[${row}][${col}] = ${matrix[row][col]} with register[${row}] = ${register[row]} (Product = ${product})`);
        console.log(`  Selected matrix[${row}][${col}] = ${matrix[row][col]}`);
        console.log(`  Register: [${register.join(', ')}]`);
        console.log(`  Result: [${result.join(', ')}]\n`);
    }
}

console.log(colorize('\nFinal Result:', '33'), result);
