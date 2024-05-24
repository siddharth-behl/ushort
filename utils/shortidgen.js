

function rand(lett) {
    let st =""
    for (let i = 0; i <= 5; i++) {
       st+=lett[ Math.ceil(Math.random() * (lett.length - 1))]

    }
    return st
}
export default rand




