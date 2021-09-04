const Router = require("koa-router");
const {
  getUser,
  createUser,
  updateUser,
  loginUser,
} = require("../controllers/userController");

const router = new Router({
  prefix: "/users",
});

router.post("/", (ctx) => {
  ctx.body = loginUser(ctx.request.body);
});

router.get("/:id", (ctx) => {
  ctx.body = getUser(ctx.params.id);
});

router.post("/register", (ctx) => {
  ctx.body = createUser(ctx.request.body);
});

router.put("/:user_id", (ctx) => {
  ctx.body = updateUser(ctx.params.user_id, ctx.request.body);
});

module.exports = router;
