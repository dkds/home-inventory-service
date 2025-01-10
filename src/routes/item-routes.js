const router = require('express').Router();
const { status, response, listResponse } = require('../dto/response');
const { itemCreateSchema, itemListSchema } = require('../dto/item');
const {
  createItem,
  listItems,
  getItem,
  updateItem,
  deleteItem,
} = require('../services/item-service');
const { validateBody, validateQuery } = require('../util/request-validator');
const { listItemImages, createImage } = require('../services/image-service');
const upload = require('../util/file-upload');

/* POST create item. */
router.post('/', validateBody(itemCreateSchema), async (req, res) => {
  const item = req.body;
  const createdItem = await createItem(item);
  res.status(status.CREATED).json(response(createdItem));
});

/* PUT update item. */
router.put('/:itemId', validateBody(itemCreateSchema), async (req, res) => {
  const itemId = req.params.itemId;
  const item = req.body;
  const updatedItem = await updateItem(itemId, item);
  res.status(status.OK).json(response(updatedItem));
});

/* GET get item by id. */
router.get('/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const item = await getItem(itemId);
  res.status(status.OK).json(response(item));
});

/* DELETE delete item by id. */
router.delete('/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  await deleteItem(itemId);
  res.status(status.NO_CONTENT).json(response(null));
});

/* POST upload image. */
router.post('/:itemId/images', upload.array('images', 5), async (req, res) => {
  const itemId = req.params.itemId;
  const images = await Promise.all(
    req.files.map((file) => createImage(file.filename, itemId)),
  );
  res.status(status.CREATED).json(response(images));
});

/* GET item images listing. */
router.get(
  '/:itemId/images',
  validateQuery(itemListSchema),
  async (req, res) => {
    const itemId = req.params.itemId;
    const { filter, sort_by, sort_order, offset, limit } = req.query || {};
    const items = await listItemImages(
      itemId,
      filter,
      sort_by,
      sort_order,
      offset,
      limit,
    );
    res
      .status(status.OK)
      .json(
        listResponse(items, { filter, sort_by, sort_order, offset, limit }),
      );
  },
);

/* GET items listing. */
router.get('/', validateQuery(itemListSchema), async (req, res) => {
  const { container_id, filter, sort_by, sort_order, offset, limit } =
    req.query || {};
  const items = await listItems(
    container_id,
    filter,
    sort_by,
    sort_order,
    offset,
    limit,
  );
  res
    .status(status.OK)
    .json(listResponse(items, { filter, sort_by, sort_order, offset, limit }));
});

module.exports = router;
