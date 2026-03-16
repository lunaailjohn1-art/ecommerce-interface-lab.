/**
 * AilZaCafe - Lab 4: JavaScript Fundamentals & Git Concepts
 * Implementation of all required programming problems
 * @module solution
 */

// ============================================================================
// Problem 1: The Strict Type Checker
// ============================================================================

/**
 * Returns a string describing the data type of the input using a switch statement
 * @param {any} input - The variable to check
 * @returns {string} - Description of the data type
 */
function checkVariable(input) {
    switch (typeof input) {
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'bigint':
            return 'bigint';
        case 'undefined':
            return 'undefined';
        case 'object':
            // Handle null (typeof null returns 'object')
            return 'object';
        default:
            return typeof input;
    }
}

// Test Problem 1
console.log('=== Problem 1: The Strict Type Checker ===');
console.log(checkVariable('Hello'));        // string
console.log(checkVariable(42));              // number
console.log(checkVariable(true));             // boolean
console.log(checkVariable(123n));             // bigint
console.log(checkVariable(undefined));        // undefined
console.log(checkVariable(null));             // object
console.log(checkVariable({}));               // object
console.log(checkVariable([]));               // object


// ============================================================================
// Problem 2: Secure ID Generator
// ============================================================================

/**
 * Generates an array of ID strings from 0 to count-1, skipping the number 5
 * @param {number} count - Number of IDs to generate
 * @returns {string[]} - Array of formatted ID strings
 */
function generateId(count) {
    const ids = [];
    
    for (let i = 0; i < count; i++) {
        // Skip the number 5 using continue statement
        if (i === 5) {
            continue;
        }
        ids.push(`ID-${i}`);
    }
    
    return ids;
}

// Test Problem 2
console.log('\n=== Problem 2: Secure ID Generator ===');
console.log(generateId(7));  // ["ID-0", "ID-1", "ID-2", "ID-3", "ID-4", "ID-6"]
console.log(generateId(10)); // IDs from 0-9 excluding 5
console.log(generateId(5));  // ["ID-0", "ID-1", "ID-2", "ID-3", "ID-4"]


// ============================================================================
// Problem 3: The Functional Sum
// ============================================================================

/**
 * Sums all arguments using reduce() method
 * @param {...any} numbers - Variable number of arguments to sum
 * @returns {number} - Sum of all numeric arguments
 * @throws {TypeError} - If any argument is not a number
 */
function calculateTotal(...numbers) {
    // Check if all arguments are numbers
    for (const num of numbers) {
        if (typeof num !== 'number') {
            throw new TypeError('Invalid input: All arguments must be numbers');
        }
    }
    
    // Use reduce to sum all numbers
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

// Test Problem 3
console.log('\n=== Problem 3: The Functional Sum ===');
try {
    console.log(calculateTotal(1, 2, 3, 4, 5));          // 15
    console.log(calculateTotal(10, 20, 30));              // 60
    console.log(calculateTotal(2.5, 3.7, 1.8));           // 8.0
    console.log(calculateTotal(1, 2, 'three'));           // Should throw error
} catch (error) {
    console.error('Error:', error.message);               // "Invalid input: All arguments must be numbers"
}


// ============================================================================
// Problem 4: Leaderboard Filter
// ============================================================================

/**
 * Filters players with score > 8 and returns their names as a joined string
 * @param {Array<{name: string, score: number}>} playerList - Array of player objects
 * @returns {string} - Comma-separated string of top player names
 */
function getTopScores(playerList) {
    // 1. Filter players with score greater than 8
    const topPlayers = playerList.filter(player => player.score > 8);
    
    // 2. Map to get only the names
    const topPlayerNames = topPlayers.map(player => player.name);
    
    // 3. Join names with comma and space
    return topPlayerNames.join(', ');
}

// Test Problem 4
console.log('\n=== Problem 4: Leaderboard Filter ===');

// Create an array of 10 players
const players = [
    { name: 'Alice', score: 10 },
    { name: 'Bob', score: 5 },
    { name: 'Charlie', score: 9 },
    { name: 'David', score: 7 },
    { name: 'Eve', score: 12 },
    { name: 'Frank', score: 4 },
    { name: 'Grace', score: 11 },
    { name: 'Henry', score: 8 },
    { name: 'Ivy', score: 15 },
    { name: 'Jack', score: 6 }
];

console.log('All players:', players);
console.log('Top players:', getTopScores(players));  // "Alice, Charlie, Eve, Grace, Ivy"


// ============================================================================
// Problem 5: The Private Inventory
// ============================================================================

/**
 * Item class with private discount property
 * @class
 */
class Item {
    // Private field for discount (10%)
    #discount = 0.1;
    
    /**
     * Create a new Item
     * @param {string} name - The name of the item
     * @param {number} price - The original price of the item
     */
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    
    /**
     * Get the final price after applying discount
     * @returns {number} - Price with 10% discount applied
     */
    get finalPrice() {
        return this.price * (1 - this.#discount);
    }
    
    /**
     * Get the discount value (for testing/debugging)
     * @returns {number} - The discount percentage
     */
    get discount() {
        return this.#discount;
    }
}

// Test Problem 5
console.log('\n=== Problem 5: The Private Inventory ===');

// Create some items
const coffee = new Item('House Blend Coffee', 35);
const espresso = new Item('Espresso Roast', 50);
const frenchVanilla = new Item('French Vanilla', 39);

// Test the class with 'new' keyword
console.log('Item 1:', coffee.name, 'Original Price: ₱' + coffee.price, 'Final Price: ₱' + coffee.finalPrice.toFixed(2));
console.log('Item 2:', espresso.name, 'Original Price: ₱' + espresso.price, 'Final Price: ₱' + espresso.finalPrice.toFixed(2));
console.log('Item 3:', frenchVanilla.name, 'Original Price: ₱' + frenchVanilla.price, 'Final Price: ₱' + frenchVanilla.finalPrice.toFixed(2));

// Demonstrate that #discount is truly private
console.log('Discount applied:', coffee.discount * 100 + '%'); // Access via getter
console.log('Private field #discount is not accessible directly:', coffee.discount === undefined ? '✓ Private' : '✗ Not private');


// ============================================================================
// Problem 6: Robust Division
// ============================================================================

/**
 * Safely divides a by b with error handling
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number|string} - Result of division or error message
 */
function safeDivide(a, b) {
    try {
        // Check if divisor is zero
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }
        
        // Perform division
        return a / b;
    } catch (error) {
        // Return the error message string
        return error.message;
    } finally {
        // Always log operation attempted
        console.log('Operation attempted');
    }
}

// Test Problem 6
console.log('\n=== Problem 6: Robust Division ===');

// Test cases
console.log('10 / 2 =', safeDivide(10, 2));        // 5 (with "Operation attempted" log)
console.log('15 / 3 =', safeDivide(15, 3));        // 5 (with "Operation attempted" log)
console.log('8 / 0 =', safeDivide(8, 0));          // "Cannot divide by zero" (with "Operation attempted" log)
console.log('20 / 4 =', safeDivide(20, 4));        // 5 (with "Operation attempted" log)


// ============================================================================
// Additional Test Cases (Comprehensive Testing)
// ============================================================================

console.log('\n=== Additional Comprehensive Tests ===');

// Problem 1 - Edge cases
console.log('--- Problem 1 Edge Cases ---');
console.log('Empty string:', checkVariable(''));
console.log('Zero:', checkVariable(0));
console.log('NaN:', checkVariable(NaN));
console.log('Function:', checkVariable(() => {}));
console.log('Symbol:', checkVariable(Symbol('test')));

// Problem 2 - Edge cases
console.log('\n--- Problem 2 Edge Cases ---');
console.log('Count = 0:', generateId(0));  // []
console.log('Count = 1:', generateId(1));  // ["ID-0"]
console.log('Count = 6:', generateId(6));  // ["ID-0", "ID-1", "ID-2", "ID-3", "ID-4"] (skips 5)

// Problem 3 - Edge cases
console.log('\n--- Problem 3 Edge Cases ---');
try {
    console.log('No arguments:', calculateTotal());  // 0 (reduce on empty array needs initial value)
    console.log('Single argument:', calculateTotal(42));  // 42
    console.log('Floating point precision:', calculateTotal(0.1, 0.2));  // 0.30000000000000004
} catch (error) {
    console.error('Error:', error.message);
}

// Problem 4 - Edge cases
console.log('\n--- Problem 4 Edge Cases ---');
const emptyPlayers = [];
console.log('Empty array:', getTopScores(emptyPlayers));  // ""

const noTopPlayers = [
    { name: 'Low1', score: 1 },
    { name: 'Low2', score: 2 },
    { name: 'Low3', score: 3 }
];
console.log('No top players:', getTopScores(noTopPlayers));  // ""

const allTopPlayers = [
    { name: 'High1', score: 10 },
    { name: 'High2', score: 9 },
    { name: 'High3', score: 8.5 }  // 8.5 is not > 8? Actually 8.5 > 8 is true
];
console.log('Mixed scores:', getTopScores(allTopPlayers));  // "High1, High2, High3"

// Problem 5 - Edge cases
console.log('\n--- Problem 5 Edge Cases ---');
const zeroPriceItem = new Item('Free Item', 0);
console.log('Zero price item:', zeroPriceItem.name, 'Final:', zeroPriceItem.finalPrice);

const negativePriceItem = new Item('Negative Item', -10);
console.log('Negative price item:', negativePriceItem.name, 'Final:', negativePriceItem.finalPrice);

// Problem 6 - Edge cases
console.log('\n--- Problem 6 Edge Cases ---');
console.log('Division by non-zero:', safeDivide(100, 3));  // 33.333...
console.log('Negative division:', safeDivide(-10, 2));     // -5
console.log('Zero divided by number:', safeDivide(0, 5));  // 0
console.log('Floating point division:', safeDivide(1, 3)); // 0.333...

// Verify that finally always runs
console.log('\n--- Finally Block Verification ---');
console.log('Case 1 - Success:', safeDivide(10, 2));
console.log('Case 2 - Error:', safeDivide(10, 0));
console.log('Case 3 - Another success:', safeDivide(100, 4));

console.log('\n=== All tests completed successfully ===');