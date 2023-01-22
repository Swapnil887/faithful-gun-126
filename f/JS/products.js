// Write all necessery JS here
const u = document.querySelector("#u_name")
u.innerHTML = localStorage.getItem("number")


let all_products = document.querySelector("#all_products");
let url = "http://localhost:4500/userproduct/homepage";
let arr = [];
async function getData(){
  try {
    let res = await fetch(url);
    let data = await res.json();
    arr = data;
    displayCards(data);
  } catch (error) {
    console.log(error)
  }
}
getData();

function displayCards(apidata) {
  all_products.innerHTML = " ";
  apidata.forEach((el) => {
    let div = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div.setAttribute('id', 'parent')
    div1.setAttribute('class', 'img1')
    div2.setAttribute('class', 'details')
    let image = document.createElement("img");
    image.src = el.image;
    let product_name = document.createElement("h4");
    product_name.textContent = el.title.substring(0, 15)+ "..."
    let description = document.createElement("p");
    description.textContent = el.review;
    let price = document.createElement("h3");
    price.textContent = `₹${el.price}`
    let btn = document.createElement("button");
    btn.innerText = "ADD";
    btn.addEventListener("click",function(){
      var obj ={};
      obj.title = el.title;
      obj.review = el.review;
      obj.image = el.image;
      obj.price = el.price;
      alert(`${obj.title} is added`)
      add_Cart_Data(obj);
    })
    div1.append(image)
    div2.append(product_name, description, price,btn);
    div.append(div1, div2);
    all_products.append(div);
  })
}
async function add_Cart_Data(obj){
  var x = await fetch(`http://localhost:4500/userproduct/cart`,{
    method:"POST",
    headers:{"Content-type":"application/json",Authorization:`${localStorage.getItem("token")}`}
    ,body:JSON.stringify(obj)
  })
}
// let arr=[];
// async function getData(){
//   let fetchData = await fetch("https://6398c52b29930e2bb3c190fa.mockapi.io/sw/products");
//   let data = await fetchData.json();
//   arr = data;
//   renderCard(data);
// }
// getData();
// let main = document.querySelector(".main");
// function renderCard(cardsData){
//   main.innerHTML = `
//   ${cardsData.map((item)=>{
//     let imageURL = `${item.avatar}`;
//         let name = `${item.name.substring(0,25)  + "..."}`;
//         let description = `${item.description.substring(0,25)  + "..."}`;
//         let id=`${item.id}`;
//         let price=`${item.price}`
//         return getCardData(imageURL,name,description,id,price);
//   })
// .join("")}
//   `;
// }
// function getCardData(imageURL,name,description,id,price){
//   main.innerHTML = ""; `
//   <div class="show_products">
//   <div> <img src=${imageURL} alt="img"></div>
//   <h3>${name}</h3>
//   <p>${description}</p>
//      <h4>₹ ${price}</h4>
//      <button class="mdlt" data-id=${id} >ADD</button>
//      </div>
//   `
//   let btn = document.querySelectorAll(".mdlt");
//         btn.addEventListener("click",function(){
//           alert("hello");
// });
// }
// filter the cards based on region
document.getElementById("filter_region").addEventListener("change", function (){
  if (filter_region.value == "") return displayCards(arr);
  else {
    displayCards(arr.filter((element) => {
      return element.price === filter_region.value;
    }))
  }
})
// sort the cards
function sort_pop() {
  let select = document.getElementById("sort_price").value;
  console.log(select);
  if (select == "asc") {
    arr.sort((a, b) => a.price - b.price);
    displayCards(arr);
  }
  if (select == "desc") {
    arr.sort((a, b) => b.price - a.price);
    displayCards(arr);
  }
}
function search()
{
  let q=  document.querySelector("#search").value;
  console.log(q)
let newData = arr.filter(function(ele){
    return ele.title.toLowerCase().includes(q.toLocaleLowerCase())
})
displayCards(newData)
}









