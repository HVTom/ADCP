const matrix = [
    [1, 2, 3, 0, 0],
    [0, 4, 5, 6, 0],
    [0, 0, 7, 8, 9]
];

const vector = [1, 2, 3];
const registers = [0, 0, 0];
const result = [0, 0, 0];

// Systolic array computation (top-down)
for (let step = 0; step < matrix[0].length; step++) {
    console.log(`\nStep ${step + 1}:`);

    // Iterate over each row
    for (let i = 0; i < matrix.length; i++) {
        // Calculate the index in the vector for the current step and row
        const vectorIndex = step - i;
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

