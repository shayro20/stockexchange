class SearchResult {
  constructor() {
    this.result = document.getElementById("results");
    this.baseUrl =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
    this.urlMe =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
    this.searchParm = new URLSearchParams({
      query: "",
      limit: 10,
      exchange: "NASDAQ",
    });
  }

  //   static result = document.getElementById("results");

  async fetchIt(query, term = "search?") {
    this.result.innerHTML = "";
    this.searchParm.set("query", query);
    let res = await fetch(this.baseUrl + term + this.searchParm.toString());
    let data = await res.json();
    if (data.length === 0 || !query) {
      const spinnerTake = document.getElementById("spinner");
      spinnerTake.classList.add("visually-hidden");
    } else {
      for (let i = 0; i < data.length; i++) {
        this.getFace(data[i].symbol);
      }
    }
  }

  async getFace(info) {
    let res = await fetch(this.urlMe + info);
    let infoOne = await res.json();
    console.log(infoOne);
    this.ResultShow(infoOne);
  }
  ResultShow(srchArr) {
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
    this.result.append(container);
    container.append(elmentLogo);
    container.append(elmentLink);
    container.append(symbolAndChngeContainer);
    symbolAndChngeContainer.append(elmentSymbol, elmentChange);
    const spinnerTake = document.getElementById("spinner");
    spinnerTake.classList.add("visually-hidden");
  }

  loader() {
    const forms = document.getElementById("form");
    forms.addEventListener("submit", (e) => {
      e.preventDefault();
      let stockSearch = forms.getElementsByTagName("input")[0].value;
      this.fetchIt(stockSearch);
      const spinnerTake = document.getElementById("spinner");
      spinnerTake.classList.remove("visually-hidden");
    });
  }
}
