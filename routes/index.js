import { notFound, handleError } from "../middlewares/error.js";
import products from "./products.js";
import auth from "./auth.js";
import shop from "./shop.js";
import orders from "./order.js";
const initialRoutes = (app) => {
  app.use("/products", products);
  app.use("/auth", auth);
  app.use("/orders", orders);
  app.use("/shop", shop);

  app.use(notFound);
  app.use(handleError);
};

export default initialRoutes;
