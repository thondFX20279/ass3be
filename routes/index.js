import { notFound, handleError } from "../middlewares/error.js";

const initialRoutes = (app) => {
  app.get("/", (req, res, next) => {
    console.log("initial route");
    res.status(200).send({ success: true, data: "initialroute" });
    console.log("initial route");
  });
  app.use(notFound);
  app.use(handleError);
};

export default initialRoutes;
