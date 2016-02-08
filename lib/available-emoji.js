const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, "../src/emoji"), (err, files) => {
	const emoji = files.map(file => file.replace(".png", ""));
	fs.writeFile(path.join(__dirname, `../src/all-emoji.js`), `export default ${JSON.stringify(emoji, null, 4)}`);
});