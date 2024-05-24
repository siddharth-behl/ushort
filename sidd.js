function sidd() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello your promise is resolved")
         }, 2000)
    })
}
console.log(await sidd())
sidd().then((val)=>{
    console.log(val)
}).catch((err)=>{console.log(err)})
console.log("hi")