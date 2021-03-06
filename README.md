# multi-image-compressor-js
An image compressor module using sharp js that can compress single or multiple images. This compressor returns multiple images resized to small, medium, and large. Compressing a single image also returns a "tiny" variant, along with the small, medium and large images.

## Dependencies

- Sharp JS must be installed before using this module.


## Methods
  
### Compress Single
Accepts a request object with an image file inside, appends the array of objects which contain the same image in their large, medium, small, and tiny sizes to the original request parameter. The objects inside the array contain the file information such as the file name, buffer, and sizes.
```javascript
const imageCompressor = require('./image-compressor')

imageCompressor.compressSingle(req,res,next)
```

#### __NOTE:__ Please pass a request object and NOT req.file, the file buffer, or a file object. An alternative is that you can create an object with a "file:" inside and pass that instead.
```javascript
const anImageThatIwantToCompress = {
  file:{
    buffer: ...
    // other stuff that would typicaly be here...
  }
}

imageCompressor.compressSingle(anImageThatIwantToCompress,res,next)
```
__I haven't tried this method out since i've only been working on it using a REST API, so just let me know any suggestions on how to make it work if it doesn't work__

### Compress Multiple
Accepts a request object with an multiple image files inside, appends an array of objects which contain the same set of images in their large, medium, small sizes to the original request parameter. The objects inside the array contain the file information such as the file name, buffer, and sizes.
```javascript
const imageCompressor = require('./image-compressor')

imageCompressor.compressMultiple(req,res,next)
```

#### __NOTE:__ Please pass a request object and NOT req.files, the file buffers, or a file object. An alternative is that you can create an array of objects with a "files:" inside and pass that instead.
```javascript
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

imageCompressor.compressMultiple(imagesThatIwantToCompress,res,next)
```
__I haven't tried this method out since i've only been working on it using a REST API, so just let me know any suggestions on how to make it work if it doesn't work__
