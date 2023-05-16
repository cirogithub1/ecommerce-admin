import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"
import Spinner from "@/components/Spinner"
import axios from "axios"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import { useSession } from "next-auth/react"

export default function EditProduct() {
	
	const { data: session } = useSession()

	const router = useRouter()
	const [productInfo, setProductInfo] = useState()
	const { productId }= router.query
	
	useEffect(() => {
		async function getProductId() {
			console.log("/products/edit/[]", session)
			
				await axios({
					method: 'get',
					url: `/api/products?id=${productId}`,
					headers: {
						'Authorization': `${session?.user?.email}`
						// here I pass a credential if session is not fully loaded while useEffect
						// 'Authorization': `${process.env.CREDENTIAL}`
					}})
				.then(resp => {
					setProductInfo(resp.data)
				})
	
				// await axios.get('/api/products?id=' + productId)
				// .then((resp:any) => {
				// 	setProductInfo(resp.data)
				// })				
			}
		getProductId()

	}, [productId, session])
	
	return (
		<Layout>
			{productInfo 
			? <ProductForm productInfo={productInfo} action="edit"/>
			: <Spinner size="h-20 w-20"/>}
		</Layout>

	)
}
