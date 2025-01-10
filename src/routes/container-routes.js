const router = require('express').Router();
const { status, response, listResponse } = require('../dto/response');
const {
  containerCreateSchema,
  containerListSchema,
} = require('../dto/container');
const {
  createContainer,
  listContainers,
  getContainer,
  updateContainer,
  deleteContainer,
  getContainerInfo,
} = require('../services/container-service');
const { validateBody, validateQuery } = require('../util/request-validator');
const { listContainerItems } = require('../services/item-service');

/* POST create container. */
router.post('/', validateBody(containerCreateSchema), async (req, res) => {
  const container = req.body;
  const createdContainer = await createContainer(container);
  res.status(status.CREATED).json(response(createdContainer));
});

/* PUT update container. */
router.put(
  '/:containerId',
  validateBody(containerCreateSchema),
  async (req, res) => {
    const containerId = req.params.containerId;
    const container = req.body;
    const updatedContainer = await updateContainer(containerId, container);
    res.status(status.OK).json(response(updatedContainer));
  },
);

/* GET get container by id. */
router.get('/:containerId', async (req, res) => {
  const containerId = req.params.containerId;
  const container = await getContainer(containerId);
  res.status(status.OK).json(response(container));
});

/* DELETE delete container by id. */
router.delete('/:containerId', async (req, res) => {
  const containerId = req.params.containerId;
  await deleteContainer(containerId);
  res.status(status.NO_CONTENT).json(response(null));
});

/* GET container items listing. */
router.get(
  '/:containerId/items',
  validateQuery(containerListSchema),
  async (req, res) => {
    const containerId = req.params.containerId;
    const { filter, sort_by, sort_order, offset, limit } = req.query || {};
    const items = await listContainerItems(
      containerId,
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

/* GET container info. */
router.get('/:containerId/info', async (req, res) => {
  const containerId = req.params.containerId;
  const container = await getContainerInfo(containerId);
  res.status(status.OK).json(response(container));
});

/* GET containers listing. */
router.get('/', validateQuery(containerListSchema), async (req, res) => {
  const { top_level, container, sort_by, sort_order, offset, limit } =
    req.query || {};
  const containers = await listContainers(
    top_level,
    container,
    sort_by,
    sort_order,
    offset,
    limit,
  );
  res.status(status.OK).json(
    listResponse(containers, {
      top_level,
      container,
      sort_by,
      sort_order,
      offset,
      limit,
    }),
  );
});

module.exports = router;
