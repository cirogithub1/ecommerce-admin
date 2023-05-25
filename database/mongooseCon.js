import mongoose from "mongoose"
import Router from "next/router"

const connectMongo = async () => {
	try {
		const { connection } = await mongoose.connect( 
			process.env.NEXT_PUBLIC_MONGODB_URI
		)

		// 0 : disconnected, 1 : connected, 2 : connecting, 3 : disconecting 
		if (connection.readyState === 1) {
			console.log('database/conn.jsconnection.readyState =', connection.readyState)
			return Promise.resolve(true)
		}
	} catch (error) {
		Router.push('/login')
		return Promise.reject(error)
	}
}

export default connectMongo
