# multi-image-compressor-js
An image compressor module using sharp js that can compress single or multiple images. This compressor returns multiple images resized to small, medium, and large. Compressing a single image also returns a "tiny" variant, along with the small, medium and large images.

## Dependencies

- Sharp JS must be installed before using this module.
- Use Multer to upload the image to memory to get the buffer.

## Compress Single
Accepts a request object with an image file inside.

__The image file must contain the file's buffer for this to work.__


An array of objects which contain the same image in their large, medium, small, and tiny sizes is appended to the original request parameter. The objects inside the array contain the file information such as the file name, buffer, and sizes.

Uploading the file to memory using multer allows you to get the file's buffer.

When using express router:
```javascript
const imageCompressor = require('./image-compressor')
const multer = require('multer');

//upload to memory using multer
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).single('single-image')

router.post('/upload', async(req, res)=>{ 
  uploadToMemory(req,res, ()=>{
    //...
    imageCompressor.compressSingle(req,res,(err, files) =>{
    
      //do whatever you want...
      
    })
    //...
  })  
})

```

## Compress Multiple
Accepts a request object with an array of image files inside. 

__The image file must contain the file's buffer for this to work.__

An array of objects which contain the same set of images in their large, medium, small sizes is appended to the original request parameter. The objects inside the array contain the file information such as the file name, buffer, and sizes.

Uploading the file to memory using multer allows you to get the file's buffer.

When using express router:
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

