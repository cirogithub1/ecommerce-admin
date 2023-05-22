import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { getServerSession } from 'next-auth'

import connectMongo from '@/database/mongooseCon'
import User from '@/models/User'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_CALETA,
    }),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CALETA
		}),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        connectMongo().catch((error) => {error:"Connection to Mongo failed...!"})

        // search in Mongo for the user
        const user = await User.findOne({email:credentials.email})
        if (!user) {throw new Error("No user found...")}
        const checkPwd = await compare(credentials.password, user.password)
        if (!checkPwd || user.email !== credentials.email) {
          console.log("User doesn't match..., checkPwd =", checkPwd)
          throw new Error("User doesn't match...")
        }
        return user
      }
    })
    // ...add more providers here
  ],
  //in the command line: openssl rand -base64 32
  secret: process.env.NEXTAUTH_SECRET,
  // Not necessary for NextAuth.js v.2.5.X
  // pages: {
  //   signIn: "/",
  // },
}

export default NextAuth(authOptions)

export async function isAdminRequest(req, res) {
  // check the username from external client not logged
  const { headers } = await req
  // console.log("/api/auth/[...next] req =", headers)
  if (!process.env.ADMINEMAILS.includes(headers?.authorization) || headers?.credentials !== process.env.NEXT_PUBLIC_CREDENTIAL) {
    res.status(401)
    // res.end()
    throw 'Not logged, please go to /login'
    // return false
    // return res.redirect(307,`/login`)
  }

  // user from internal client url logged
  const session = await getServerSession(req, res, authOptions)
  if (!process.env.ADMINEMAILS.includes(session?.user?.email)) {
    res.status(401)
    // res.end()
    throw 'Not an admin trying access'
    // return false
    // return res.redirect(307,`/login`)
  }
}