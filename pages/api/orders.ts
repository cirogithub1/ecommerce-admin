import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/database/mongooseCon'
import { Order } from '@/models/Order'
import { isAdminRequest } from '../../pages/api/auth/[...nextauth]'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse 
) {
	// await isAdminRequest(req, res)
	
	await connectMongo()
	const { method } = req
	if (method === 'GET') {
		const orders = await Order.find({}).sort({ createdAt: -1 })
		res.json(orders)
	}
}