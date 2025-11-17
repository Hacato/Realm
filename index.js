const fs = require('fs');
const WebSocket = require('ws');
const path = require('path');

// Load user config (so EDOPro updates don't overwrite your settings)
const configPath = path.join(__dirname, 'user_configs.json');

if (!fs.existsSync(configPath)) {
    console.error('Error: user_configs.json not found!');
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Ensure repositories folder exists for cloned cards
const repoDir = path.join(__dirname, 'repositories');
if (!fs.existsSync(repoDir)) fs.mkdirSync(repoDir);

// Create WebSocket server
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
    console.log('A player connected.');
    ws.send(JSON.stringify({ msg: 'Welcome to Realms (Realm-Of-Kings) server!' }));
});

// Load card repos defined in user_configs.json
config.repos.forEach(repo => {
    if (repo.should_read) {
        const repoPath = path.join(__dirname, repo.repo_path);
        console.log(`Loading card repo: ${repo.repo_name} from ${repoPath}`);
        // Optional: add card parsing logic if needed
    }
});

console.log(`Realms server running on port ${PORT}`);
