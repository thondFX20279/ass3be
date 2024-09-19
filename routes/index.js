import { notFound, handleError } from "../middlewares/error.js";
import products from "./products.js";
const initialRoutes = (app) => {
  app.use("/products", products);
  app.use(notFound);
  app.use(handleError);
};

export default initialRoutes;
