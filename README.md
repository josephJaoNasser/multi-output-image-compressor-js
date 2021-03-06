# multi-image-compressor-js
An image compressor module using sharp js that can compress single or multiple images. This compressor returns multiple images resized to small, medium, and large. Compressing a single image also returns a "tiny" variant, along with the small, medium and large images.

## Dependencies

- Sharp JS must be installed before using this module.

## Compress Single
Accepts a request object with an image file inside. The image file must contain the file's buffer for this to work

An array of objects which contain the same image in their large, medium, small, and tiny sizes is appended to the original request parameter. The objects inside the array contain the file information such as the file name, buffer, and sizes.
```javascript
const imageCompressor = require('./image-compressor')
const multer = require('multer');

//upload to memory using multer
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).single('profile-image')

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

#### __NOTE:__ Please pass a request object and NOT req.file, the file buffer, or a file object. An alternative is that you can create an object with a "file:" inside and pass that instead.
```javascript
//ALTERNATIVE METHOD

const anImageThatIwantToCompress = {
  file:{
    buffer: ...
    // other stuff that would typicaly be here...
  }
}

imageCompressor.compressSingle(anImageThatIwantToCompress,res,(err, files)=> {

  //do whatever you want...
  
})
```
__I haven't tried this method out since i've only been working on it using a REST API, so just let me know any suggestions on how to make it work if it doesn't work__

## Compress Multiple
Accepts a request object with an array of image files inside. The image file must contain the file's buffer for this to work.

An array of objects which contain the same set of images in their large, medium, small sizes is appended to the original request parameter. The objects inside the array contain the file information such as the file name, buffer, and sizes.
```javascript
const imageCompressor = require('./image-compressor')
const multer = require('multer');

//upload to memory using multer
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).single('profile-image')

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

#### __NOTE:__ Please pass a request object and NOT req.files, the file buffers, or a file object. An alternative is that you can create an array of objects with a "files:" inside and pass that instead.
```javascript
//ALTERNATIVE METHOD

const imagesThatIwantToCompress = {
  files:[
    {
      buffer: ...
      // other stuff that would typicaly be here...
    }
    {
      buffer: ...
      // other stuff that would typicaly be here...
    }
    ...
  ]
}

imageCompressor.compressMultiple(imagesThatIwantToCompress,res,(err, files)=> {

  //do whatever you want...
  
})
```
__I haven't tried this method out since i've only been working on it using a REST API, so just let me know any suggestions on how to make it work if it doesn't work__
