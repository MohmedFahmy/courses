const express = require('express');
const app = express();
const {body, validationResult}= require('express-validator');
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const courseId = +req.params.id;
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({msg: 'The course with the given ID was not found'});
  }
  res.send(course);
});

app.post('/api/courses',
    body('name').notEmpty().withMessage('Name is required').isString().isLength({min: 3}).withMessage('Name must be at least 3 characters long'), 
    body('price').notEmpty().isNumeric().withMessage('Price must be a number'),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    courses.push({id: courses.length + 1, ...req.body});
    res.status(201).json(courses);
});

const courses = [
{
    id: 1,
    name: 'course1',
    price: 100
},
{
    id: 2,
    name: 'course2',
    price: 200
},
{
    id: 3,
    name: 'course3',
    price: 300
}
];