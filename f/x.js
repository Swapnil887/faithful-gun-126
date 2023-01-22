async function x(){
    await fetch("http://localhost:4500/userproduct/homepage")
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    
}
x()