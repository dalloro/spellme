const fs = require('fs');
const content = fs.readFileSync('temp_laregione.html', 'utf8');

// Pattern: looks for JSON-like structure ending with "tokenScore"
// The snippet showed: ... "totti":5}},"tokenScore":"...
// So it ends with "tokenScore":"..."
// It seems to be part of a larger object.
// Let's search for "tokenScore" and look backwards for the start of the object.
// Or search for `data-` attributes.

const idx = content.indexOf('tokenScore');
console.log('Index of tokenScore:', idx);

if (idx > 0) {
    const startWindow = content.substring(Math.max(0, idx - 500), idx + 100);
    console.log('Context around tokenScore:', startWindow);

    // It seems to be inside a tag?
    // <div ... data-game='{...}'> ?
}

// Let's print all `data-` attributes that look like JSON
const matches = content.match(/data-[a-z]+='\{.*?\}/g);
if (matches) {
    console.log('Found data match!');
    console.log(matches[0].substring(0, 100) + '...');
} else {
    // Try double quotes
    const matches2 = content.match(/data-[a-z]+="\{.*?\}/g);
    if (matches2) {
        console.log('Found data match (double quotes)!');
        console.log(matches2[0].substring(0, 100) + '...');
    } else {
        console.log('No simple data attribute match.');
    }
}
