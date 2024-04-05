const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mime = require('mime-types');

const router = express.Router();
const app = express();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const ext = mime.extension(file.mimetype);
    const newFileName = Date.now() + '.' + ext;
    cb(null, newFileName);
  }
});

const upload = multer({ storage: storage });

app.use(cors());

app.post('/upload', upload.array('images'), (req, res) => {
  console.log(req.files);

  res.status(200).send('Image uploaded successfully');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;