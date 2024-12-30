const router = require('express').Router();
const { status, response, errorBody } = require('../dto/response');
const { deleteImage } = require('../services/image-service');

/* GET get image by id. */
router.get('/:imageName', async (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, 'uploads', imageName);
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json(errorBody('Image not found'));
    }
  });
});

/* DELETE delete image by id. */
router.delete('/:imageId', async (req, res) => {
  const imageId = req.params.imageId;
  await deleteImage(imageId);
  res.status(status.NO_CONTENT).json(response(null));
});

module.exports = router;
