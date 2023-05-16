import type { NextApiRequest, NextApiResponse } from 'next'
import multiparty from "multiparty"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import mime from 'mime-types'

import { isAdminRequest } from '../../pages/api/auth/[...nextauth]'

const s3AccessCleId:any = process.env.S3_ACCESS_CLE
const s3CaletaAccessCle:any = process.env.S3_CALETA_ACCESS_CLE
const bucketName:any = process.env.S3_BUCKET_NAME

export default async function handler(
	req: NextApiRequest,
  res: NextApiResponse
) {

	const isAdmin:any = await isAdminRequest(req, res) 
  if (isAdmin === 0) {
    throw 'not an admin'
  }

	console.log("Im in uploads ===================")
	
	const form = new multiparty.Form()
	interface Files {
		files:any,
		fields:any
	}
	const { fields, files }:Files = await new Promise((resolve, reject) =>{
		form.parse(req, async (err, fields, files) => {
			if (err) reject(err)
			resolve({fields, files})
	})
		
})

// console.log("uploads/ files # =", files.file.length)

const client = new S3Client({
	region: 'eu-north-1',
	credentials: {
		accessKeyId: s3AccessCleId,
		secretAccessKey: s3CaletaAccessCle,
	}
})

const links:any = []
for (const file of files.file) {
	const ext = file.originalFilename.split('.').pop().toLowerCase()
	const newFileName = Date.now() + '.' + ext
	const body:any = fs.readFileSync(file.path)

	const input:any = {
		ACL: "public-read",
		Bucket: bucketName,
		Key: newFileName,
		Body: body,
		ContentType: mime.lookup(file.path),
	}
	
	const command = new PutObjectCommand(input)	
	const response = await client.send(command)

	const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`
	links.push(link)
}

res.json({links})
}

export const config = {
	api: {
		bodyParser: false
	}
}