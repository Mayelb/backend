import EErros from "../errors/enums";

export default (error, req, res, next) => {
    console.log(error.cause);
  
    switch (error.code) {
      case EErros.INVALID_USER_ERROR:
        res
          .status(400)
          .send({ status: "error", error: error.name, cause: error.cause });
        break;
        case EErros.CART_ERROR:
            res
              .status(400)
              .send({ status: "error", error: error.name, cause: error.cause });
            break;
          default:
            res.send({ status: "error", error: "Unhandled error" });
            break;
    }
  };