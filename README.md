# multi-image-compressor-js
An image compressor module using sharp js that can compress single or multiple images. This compressor returns multiple images resized to small, medium, and large. Compressing a single image also returns a "tiny" variant, along with the small, medium and large images.

## Dependencies

- Sharp JS must be installed before using this module.


## Methods
  
### Compress Single
Accepts a request object with an image file inside, returns an array of objects which contain the same image in their original, large, medium, small, and tiny sizes. The objects inside the array contain the file information such as the file name, buffer, and sizes.
```javascript
compressSingle(req,res,next)
```

#### __NOTE:__ Please pass a request object and NOT req.file/s, the file buffer, or a file object. An alternative is that you can create an object with a "file:" inside and pass that instead.
```javascript
{
  file:{
    buffer: ...
    ...
  }
}
```
