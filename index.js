const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http_status_text = require('./utils/http_status_text');
const coursesRoutes = require('./routes/courses_routes');
const usersRoutes = require('./routes/user_routes');
const path = require('path');


const app = express();
const uri =process.env.MONGODB_URL;
mongoose.connect(uri)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use(cors()); 

app.use('/api/courses',coursesRoutes);
app.use('/api/users',usersRoutes);


// Serve static files from the "uploads" directory as profile images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Global Route Not Found Handler
app.use((req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found"
  });
});

//Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || http_status_text.ERROR,
    msg: err.message || 'Internal Server Error',
  
  });
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
}); 



