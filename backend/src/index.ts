import App from "./app";
import IndexRoute from "./index/routes/index.route";
import { LLmChannel } from "./llm-chat/channel/llm.channel";

const app = new App([new IndexRoute()], [new LLmChannel()]);

app.listen();
