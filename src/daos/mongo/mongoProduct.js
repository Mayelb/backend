import { productsModel } from "./models/ProductsModel";

 export class mongoProducts{
    
    async getAll(){
        try{
            const all = await productsModel.find({});
            return all;
        } catch(err){
            throw new Error(err);
        }
    }

    async getOne (id){
        try{
            const one = await productsModel.findById(id);
            return one;
        }catch (err) {
            throw new Error(err);
        }
    }

    async create (doc){
        console.log (doc);
        try{
            const newDoc = await productsModel.create(doc);
            return newDoc;
        }catch (err){
            throw new Error(err);
        }
    }

    async update(id, doc){
        try{
            await productsModel.findByIdAndUpdate(id, doc);
            const docUpdate = await productsModel.findById(id);
            return docUpdate;
        }catch (err) {
            throw new Error(err);
        }
    }

    async delete(id) {
        try{
            const deleteDoc = await productsModel.findByIdAndDelete(id);
            return deleteDoc;
        }catch (err){
            throw new Error(err);
    }

 }

}

