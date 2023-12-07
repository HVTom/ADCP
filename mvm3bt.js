const matrix = [
    [0, 0, 1, 2, 3, 4],
    [0, 5, 6, 7, 8, 0],
    [9, 10, 11, 12, 0, 0]
];

const vector = [1, 2, 3, 4];
const registers = [0, 0, 0];
const result = [0, 0, 0];

// Systolic array computation
for (let step = 0; step < matrix[0].length; step++) {
    console.log(`\nStep ${step + 1}:`);

    // Iterate over each row in reverse order (bottom-top)
    for (let i = matrix.length - 1; i >= 0; i--) {
        // Calculate the index in the vector for the current step and row
        const vectorIndex = step - (matrix.length - 1) + i;
        console.log(`${vectorIndex}`);

        // Load the vector value into the register or set to 0 if out of bounds
        if (vectorIndex >= 0 && vectorIndex < vector.length) {
            registers[i] = vector[vectorIndex];
            console.log(`  Load vector[${vectorIndex}] = ${vector[vectorIndex]} into register[${i}]`);
        } else {
            registers[i] = 0;
            console.log(`  Load 0 into register[${i}] (out of bounds)`);
        }

        // Update the result vector by multiplying matrix element with register value
        const product = matrix[i][step] * registers[i];
        result[i] += product;
        console.log(`  Multiply matrix[${i}][${step}] = ${matrix[i][step]} with register[${i}] = ${registers[i]} (Product = ${product})`);

        // Log the selected matrix element
        console.log(`  Selected matrix[${i}][${step}] = ${matrix[i][step]}`);
    }
}

// Print the final result vector
console.log('\nFinal Result:', result);

