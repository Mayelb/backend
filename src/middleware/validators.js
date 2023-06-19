import productManager from "../daos/fs/productManager";
const path = "/src/file/products.json"
const myProductManager = new productManager(path);



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

export {validateCode};
    