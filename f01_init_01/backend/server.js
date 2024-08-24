const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// ใช้ body-parser เพื่อจัดการกับข้อมูล POST
app.use(bodyParser.json());

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// กำหนด route ตัวอย่าง
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// เริ่มต้น server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
