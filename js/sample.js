

const baseURL = "https://morning-star.p.rapidapi.com/market/v2/get-realtime-data?performanceIds=0P0000OQN8,0P000000GY";


const key = 'ea57d84ae5mshf169655c9821ac7p13eb0bjsnb013c6e140d5'


const stockURL = baseURL;




function getStockFunc() {
   fetch(stockURL, {
    method: 'GET',
           headers: {
             "X-RapidAPI-Key": key,
          "X-RapidAPI-Host":"morning-star.p.rapidapi.com"
        },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // let newData=data.adjustedClosePrice;

     
      // Handle the fetched data here
      function fetchRandomObjects(data, numObjects = 1) {
        const allObjects = Object.values(data);
        const randomObjects = [];

        while (randomObjects.length < numObjects && allObjects.length > 0) {
          const randomIndex = Math.floor(Math.random() * allObjects.length);
          const randomObject = allObjects.splice(randomIndex, 1)[0];
          randomObjects.push(randomObject);
        }

        return randomObjects;
      }

      // Fetch three random objects
      const randomObjects = fetchRandomObjects(data,1);
      
     
      localStorage.setItem("starList", JSON.stringify(fetchRandomObjects(data, 1)));
      let stock_data_start = JSON.parse(localStorage.getItem("starList"));
  

      document.getElementById("render_stocks").innerHTML = stock_data_start
        .map(
          (b) =>
            `
            <div class="col-md-6 mt-2">  
            <div class="card">        
              <div class="card-body mt-2">
              <div class="labels">Net_Value:</div>
              <h6 class="card-title">${b.adjustedClosePrice.value}</h6>
              <h6 class="card-title">${b.adjustedClosePrice.filtered}</h6>

              <div class="labels">previousClosePrice:</div>
              <h6 class="card-title">${b.previousClosePrice.value}</h6>
              <h6 class="card-title">${b.previousClosePrice.filtered}</h6>

              <div class="labels">percentNetChange:</div>
              <h6 class="card-title">${b.percentNetChange.value}</h6>
              <h6 class="card-title">${b.percentNetChange.filtered}</h6>

              <div class="labels">name:</div>
              <h6 class="card-title">${b.name.value}</h6>
              <h6 class="card-title">${b.name.filtered}</h6>

              <div class="labels">tradingStatus:</div>
              <h6 class="card-title">${b.tradingStatus.value}</h6>
              <h6 class="card-title">${b.tradingStatus.filtered}</h6>

              <div class="labels">netChange:</div>
              <h6 class="card-title">${b.netChange.value}</h6>
              <h6 class="card-title">${b.netChange.filtered}</h6>
            
              
              
              </div>
            </div>

        </div>`

          )
        .join("");

      return data;
    })
    .catch((error) => {
      // Handle errors here
    });
}
// }


// 

function set_timer() {
  let date = new Date();

  let timer = date.getTime();


  chrome.storage.sync.set(
    {
      timer: parseInt(timer),
    },
    function () { }
  );
}
// 
document
  .getElementById("refresh_stocks")
  .addEventListener("click", getRandomStocks);

function getRandomStocks(){
  getStockFunc();
}
// 


function getLocalStockFunc() {
  let stock_data_start = JSON.parse(localStorage.getItem("starList"));
  console.log(stock_data_start);
  if (stock_data_start == null) {
   
    set_timer();
    getStockFunc();
   
  } else {
   
    chrome.storage.sync.get(
      {
        timestamp: 0,
        timer: 1,
      },
      function (items) {
        let endTime = new Date();
        

        const last_time = endTime.getTime();
       
        let dt1 = items.timer;
      
        let diff = last_time - dt1 ;
       

        let diff_hours = diff/3600000
      
        

        if (diff_hours >= 12) {
         
          set_timer();
          getbeginnerFun();
        } else {
        
          let stock_data_start = JSON.parse(localStorage.getItem("starList"));
        
          document.getElementById("render_stocks").innerHTML = stock_data_start
          .map(
            (b) =>
              `<div class="col-md-6 mt-2">  
              <div class="card">        
                <div class="card-body mt-2">
                <h6 class="card-title"><h6 class="labels">Net_Value:</h6>${b.value}</h6>
              <h6 class="card-title">${b.filtered}</h6>
              <h6 class="card-title"><h6 class="labels">previousClosePrice:</h6>${b.value}</h6>
              <h6 class="card-title">${b.filtered}</h6>
              <h6 class="card-title"><h6 class="labels">Name:</h6>${b.value}</h6>
              <h6 class="card-title">${b.filtered}</h6>
              
              
                </div>
              </div>
  
          </div>`
  
            )
            .join("");
          return stock_data_start;
        }
      }
    );
  }
}



document.addEventListener("DOMContentLoaded", getLocalStockFunc);

