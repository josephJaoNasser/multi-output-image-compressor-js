# multi-output-image-compressor-js
Compress an image/s multiple times. This compressor returns multiple images resized to tiny, small, medium, large, and "larger". 

The codes below also show an example on how to upload to mongodb using gridfs stream

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

- _Optional: Use streamifier if you want to create a readable stream out of the file buffer_
```npm
npm i streamifier
```

## Usage

### __Compress Single__
compressSingle by default will return 4 resized versions of an image, namely tiny, small, medium, large  
```javascript
const imageCompressor = require('./image-compressor')

imageCompressor.compressSingle(file).then(compressedImages => {

   //do what you want with the compressed images
   
}).catch(err => {

   //handle your error here
   
})
```

### __Compress Multiple__
compressSingle by default will return 4 resized versions of EACH UPLOADED IMAGE, namely tiny, small, medium, large  
```javascript
const imageCompressor = require('./image-compressor')

imageCompressor.compressMultiple(files).then(compressedImages => {

   //do what you want with the compressed images
   
}).catch(err => {

   //handle your error here
   
})
```

### __Specifying the range of compression__
```compressSingle()``` and ```compressMultiple()``` has 2 extra parameters: smallestSize and largestSize. By default, they are set to 0 and 4, which means the compressor will return the sizes from "tiny" up to the "larger" sizes, and will always output all 5 versions for each uploaded image.

The compression levels are as follows:
|Level|   Size    |
| ---      | ---       |
| 0 | Tiny |
| 1 | Small |
| 2 | Medium |
| 3 | Large |
| 4 | Larger |

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

// compress single
imageCompressor.compressSingleTiny(file)

imageCompressor.compressSingleSmall(file)

imageCompressor.compressSingleMedium(file)

imageCompressor.compressSingleLarge(file)

imageCompressor.compressSingleLarger(file)

// OR 

// compress multiple
imageCompressor.compressMultipleTiny(file)

imageCompressor.compressMultipleSmall(file)

imageCompressor.compressMultipleMedium(file)

imageCompressor.compressMultipleLarge(file)

imageCompressor.compressMultipleLarger(file)

```

### __When using with express router:__
```javascript
const imageCompressor = require('./image-compressor')
const multer = require('multer');

//upload to memory using multer
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).single('single-image')

router.post('/upload', uploadToMemory, async(req, res)=>{ 
  imageCompressor.compressSingle(req.file).then(images => {
  
   //do whatever you want with the images
   
  }).catch(err => { 
  
   //handle your error
   
  }
})

```


