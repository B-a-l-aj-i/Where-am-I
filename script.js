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
// ///////////////////////////////////////
// const getCounrty=function(country){

// const request=new XMLHttpRequest();

// request.open('GET',`https://restcountries.com/v3.1/name/${country}`)

// request.send();

// request.addEventListener('load',function(){

// const [data]=JSON.parse(this.responseText);
// console.log(data);

// renderCountry(data)

// if(!data.borders)return;
// const [data2]=data.borders;


//     const request2=new XMLHttpRequest();
//     request2.open('GET',`https://restcountries.com/v3.1/alpha/${data2}`)

//     request2.send()
    
//     request2.addEventListener('load',function(){
//       let [border]=(JSON.parse(this.responseText));
//       console.log(border);
//       renderCountry(border,'neighbour')

//     })


//   })
//   }
//     getCounrty("Republic of India");
//     // getCounrty("Japan");
//     getCounrty("Germany");
//     // getCounrty("New Zealand");



// getCounrty("Portugal")
// getCounrty("Bhutan")



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
// btn.addEventListener('click',function(){
//   getCounrty('Germany');
// })


// let whereAmI=function(lat,lng){
  
//   fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
//   .then(response=>{
    
//     if(response.ok===false) throw new Error(`${lat} and ${lng} dose not exist`)
//     return response.json() 
// })
//  .then(data=> {
//    console.log(data)
//    console.log(`you are in ${data.city} ,${data.countryName}`);
//   return fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`)
// })
// .then(res=>res.json())
// .then(data=>renderCountry(data[0]))
// .catch(err=>{
//   console.info(err.message+'❌❌❌❌❌');
// })

// }
// whereAmI(-35.1047,96.2654)

// whereAmI(51.50354,-0.12768);
// whereAmI(19.037, 72.873);
// // whereAmI(-33.933, 1008.474);error
// whereAmI(-23.933, 18.474);
// whereAmI(-21.933, 180.474);

// let wait=function(n){
//  return new Promise(function(resolve,reject){
//   setTimeout(()=>{
//     resolve(n+" seconds passed");
//   },1000*n)

// })
// }

// wait(1).then(res=>{
//   console.log(res)
//   return wait(2)
// }).then(res=>{
//   console.log(res)
//   return wait(3)
// }).then(res=>{
//   console.log(res);
// })

// function s(){
// setTimeout(()=>{
//   console.log("1 seconds passed daaaaaaaa");
//   setTimeout(()=>{
//     console.log("2 seconds passed daaaaaaaa");
//     setTimeout(()=>{
//       console.log("3 seconds passed daaaaaaaa");
//     },1000)
//   },1000)
// },1000)
// }
// s()
// s()
// s()

// let add=(a)=>{
//   return a+1
// }
// let arr=[1,2,3,4,5]

// console.log(arr.map(add));

// console.log(arr.map(function(a){
//   return a+2
// }));


// let position=function(){
//  return new Promise((resolve,reject)=>{
//     navigator.geolocation.getCurrentPosition(resolve,reject)
//   })
// }

// // position().then(res=>console.log(res))


// 
// btn.addEventListener('click',myloc);


// function myloc(){

//   let request=new XMLHttpRequest();
  
//   request.open('GET','https://api.bigdatacloud.net/data/reverse-geocode-client');
//   request.send()
  
//   request.addEventListener('load',()=>{
//   console.log(JSON.parse(request.responseText));
//     let {latitude:lat,longitude:lng,countryCode:cc,city,countryName}=(JSON.parse(request.responseText));
//     console.log(lat,lng);

//     let request2=new XMLHttpRequest();
  
//    request2.open('GET',`https://restcountries.com/v3.1/alpha/${cc}`);
//    request2.send()
//    request2.addEventListener('load',()=>{
//     let data2=(JSON.parse(request2.responseText)[0]);
//     console.log(data2);
//    console.log(`you are in ${city},${countryName}`);
//     return renderCountry(data2)
//    })

  
//   })

// }




// function iSS(){
// fetch(`http://api.open-notify.org/iss-now.json`)
// .then(res=>{

//  return res.json()
// })
// .then(rs=>
//   {
//     // console.log(rs);
//   let {latitude:lat,longitude:lng}=(rs.iss_position)
//   // console.log(lat,lng);
//   return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
// }
// ).then(res=>{
// return  res.json()
// })
// .then(rs=>{
//   console.log(rs);
//   if(rs.countryName)
//   {
//     console.log(`The ISS is in ${rs.countryName}`)
//     getCounrty(rs.countryCode)
// }else{
//   console.log("The ISS is 0n top of "+rs.localityInfo.informative[0].name)

// }
// })
// }
// btn.addEventListener('click',iSS)
// let  createimg =function(n){

// return  new Promise((resolve,reject)=>{
//   let k= document.createElement('img')
//   k.classList.add('photo')
//   document.body.appendChild(k)
//   k.onerror=()=>reject(new Error("image not found"))
  
//   setTimeout(()=>{
//     resolve(`./sample/${n}.jpg`)
    
//   },1000*n)
// })

// }

// // console.log(createimg());

// createimg(1).then(a=>{
//   console.log(a);
//   document.querySelector('.photo').src=a
// return createimg(2)
// })
// .then(a=>{
//   console.log(a);
//  document.querySelector('.photo').src=a
// return createimg(3)
// })
//   .then(a=>{
//    console.log(a);
//   document.querySelector('.photo').src=a
//   return createimg(4)
// })
// .then(a=>{
//   console.log(a);
//   document.querySelector('.photo').src=a
// })
// .catch(err){
//   console.debug(err.message+"ikkkkkkk");
// })
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err){ console.error(err)};


  // let np=new Promise((r,re)=>{
  //   let num=(Math.random()*2).toFixed()
  //   if(num==='1')
  //   r(num)
  // else
  // re(num)
  // })

  // console.log(np);

  // np.then((r)=>{
  // console.log('number is 1');
  // },re=>{
  //   console.log('number is not equal 1');
  // })



  // fetch('https://randomuser.me/api/')
  // .then(res=>{
  //   return(res.json());
  // }).then(re=>{
  //   console.log(re);
  //   console.log(re.results[0].picture.medium);
  //   createimg(re.results[0].picture.large).then(a=>{
  //     console.log(a);
  //   document.querySelector('.photo').src=a
  //   })
  // })

  // let n=(Math.random()*20).toFixed()
  // fetch(`https://pokeapi.co/api/v2/pokemon/${n}`)
  // .then( res=>{
  //   console.log(res);
  //   // console.log(res.json());
  //  return res.json()
  // })
  // .then(res=>{
  //   console.log(res);
  //   console.log(res.name);

  //   // createImage(res.sprites.front_default).then(a=>{
  //   //       console.log(a.src);
  //   //     document.querySelector('.photo').src=a.src
  //   // })
  // })

  // fetch(`https://api.themoviedb.org/3/`)
  // .then(res=>{
  //   return(res.json());
  // })
  // .then(res=>{
  //   console.log(res);
  // })


  // let whereAmI=function(){
  //     position()
  //     .then(res=>{
  //       console.log(res.coords);
  //       const{latitude:lat,longitude:lng}=res.coords
  //       console.log(lat,lng);
  //       return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
  //     })
  //     .then(response=>{
        
  //       if(response.ok===false) throw new Error(`${lat} and ${lng} dose not exist`)
  //       return response.json()
  //   })
  //    .then(data=> {
  //      console.log(data)
  //      console.log(`you are in ${data.city} ,${data.countryName}`);
  //     return fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`)
  //   })
  //   .then(res=>res.json())
  //   .then(data=>renderCountry(data[0]))
  //   .catch(err=>{
  //     console.info(err.message+'❌❌❌❌❌');
  //   })
  //   }
    
    // btn.addEventListener('click',whereAmI);



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

