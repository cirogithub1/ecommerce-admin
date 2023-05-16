import Layout from "@/components/Layout"
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  const { data: session }:any = useSession()
 
  return (
    <Layout>
      <div className="User text-blue-900 flex justify-between">
        <h2>
          Hello <b>{session?.user.name}</b>
        </h2>
        <div className="Image flex justify-center items-center bg-gray-300 Xgap-1 text-black rounded-lg overflow-hidden">
          <Image width={24} height={24} src={session?.user.image} alt="session.user.image" />
          <span className="px-2">
            <b>{session?.user.name}</b>
          </span>
        </div>
      </div>
    </Layout>
  )
}
