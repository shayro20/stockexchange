const webParameter = new URLSearchParams(window.location.search);
let symbol = webParameter.get("symbol");
const headLine = document.getElementById("title");
const describe = document.getElementById("describe");
const picture = document.getElementById("pic");
const site = document.getElementById("site");
const stock = document.getElementById("price");
const prcntChange = document.getElementById("percentage");
const urlMe =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
const historyUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/"
getFace();
async function getFace() {
  let res = await fetch(urlMe + symbol);
  let data = await res.json();
  console.log(data.profile);
  const name = data.profile.companyName;
  const image = data.profile.image;
  const description = data.profile.description;
  const link = data.profile.website;
  const stockprice = data.profile.price;
  const change = data.profile.changesPercentage;
  headLine.innerHTML = name;
  picture.src = image;
  site.href = link;
  site.innerHTML = name;
  describe.innerHTML = description;
  stock.innerHTML = stockprice;
  if (change>0){
    prcntChange.innerHTML= change+`%`
    prcntChange.classList.add("text-success")
  }
  else{
    prcntChange.innerHTML= change+`%`
    prcntChange.classList.add("text-danger")

  }
}
// ${symbol}?serietype=line"
async function histroyFetch() {
    let response=await fetch(historyUrl+symbol)
    
}