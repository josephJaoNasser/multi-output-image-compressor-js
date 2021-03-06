const sharp = require('sharp');

const compressSingle = async (req, res,next) => {
    
  let compressedFiles =[];
  let errors;
  
  if (!req.file){
      return res.status(400).json({
          msg: 'Please upload a profile image',
          field: 'profileImage'
      })
  };    
     
  let newFile = {...req.file};     
  const filenameLarge = req.file.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1')        
  await sharp(req.file.buffer)
      .resize(600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
          newFile.filename = filenameLarge
          newFile.buffer = output.data
          newFile.size = output.info.size
          compressedFiles.push(newFile)
      }).catch((err)=>{
          errors = err
      })

  newFile = {...req.file};      
  const filenameMedium = req.file.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')
  
  await sharp(req.file.buffer)
      .resize(320)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
          newFile.filename = filenameMedium
          newFile.buffer = output.data
          newFile.size = output.info.size
          compressedFiles.push(newFile)
      }).catch((err)=>{
          errors = err
      })
      
  newFile = {...req.file};   
  const filenameSmall = req.file.filename.replace(/(\.[\w\d_-]+)$/i, '_small$1') 
  
  await sharp(req.file.buffer)
      .resize(150)
      .toFormat("jpeg")
      .jpeg({ quality: 70 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
          newFile.filename = filenameSmall
          newFile.buffer = output.data
          newFile.size = output.info.size
          compressedFiles.push(newFile)
      }).catch((err)=>{
          errors = err
      })
 
  newFile = {...req.file};  
  const filenameTiny = req.file.filename.replace(/(\.[\w\d_-]+)$/i, '_tiny$1') 
  
  await sharp(req.file.buffer)
      .resize(60)
      .toFormat("jpeg")
      .jpeg({ quality: 70 })
      .toBuffer({resolveWithObject:true})
      .then((output)=>{
          newFile.filename = filenameTiny
          newFile.buffer = output.data
          newFile.size = output.info.size
          compressedFiles.push(newFile)
      }).catch((err)=>{
          errors = err
      })   

  compressedFiles = compressedFiles.concat(req.file)

  next(errors, compressedFiles)
};



const compressMultiple = async (req, res,next) => {
    
  let compressedFiles =[];
  let errors;
  
  if (!req.files){
      next()
  };    
     
  await Promise.all(    
      req.files.map(async file => {    
          let newFile = {...file};     
          const filenameLarge = file.filename.replace(/(\.[\w\d_-]+)$/i, '_large$1')
          
          await sharp(file.buffer)
              .resize(1500)
              .toFormat("jpeg")
              .jpeg({ quality: 90 })
              .toBuffer({resolveWithObject:true})
              .then((output)=>{
                  newFile.filename = filenameLarge
                  newFile.buffer = output.data
                  newFile.size = output.info.size
                  compressedFiles.push(newFile)
              }).catch((err)=>{
                  errors = err
              })
      })
  );

  await Promise.all(    
      req.files.map(async file => {    
          let newFile = {...file};     
          const filenameMedium = file.filename.replace(/(\.[\w\d_-]+)$/i, '_medium$1')
          
          await sharp(file.buffer)
              .resize(600)
              .toFormat("jpeg")
              .jpeg({ quality: 80 })
              .toBuffer({resolveWithObject:true})
              .then((output)=>{
                  newFile.filename = filenameMedium
                  newFile.buffer = output.data
                  newFile.size = output.info.size
                  compressedFiles.push(newFile)
              }).catch((err)=>{
                  errors = err
              })
      })
  );    

  await Promise.all(    
      req.files.map(async file => {    
          let newFile = {...file};
          const filenameSmall = file.filename.replace(/(\.[\w\d_-]+)$/i, '_small$1') 
          
          await sharp(file.buffer)
              .resize(400)
              .toFormat("jpeg")
              .jpeg({ quality: 70 })
              .toBuffer({resolveWithObject:true})
              .then((output)=>{
                  newFile.filename = filenameSmall
                  newFile.buffer = output.data
                  newFile.size = output.info.size
                  compressedFiles.push(newFile)
              }).catch((err)=>{
                  errors = err
              })     
      })
  );

  req.files = req.files.concat(compressedFiles)

  next(errors, req.files)
};

module.exports.compressSingle = compressSingle;
module.exports.compressMultiple = compressMultiple;