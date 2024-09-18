import cors from "cors";

const corsOption = {
  origin: [process.env.FONTEND_URL, process.env.ADMIN_URL, "*"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const corsMiddleware = cors(corsOption);

export default corsMiddleware;
