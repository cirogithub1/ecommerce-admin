import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/database/mongooseCon'
import { isAdminRequest } from '../../pages/api/auth/[...nextauth]'
import { Category } from '@/models/Category'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const isAdmin:any = await isAdminRequest(req, res) 
  // if (isAdmin === 0) {
  //   throw 'not an admin'
  // }
  await isAdminRequest(req, res) 

  const { method } = req
  // console.log("/api/categories: method =", method)
  
  await connectMongo()

	if (method === 'GET') {
		const categories:any = await Category.find().populate('parent')
		res.json(categories)
	}

	if (method === 'POST') {
    console.log({body: req.body})
    const { name, parent, properties } = req.body
    const categoryDoc = await Category.create({
			name, 
			parent,
      properties
		})
    
		res.json(categoryDoc)
  }

	if (method === 'PUT') {
    const { _id, name, parent, properties } = req.body
    const categoryDoc = await Category.updateOne(
      {_id}, 
      { 
        name, 
        parent,
        properties
      })

    res.json(categoryDoc)
  }
	
  if (method === 'DELETE') {
    // console.log('req.query.id ====', req.query.id)
    const categoryDoc = await Category.deleteOne({_id:req.query.id})
    res.json(categoryDoc)
  }
}