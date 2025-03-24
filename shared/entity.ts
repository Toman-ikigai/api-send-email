interface ProductDetail {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface EmailData {
  email: string;
  detalles: ProductDetail[];
}

export { EmailData, ProductDetail };
