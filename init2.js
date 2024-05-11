const WDB_API = 'https://api-bot.mhqb365.com';
const CASINO_GAME = 'wolf-dice';

// Predefined settings
window.WDB_ENV = 'production';
window.WDB_MODE = 'stable';
window.WDB_VERSION = 2023;

// Simplified loading functions without license dependency
const wdbLoadJS = function (url) {
    return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.defer = true;
        scriptElement.src = url;
        scriptElement.onload = resolve;
        scriptElement.onerror = reject;
        document.head.appendChild(scriptElement);
    });
};

const wdbLoadCSS = function (url) {
    return new Promise((resolve, reject) => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.type = 'text/css';
        linkElement.href = url;
        linkElement.onload = resolve;
        linkElement.onerror = reject;
        document.head.appendChild(linkElement);
    });
};

async function init() {
    try {
        const jsUrl = `${WDB_API}/${WDB_MODE}/${CASINO_GAME}`;
        await wdbLoadJS(jsUrl);
        // Load CSS or other resources as needed
        console.log('Initialized successfully without license.');
    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

init();  // Start the initialization process
