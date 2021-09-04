const Koa = require("koa");
const KoaRouter = require("koa-router");
const cors = require("@koa/cors");
const app = new Koa();
const json = require("koa-json");
const threadRoutes = require("./routes/Threads");
const commentRoutes = require("./routes/Comments");
const userRoutes = require("./routes/Users");
const bodyParser = require("koa-bodyparser");
var jwt = require("koa-jwt");

app.use(cors());
app.use(json());
app.use(bodyParser());

//Router middleware
app.use(threadRoutes.routes()).use(threadRoutes.allowedMethods());
app.use(commentRoutes.routes()).use(commentRoutes.allowedMethods());
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.listen(3001, () => console.log("Server started"));
