import { faker } from '@faker-js/faker';

export async function seedDefaultData(db) {
  await db.execute(`CREATE DATABASE IF NOT EXISTS sql_learning_db`)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      age INT,
      email VARCHAR(255),
      phone_number VARCHAR(255)
    )
  `);
   
  const [rows] = await db.execute('SELECT COUNT(*) as count FROM students');
  const count = rows[0].count;

  if (count >= 100) return; 

  const dummy = [];
  for (let i = count + 1; i <= 100; i++) {
    const name = faker.person.fullName();
    const age = faker.number.int({ min: 18, max: 27 });
    const email = faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] || '' });
    const phone_number = faker.phone.number('+91-##########'); 

    dummy.push([name, age, email, phone_number]);
  }

  await db.query('INSERT INTO students (name, age, email, phone_number) VALUES ?', [dummy]);
}
