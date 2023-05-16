import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"

function NewProduct() {
	return (
		<Layout>
			<ProductForm productInfo={''} action="create"/>
		</Layout>
	)
}

export default NewProduct