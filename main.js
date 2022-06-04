//strat call inputs for work

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads  = document.getElementById('ads');
let discount  = document.getElementById('discount');
let total  = document.getElementById('total');
let count  = document.getElementById('count');
let category  = document.getElementById('category');
let submit  = document.getElementById('submit');
 //call in console for test
 //console.log(title,price,taxes,ads,discount,total,count,category,submit)
 
 let mood = 'create';
 let tmp; //good idea globle var here use get i index update function
//get total
function getTotal(){
    if(price.value != '')  {
       let result = (+price.value + +taxes.value + +ads.value)
                - +discount.value;
       total.innerHTML = result;
       total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d00';
    }
}
//create product

let dataPro ; //defined array
if(localStorage.product != null){
    //if array have values saved as string  return  to orgine & save in array
    dataPro = JSON.parse(localStorage.product) ;
}else{
    dataPro = [];  //else empty array
}

submit.onclick = function(){
    //OBJECT save as one Index in array
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    //console.log(newPro) //TEST IN console
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100)
    {
            if(mood === 'create')
               {      //for create many count in submit.onclick
                    if(newPro.count > 1)//count from input count>1 bulid numbers  newPro.counts
                    {
                        for (let i = 0; i < newPro.count; i++) 
                        {
                            dataPro.push(newPro);// save object in array as Index but if reload will be delete
                        }
                    }
                    else{
                        dataPro.push(newPro);
                    }
                }else{
                    dataPro [  tmp ] = newPro;//take update data from newPro & put in tmp
                    mood = 'create'; // return to create mood (fun create,,,)
                    submit.innerHTML = 'Create'; //return button  create
                    count.style.display = 'block';//return input count
                }
     clearData()
    }
    //save local storage
    //SAVE DATA IN localStorage as string TO STAY IN PROGRAM
    localStorage.setItem('product', JSON.stringify(dataPro) )
     
    showData()
}


//clear inputs

function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML = '';
    count.value ='';
    category.value ='';
}
//read

function showData(){
         getTotal()//display total in fun update
        let table ='';
        for (let i = 0; i < dataPro.length; i++) 
        {   table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData( ${i})" id="update">update</button></td>
                            <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>
                        </tr>
                      `;
        }
    document.getElementById('tbody').innerHTML = table;
    //named varable btnDelete & put in place above table
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0 ){
        //if table have data dispaly button where onclick=>deleteAll
        btnDelete.innerHTML = ` <button onclick="deleteAll()">delete All(${dataPro.length})</button>`;
    }else
    {btnDelete.innerHTML ='';}//else do not dispaly butDelete
}
// always work to stay display table after reload
showData()

//delete
function deleteData(i)
{ 
    dataPro.splice(i,1); //delete one element from array
    //Add new array dataPro in localStorage becuse they are conect
    localStorage.product =  JSON.stringify(dataPro);
    showData() //display table after delete
}

//deleteAll
function deleteAll(){
    localStorage.clear()  //clear localStorage
    dataPro.splice(0)     //0 delete array index from 0 to end
    showData()            //showData after delete
}

//count

//update
function updateData(i)
{
    title.value     = dataPro[i].title;
    price.value     = dataPro[i].price;
    taxes.value     = dataPro[i].taxes;
    ads.value       = dataPro[i].ads;
    discount.value  = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value  = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i ;
    scroll({
              top:0,
              behavior: 'smooth',
    })
}
//search
let searchMood = 'title';
function getSearchMood(id)
{
    let search = document.getElementById('search');//call input search
    if(id == 'searchTitle'){
                             searchMood = 'title';
                             }else{
                              searchMood = 'category';
                           }
         search.placeholder = 'Search By '+searchMood;
  search.focus()
  search.value ='';
  showData()
}

function searchData(value)//take mood value from input search
{   
    let table = ''; //bring table to display filed if fund
    for (let i = 0; i < dataPro.length; i++)   //search in table to same name title Or Category
   { 
       if(searchMood == 'title') //if word from input search == named title
       {
        
            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase()))   //serach in array to name title &if find name title will print as filed table
                {    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData( ${i})" id="update">update</button></td>
                        <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>
                    </tr>`;
                 }          
       }else
       {    if(dataPro[i].category.toLowerCase().includes(value.toLowerCase()))   //serach in array to name title &if find name title will print as filed table
               {    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData( ${i})" id="update">update</button></td>
                        <td><button onclick="deleteData( ${i})" id="delete">delete</button></td>
                    </tr>`;
               } 
       }
    }   
    document.getElementById('tbody').innerHTML = table;//put here in tbody to dislay result what to find
 }
//clean data