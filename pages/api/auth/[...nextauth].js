import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

import { getServerSession } from 'next-auth'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CALETA,
    }),
		GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CALET,
		})
    // ...add more providers here
  ],
	adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session, user, trigger}) => {
      // console.log({session, user, trigger})
      if (process.env.ADMINEMAILS.includes(session?.user?.email)) {
        return session
      }
    },
    jwt({token, user}) {
      return {...token, ...user}
    }
  }
}
export default NextAuth(authOptions)

export async function isAdminRequest(req, res) {
  // check the username from external client not logged
  const { headers } = await req
  console.log("/api/auth/[...next] req =", headers?.authorization)
  if (!process.env.ADMINEMAILS.includes(headers?.authorization) && headers?.authorization ==! process.env.CREDENTIAL) {
    res.status(401)
    // res.end()
    throw 'not an admin'
    // return 0
  }

  // user from internal client url logged
  const session = await getServerSession(req, res, authOptions)
  if (!process.env.ADMINEMAILS.includes(session?.user?.email)) {
    res.status(401)
    // res.end()
    throw 'not an admin'
    // return 0
  }

}