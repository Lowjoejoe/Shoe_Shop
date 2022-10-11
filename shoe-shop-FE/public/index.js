const ENV = "production";
//const ENV = "dev"; 

var resultArea = document.querySelector('.shoes');

let ApiUrl = ENV == "dev" ? 'http://localhost:3000': 'https://shoe-shop-api-server.onrender.com';
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

//Refresh button to refresh list of shoes
document.querySelector('#refresh_button').addEventListener("click", ()=>{
    pullAPIdata();
})

//event listener to add new shoe to pull input fields and create new shoe
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

//eventlistener to search by brand
document.querySelector("#search_button").addEventListener("click", ()=>{
    let shoeSearch= document.querySelector(".search").value;
    fetch(`${ApiUrl}/api/shoes/brand/${shoeSearch}`, {
        method: 'GET',
        mode:'cors',
        headers:{'Content-Type':'application/json'},
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        addResultsToDOM(data);
    })
    .catcher(err=>console.log(err));
});

//Filter return using selector drop down
document.querySelector("#search_button").addEventListener("click", ()=>{
    let shoeFilter = document.querySelector("#filter_shoe_select").value;
    let shoeSearch= document.querySelector(".search").value;
    if(shoeFilter == "brand"){
    fetch(`${ApiUrl}/api/shoes/brand/${shoeSearch}`, {
        method: 'GET',
        mode:'cors',
        headers:{'Content-Type':'application/json'},
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        addResultsToDOM(data);
    })
    .catcher(err=>console.log(err));

    }else if(shoeFilter == "category"){ 
    fetch(`${ApiUrl}/api/shoes/category/${shoeSearch}`, {
        method: 'GET',
        mode:'cors',
        headers:{'Content-Type':'application/json'},
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        addResultsToDOM(data);
    })
    .catcher(err=>console.log(err));

    }else{
        pullAPIdata();
    }

});


//eventlistener to update shoe in database by ID  
document.querySelector('#update_button').addEventListener("click",()=>{
    let shoeId = document.querySelector('.id').value;
    let shoeBrand = document.querySelector('.brandUpdate').value;
    let shoeName = document.querySelector('.nameUpdate').value;
    let shoePrice = document.querySelector('.priceUpdate').value;
    let shoeCategory = document.querySelector('.categoryUpdate').value;

    let inputId = Number(shoeId);


    let updatedShoe = {
        'brand':shoeBrand,
        'name':shoeName,
        'price':Number(shoePrice),
        'category':shoeCategory
    }

    if(shoeId == '' && shoeBrand == '' && shoeName =='' && shoePrice == '' && shoeCategory == ''){
        console.error('error');
    }else{
        fetch(`${ApiUrl}/api/shoes/${inputId}`, {
            method:'PATCH',
            mode:'cors',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(updatedShoe)
        })
        .then(response=>{
            if(response.status == 200){
                alert(`successfully updated shoe information for ${inputId} as ${updatedShoe.brand}, ${updatedShoe.name}, price:$${updatedShoe.price}.00, ${updatedShoe.category}`)
            }else{
                alert("something went wrong!", response);
                }
            })
        }
    })

//eventlistener to delete 
document.querySelector('#delete_button').addEventListener("click",()=>{
    let shoeId = document.querySelector('.id').value;
    let shoeBrand = document.querySelector('.brandUpdate').value;
    let shoeName = document.querySelector('.nameUpdate').value;
    let shoePrice = document.querySelector('.priceUpdate').value;
    let shoeCategory = document.querySelector('.categoryUpdate').value;

    let inputId = Number(shoeId);

    let updatedShoe = {
        'brand':shoeBrand,
        'name':shoeName,
        'price':Number(shoePrice),
        'category':shoeCategory
    }

    if(shoeId == ''){
        console.error('error');
    }else{
        fetch(`${ApiUrl}/api/shoes/${inputId}`, {
            method:'DELETE',
            mode:'cors',
            headers: {'Content-Type':'application/json'}
        })
        .then(response=>{
            if(response.status == 200){
                alert(`successfully deleted shoeID:${inputId}!shoe information ${updatedShoe.brand}, ${updatedShoe.name}, price:$${updatedShoe.price}.00, ${updatedShoe.category} removed from the database.`)
            }else{
                alert("something went wrong!", response);
                }
            })
        }
    })

pullAPIdata();