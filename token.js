const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataFilePath = path.join(__dirname, '/json/tokens.json');
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
    return token;
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

function updatePhone(username, phone) {
    if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const tokens = JSON.parse(fileData);

        const user = tokens.find(token => token.username === username);
        if (user) {
            user.phone = phone;
            fs.writeFileSync(dataFilePath, JSON.stringify(tokens, null, 2), 'utf8');
            console.log(`Updated phone number for ${username}: ${phone}`);
        } else {
            console.log(`Username ${username} not found.`);
        }
    } else {
        console.log('No tokens found.');
    }
}

function updateEmail(username, email) {
    if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const tokens = JSON.parse(fileData);

        const user = tokens.find(token => token.username === username);
        if (user) {
            user.email = email;
            fs.writeFileSync(dataFilePath, JSON.stringify(tokens, null, 2), 'utf8');
            console.log(`Updated email for ${username}: ${email}`);
        } else {
            console.log(`Username ${username} not found.`);
        }
    } else {
        console.log('No tokens found.');
    }
}

function searchUser(criteria, value) {
    if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const tokens = JSON.parse(fileData);

        let user;
        switch (criteria) {
            case 'u':
                user = tokens.find(token => token.username === value);
                break;
            case 'p':
                user = tokens.find(token => token.phone === value);
                break;
            case 'e':
                user = tokens.find(token => token.email === value);
                break;
            default:
                console.log('Invalid search criteria. Use u (username), p (phone), or e (email).');
                return;
        }

        if (user) {
            console.log(`Found user: Username: ${user.username}, Token: ${user.token}, Email: ${user.email || 'N/A'}, Phone: ${user.phone || 'N/A'}`);
        } else {
            console.log(`No user found with ${criteria === 'u' ? 'username' : criteria === 'p' ? 'phone' : 'email'}: ${value}`);
        }
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
  
    switch (myArgs[1]) {
        case '--count':
            if(DEBUG) console.log('--count');
            displayTokens();
            break;
        case '--new':
            if(DEBUG) console.log('--new');
            if (myArgs[1]) {
                newToken(myArgs[2]);
            } else {
                console.log('Please provide a username with --new <username>');
            }
            break;
        case '--list':
            if(DEBUG) console.log('--list');
            listTokens();
            break;
        case '--upd':
            if(DEBUG) console.log('upd');
            if (myArgs[2] === 'p' && myArgs[3] && myArgs[4]) {
                updatePhone(myArgs[3], myArgs[4]);
            } else if (myArgs[2] === 'e' && myArgs[3] && myArgs[4]) {
                updateEmail(myArgs[3], myArgs[4]);
            } else {
                console.log('Usage: myapp token upd -p <username> <phone number> OR myapp token upd -e <username> <email>');
            }
            break;
        case '--search':
            if(DEBUG) console.log('--search');
            if (myArgs[2] && myArgs[3]) {
                searchUser(myArgs[2], myArgs[3]);
            } else {
                console.log('Usage: myapp token --search u <username> OR myapp token --search p <phone> OR myapp token --search e <email>');
            }
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
    newToken
}