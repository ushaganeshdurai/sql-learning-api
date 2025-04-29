import express from 'express';
import { connectDB } from './db/db.js';
import { seedDefaultData } from './utils/seed.js';
import { studentRouter } from './routes/student.js';
import { serveSwagger } from './lib/swagger.js';

export async function startServer(port) {
  const app = express();
  app.use(express.json());

  try {
    console.log("🔗 Starting server...");
    const db = await connectDB();       
    console.log('🔗 Database connected!');

    await seedDefaultData(db);
    console.log('💾 Default data seeded!');

    // Attach db to every request
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/students', studentRouter);
    serveSwagger(app);

    app.listen(port, () => {
      console.log(`🚀 SQL API ready at http://localhost:${port}`);
      console.log(`📚 Swagger at http://localhost:${port}/docs`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
    process.exit(1); // Exits if there's any error in the server setup
  }
}

startServer(8000);