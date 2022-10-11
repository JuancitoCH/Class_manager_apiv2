module.exports = (promise)=>{
	return promise
		.then(res=> { return {data:res} })
		.catch(err=>{
			console.log(err)
			throw err
		})
}