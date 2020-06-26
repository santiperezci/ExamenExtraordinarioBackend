import "babel-polyfill";
const Mutation={
    addIngredientes:async(parent,args,ctx,info)=>{
        const{nombre,descripcionI} = args;
        const {client} = ctx;
        const db = client.db("ExamenExtraordinario");
        const collection = db.collection("ingredientes");

        if(await collection.findOne({nombre})){
            throw new Error(`El ingrediente ya existe`);
        }

        const result = await collection.insertOne({nombre,descripcionI});
        return{
            nombre,
            descripcionI,
            id: result.ops[0]._id
        };
    },
    addRecetas:async(parent,args,ctx,info)=>{
        const{titulo,descripcionR,pasos,ingredientes} = args;
        const {client} = ctx;
        const db = client.db("ExamenExtraordinario");
        const collection = db.collection("recetas");

        if(await collection.findOne({titulo})){
            throw new Error(`La receta ya existe`);
        }

        const result = await collection.insertOne({titulo,descripcionR,pasos,ingredientes});

        return{
            titulo,
            descripcionR,
            pasos,
            ingredientes,
            id: result.ops[0]._id
        };
    }
}
export {Mutation as default};