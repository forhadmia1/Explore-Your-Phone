//Load data for search result
const loadResult = () =>{
    const searchfield =document.getElementById('search-field');
    const searchValue = searchfield.value;
    const searchKeyword = searchValue.toLowerCase();
    searchfield.value='';
    const emptyError =document.getElementById('empty-field');
    if(searchKeyword==''){
        emptyError.style.display= "block";
        document.getElementById('error').style.display="none";
    }else{
        emptyError.style.display= "none";
        fetch(` https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`)
        .then(res => res.json())
        .then(data => displayData(data.data.slice(0,20)))
    } 
}
//display the data of search result in UI
const displayData=phones=>{
    const phoneContainer = document.getElementById('phone-container');
    const noResult = document.getElementById('error');
    //clear the display before show result
    document.getElementById('single-details').textContent='';
    phoneContainer.textContent='';
    //show result
    if(phones.length == 0){
        noResult.style.display='block';
    }else{
        //display result in UI
        noResult.style.display = 'none';
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.className ="col"
            div.innerHTML= `
                <div class="card h-100 p-3">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                    </div>
                    <button onclick="singleDetails('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
            `;
            phoneContainer.appendChild(div);
        });
    }
    
}
//load single details 
const singleDetails=phoneId =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(data => showSingleDetails(data.data))
}
//show single details on UI
const showSingleDetails= phoneInfo =>{
    const singleContainer = document.getElementById('single-details');
    singleContainer.innerHTML = `
        <div class="col-md-6 d-flex justify-content-center">
            <img class="img-fluid w-50" src="${phoneInfo.image}" alt="">
        </div>
        <div class="col-md-6">
            <h3>Name : ${phoneInfo.brand}</h3>
            <p><span class="fw-bold">Release Date:</span> ${phoneInfo.releaseDate?phoneInfo.releaseDate:"no release date found"}</p>
            <p><span class="fw-bold">Mini Features:</span> storage:${phoneInfo.mainFeatures.storage} Display:${phoneInfo.mainFeatures.displaySize} Chipset :${phoneInfo.mainFeatures.chipSet} Memory:${phoneInfo.mainFeatures.memory}</p> 
            <p><span class="fw-bold">Others :</span>${phoneInfo.others?`Bluetooth:${phoneInfo.others.Bluetooth} Gps:${phoneInfo.others.GPS} NFC:${phoneInfo.others.NFC} Radio:${phoneInfo.others.Radio} USB:${phoneInfo.others.USB} WLAN:${phoneInfo.others.WLAN}`:'Not Found'}</p>
            <p class="text-wrap"><span class="fw-bold">Sensor:</span>${phoneInfo.mainFeatures.sensors.join(' ')}</p>
        </div>
    `;
}