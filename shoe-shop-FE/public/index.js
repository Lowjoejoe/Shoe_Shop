//const ENV = "production";
const ENV = "dev"; 

var resultArea = document.querySelector('.shoes');

let ApiUrl = ENV == "dev" ? 'http://localhost:3000': 'get URL from render.com';
console.log('API:', ApiUrl);


//set up fetch from API
function pullAPIdata() {
    fetch(`${ApiUrl}/api/shoes`,{
        method:'GET',
        mode:'cors',
        headers:{'Content-Type':'application/json'},
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        addResultsToDOM(data);
    })
    .catcher(err=>console.log(err));
}

//Add data to the DOM 
function addResultsToDOM(data){
    $('.shoes').empty();
    for (let i=0; i<data.length; i++){
        var shoeDiv=document.createElement('li');
        shoeDiv.innerHTML = ` ${data[i].brand}, ${data[i].name}, price:$${data[i].price}.00, ${data[i].category}`;
        resultArea.appendChild(shoeDiv);
    }
}

//add event listener to add shoe to pull input fields and create new shoe
document.querySelector("#add_button").addEventListener("click",()=>{
    let shoeBrand = document.querySelector('.brand').value;
    let shoeName = document.querySelector('.name').value;
    let shoePrice = document.querySelector('.price').value;
    let shoeCategory = document.querySelector('.category').value;

    let newShoe = {
        'brand':shoeBrand,
        'name':shoeName,
        'price':Number(shoePrice),
        'category':shoeCategory
    }

    if(shoeBrand == ''&& shoeName =='' && shoePrice == '' && shoeCategory == ''){
        console.error('error');
    }else{
        fetch(`${ApiUrl}/api/shoes`, {
            method:'POST',
            mode:'cors',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newShoe)
        })
        .then(response=>{
            if(response.status == 200){
                var shoeElement = document.createElement('li');
                shoeElement.innerHTML = ` ${newShoe.brand}, ${newShoe.name}, price:$${newShoe.price}.00, ${newShoe.category}`;
                resultArea.appendChild(shoeElement);
            }else{
                alert("something went wrong!", response);
                }
            })
        }
    })
    

pullAPIdata();