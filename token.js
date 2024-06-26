const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataFilePath = path.join(__dirname, 'tokens.json');
const DEBUG = true;
const myArgs = process.argv.slice(2);

function newToken(username) {
    const token = uuidv4();
    const newEntry = { username, token };

    let tokens = [];
    
    if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        tokens = JSON.parse(fileData);
    }

    tokens.push(newEntry);

    fs.writeFileSync(dataFilePath, JSON.stringify(tokens, null, 2), 'utf8');

    console.log(`Generated token for ${username}: ${token}`);
}

function displayTokens() {
    if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const tokens = JSON.parse(fileData);
        console.log(`Total tokens: ${tokens.length}`);
    } else {
        console.log('No tokens found.');
    }
}

function listTokens() {
    if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const tokens = JSON.parse(fileData);
        tokens.forEach(token => {
            console.log(`Username: ${token.username}, Token: ${token.token}`);
        });
    } else {
        console.log('No tokens found.');
    }
}

function tokenApplication() {
    if(DEBUG) console.log('tokenApplication()');
  
    switch (myArgs[0]) {
        case '--count':
            if(DEBUG) console.log('--count');
            displayTokens();
            break;
        case '--new':
            if(DEBUG) console.log('--new');
            if (myArgs[1]) {
                newToken(myArgs[1]);
            } else {
                console.log('Please provide a username with --new <username>');
            }
            break;
        case '--list':
            if(DEBUG) console.log('--list');
            listTokens();
            break;
        case '--help':
        case '--h':
        default:
            fs.readFile(path.join(__dirname, 'usage.txt'), (error, data) => {
                if (error) throw error;
                console.log(data.toString());
            });
    }
}

module.exports = {
    tokenApplication,
}