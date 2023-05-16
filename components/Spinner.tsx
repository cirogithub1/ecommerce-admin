// example: size="h-8 w-8"
function Spinner({ size }:{ size:string }) {
	return(
		<div className="flex justify-center items-center p-1 h-full">
			<div className={`${size ? size : "h-8 w-8"} animate-spin rounded-full border-t-4 border-blue-700`}/>
		</div>
	)
}

export default Spinner