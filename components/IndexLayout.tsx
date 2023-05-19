import React from 'react'

interface Props {
	children: React.ReactNode;
}

export default function IndexLayout({ children }:any) {
	return (
		<>
		{/* <div className="flex h-screen bg-blue-400"> */}
			<div className="Main mt-4 m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid Xlg:grid-cols-2">
				<div className="right flex flex-col justify-evenly bg-gray-500">
					<div className="text-center py-2">
						{children}	
					</div>
				</div>
			</div>
		{/* </div> */}
		</>
	)
}