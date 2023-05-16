import type { NextApiRequest, NextApiResponse } from 'next'
import { mongooseConnect } from "@/lib/mongoose"
import { Order } from '@/models/Order'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) 
{
	await mongooseConnect()

	const orders = await Order.find({}).sort({ createdAt: -1 })

	res.status(200).json(orders)
}