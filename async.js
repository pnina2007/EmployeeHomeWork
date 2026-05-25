const fs = require('fs');
const path = require('path');
const fs = require('fs').promises;

const dirPath = __dirname;

// קורא תיקייה בצורה אסינכרונית
fs.readdir(dirPath, (err, files) => {    //אם הצליח מקבל את מה שקרא
  if (err) {
    console.log(err);
    return;
  }
  let report = '';
  let count = 0;

  files.forEach((file) =>
     {
    if (file === 'report.txt') return;        //מדלג על הקובץ שאני יוצרת
    const fullPath = path.join(dirPath, file); //אני יוצרת ניתוב

    fs.stat(fullPath, (err, stat) => {         //אם זה קובץ
      if (err) {
        console.log(err);
        return;
      }

      const ext = path.extname(file);  //סיומת הקובץ

      fs.readFile(fullPath, 'utf8', (err, content) => {  //קורא תוכן הקובץ
        if (err) content = '';                           //אם יש בעיה משאיר ריק

        const updateInfo = `${stat.mtime.toLocaleString()} `;  //מביא את העידכון האחרון- התאריך

        report += `
        File Name: ${file}
        Type: ${ext}
        Updated: ${updateInfo}
        Content: ${content}
        -------------------------`;
        count++; //סופר כמה קבצים הכניס

        // אם הכניס את כלהקבצים זה אומר ששווה לאורך המערך-1
        if (count === files.length - 1) {
            //מכניסה   את התוכן לקובץ החדש
          fs.writeFile(path.join(dirPath, 'report.txt'), report,
            (err) => {
              if (err) console.log(err);
              else console.log('Async report created');
            }
          );
        }
      });
    });
  });
});

// קולט מהמשתמש
const userPath = process.argv[2];

const fullPath = path.resolve(userPath);

async function deletePath() {

    try {
        await fs.stat(fullPath); // אם לא מצליח זורק שגיאה- בודק אם קיים כזה ניתוב
        // מקבל מידע על הקובץ/תקייה
        const stat = await fs.stat(fullPath);
        if (stat.isFile()) 
          {
            await fs.unlink(fullPath);
            console.log('File deleted successfully');

        } else if (stat.isDirectory()) 
          {
            await fs.rm(fullPath, {recursive: true,force: true});
            console.log('Folder deleted successfully');
        }

    } catch (err) {

        console.log('Path not exist or there is error else');
    }
}

deletePath();