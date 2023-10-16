import productManager from "../daos/helpers/productManager";
const path = "/src/file/products.json"
const myProductManager = new productManager(path);

const validateRequest = (req, res, next) => {
  const keysBody = Object.keys(req.body);

  const requiredKeys = [
    "title",
    "description",
    "code",
    "price",
    "stock",
    "category",
  ];
  const isValidRequest = requiredKeys.every((key) => keysBody.includes(key));
  if (!isValidRequest) {
    res.status(400).json({
      status: "error",
      payload: "Invalid request body. Missing Fields",
    });
    return;
  }
  next();
};


const validateCode =  async(req, res)=>{
    const {code} = req.body;
    const allProducts = await myProductManager.getProduct();
   const productCode = allProducts.some((p) => p.code === product.code);

   if(productCode){
    res.status(400).json({
        status: "error",
        payload: "Invalid request body. Code already exists: " + code,
      });
   }
   return;
};

export {validateCode, validateRequest};
    