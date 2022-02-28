//Load data for search result
const loadResult = () =>{
    const searchValue = document.getElementById('search-field').value;
    const searchKeyword = searchValue.toLowerCase();
    fetch(` https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`)
    .then(res => res.json())
    .then(data => displayData(data.data))
}
//display the data of search result in UI
const displayData=phones=>{
    
}