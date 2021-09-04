const Router = require("koa-router");
const {
  getCommentsForThread,
  createCommentForThread,
  updateCommentForThread,
  deleteCommentForThread,
} = require("../controllers/commentsController");

//assign base route
const router = new Router({
  prefix: "/comments",
});

router.get("/:threadId", (ctx) => {
  let threadId = ctx.params.threadId;
  ctx.body = getCommentsForThread(threadId);
});

router.post("/:threadId", (ctx) => {
  let threadId = ctx.params.threadId;
  let commentBody = ctx.request.body;
  ctx.body = createCommentForThread(threadId, commentBody);
});

router.put("/:threadId/:commentId", (ctx) => {
  let threadId = ctx.params.threadId;
  let commentId = ctx.params.commentId;
  let requestData = ctx.request.body;
  ctx.body = updateCommentForThread(threadId, commentId, requestData);
});

router.delete("/:threadId/:commentId", (ctx) => {
  let threadId = ctx.params.threadId;
  let commentId = ctx.params.commentId;
  let ownerIdOfComment = ctx.request.body;

  ctx.body = deleteCommentForThread(threadId, commentId, ownerIdOfComment);
});

module.exports = router;
