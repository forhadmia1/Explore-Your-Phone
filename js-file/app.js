/*===================================
    Load data for search result
====================================*/
const loadResult = () =>{
    const searchfield =document.getElementById('search-field');
    const searchValue = searchfield.value;
    const searchKeyword = searchValue.toLowerCase();
    searchfield.value='';
    const emptyError =document.getElementById('empty-field');
    //error message show and data load
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
/*=============================================
    display the data of search result in UI
===============================================*/
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
                    <button onclick="singleDetails('${phone.slug}')" class="btn btn-primary fw-bold">Details</button>
                </div>
            `;
            phoneContainer.appendChild(div);
        });
    }
    
}
/*===========================
    load single details 
===========================*/
const singleDetails=phoneId =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(data => showSingleDetails(data.data))
}

/*================================
    show single details on UI
=================================*/
const showSingleDetails= phoneInfo =>{
    const singleContainer = document.getElementById('single-details');
    singleContainer.innerHTML = `
        <div class="col-md-6 d-flex justify-content-center">
            <img class="img-fluid" src="${phoneInfo.image}" alt="">
        </div>
        <div class="col-md-6">
            <h3>Name : ${phoneInfo.name}</h3>
            <p><span class="fw-bold">Brand: </span>${phoneInfo.brand}</p>
            <p><span class="fw-bold">Release Date:</span> ${phoneInfo.releaseDate?phoneInfo.releaseDate:"No release date found."}</p>
            <p><span class="fw-bold">storage:</span> ${phoneInfo.mainFeatures.storage}</p>
            <p><span class="fw-bold">Display:</span> ${phoneInfo.mainFeatures.displaySize}</p>
            <p><span class="fw-bold">Chipset:</span> ${phoneInfo.mainFeatures.chipSet}</p>
            <p><span class="fw-bold">Memory:</span> ${phoneInfo.mainFeatures.memory}</p> 
            <p><span class="fw-bold">Others:</span>  ${phoneInfo.others?`<span class="fw-bold">Bluetooth:</span> ${phoneInfo.others.Bluetooth} <span class="fw-bold">Gps:</span> ${phoneInfo.others.GPS} <span class="fw-bold">NFC:</span> ${phoneInfo.others.NFC} <span class="fw-bold">Radio:</span> ${phoneInfo.others.Radio}<span class="fw-bold">USB:</span> ${phoneInfo.others.USB} <span class="fw-bold">WLAN:</span> ${phoneInfo.others.WLAN}`:'No data here!'}</p>
            <p class="text-wrap"><span class="fw-bold">Sensor:</span>${phoneInfo.mainFeatures.sensors.join(', ')}</p>
        </div>
    `;
}
