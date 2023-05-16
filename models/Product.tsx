import mongoose, { model, models, Schema } from "mongoose"

const { ObjectId } = mongoose.Types

const ProductSchema = new Schema({
	name: {
		type: String, 
		required: true
	},
	description: String,
	price: {
		type: Number, 
		required: true
	},
	images: [String],
	category: {
		type: ObjectId,
		ref: "Category"
	},
	properties: {
		type: Object
	}
}, {
	timestamps: true
})

export const Product = models.Product || model('Product', ProductSchema)