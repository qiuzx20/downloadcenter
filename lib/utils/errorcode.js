const map = {
	"500":"服务器异常,请联系运维人员"
}
const errFn=(code)=>{
	return map[code] || "服务器异常,请联系运维人员!"
}
export default errFn