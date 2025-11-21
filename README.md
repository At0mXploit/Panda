# Panda

A simple Node.js CLI application that downloads Pokemon information from the PokeAPI based on user preferences.

## Synchronous (Blocking)
- Code executes line by line
- Each operation must finish before next one starts
- Simple but slow everything waits

## Asynchronous (Non-blocking)
- Code doesn't wait for slow operations
- Multiple things can happen "at the same time"
- Fast but complex uses callbacks, promises, async/await
## `async`
- Makes a function return a Promise automatically
- Basically means this function will pause
- Allows you to use await inside the function

```js
const promptForPokemon = async () => {
    // This function now automatically returns a Promise
};
```
## `await`
- Pauses execution until the Promise resolves
- Makes asynchronous code look synchronous

```js
return await inquirer.prompt({...});
// Wait for user input to finish before continuing
```
## Promise
- A "placeholder" for a future value
- Represents an operation that hasn't completed yet
- Has 3 states: pending → fulfilled or rejected

```js
// fetch() returns a Promise
const dataPromise = fetch('url'); // This is a Promise object
```
### Promise Methods

```js
// .then() and .catch()
fetch('url')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

## `return await`

- Waits for the Promise to resolve, then returns the actual value
- Without await, it would return the Promise itself

```js
// With await: returns the user's answer object
return await inquirer.prompt(...); // Returns { pokemon_name: 'pikachu' }

// Without await: returns the Promise (not the answer)
return inquirer.prompt(...); // Returns Promise { pending }
```
## `.then()` 
- Attaches a callback to a Promise
- Runs when the Promise is fulfilled (successful)
- Receives the resolved value as parameter

```js
// Without .then()
const promise = fetch('https://api.com/data');
// promise is just a pending Promise object

// With .then()
fetch('https://api.com/data')
    .then(response => {
        // This runs WHEN the fetch completes
        console.log(response);
    });
```
## Callback Functions

```js
// Function passed as argument, called when operation completes
setTimeout(() => {
    console.log("This runs later");
}, 1000);
```
## Error Handling

```js
// Try/catch for async errors
try {
    const data = await fetch('url');
} catch (error) {
    console.error('Failed:', error);
}
```
