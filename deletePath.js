const fs = require('fs');
const path = require('path');

// קולט מהמשתמש את הניתוב מה CMD
const userPath = process.argv[2];

// יוצר ניתוב 
const fullPath = path.resolve(userPath);

// בודק אם הניתוב קיים
if (!fs.existsSync(fullPath)) {

    console.log('Path does not exist');

} else {
    // מביא מידע על הקובץ/תקייה
    const stat = fs.statSync(fullPath);

    // אם זה קובץ
    if (stat.isFile()) {

        fs.unlinkSync(fullPath);
        console.log('File deleted successfully');
    }

    // אם זו תקייה
    else if (stat.isDirectory()) {

        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log('Folder deleted successfully');
    }
}