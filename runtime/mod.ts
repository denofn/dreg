import { oak } from "./deps.ts";
import handleRegistryRequest from "./handleRegistryRequest.ts";

const app = new oak.Application();
const router = new oak.Router();

router.get("/package/:package", handleRegistryRequest);
router.get("/package/:package/:filePath", handleRegistryRequest);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
