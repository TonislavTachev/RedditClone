const Router = require("koa-router");
const {
  getThreads,
  getThread,
  createThread,
  updateThread,
  deleteThread,
} = require("../controllers/threadsControllers");

//assign base route
const router = new Router({
  prefix: "/threads",
});

//get all threads
router.get("/", (ctx) => {
  ctx.body = getThreads();
});

//get specific thread
router.get("/:id", (ctx) => {
  let threadId = ctx.params.id;
  ctx.body = getThread(threadId);
});

//create thread
router.post("/:userId", (ctx) => {
  let userId = ctx.params.userId;
  let threadBodyToCreate = ctx.request.body;
  ctx.body = createThread(userId, threadBodyToCreate);
});

//update thread
router.put("/:threadId", (ctx) => {
  let threadId = ctx.params.threadId;
  let threadDataToBeUpdated = ctx.request.body;

  ctx.body = updateThread(threadId, threadDataToBeUpdated);
});

//delete thread
router.delete("/:threadId", (ctx) => {
  let threadId = ctx.params.threadId;
  let ownerId = ctx.request.body.ownerId;
  ctx.body = deleteThread(threadId, ownerId);
});

module.exports = router;
