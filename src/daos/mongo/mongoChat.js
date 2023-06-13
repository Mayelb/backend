import { chatModel } from "./models/chatModel";

export class mongoProducts{
    
    async getAll(){
        try{
            const all = await chatModel.find({});
            return all;
        } catch(err){
            throw new Error(err);
        }
    }

    async getOne (id){
        try{
            const one = await chatModel.findById(id);
            return one;
        }catch (err) {
            throw new Error(err);
        }
    }

    async create (doc){
        console.log (doc);
        try{
            const newDoc = await chatModel.create(doc);
            return newDoc;
        }catch (err){
            throw new Error(err);
        }
    }

    async update(id, doc){
        try{
            await chatModel.findByIdAndUpdate(id, doc);
            const docUpdate = await chatModel.findById(id);
            return docUpdate;
        }catch (err) {
            throw new Error(err);
        }
    }

    async delete(id) {
        try{
            const deleteDoc = await chatModel.findByIdAndDelete(id);
            return deleteDoc;
        }catch (err){
            throw new Error(err);
    }

 }

}
