const express = require('express');
const app = express();
const coursesRoutes = require('./routes/courses_routes');
app.use(express.json());

app.use('/api/courses',coursesRoutes);




app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 



