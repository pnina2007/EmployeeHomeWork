const Employee = require('./Employee');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const emp1 = new Employee('Shira', 21, 'Manager');
const emp2 = new Employee('Yossi', 31, 'Developer');
const emp3 = new Employee('Noa', 28, 'Designer');

 emp2.salary = 10000;
 
console.log(emp1);
console.log(emp2);
console.log(emp3);


fs.mkdirSync('EmployeeData', { recursive: true });     //אם התקייה כבר קיימת לא עושה כלום

    

//בצורה סינכרונית
fs.writeFileSync(
  path.join('EmployeeData', 'Shira.txt'),
  JSON.stringify(emp1)
);


 
//בצורה אסינכרונית עם CALLBACK
fs.writeFile(
  path.join('EmployeeData', 'Yossi.txt'),
  JSON.stringify(emp2),
  (err) => {
    if (err) console.log(err);
    else console.log('Yossi נשמר');
  }
);

//עם PROMISE גם אסינכרוני
const saveEmployeeAsync = (employee, fileName) => {
  return new Promise((resolve, reject) => {

    const data = JSON.stringify(employee);  //הופך את האובייקט למחרוזת

    fs.writeFile(path.join('EmployeeData', fileName), data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(fileName + ' saved');
      }
    });

  });
};

//השימוש בזה
saveEmployeeAsync(emp3, 'Noa.txt')
  .then(msg => console.log(msg))
  .catch(err => console.log('error:', err));

 