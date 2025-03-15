import App from "./app";
import IndexRoute from "./index/routes/index.route";

const app = new App([new IndexRoute()]);

app.listen();

export default app.getApp();
