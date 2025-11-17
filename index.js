const fs = require('fs');
const WebSocket = require('ws');
const path = require('path');

// Load config
const configPath = path.join(__dirname, 'user_configs');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Create WebSocket server
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
    console.log('A player connected.');
    ws.send(JSON.stringify({ msg: 'Welcome to Realms (Realm-Of-Kings) server!' }));
});

// Load card repos (simplified)
config.repos.forEach(repo => {
    if (repo.should_read) {
        console.log(`Loading card repo: ${repo.repo_name} from ${repo.repo_path}`);
        // Optional: add logic here to parse card scripts if needed
    }
});

console.log(`Realms server running on port ${PORT}`);
