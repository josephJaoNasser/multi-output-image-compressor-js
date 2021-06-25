const sharp = require('sharp');

/*******************
   COMPRESS SINGLE
*******************/

//compress tiny
const compressSingleTiny = (file) => {
  return new Promise ((resolve, reject)=> {
    
    if(!file){
      return reject(console.error('No file attatched!'))
    }

    if(!file.buffer){
      return reject(console.error('The attatched file must contain its buffer. Try uploading the file to memory instead of storage.'))
    }

    if(Array.isArray(file)){
      file = file[0]
    }

    let newFile_tiny = {...file}
    newFile_tiny.filename = newFile_tiny.filename.replace(/(\.[\w\d_-]+)$/i, '_tiny$1') 
    
    sharp(file.buffer)
        .resize(60)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toBuffer({resolveWithObject:true})
        .then((output)=>{
          newFile_tiny.buffer = output.data
          newFile_tiny.size = output.info.size
          resolve(newFile_tiny)
        }).catch((err)=>{
            return reject(err)
        })   
  }) 
}

//compress small
const compressSingleSmall = (file) => {
  return new Promise((resolve, reject)=> {
    if(!file){
      return reject(console.error('No file attatched!'))
    }

    if(!file.buffer){
      return reject(console.error('The attatched file must contain its buffer. Try uploading the file to memory instead of storage.'))
    }

    if(Array.isArray(file)){
      file = file[0]
    }

    let newFile_small = {...file}
    newFile_small.filename = file.filename.replace(/(\.[\w\d_-]+)$/i, '_small$1') 
  
    sharp(file.buffer)
        .resize(150)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toBuffer({resolveWithObject:true})
        .then((output)=>{
          newFile_small.buffer = output.data
          newFile_small.size = output.info.size
          resolve(newFile_small)
        }).catch((err)=>{
          return reject(err)
        })
  })
}

// compress medium
const compressSingleMedium = (file) => {
  return new Promise((resolve, reject)=> {
    if(!file){
      return reject(console.error('No file attatched!'))
    }

    if(!file.buffer){
      return reject(console.error('The attatched file must contain its buffer. Try uploading the file to memory instead of storage.'))
    }

    if(Array.isArray(file)){
      file = file[0]
    }

    let newFile_medium = {...file}
    newFile_medium.filename = file.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')
  
    sharp(file.buffer)
      .resize(320)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
        newFile_medium.buffer = output.data
        newFile_medium.size = output.info.size
        resolve(newFile_medium)
      }).catch((err)=>{
        return reject(err)
      })
  })  
}

//compress large
const compressSingleLarge = (file) => {
  return new Promise((resolve, reject)=> {
    if(!file){
      return reject(console.error('No file attatched!'))
    }

    if(!file.buffer){
      return reject(console.error('The attatched file must contain its buffer. Try uploading the file to memory instead of storage.'))
    }

    if(Array.isArray(file)){
      file = file[0]
    }
    let newFile_large = {...file}
    newFile_large.filename = newFile_large.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1') 
    
    sharp(file.buffer)
      .resize(800)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
        newFile_large.buffer = output.data
        newFile_large.size = output.info.size
        resolve(newFile_large)
      }).catch((err)=>{
        return reject(err)
      })
  })
}

//compress large
const compressSingleLarger = (file) => {
  return new Promise((resolve, reject)=> {
    if(!file){
      return reject(console.error('No file attatched!'))
    }

    if(!file.buffer){
      return reject(console.error('The attatched file must contain its buffer. Try uploading the file to memory instead of storage.'))
    }

    if(Array.isArray(file)){
      file = file[0]
    }
    let newFile_larger = {...file}
    newFile_larger.filename = newFile_larger.filename.replace(/(\.[\w\d_-]+)$/i, '_larger$1') 
    
    sharp(file.buffer)
      .resize(1500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
        newFile_larger.buffer = output.data
        newFile_larger.size = output.info.size
        resolve(newFile_larger)
      }).catch((err)=>{
        return reject(err)
      })
  })
}

//compress multi-out
const compressSingle = (file, smallestSize = 0, largestSize = 4) => { 
  return new Promise((resolve, reject) => {
    const compressorArray = [
      compressSingleTiny,
      compressSingleSmall,
      compressSingleMedium,
      compressSingleLarge,
      compressSingleLarger
    ]
    
    if(!file){
      return reject(console.error('No file attatched!'))
    }

    if(!file.buffer){
      return reject(console.error('The attatched file must contain its buffer. Try uploading the file to memory instead of storage.'))
    }

    if(!Number.isInteger(smallestSize) || !Number.isInteger(largestSize)){
      return reject(console.error('Smallest/largest size must be an integer'))
    }

    if(smallestSize < 0){
      return reject(console.error('Smallest size cannot be less than 0'))
    }

    if(largestSize > compressorArray.length-1){
      return reject(console.error(`Highest compression level is ${compressorArray.length-1}`))
    }

    if(smallestSize > largestSize){
      return reject(console.error('Smallest size cannot be larger than largest size'))
    }

    if(Array.isArray(file)){
      file = file[0]
    }    

    Promise.all(compressorArray.slice(smallestSize,largestSize+1).map((comp)=> {      
      return comp(file)
    }))
    .then(compressedImages => resolve(compressedImages))
    .catch(err => reject(err))
  })
}

/*******************
   COMPRESS MULTIPLE
*******************/
//compress tiny
const compressMultipleTiny = (files) => {
  return new Promise((resolve, reject)=> {
    
    if(!files){
      return reject(console.error('No file attatched!'))
    }

    if(!Array.isArray(files)){
      return reject(console.error('Files must be uploaded as an array!'))
    }

    const compressorArray = files.map(file => compressSingleTiny(file))

    Promise.all(compressorArray)
    .then(compressedImages => resolve(compressedImages))
    .catch(err => reject(err))
  })
}

//compress small
const compressMultipleSmall = (files) => {
  return new Promise((resolve, reject)=> {
    
    if(!files){
      return reject(console.error('No file attatched!'))
    }

    if(!Array.isArray(files)){
      return reject(console.error('Files must be uploaded as an array!'))
    }
    
    const compressorArray = files.map(file => compressSingleSmall(file))

    Promise.all(compressorArray)
    .then(compressedImages => resolve(compressedImages))
    .catch(err => reject(err))
  })
}

//compress medium
const compressMultipleMedium = (files) => {
  return new Promise((resolve, reject)=> {
    
    if(!files){
      return reject(console.error('No file attatched!'))
    }

    if(!Array.isArray(files)){
      return reject(console.error('Files must be uploaded as an array!'))
    }    
    
    const compressorArray = files.map(file => compressSingleMedium(file))

    Promise.all(compressorArray)
    .then(compressedImages => resolve(compressedImages))
    .catch(err => reject(err))
  })
}

//compress large
const compressMultipleLarge = (files) => {
  return new Promise((resolve, reject)=> {
    
    if(!files){
      return reject(console.error('No file attatched!'))
    }

    if(!Array.isArray(files)){
      return reject(console.error('Files must be uploaded as an array!'))
    }
    
    const compressorArray = files.map(file => compressSingleLarge(file))

    Promise.all(compressorArray)
    .then(compressedImages => resolve(compressedImages))
    .catch(err => reject(err))
  })
}

//compress larger
const compressMultipleLarger = (files) => {
  return new Promise((resolve, reject)=> {    
    if(!files){
      return reject(console.error('No file attatched!'))
    }

    if(!Array.isArray(files)){
      return reject(console.error('Files must be uploaded as an array!'))
    }
    
    const compressorArray = files.map(file => compressSingleLarger(file))

    Promise.all(compressorArray)
    .then(compressedImages => resolve(compressedImages))
    .catch(err => reject(err))
  })
}

//compress all
const compressMultiple = (files, smallestSize = 0, largestSize = 4) => {
  return new Promise((resolve, reject) => {  
    
    const compressorQueue = files.map(file => compressSingle(file, smallestSize, largestSize))
   
    Promise.all(compressorQueue)
    .then(compressedImages => resolve(compressedImages.flat(1)))
    .catch(err => reject(err))
  })
}

module.exports = { 
  compressSingleTiny,
  compressSingleSmall,
  compressSingleMedium,
  compressSingleLarge,
  compressSingle,
  compressMultipleTiny,
  compressMultipleSmall,
  compressMultipleMedium,
  compressMultipleLarge,
  compressMultipleLarger,
  compressMultiple
}
