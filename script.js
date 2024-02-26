'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');



const renderCountry=function(data,border=" "){
const html=`
  <article class="country ${border}">
        <img class="country__img" src="${data.flags.png}"/>
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${data.population}</p>
          <p class="country__row"><span>🗣️</span>${Object.values( data.languages)}</p>
          <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
        </div>
      </article>
  `
  countriesContainer.insertAdjacentHTML("beforeend",html)
  countriesContainer.style.opacity=1;
  
}


const renderError=function(msg){
  countriesContainer.insertAdjacentText('beforeend',msg)
}


let getJSON=async function(url){
 try{
   let data=(await fetch(url)).json()
  return data
}catch(err){
  console.warn(err.message+"😡😡😡😡😡");
}
}




const getCounrty=function(country){
  getJSON(`https://restcountries.com/v3.1/alpha/${country}`,'country not found')
  .then(data=>{
    console.log(data);
    renderCountry(data[0])
    const neighbour=data[0].borders?.[0];
    if(!neighbour){
       throw new Error(`no neighbour for ${country}`)
    };
    return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`)
  })
  .then(data=>renderCountry(data[0],'neighbour'))
  .catch(err=>{
    renderError(err.message)
    console.log(err.message)
  })
  .finally(()=>{
    countriesContainer.style.opacity=1;
  })
}




let position=function(){
 return new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition(resolve,reject)
  })
}

position().then(res=>console.log(res))

let whereAmI=async function(){
    let da=await position();
     let {latitude:lat,longitude:lng}=da.coords
    //  console.log(lat,lng);
   try{ let r= await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
    let data=await r.json();
    console.log(`you are in ${data.city} ,${data.countryName}`);
    let cc=await fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`);
     let data1=cc.json();
     let data2=await data1;
     renderCountry(data2[0]);
    }catch(err){
      console.log(err.message);
    }
     

    }
 btn.addEventListener('click',whereAmI);

