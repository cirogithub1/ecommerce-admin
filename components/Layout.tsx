import { useSession, signIn } from "next-auth/react"

import SideBar from '../components/SideBar'
import { useState } from "react"
import Logo from "./Logo"

const hambIcon =
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>

export default function Layout({ children } : { children:any }) {
  const { data: session } = useSession()
  const [showNav, setShowNav] = useState(false)

  if (session) {
    return (
      <div className="bg-white Xbg-gray-300 text-black min-h-screen">
        <div className="HamButton flex items-center justify-center p-2 md:hidden">
          <button
            onClick={() => {setShowNav(true)}}
            >{hambIcon}</button>
          
          <div className="Logo flex grow justify-center">
            <Logo />
          </div>
        </div>

        <div className={`SignedIn flex`}>
          <SideBar showNav={showNav} />

          <div className={`Title flex-grow p-4`}>
            {children} <br />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`Wrapper bg-gray-900 w-screen h-screen flex items-center`}>
      <div className="text-center w-full">
        <button 
          className="bg-white py-2 px-4 text-black rounded-md"
          onClick={() => signIn()}>
            Login with Google</button>
      </div>
    </div>
  )
}