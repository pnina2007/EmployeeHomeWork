const fs = require('fs');
const path = require('path');

const dirPath = __dirname;   //ניתוב לתקיה הזאת

// קורא את כל הקבצים בתיקייה
const files = fs.readdirSync(dirPath);

let report = '';        // ישמור כל מה שאדפיס
let isFile='';
//עובר קובץ קובץ
for (let file of files) 
 {

  // שלא יקרא את הקובץ עצמו
  if (file === 'report.txt') continue;

  const fullPath = path.join(dirPath, file);
  const stat = fs.statSync(fullPath); //הגדרת קובץ
  const ext = path.extname(file);  //סיומת הקובץ
  let content = '';

  if (stat.isFile()) //אם זה קובץ
  {
    content = fs.readFileSync(fullPath, 'utf8');
    isFile ='file'
  }
  else{
    isFile = 'Folder'
  }
  const updateInfo = `${stat.mtime.toLocaleString()}`;

  report += `
File Name: ${file}
Type: ${ext}
Updated: ${updateInfo}
Content: ${content}
isFile?: ${isFile}
-------------------------
`;
}

// יצירת קובץ דוח
fs.writeFileSync(
  path.join(dirPath, 'report.txt'),report);

console.log('Sync report created');

//סעיף 2
// קולט ניתוב מהמשתמש
const userPath = process.argv[2];

// יוצר ניתוב מלא
const fullPath = path.resolve(userPath);

// בודק אם הניתוב קיים
if (!fs.existsSync(fullPath)) {

    console.log('Path does not exist');
} else {

    const stat = fs.statSync(fullPath);
    // אם זה קובץ
    if (stat.isFile()) {

        fs.unlinkSync(fullPath);
        console.log('File deleted successfully');
    }

    // אם זו תקייה
    else if (stat.isDirectory()) {

        fs.rmSync(fullPath, {  recursive: true, force: true});
        console.log('Folder deleted successfully');
    }
}