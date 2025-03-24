import express, { Request } from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./shared/sendEmail";

config();

const app = express();
const port = process.env.PORT || 4000;
const host = process.env.FRONTEND_URL || "http://localhost:3000";

const dominiosPermitidos = [host, "http://localhost:3000"];

const opciones = {
  origin: function (origin: any, callback: Function) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};

app.use(express.json());
app.use(cors(opciones));

app.post("/api/v1/send-email", async (req: Request, res) => {
  try {
    const data = req.body;

    const response = await sendEmail(data);
    if (!response.success) {
      res.status(response.status).json({ message: response.message });
      return;
    }

    res.json({ message: "Email enviado" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el email" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
});
