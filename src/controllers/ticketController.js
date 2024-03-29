import ticketService from "../service/ticketService"
import usersDto from "../daos/DTO/usersDto";

class ticketController {

    purchaseCart = async (req, res ) => {
        const id = req.params.cid;
        const allCart = req.body;
        const dataUser = new usersDto(req.session);
        const response = await ticketService.purchaseCart(id, allCart, dataUser.email, dataUser.idCart);
        
        return res.status(response.status).json(response.result);
        };
        
        getTicketById = async (req, res) => {
            const id = req.params.cid;
            const response = await ticketService.getTicketById(id);
            return res.render("ticket",{ticket: response.result});
        }
        
}

export default ticketController;