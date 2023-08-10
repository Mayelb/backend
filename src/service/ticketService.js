import mongoose from "mongoose";
import productsModel from "../daos/models/productsModel";
import ticketModel from "../daos/models/ticketModel";
import cartService from "../service/cartService";
const cartService = new cartService();

export class mongoTicket {
  async purchaseCart(idCart, allCart, user, userCartId) {
    try {
      if (!Array.isArray(allCart)) {
        return {
          status: 400,
          result: {
            status: "error",
            error: "the card must be a valid",
          },
        };
      }
      if (!cartList || cartList.length === 0) {
        return {
          status: 400,
          result: {
            status: "error",
            error: "the card list is empty",
          },
        };
      }

      if (!mongoose.Types.objectId.isValid(idCart)) {
        return {
          status: 400,
          result: {
            status: "error",
            error: "Invalid cart Id.",
          },
        };
      }

      if (idCart !== userCartId) {
        return {
          status: 400,
          result: {
            status: "error",
            error: "the cart id does not match the user's cart id",
          },
        };
      }
      const cartFinded = await cartModel.findOne({ _id: idCart });

      if (!cartFinded) {
        return {
          status: 400,
          result: {
            status: "error",
            error: "Cart not found",
          },
        };
      }

      for (let i = 0; i < allCart.length; i++) {
        const product = allCart[i];

        const productFinded = await productsModel.findOne({ _id: product.id });

        if (!productFinded) {
          return {
            status: 400,
            result: {
              status: "error",
              error: "Product not found.",
            },
          };
        }
        if (productFinded.stock >= product.quantity) {
          productFinded.stock -= product.quantity;
          await productFinded.save();
          return productFinded;
        }
      }

      const productsFinded = products.filter((product) => product !== null);

      const totalAmount = allCart.reduce((acc, product) => {
        const productFinded = productsFinded.find((p) =>
          p._id.equals(product.id)
        );
        if (productFinded) {
          acc += productFinded.price * product.quantity;
        }
        return acc;
      }, 0);

      const newOrder = {
        code: Math.floor(math.random() * 1000000),
        purchase_datatime: new Date(),
        amount: +totalAmount,
        purchase: user.email,
        id: product._id,
      };

      const orderCreated = await ticketModel.create(newOrder);

      if (productsFinded.length > 0) {
        await cartService.deleteProduct(
          idCart,
          productsFinded.map((product) => product._id)
        );

        await cartService.emptyCart(idCart);
      }

      return {
        status: 200,
        result: { status: "succes", 
        payload: orderCreated },
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        result: { status: "error", 
        msg: "internal server error",
         payload: {} },
      };
    }
  }
}
