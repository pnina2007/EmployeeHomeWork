const fs = require('fs');
const path = require('path');

const dirPath = __dirname;   //ניתוב לתקיה הזאת

// קורא את כל הקבצים בתיקייה
const files = fs.readdirSync(dirPath);

let report = '';        // ישמור כל מה שאדפיס
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
  }
  const updateInfo = `${stat.mtime.toLocaleString()}`;

  report += `
File Name: ${file}
Type: ${ext}
Updated: ${updateInfo}
Content: ${content}
-------------------------
`;
}

// יצירת קובץ דוח
fs.writeFileSync(
  path.join(dirPath, 'report.txt'),report);

console.log('Sync report created');