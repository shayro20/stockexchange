const form = document.querySelector("form");
const result = document.getElementById("results");
const spinner = document.getElementById("spinner");
let baseUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
const urlMe =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let stockSearch = form.getElementsByTagName("input")[0].value;
  fetchIt(stockSearch);
  spinner.classList.remove("visually-hidden");
});
const searchParm = new URLSearchParams({
  query: "AA",
  limit: 10,
  exchange: "NASDAQ",
});

async function fetchIt(query, term = "search?") {
  result.innerHTML = "";
  searchParm.set("query", query);
  let res = await fetch(baseUrl + term + searchParm.toString(), {});
  let data = await res.json();
  console.log(data);
  getFace(data);
}

async function getFace(info) {
  let resultStyle = [];
  for (let i = 0; i < info.length; i++) {
    let res = await fetch(urlMe + info[i].symbol);
    let infoOne = await res.json();
    resultStyle.push(infoOne);
    console.log(infoOne);
  }
  ResultShow(resultStyle);
  console.log(resultStyle);
}
function ResultShow(srchArr) {
  for (let i = 0; i < srchArr.length; i++) {
    const name = srchArr[i].profile.companyName;
    const logo = srchArr[i].profile.image;
    const symbol = srchArr[i].symbol;
    const change = srchArr[i].profile.changesPercentage;
    let changeNum =Number(change)
    const container = document.createElement("div");
    const symbolAndChngeContainer =document.createElement("div");
    const elmentSymbol = document.createElement("span");
    elmentSymbol.innerHTML = `(${symbol}l)`;
    const elmentChange = document.createElement("span");
    elmentChange.innerHTML =
    changeNum > 0 ? `(+${changeNum.toFixed(2)}` + `%)` : `(${changeNum.toFixed(2)}` + `%)`;
    elmentChange.classList = change > 0 ? "text-success" : "text-danger";
    const elmentLogo = document.createElement("img");
    elmentLogo.src = logo;
    const elmentLink = document.createElement("a");
    elmentLink.href = "./pages/company.html?symbol=" + srchArr[i].symbol;
    elmentLink.innerHTML = name;
    result.append(container);
    container.append(elmentLogo);
    container.append(elmentLink);
    container.append(symbolAndChngeContainer)
    symbolAndChngeContainer.append(elmentSymbol,elmentChange)

  }
  spinner.classList.add("visually-hidden");
}

