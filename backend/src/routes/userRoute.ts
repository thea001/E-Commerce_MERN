import express, { response } from "express";
import {
  getAll,
  getById,
  getMyOrders,
  login,
  register,
  update,
} from "../services/userService";
import validateJwt from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    response.status(statusCode).json(data);
  } catch {
    response.status(500).send("Something Went Wrong !");
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { statusCode, data } = await login({ email, password });
    response.status(statusCode).json(data);
  } catch {
    response.status(500).send("Something Went Wrong !");
  }
});

router.get(
  "/my-orders",
  validateJwt,
  async (request: ExtendRequest, response) => {
    try {
      const userId = request?.user?._id;
      const { statusCode, data } = await getMyOrders({ userId });
      response.status(statusCode).send(data);
    } catch (err) {
      response.status(500).send("Something went Wrong");
    }
  }
);

router.get("/all", validateJwt, async (request: ExtendRequest, response) => {
  try {
    const { statusCode, data } = await getAll();
    response.status(statusCode).send(data);
  } catch (err) {
    response.status(500).send("Something went Wrong");
  }
});

router.get(
  "/byId/:id",
  validateJwt,
  async (request: ExtendRequest, response) => {
    try {
      const { id } = request.params;
      const { statusCode, data } = await getById(id);
      response.status(statusCode).send(data);
    } catch (err) {
      response.status(500).send("Something went Wrong");
    }
  }
);

router.post("/update/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { statusCode, data } = await update(request.body, id);
    console.log(request.body);
    response.status(statusCode).json(data);
  } catch (error) {
    console.log(error);
    response.status(500).send("Something Went Wrong !");
  }
});

export default router;
