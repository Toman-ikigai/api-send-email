import { EmailData } from "./entity";

const generateProductDetailsEmail = (data: EmailData): string => {
  const fecha_actual =
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

  let productosHTML = "";

  data.detalles.forEach((producto) => {
    productosHTML += `
          <div class="producto">
              <h3>${producto.name}</h3>
              <p><strong>ID:</strong> ${producto.id}</p>
              <p><strong>SKU:</strong> ${producto.sku}</p>
              <p><strong>Cantidad:</strong> ${producto.quantity}</p>
              <p class="precio"><strong>Precio:</strong> $${producto.price.toFixed(
                2
              )} USD</p>
              ${
                producto.image
                  ? `<p><a href="${producto.image}" class="btn"><span class="btn__text">Ver Imagen</span></a></p>`
                  : ""
              }
              <p><small>Fecha de solicitud: ${fecha_actual}</small></p>
          </div>`;
  });

  const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Detalles de Productos</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              .container {
                  background-color: #e6f2ff;
                  border: 1px solid #4682b4;
                  border-radius: 5px;
                  padding: 20px;
              }
              .logo {
                  max-width: 150px;
                  max-height: 100px;
                  display: block;
                  margin: 0 auto 20px;
              }
              h1 {
                  color: #0052cc;
                  text-align: center;
              }
              h2 {
                  color: #0052cc;
                  margin-top: 20px;
              }
              .producto {
                  background-color: #f9f9f9;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  padding: 15px;
                  margin-bottom: 15px;
              }
              .producto img {
                  max-width: 100px;
                  height: auto;
                  display: block;
                  margin: 10px 0;
              }
              .btn {
                  display: inline-block;
                  background-color: #0000cd;
                  color: black;
                  padding: 10px 20px;
                  border-radius: 5px;
                  margin-top: 20px;
                  text-decoration: none;
              }
              .btn__text {
                  color: #f0f8ff;
                  font-weight: bold;
              }
              .precio {
                  font-weight: bold;
                  color: #0052cc;
                  font-size: 1.1em;
              }
              .footer {
                  margin-top: 30px;
                  text-align: center;
                  font-size: 0.9em;
                  color: #666;
              }
              .ii a[href] {
                  color: #fff;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <img src="https://res.cloudinary.com/dvggwdqnj/image/upload/v1732138730/logos/acczzgeikyrwbxhup2cb.png" alt="Logo de Toman Jido-ka Ikigai" class="logo">
              <h1>Detalles de Productos Enviados</h1>
              <p>Estimado cliente,</p>
              <p>A continuación encontrará los detalles de los productos que ha solicitado:</p>
              ${productosHTML}
              <div class="footer">
                  <p>Gracias por su preferencia. Si tiene alguna pregunta sobre estos productos, no dude en contactarnos.</p>
                  <p>Saludos cordiales,<br>El equipo de Toman Jido-ka Ikigai</p>
              </div>
          </div>
      </body>
      </html>
    `;

  return htmlContent;
};

export default generateProductDetailsEmail;
