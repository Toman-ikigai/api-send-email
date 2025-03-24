import { config } from "dotenv";
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";
import generateProductDetailsEmail from "./template";
import { EmailData } from "./entity";

config();
const api_key = process.env.API_SECRET_KEY_BREVO;
const emailserviceApi = process.env.SECRET_EMAIL;

const sendEmail = async (data: EmailData) => {
  if (!api_key || !emailserviceApi) {
    return {
      status: 500,
      message: "Error sending email",
      success: false,
    };
  }

  const transactionalEmailsApi = new TransactionalEmailsApi();

  transactionalEmailsApi.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    api_key
  );

  const { email } = data;

  const sender = {
    email: emailserviceApi,
    name: "Toman jido-ka ikigai",
  };

  try {
    const recivers = [
      { email, name: "Cliente" },
      { email: emailserviceApi, name: "Toman jido-ka ikigai" },
    ];

    await transactionalEmailsApi.sendTransacEmail({
      sender,
      to: recivers,
      subject: "Detalles de la compra",
      htmlContent: generateProductDetailsEmail(data),
    });

    return {
      status: 200,
      message: "Email sent successfully",
      success: true,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error sending email",
      success: false,
    };
  }
};

export { sendEmail };
