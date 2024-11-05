import mongoose from "mongoose";
// Receipe Schema rules of datatypes
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price:{type: Number, required: true},
    pictures: [{ type: String }], 
    createdAt: { type: Date, default: Date.now }
});

//Exported model with the database Name
export default mongoose.model("Product", productSchema)
