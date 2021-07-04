# multi-output-image-compressor-js
Compress an image/s into multiple sizes all at once. This image compressor returns multiple versions of an image resized to "tiny", "small", "medium", "large", and "larger" variants. 

### Download the code to see how it works or if you want to modify the Sharp JS parameters or the code itself

## Dependencies

- Sharp JS must be installed before using this module.
```npm
npm i sharp
```
- __Use Multer memory storage to upload the image to memory to get the file buffer.__
```npm
npm i multer
```

## Basic Usage

### __Compress Single__
```compressSingle()``` by default will return an array 4 resized versions of an image, namely tiny, small, medium, large  
```javascript
const imageCompressor = require('./image-compressor')

imageCompressor.compressSingle(file).then(compressedImages => {

   //do what you want with the compressed images
   
}).catch(err => {

   //handle your error here
   
})
```

### __Compress Multiple__
```compressMultiple()``` by default will return an array of 4 resized versions of EACH UPLOADED IMAGE, namely tiny, small, medium, large  
```javascript
const imageCompressor = require('./image-compressor')

imageCompressor.compressMultiple(files).then(compressedImages => {

   //do what you want with the compressed images
   
}).catch(err => {

   //handle your error here
   
})
```

### __When using with multer and express router:__

When using ```compressSingle()```:
```javascript
const imageCompressor = require('./image-compressor')
const multer = require('multer');

//upload to memory using multer
const memoryStorage = new multer.memoryStorage()
// assuming you appended 'single-image' to the formData that you sent to the server. Call this whatever you want before sending
const uploadToMemory = multer({storage:memoryStorage}).single('single-image') 

router.post('/upload', uploadToMemory, async(req, res)=>{ 
  imageCompressor.compressSingle(req.file).then(images => {
  
   //do whatever you want with the images
   
  }).catch(err => { 
  
   //handle your error
   
  }
})

```

When using ```compressMultiple()```
```javascript
const imageCompressor = require('./image-compressor')
const multer = require('multer');

//upload to memory using multer
const memoryStorage = new multer.memoryStorage()
// assuming you appended 'multiple-images' to the formData that you sent to the server. Call this whatever you want before sending
// you can set the '4' to as many as you want
const uploadToMemory = multer({storage:memoryStorage}).array('multiple-images', 4)

router.post('/upload', uploadToMemory, async(req, res)=>{ 
  imageCompressor.compressMultiple(req.files).then(images => { // notice that req.FILES is being passed instead of req.FILE
  
   //do whatever you want with the images
   
  }).catch(err => { 
  
   //handle your error
   
  }
})

```

### __Output__
An array of objects containing the following information(below) will be returned.
```javascript
[
   {
      fieldname: 'post-media',
      originalname: 'original name of the image.jpg',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: <Buffer ff d8 ff db 00 43 00 0a 07 07 08 07 06 0a 08 08 08 0b 0a 0a 0b 0e 18 10 0e 0d 0d 0e 1d 15 16 11 18 23 1f 25 24 22 1f 22 21 26 2b 37 2f 26 29 34 29 21 ... 3294 more bytes>,
      size: 3344,
      filename: 'fbb3f7d6a75e348dac3f6c738b9c5d0b_tiny.png'  
    },
    
    ... // small, medium, large and larger versions for each image uploaded also included depending on the range selected
 ]
```

## __Specifying the range of compression__
```compressSingle()``` and ```compressMultiple()``` has 2 extra parameters: ```smallestSize``` and ```largestSize```. By default, they are set to 0 and 4 respectively, which means the compressor will always output all 5 compressed versions (from "tiny" to "larger") for each uploaded image. If yow want to select the range of compression, you must specify the ```smallestSize``` and ```largestSize```

The compression levels are as follows:
|Level|   Size    |
| ---      | ---       |
| 0 | Tiny |
| 1 | Small |
| 2 | Medium |
| 3 | Large |
| 4 | Larger |

#### Example 1:
In the code example below using ```compressSingle()```, the smallest size is set to 1 and largest size is set to 3, hence the function will ONLY return the small, medium, and large variants of the image
```javascript
const imageCompressor = require('./image-compressor')

//setting the range to 1 and 3 returns the small, medium, and large compressed images
imageCompressor.compressSingle(file, 1, 3).then(compressedImages => {

   //do what you want with the compressed images
   
}).catch(err => {

   //handle your error here
   
})
```
#### Example 2:
In this example using ```compressMultiple()```,  the smallest and largest sizes are set to 0 and 2 respectively. In this case the function will return the Tiny, Small, and Medium variants of EACH IMAGE.
```javascript
const imageCompressor = require('./image-compressor')

//setting the range to 0 and 2 returns the tiny, small, and medium versions for each image uploaded
imageCompressor.compressMultiple(files, 0, 2).then(compressedImages => {

   //do what you want with the compressed images
   
}).catch(err => {

   //handle your error here
   
})
```

### __Compress images to either Tiny, Small, Medium, Large, Larger__
If you want to compress an image/s to a specific level and return only one output for each image, you can call either of the following functions:
```javascript
const imageCompressor = require('./image-compressor')

// compress single tiny
imageCompressor.compressSingleTiny(file)

// compress single small
imageCompressor.compressSingleSmall(file)

// compress single medium
imageCompressor.compressSingleMedium(file)

// compress single large
imageCompressor.compressSingleLarge(file)

// compress single larger
imageCompressor.compressSingleLarger(file)

// OR 

// compress multiple tiny
imageCompressor.compressMultipleTiny(files)

// compress multiple small
imageCompressor.compressMultipleSmall(files)

// compress multiple medium
imageCompressor.compressMultipleMedium(files)

// compress multiple large
imageCompressor.compressMultipleLarge(files)

// compress multiple larger
imageCompressor.compressMultipleLarger(files)

```
## __Creating a readable stream from the file buffer__
Before the file can be uploaded, the buffer must be converted into a readable stream. An easy way to do this is by using Streamifier
```
npm i streamifier
```
Once streamifier is installed, we can create a readable stream. The readable stream can be used to upload the files to a database or cloud storage platforms
```javascript
const streamifier = require('streamifier');
const imageCompressor = require('./image-compressor')
const multer = require('multer');

const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).single('single-image') 

router.post('/upload', uploadToMemory, async(req, res)=>{ 
  imageCompressor.compressSingle(req.file).then(images => {  
     
     const fileStreams = files.map(file => streamifier.createReadStream(file.buffer))
     
     fileStreams.forEach(fileReadStream => {
     
        //your logic to upload files
        
     })

  }).catch(err => { 
  
   //handle your error
   
  }
})

```

## __Additional Information__
SharpJS uses the ```.resize()``` function to specify the width/height and the ```.jpeg({quality: n })``` to specify the quality of the compressed image. The functions inside this JS file only specify the width when calling ```.resize()```. The height will automatically adjust based on the width.

The width and quality for each variant are as follows:
|Level|   Size (width) | Quality |
| ---  | ---  | ---  |
| Tiny | 60 | 70 |
| Small | 150 | 70 |
| Medium | 320 | 80 |
| Large | 800 | 90 |
| Larger | 1500 | 90 |

If the images width is smaller than any of these sizes, the image will still be resized. For example, if an image's size is only 800px and is ran through the ```compressSingleLarger()``` function, then the image will be enlarged up to 1500px. 

