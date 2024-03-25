import express from 'express';
import multer from 'multer';
import cors from 'cors'



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, file.originalname + '-' + uniqueSuffix + ".jpg")
    }
  })


// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: storage })


const PORT = 3008
const app = express()
app.use(cors())

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    console.log(req.file)
    res.send("You reached the profile section") 
    // req.body will hold the text fields, if there were any
  })

  app.post('/profile/defined', upload.single('avatar'), (req, res, next) => {
    // req.file is the `avatar` file
    const { originalname } = req.file;

    console.log(req.file);

    // Send a message to the user indicating successful upload
    res.send("Image Successfully Uploaded: " + originalname);

    // Redirect after 
});

  
  app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
  
  const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
  app.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
  })

  app.listen(PORT, () => console.log(`App is listening on ${PORT}`))