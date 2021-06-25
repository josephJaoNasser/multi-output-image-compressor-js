# multi-output-image-compressor-js
Compress an image/s multiple times. This compressor returns multiple images resized to tiny, small, medium, large, and "larger". 

The codes below also show an example on how to upload to mongodb using gridfs stream

### Download the code to see how it works or if you want to modify the Sharp JS parameters or the code itself

## Dependencies

- Sharp JS must be installed before using this module.
- Use Multer to upload the image to memory to get the buffer.
- Optional: Use streamifier if you want to create a readable stream out of the file buffer

## Usage
### __Compress Single__
```javascript
const imageCompressor = require('./image-compressor')

imageCompressor.compressSingle(fileBuffer).then(compressedImages => {
   //do what you want with the compressed images
}).catch(err => {
   //handle your error here
})
```

When using with express router:
```javascript
const imageCompressor = require('./image-compressor')
const multer = require('multer');

//upload to memory using multer
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).single('single-image')

router.post('/upload', uploadToMemory, async(req, res)=>{ 
  imageCompressor.compressMultiple(files).then(images => {
   //do whatever you want with the images
  }).catch(err => { //do what you want with the error }
})

```
Accepts a request object with an image file inside. DO NOT pass req.file as a parameter, use req instead.

__The image file object must contain the file's buffer for this to work.__

An array of objects which contain the same image in their large, medium, small, and tiny sizes is appended to the original request parameter. The objects inside the array contain the file information such as the file name, buffer, and sizes.

Uploading the file to memory using multer allows you to get the file's buffer.


### __Compress Multiple__
```javascript
const imageCompressor = require('./image-compressor')

imageCompressor.compressMultiple(req,res,(err, files)=> {
   //do whatever you want...
})
```

When using with express router:
```javascript
const imageCompressor = require('./image-compressor')
const multer = require('multer');

//upload to memory using multer
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).array('multiple-images', 10)

router.post('/upload', async(req, res)=>{ 
  uploadToMemory(req,res, ()=>{
    //...
    imageCompressor.compressMultiple(req,res, (err, files)=> {
    
      //do whatever you want...
      
    })
    //...
  })  
})

```
Accepts a request object with an array of image files inside. DO NOT pass req.file as a parameter, use req instead.

__The image file object must contain the file's buffer for this to work.__

An array of objects which contain the same set of images in their large, medium, small sizes is appended to the original request parameter. The objects inside the array contain the file information such as the file name, buffer, and sizes.

Uploading the file to memory using multer allows you to get the file's buffer.


## Sample code for uploading to mongodb with gridfs
The code sample below uploads all the compressed images (original, small, medium, large, tiny) to mongodb.

Obviously, you are free to upload the images wherever you want. It just so happens that the project I was working on is using mongodb
```javascript

```

