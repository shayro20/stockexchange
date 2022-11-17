const form = document.querySelector("form");
const result = document.getElementById("results");
const spinner = document.getElementById("spinner");
const marqueeText = document.getElementById("marquee");
console.log(marqueeText);
let baseUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
marqueeFetch();
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
  if (data.length === 0) {
    spinner.classList.add("visually-hidden");
  } else {
    for (let i = 0; i < data.length; i++) {
      getFace(data[i].symbol);
    }
  }
}

async function getFace(info) {
  let res = await fetch(urlMe + info);
  let infoOne = await res.json();
  console.log(infoOne);
  ResultShow(infoOne);
}
function ResultShow(srchArr) {
  const name = srchArr.profile.companyName;
  const logo = srchArr.profile.image;
  const symbol = srchArr.symbol;
  const change = srchArr.profile.changesPercentage;
  let changeNum = Number(change);
  const container = document.createElement("div");
  container.classList.add("border-bottom");
  const symbolAndChngeContainer = document.createElement("div");
  symbolAndChngeContainer.classList.add("text-change");
  const elmentSymbol = document.createElement("span");
  elmentSymbol.innerHTML = `(${symbol}l)`;
  const elmentChange = document.createElement("span");
  elmentChange.innerHTML =
    changeNum > 0
      ? `(+${changeNum.toFixed(2)}` + `%)`
      : `(${changeNum.toFixed(2)}` + `%)`;
  elmentChange.classList = change > 0 ? "text-success" : "text-danger";
  const elmentLogo = document.createElement("img");
  elmentLogo.src = logo;
  const elmentLink = document.createElement("a");
  elmentLink.href = "./pages/company.html?symbol=" + srchArr.symbol;
  elmentLink.innerHTML = name;
  result.append(container);
  container.append(elmentLogo);
  container.append(elmentLink);
  container.append(symbolAndChngeContainer);
  symbolAndChngeContainer.append(elmentSymbol, elmentChange);
  spinner.classList.add("visually-hidden");
}

// marquee
async function marqueeFetch() {
  let markPonse = await fetch(baseUrl + "quotes/nyse");
  let markData = await markPonse.json();
  console.log(markData);
  for (let z = 0; z < 200; z++) {
    let mSymbol = markData[z].symbol;
    let mPrice = markData[z].price;

    const markP = document.createElement("span");
    markP.innerHTML = `(${mPrice}$)`;
    markP.classList = "text-success";
    markP.setAttribute("id", "marge");
    console.log(markP);
    const markS = document.createElement("span");
    markS.innerHTML = mSymbol;
    marqueeText.append(markS);
    marqueeText.append(markP);
  }
}
