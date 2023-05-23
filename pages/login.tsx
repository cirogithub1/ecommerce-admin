import Head from "next/head"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { useFormik } from "formik"
import { useRouter } from "next/router"

import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import { useRef, useState } from "react"

import login_validate from "@/lib/validate"
import IndexLayout from "@/components/IndexLayout"

export default function Login() {
	const [showPass, setShowPass] = useState(false)
	const inputPass:any = useRef()
	const router = useRouter()

	const formik = useFormik({
		initialValues: {
			email: '',
			password:''
		},
		validate: login_validate,
		onSubmit
	})

	interface User {
		email: string,
		password: string
	}

	async function onSubmit() {
		const { email, password }:User = formik.values
		const status:any = await signIn('credentials', {
			redirect: false,
			email: email,
			password: password,
			callbackUrl:"/"
		})
		
		if (status?.ok) {router.push(status.url)}
	}

	function handleGoogleSignin() {
		signIn('google', {callbackUrl:"http://localhost:3000"})}

	function handleGitHubSignin() {
		signIn('github', {callbackUrl:"http://localhost:3000"})}

	return (
		<IndexLayout>
			<Head>
				<title>Login</title>
			</Head>
			<section className="w-3/4 mx-auto flex flex-col gap-5 pb-4">
				<div className="title ">
					<h1 className="text-gray-800 text-4xl font-bold py-2">
						e-commerce
					</h1>
					<p className="w-3/4 mx-auto text-gray-400 text-sm">
						You are attempting to Log in to <br />
						your e-commerce account <br />
						Please enter your credentials <br />
						Keep your credentials always safe
					</p>
				</div>

				<form 
					className="flex flex-col gap-3 mx-auto"
					onSubmit={formik.handleSubmit}>
					<div className="input_group">
						<input
							className='input_text'
							type="email"
							placeholder="Email"
							name="email"
							onChange={formik.handleChange}
			        value={formik.values.email}
							/>
						<span className="icon flex items-center px-4">
							<HiAtSymbol size={25}/>
						</span>
					</div>
					{formik.errors.email && formik.touched.email && <span className="text-orange-500">{formik.errors.email}</span>}

					<div className="input_group">
						<input
							className="input_text"
							type={`${showPass ? "text" : "password"}`}
							ref={inputPass}
							placeholder="Password"
							name="password"
							onChange={formik.handleChange}
			        value={formik.values.password}
							/>
						<span 
							className="icon flex items-center px-4"
							onClick={() => {setShowPass(!showPass); inputPass.current.focus()}}>
							<HiFingerPrint size={25}/>
						</span>
					</div>
					{formik.errors.password && formik.touched.password && <span className="text-orange-500">{formik.errors.password}</span> }

					{/* bottom sign in */}
					{/* <div className="input_button button"> */}
						<button 
							className="input_button button" 
							type="submit"
							onClick={onSubmit}>
								Login
						</button>
					{/* </div> */}

					<div className="Google flex mt-4 justify-center">
						<button 
							className='custom_button' 
							type="button"
							onClick={handleGoogleSignin}>
								Sign in with Google   
								<Image 
									src={'/google-icon-logo-svgrepo-com.svg'} 
									width='23' 
									height='23' 
									alt='google-icon-logo-svgrepo-com.svg'>
								</Image>
						</button>
					</div>
					
					<div className="Github flex justify-center">
						<button 
							className='custom_button' 
							type="button"
							onClick={handleGitHubSignin}>
								Sign in with Github  
								<Image 
									src={'/github-mark.svg'} 
									width='25' 
									height='25' 
									alt='github-mark.svg'>
								</Image>
						</button>
					</div>
				</form>
				
				{/* bottom sign up*/}
				{/* <p className="text-center text-gray-400">
					Haven`t an account?  
					<br />
					<Link className="text-blue-800" href={'/register'}>Sign Up</Link>
				</p> */}
			</section>
		</IndexLayout>
	);
}
