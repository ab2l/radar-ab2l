import multer from 'multer';

import cloudinary from '../../cloudinary';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const upload128Pixels = [upload.single('picture'), (req, res) => {
  if (!req.file) {
    throw new Error('O arquivo que se deseja enviar não é válido.');
  }
  const { buffer } = req.file;
  cloudinary.v2.uploader.upload_stream({
    resource_type: 'image',
    access_mode: 'public',
  }, (error, result) => {
    if (error) res.status(500).json(error);
    else res.status(200).json(result);
  }).end(buffer);
}];

export default upload128Pixels;
export { upload128Pixels };
