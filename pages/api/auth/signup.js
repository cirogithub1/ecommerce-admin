import { hash } from 'bcryptjs'

import connectMongo from '@/database/mongooseCon'
import Users from '@/models/User'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		connectMongo().catch(error => res.json({error: "Connection Failed"}))
		// console.log('pages/api/auth/signup.jsreq.body =', req.body)

		if (!req.body) return res.status(404).json({ error: "No data body...!"})
		const { username, email, password } = req.body

		// duplicated users ??
		const checkDuplicated = await Users.findOne({email})

		if (checkDuplicated) return res.status(422).json({message: "User already exists"})

		//create user with a hashed password
		const hashedPwd =  await hash(password, 12)
		Users.create(
			{username, email, password: hashedPwd},
			function (err, data) {
				if (err) return res.status(404).json({err})

				res.status(201).json({status:true, user:data})
			}
		)
	} else {
		console.log('req.method =',req.method)
		res.status(500).json({ message: "HTTP method not valid from auth/signup.js"})
	}
}

