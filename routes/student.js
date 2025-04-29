import express from 'express';
export const studentRouter = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     description: Returns a list of all students in the database
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   phone_number:
 *                     type: string
 */
studentRouter.get('/', async (req, res) => {
  try {
    const [rows] = await req.db.execute('SELECT * FROM students');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Insert a student
 *     description: Add a new student to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student inserted successfully
 */
studentRouter.post('/', async (req, res) => {
  const { name, age, email, phone_number } = req.body;
  try {
    await req.db.execute('INSERT INTO students (name, age, email, phone_number) VALUES (?, ?, ?, ?)', 
    [name, age, email, phone_number]);
    res.json({ message: 'Student inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error inserting student' });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     description: Update the details of an existing student
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the student to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 */
studentRouter.put('/:id', async (req, res) => {
  const { name, age, email, phone_number } = req.body;
  const { id } = req.params;

  try {
    await req.db.execute(
      'UPDATE students SET name=?, age=?, email=?, phone_number=? WHERE id=?',
      [name, age, email, phone_number, id]
    );
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating student' });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     description: Remove a student from the database
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the student to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */
studentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await req.db.execute('DELETE FROM students WHERE id=?', [id]);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student' });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     description: Fetch details of a specific student by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the student to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A student record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 phone_number:
 *                   type: string
 */
studentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await req.db.execute('SELECT * FROM students WHERE id=?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
});
