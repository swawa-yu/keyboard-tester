const currentKeysElement = document.getElementById('current-keys');
const historyElement = document.getElementById('history');
let pressedKeys = new Set();
let history = [];
let currentKey = '';

document.addEventListener('keydown', (event) => {
    if (!pressedKeys.has(event.code)) {
        pressedKeys.add(event.code);
        currentKey = event.key;
        updateCurrentKeys();
        addToHistory(event.key, event.code, 'pressed');
        preventDefaultForSpecialKeys(event);
    }
});

document.addEventListener('keyup', (event) => {
    if (pressedKeys.has(event.code)) {
        pressedKeys.delete(event.code);
        currentKey = '';  // Key up event resets the current key
        updateCurrentKeys();
        addToHistory(event.key, event.code, 'released');
        preventDefaultForSpecialKeys(event);
    }
});

function updateCurrentKeys() {
    currentKeysElement.textContent = `Current Key: ${currentKey}, Codes: ${Array.from(pressedKeys).join(', ')}`;
}

function addToHistory(key, code, action) {
    history.unshift(`${key} (${code}) ${action}`);
    if (history.length > 50) {
        history.pop();
    }
    updateHistory();
}

function updateHistory() {
    historyElement.innerHTML = history.map(item => `<div>${item}</div>`).join('');
}

function preventDefaultForSpecialKeys(event) {
    if (event.key.startsWith('F') && event.key.length === 2) {
        event.preventDefault();
    } else if (['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) {
        event.preventDefault();
    }
}