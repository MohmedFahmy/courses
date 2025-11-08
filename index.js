const express = require('express');
const app = express();
const coursesRoutes = require('./routes/courses_routes');
const mongoose = require('mongoose');
const uri ='mongodb+srv://mohammedfahmy130_db_user:mohamedFahmy151@courses.b1vjarr.mongodb.net/?appName=courses';
mongoose.connect(uri)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());

app.use('/api/courses',coursesRoutes);




app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 



