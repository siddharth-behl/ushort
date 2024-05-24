

function ipgen(ip_jsn) {
    return ip_jsn[Math.ceil(Math.random()*ip_jsn.length)].ip_add

}
export default ipgen

