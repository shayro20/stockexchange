const form = document.querySelector("form");
const result = document.getElementById("results");
const spinner = document.getElementById("spinner")
let baseUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let stockSearch = form.getElementsByTagName("input")[0].value;
  fetchIt(stockSearch);
  spinner.classList.remove("visually-hidden")
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
  console.log(data)
  ResultShow(data);
}
function ResultShow(data) {
  for (let i = 0; i < data.length; i++) {
    const name = data[i].name;
    const symbol = data[i].symbol;
    const elmentNew = document.createElement("a");
    elmentNew.href = "/pages/company.html";
    elmentNew.innerHTML = `${name}(${symbol})`;
    result.append(elmentNew)
    elmentNew.classList.add("d-block")
    spinner.classList.add("visually-hidden")
  }
}
