import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"
import Spinner from "@/components/Spinner"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function DeleteProduct() {
	const router = useRouter()
	const [productInfo, setProductInfo] = useState()
	const { productId } = router.query
	
	useEffect(() => {
		async function getProductId() {
			await axios.get('/api/products?id=' + productId)
			.then((resp:any) => {
				// console.log("response = ", resp.data)
				setProductInfo(resp.data)
			})
		}
		getProductId()

	}, [productId])
	
	return (
		<Layout>
			{productInfo 
			? <ProductForm productInfo={productInfo} action="delete"/>
			: <Spinner size="h-20 w-20"/>}
		</Layout>

	)
}
