export default function login_validate(values:any) {
	const errors = {
		email: '', 
		password: ""
	}	

	if (!values.email) {
		errors.email = 'Required'
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		) {
			errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Required'
		} else if(values.password.length < 8) {
			errors.password = 'Must containts at least 8 characters '
			} else if (values.password.includes(" ")) {
				errors.password = "No spaces are allowed"
	}

	return errors
}

export function registerValidate(values:any) {
	const errors = {
		username:"",
		email:"",
		password:"",
		cPassword:""
	}

	if (!values.username) {
		errors.username = 'Required'
		} else if (values.username.includes(" ")) {
			errors.username = "No spaces are allowed"
	}

	if (!values.email) {
		errors.email = 'Required'
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		) {
			errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Required'
		} else if(values.password.length < 8) {
			errors.password = 'Must containts at least 8 characters '
			} else if (values.password.includes(" ")) {
				errors.password = "No spaces are allowed"
	}

	if (values.cPassword !== values.password) {
		errors.cPassword = 'PWD does not match...'
		} else if (values.cPassword.includes(" ")) {
			errors.cPassword = "No spaces are allowed"
	}

	return errors
}