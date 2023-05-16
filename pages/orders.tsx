import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import axios from 'axios'

import Layout from '@/components/Layout'

export default function OrdersPage() {
	const { data: session } = useSession()

	const [orders, setOrders] = useState([])

	useEffect(() => {
		async function getOders() {
			await axios({
				method: 'get',
				url: "/api/orders",
				headers: {
					'Authorization': `${session?.user?.email}`}
			})
			.then(resp => {
				console.log(resp.data)
				
				setOrders(resp.data)
			})
		}
		getOders()
	}, [])

  return (
    <Layout>
      <h1>Orders</h1>

			<table className="basic">
				<thead>
					<tr>
						<th>DATE</th>
						<th>STATUS</th>
						<th>RECIPIENT</th>
						<th>PRODUCTS</th>

					</tr>
				</thead>

				{orders.length > 0
				?
					<tbody>
						{orders.map((order: any) => (
							<>
								{order.email
								?
									<tr key={order._id}>
										<td>
											{new Date(order.createdAt).toLocaleString()}
											{/* {order.createdAt.split('T')[0]} / {order.createdAt.split('T')[1].split('.')[0]} */}
										</td>

										<td className={`Status ${order.paid ? 'text-green-500' : 'text-red-500'}`}>
											{order.paid ? 'Paid' : 'Not paid'}
										</td>

										<td>
											{order.name}{order.email}<br/>
											{order.address}{order.city}{order.poBox}<br/>
											{order.country}
										</td>

										<td>
											{order.line_items.map((item:any) => (
												<>
													{item.price_data.product_data.name} x {item.quantity} <br/>
												</>
											))}
										</td>

									</tr>
								: ""}
							</>
						))}
					</tbody>
				: ""}
			</table>
    </Layout>
  )
} 