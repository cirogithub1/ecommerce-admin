import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import axios from "axios"
import { LazyLoadImage } from "react-lazy-load-image-component"
// import Image from "next/image"
import Spinner from "./Spinner"
import { ReactSortable } from 'react-sortablejs'

import { useSession } from "next-auth/react"

interface ImageType {
  id: number
  name: string
}

const uploadIcon =
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
		<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
		</svg>

interface Info {
	productInfo:any, 
	action:string
}

function ProductForm({ 
	productInfo, 
	action } : Info) 
{
	const { data: session } = useSession()
	const { 
		_id,
		name: existingName,
		description: existingDescription,
		price: existingPrice,
		images: existingImages,
		category: existingCategory,
		properties: existingProperties
	} = productInfo

	const router = useRouter()
	
	const [name, setName] = useState(existingName || "")
	const [description, setDescription] = useState(existingDescription || "")
	const [price, setPrice] = useState(existingPrice || "")
	const [category, setCategory] = useState(existingCategory || "")
	const [prodProperties, setProdProperties] = useState<any>(existingProperties || {})

	const [images, setImages] = useState(existingImages || [])
	const [uploadingImage, setUploadingImage] = useState(false)

	const [goToProducts, setGoToProducts] = useState(false)
	const [formTitle, setFormTitle] = useState("")
	const [categoryList, setCategoryList] = useState([])

	// if there is any property I set the State for showing 
	const propertiesToFill = []
	if (categoryList[0] && category) {
		// console.log({categoryList, category})
		
		const selectedCategoryInfo = categoryList.find(({ _id }) => _id === category)
		// @ts-ignore
		if (selectedCategoryInfo && selectedCategoryInfo?.parent?.properties[0]) {
			// @ts-ignore
			propertiesToFill.push(...selectedCategoryInfo.parent.properties)	
		} else {
			// @ts-ignore
			if (selectedCategoryInfo && selectedCategoryInfo?.properties[0]) {
				// @ts-ignore
				propertiesToFill.push(...selectedCategoryInfo.properties)	
			}	
		}
		// @ts-ignore
		// selectedCategoryInfo && selectedCategoryInfo.parent.properties[0]  && 
			// @ts-ignore
			// propertiesToFill.push(...selectedCategoryInfo.parent.properties)
		// console.log({ propertiesToFill})
	}

	function setProductProps(producName:string, productValue:string) {
		setProdProperties((prev:any) => {
			const newProperties:any = {...prev}
			newProperties[producName] = productValue
			return newProperties
		})
	}
	
	async function saveProduct(e:any) {
		e.preventDefault()
		// console.log(nameRef.current.value, descriptionRef.current.value, priceRef.current.value)

		const data = { 
			name: name, 
			description: description, 
			price: price,
			images: images,
			category: category,
			properties: prodProperties
		}

		try {
			if (action === "create") {
				await axios({
					method: 'post',
					url: `/api/products`,
					headers: {
						'Authorization': `${session?.user?.email}`
					},
					data
				})
				// .then(resp => {
					// setProductInfo(resp.data)})
				// const res = await axios.post('/api/products', data)
				// console.log("response fromn create =", res)
			}
			if (action === "edit") {
				await axios({
					method: 'put',
					url: `/api/products`,
					headers: {
						'Authorization': `${session?.user?.email}`
					},
					data: {...data, _id}
				})
				// .then(resp => {
					// setProductInfo(resp.data)})
				// const res = await axios.put('/api/products', {...data, _id})
				// console.log("response fromn edit =", res)
			}
			if (action === "delete") {
				await axios({
					method: 'delete',
					url: `/api/products?id=${_id}`,
					headers: {
						'Authorization': `${session?.user?.email}`
					}
				})
				// .then(resp => {
					// setProductInfo(resp.data)})
				// const res = await axios.delete('/api/products?id=' + _id)
				// console.log("response fromn delete =", res)
			}
			
		} catch (error) {
			console.error("Error from axios =", error)
		}
		
		setGoToProducts(true)
	}
	
	if (goToProducts) {
		// erase actual action
		action = ''
		// github : CAN'T use next->redirect in layer "api". it's used for components layer
		// redirect("/products")
		router.push('/products')
	}

	async function uploadImages(e:any) {
		setUploadingImage(true)
		const files = e.target?.files

		if (files?.length > 0) {
			const data = new FormData()
			for (const file of files) {
				data.append('file', file)
			}
			
			const res = await axios.post('/api/upload', data)
			// const res = await fetch('/api/upload', {
			// 	method: 'POST',
			// 	body: data
			// })
			setImages([...images, ...res.data.links])
			setUploadingImage(false)
		}
	}

	useEffect(() => {

		if (action === 'create') setFormTitle("New Product")
		if (action === 'edit') setFormTitle("Edit Product")
		if (action === 'delete') setFormTitle("Do u really wanna delete this Product")

	}, [action])

	useEffect(() => {
		async	function getCategories() {
			await axios.get('/api/categories').then((res:any) => {
				setCategoryList(res.data)
			})
		}

		getCategories()
	}, [])

	// ++++++++++++++++++              =======              ++++++++++++++++++++++++
	return (
		<form onSubmit={saveProduct}>
			<h1 className={`title ${action === "delete" && "text-red-600"}`}>{formTitle}</h1>
			
			<label htmlFor="">Product Name</label>
			<input 
				type="text" 
				placeholder="product name" 
				value={name} 
				onChange={(e) => setName(e.target.value)}/>

			<label>Category</label>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}>

				{categoryList[0] && categoryList.map((categoryItem:any, index:number) => (
					<option 
						key={index}
						value={categoryItem._id}>
							{categoryItem.name}</option>
					))}
			</select>

			{propertiesToFill[0] && propertiesToFill.map((propertyI:any) => (
				<div className="flex gap-1">
					<div>
						{propertyI.name}</div>
					
						<select
							value={prodProperties[propertyI.name]}
							onChange={(e:any) => setProductProps(propertyI.name, e.target.value)}>
							{propertyI.values.map((valuesI:any) => (
								<option value={valuesI}>
									{valuesI}</option>
							))}
						</select>
				</div>				
			))}

			{action !== 'delete'
			? 
				<>
					<label>Photos</label>

					<div className="flex flex-wrap gap-1 mb-2">
						<ReactSortable
							className="flex flex-wrap gap-1 mb-2" 
							list={images} 
							setList={setImages}>
								{images?.length !== 0
								&& images.map((link:any) => (
									<div key={link} className="h-24 w-24 p-2 bg-white shadow-sm rounded-sm">
										<LazyLoadImage  
											className="rounded-md h-full w-auto" 
											width={100} height={100}
											src={link} 
											alt={link}></LazyLoadImage>
										{/* <Image
											loader={imageLoader}
											src={link}
											alt={link}
											width={100}
											height={100}/> */}
									</div>
								))}
						</ReactSortable>
						{uploadingImage && 
							<div className="flex h-24 items-center">
								<Spinner size="h-16 w-16" />
							</div> }

						<div className="">
							<label className="flex flex-col rounded-md items-center justify-center w-24 h-24 bg-gray-100 text-sm gap-1 text-gray-500 shadow-md cursor-pointer hover:bg-gray-300">
								{uploadIcon}Upload
								<input 
									type="file" 
									className="hidden" 
									disabled={uploadingImage ? true : false}
									onChange={uploadImages}/>
							</label>
						</div>
					</div>
				
				</>
			: ""
			}

			<label htmlFor="">Description</label>
			<textarea placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>	
			
			<label htmlFor="">Price</label>
			<input type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}/>

			{action === "delete"
			?
				<div className="flex gap-2 justify-center">
					<button 
						className="btn-delete" 
						onClick={saveProduct}>Yes</button>
					
					<button 
						className="btn-default animate-pulse" 
						onClick={() => setGoToProducts(true)}>NO</button>
				</div>
			:
				<button className="btn-primary" onClick={saveProduct}>Save</button>
			}
		</form>
	)
}

export default ProductForm