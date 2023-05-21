import { useEffect, useRef, useState } from "react"
import axios from "axios"
// alert messages
import { withSwal } from 'react-sweetalert2'

import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner"

import { useSession } from "next-auth/react"

const editIcon = 
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
			<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
		</svg>

	const deleteIcon =
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
			<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
		</svg>

function Categories({ swal }:any) {
	const { data: session } = useSession()

	const categoryRef:any = useRef('')
	const parentRef:any = useRef('')
	const [categories, setCategories] = useState([])
	const [editedCategory, setEditedCategory] = useState("")
	const [properties, setProperties] = useState<any>([])

	async function saveCategories(e:any) {
		e.preventDefault()
		// console.log({ editedCategory })
		// console.log({properties})
				
		let data = {}
		if (editedCategory) {
			data = {
				name : categoryRef.current.value,
				parent: parentRef.current.value !=="" ? parentRef.current.value : undefined,
				properties: properties.map((itemProperty:any) => (
					{
						name: itemProperty.name,
						values: itemProperty.values.split(',') || ""
					})) || "",
				// @ts-ignore
				_id: editedCategory._id
			}
				
		// console.log({"axios.put ============": data})
		const res = await axios({
			method: 'put',
			url: '/api/categories',
			headers: {
				'Authorization': `${session?.user?.email}`,
				'Credentials': process.env.NEXT_PUBLIC_CREDENTIAL
			},
			data})
			
		} else {
			data = {
				name : categoryRef.current.value,
				parent: parentRef.current.value !=="" ? parentRef.current.value : undefined,
				properties: properties.map((itemProperty:any) => (
					{
						name: itemProperty.name,
						values: itemProperty.values.split(',') || ""
					})) || ""
			}

			// console.log({"axios.post ============": data})
			const res = await axios({
				method: 'post',
				url: '/api/categories',
				headers: {
					'Authorization': `${session?.user?.email}`,
					'Credentials': process.env.NEXT_PUBLIC_CREDENTIAL
				},
				data})
		}
		
		editCategory("")

		fetchCategories()
	}

	function editCategory(category:any) {
		console.log({ category })
		
		setEditedCategory(category)
		// use || "" cause the value shuold ne not null in the list
		categoryRef.current.value = category.name || ""
		// use ? for waiting the value to fully charge
		parentRef.current.value = category.parent?._id || "0"
		
		category && category.properties 
		?
			setProperties(
				category.properties.map(({name, values}:any) => (
					{
						name,
						values: values.join(',')
					}))
			)
		: setProperties([])
	}

	function deleteCategory(category:any) {
		swal.fire({
				title: `Are u sure to Delete ? `,
				text: `Category = ${category.name}`,
				showCancelButton: true,
				cancelButtonText: "Cancel",
				confirmButtonText: "Yes Delete",
				confirmButtonColor: "red",
				focusConfirm: false,
				reverseButtons: true
		}).then(async (result:any) => {
			// console.log({ result })
			if (result.isConfirmed) {
				const { _id } = category
				await axios({
					method: 'delete',
					url: '/api/categories?id=' + _id,
					headers: {
						'Authorization': `${session?.user?.email}`,
						'Credentials': process.env.NEXT_PUBLIC_CREDENTIAL
					}})
				fetchCategories()
			}
		}).catch((error:any) => {
			console.error(error)
		})
	}

	function propertyNameChange(property:any, index:number, newName:string) {
		setProperties((prev:any) => {
			const properties = [...prev]
			properties[index].name = newName

			return properties
		})
	}
	
	function propertyValueChange(index:number, newValues:string) {
		setProperties((prev:any) => {
			const properties = [...prev]
			properties[index].values = newValues

			return properties
		})
	}

	function addProperty() {
		setProperties((prev:any) => {
			return [...prev, {name:'', values:''}]
		})
	}

	function removeProperty(indexToRemove:number) {
		setProperties((prev:any) => {
			const newProperties = [...prev].filter((fProperty:any, pIndex) => {
				return pIndex !== indexToRemove
			})

			return newProperties
		})		
	}
	
	async function fetchCategories() {
		await axios({
			method: 'get',
			url: '/api/categories',
			headers: {
				'Authorization': `${session?.user?.email}`,
				'Credentials': process.env.NEXT_PUBLIC_CREDENTIAL
			}})
			.then(res => {
				setCategories(res.data)
			})
	}

	useEffect(() => {
		fetchCategories()
	}, [])
	
	return (
		<Layout>
			<h1>Categories</h1>

			<label>{editedCategory ? "Edit Category" : "New Category"} </label>

			<form className="Form" onSubmit={saveCategories}>
				<div className="flex gap-1">
					<input 
						ref={categoryRef} 
						type="text" 
						className="Input" 
						placeholder="Category name"/>

					<select 
						ref={parentRef}
						className="Select">
							{/* <option value="0">Main Category</option> */}

							{categories[0] && categories.map((category:any, index:number) => (
								<option 
									key={index}
									value={category._id}>
										{category.name}</option>
						))}
					</select>
				</div>

				<div className="Properties mb-2">
					<label className="block">
						Properties</label>

					<button 
						className="btn-default mb-2"
						type="button" // for preventing activate the form submit
						onClick={addProperty}>
							Add Property</button>
					
					{properties && properties.map((property:any, index:number) =>  (
						<div className="flex gap-1 mb-2">
							<input 
								className="mb-0"
								type="text" 
								placeholder="property name (ex: color)"
								value={property.name}
								onChange={(e) => propertyNameChange(property, index, e.target.value)}
								/>

							<input 
								className="mb-0"
								type="text" 
								placeholder="values, (comma separeted)"
								value={property.values}
								onChange={(e) => propertyValueChange(index, e.target.value)}
								/>
							
							<button 
								className="btn-default"
								type="button" // for preventing activate the form submit
								onClick={() => removeProperty(index)}>
									Remove
								</button>
						</div>
					))}

				</div>
				
				<div className="flex gap-1">
					{editedCategory &&
						<button 
							className="btn-default" 
							type="button"
							onClick={() => editCategory("")}>
								Cancel</button>
					}
						<button 
							className="btn-primary py-1" 
							type="submit">
								Save</button>
				</div>
				
			</form>
			
			{!editedCategory && (
				<>
					{categories[0]
					? 
						<table className="basic">
							<thead>
								<tr>
									<td>Category</td>
									<td>Parent Category</td>
									<td></td>
								</tr> 
							</thead>
		
							<tbody className="t_body">
								{categories.map((category:any , index:number) => (
									<tr key={index}>
										<td>{category.name}</td>
										<td>{category?.parent?.name}</td>
										<td>
											<button
												className="btn-primary btn-shape"
												onClick={() => editCategory(category)}>
												{editIcon}
												Edit</button>
											<button 
												className="btn-delete btn-shape"
												onClick={() => deleteCategory(category)}>
												{deleteIcon}
												Delete</button>
		
										</td>
									</tr>
								))}
							</tbody>
						</table>
					:
						<Spinner size="h-20 w-20"/>
					}
				</>
			)}


		</Layout>
	)
}

export default withSwal(({ swal }:{ swal:any }) => (
	<Categories swal={ swal } />
))