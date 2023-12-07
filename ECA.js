if (process.argv.length !== 5) {
  console.error('Usage: node your-script.js <numCells> <ruleNumber> <numGenerations>');
  process.exit(1);
}

const numCells = parseInt(process.argv[2]);
const ruleNumber = parseInt(process.argv[3]);
const numGenerations = parseInt(process.argv[4]);
const initial = Array(numCells).fill(0);
initial[Math.floor(numCells / 2)] = 1;

// Args error handling
if (isNaN(numCells) || isNaN(ruleNumber) || isNaN(numGenerations)) {
  console.error('Please provide valid numeric arguments for numCells, ruleNumber, and numGenerations.');
  process.exit(1);
}

if (numCells <= 0) {
  console.error('numCells must be a positive integer.');
  process.exit(1);
}

if (ruleNumber < 0 || ruleNumber > 255) {
  console.error('ruleNumber must be a value between 0 and 255.');
  process.exit(1);
}

if (numGenerations < 0) {
  console.error('numGenerations must be a non-negative integer.');
  process.exit(1);
}


function elementaryAutomaton(numCells, numGenerations, ruleNumber, initial) {
  const rule = ruleNumber.toString(2).padStart(8, '0');
  const grid = [initial];

  for (let generation = 0; generation < numGenerations; generation++) {
    const currentGeneration = grid[generation];
    const newGeneration = [];

    for (let i = 0; i < numCells; i++) {
      const left = currentGeneration[(i - 1 + numCells) % numCells];
      const center = currentGeneration[i];
      const right = currentGeneration[(i + 1) % numCells];
      const neighborhood = `${left}${center}${right}`;
      const newIndex = 7 - parseInt(neighborhood, 2);
      newGeneration.push(parseInt(rule[newIndex]));
    }

    grid.push(newGeneration);
  }

  for (let generation of grid) {
    console.log(generation.map(cell => (cell ? '⬜' : '⬛')).join(''));
  }
}

elementaryAutomaton(numCells, numGenerations, ruleNumber, initial);

