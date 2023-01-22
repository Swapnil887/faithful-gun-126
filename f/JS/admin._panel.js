console.log("app startt")
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3dhcG5pbCIsInBhc3N3b3JkIjoiU3dhcG5pbEAxMjMiLCJpYXQiOjE2NzQ0MTA5ODd9.ragXMXySfiCczYrAuxL-_7y1zNAQbH_lbWuFt1S4r7Q'
async function getData(){
    var x = await fetch("http://localhost:4500/adminpage/get",{
      method:"GET",
      headers:{"Content-type":"application/json",Authorization:`${token}`
    }
    });
    var data = await x.json();

    console.log(data)
    renderCardList(data);
    
  }

  getData()
 
// let add_btn=document.getElementById("new_product")
// add_btn.addEventListener("submit",function(event){
//     event.preventDefault()
//     let add_img=document.querySelector("#img_url").value
//     let add_name=document.querySelector("#name").value
//     let add_price=document.querySelector("#price").value
//     let add_des=document.querySelector("#des").value
// var obj = {
//         name: add_name,
//         description: add_des,
//         avatar: add_img,
//         price: add_price,
        
//       }
    
//       addData(obj)
//    //  window.onload
// })



// async function addData(obj){
//     var x = await fetch(`https://6398c52b29930e2bb3c190fa.mockapi.io/sw/products`,{
//       method:"POST",
//       headers:{"Content-Type":"application/json"}
//       ,body:JSON.stringify(obj)
//     })
//   }
 let main =document.querySelector(".main")

function renderCardList(cardData) {
    main.innerHTML=`

  
    ${cardData
      .map((item) => {
        
        let image = `${item.image}`;
        let title = `${item.title}`;
        let review = `${item.review}`;
        let _id=`${item._id}`;
        let price=`${item.price}`
        return getAsCard(image,title, review,_id,price );
      })
      .join("")}

`;
}

function getAsCard(imageURL, name, description, id,price) {
 
  return `
  <div class="show_products">
  <div> <img src=${imageURL} alt="img"></div>
  <h3>${name}</h3>
     <h3>${price}</h3>
     <p>${description}</p>
     <h3>PRODUCT ID:${id}</h3>
     <button class="mdlt" data-id=${id} >Delete</button>
     </div>
`;
}



  async function delData(id){
    var x = await fetch(`https://localhost:4500/adminpage/delete/${id}`,{
      method:"DELETE",
    headers:{"Content-type":"application/json",Authorization:`${token}`
 
     }}   );
  }

//   let dlt_btn=document.getElementById("delete")
//   dlt_btn.addEventListener("click",function(event){
//       event.preventDefault()
     
//     let p_id=document.querySelector("#delete_id").value
//     delData(p_id)
     

       
//   })
  



