// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@/models/Product'

import connectMongo from '@/database/mongooseCon'
import { isAdminRequest } from '../../pages/api/auth/[...nextauth]'
  
type Data = {
  name: string,
  description: string,
  price: number,
  image: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await isAdminRequest(req, res)
  
  const { method } = req
  console.log("/api/products: method =", method)
  
  await connectMongo()
  
  // console.log("req.query.id =", req.query.id)      
  if (method === "GET") {
    if (req.query.id) {
      const product = await Product.findOne({_id:req.query.id})
      res.json(product)
    } else {
      const allProducts = await Product.find()
      res.json(allProducts)
    }
  }

  if (method === 'POST') {
    const { name, description, price, images, category, properties } = req.body
    const productDoc = await Product.create({ name, description, price, images, category, properties })
    res.json(productDoc)
  }

  if (method === 'PUT') {
    const { _id, name, description, price, images, category, properties } = req.body
    const productDoc = await Product.updateOne({_id}, { name, description, price, images, category, properties })
    res.json(productDoc)
  }

  if (method === 'DELETE') {
    if (req.query.id) {
      const productDoc = await Product.deleteOne({_id:req.query.id}) 
      res.json(productDoc)
    }
  }
}
