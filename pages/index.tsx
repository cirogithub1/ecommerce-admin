import Layout from "@/components/Layout"
import { useSession, getSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { data: session }:any = useSession()
 
  return (
    <>
      {session
      ?   
        Admin({session, handleSignOut: signOut})
      :  
        Guest()}
    </>
  )
}

export async function getServerSideProps({ req }: {req:any}) {
  const session = await getSession({ req })

  if (!session) {
    return ({
      redirect: {
        destination:'/login',
        permanent: false
      }
    })
  }

  return ({
    props: {session}
  })
}

function Admin({ session, handleSignOut } : {session:any, handleSignOut:any}) {
  return(
    <Layout>
      <div className="User text-blue-900 flex justify-between">
        <h2>
          Hello <b>{session?.user.name}</b>
        </h2>

        <div 
          className="Image
          flex justify-center items-center bg-gray-300 Xgap-1 text-black rounded-lg overflow-hidden">
          <Image 
              className="rounded-full"
              width={24} 
              height={24} 
              src={session?.user.image} 
              alt="session.user.image" />

          <span className="px-2">
            <b>{session?.user.name}</b>
          </span>
        </div>
      </div>
    </Layout>
  )
}

function Guest() {
  return(
    <main className='container mx-auto text-center py-20'>
      <h3 className="text-4xl font-bold">
        Guest Homepage        
      </h3>

      <div className="flex justify-center">
        <Link className='mt-5 px-10 py1 rounded-sm bg-indigo-500 text-gray-100' href={'/login'}>
            Sing In
        </Link>
      </div>
    </main>
  )
}