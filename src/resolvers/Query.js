import "babel-polyfill";
import * as uuid from 'uuid';
const Query = {
    test:async(parent,args,ctx,info) => {
        return "hola";
    },
    listarIngredientes:async(parent,args,ctx,info) =>{
        const{titulo} = args;
        const {client} = ctx;

        const db = client.db("ExamenExtraordinario");
        const collection = db.collection("recetas");
        const collection2 = db.collection("ingredientes");

        if(!await collection.findOne({titulo})){
            throw new Error(`La receta no se ha encontrado`);
        }
        return await collection2.find().toArray();
    },
    listarRecetas:async(parent,args,ctx,info) =>{
        const{titulo} = args;
        const {client} = ctx;

        const db = client.db("ExamenExtraordinario");
        const collection = db.collection("recetas");
        

        if(!await collection.findOne({titulo})){
            throw new Error(`La receta no se ha encontrado`);
        }
        return await collection.find().toArray();
    },
    buscarRecetasId:async(parent,args,ctx,info) =>{
        const{idR} = args;
        const {client} = ctx;

        const db = client.db("ExamenExtraordinario");
        const collection = db.collection("recetas");

        if(!await collection.findOne({idR})){
            throw new Error(`La receta no se ha encontrado`);
        }
        return await collection.findOne({idR:ObjectID(idR)});
    },
    buscarRecetasArray:async(parent,args,ctx,info) =>{
        const{nombre} = args;
        const {client} = ctx;

        const db = client.db("ExamenExtraordinario");
        const collection = db.collection("recetas");
        const collection2 = db.collection("ingredientes");

        if(!await collection.findOne({nombre})){
            throw new Error(`El ingrediente no se ha encontrado`);
        }
        return await collection.find({nombre}).toArray();
    },
}
export {Query as default};