class SearchResult {
  constructor() {
    this.input = document.getElementById("input");
    this.spinnerTake = document.getElementById("spinner");
    this.result = document.getElementById("results");
    this.baseUrl =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
    this.urlMe =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";

    this.forms = document.getElementById("form");
  }
  renderResults(str) {
    this.getFace(str);
    console.log(this.input.value);
  }
  async getFace(info) {
    const res = await fetch(this.urlMe + info);
    const infoOne = await res.json();
    this.ResultShow(infoOne);
  }
  ResultShow(srchArr) {
    const {
      companyName: name,
      image: logo,
      changesPercentage: change,
    } = srchArr.profile;
    const symbol = srchArr.symbol;
    const changeNum = Number(change);
    const {container, symbolAndChngeContainer} = this.createContainers();
    const elmentSymbol = this.createSymbol(symbol);
    const elmentChange = this.createPercentage(changeNum);
    const elmentLogo = this.createImg(logo);
    const elmentLink = this.createName(name, symbol);
    console.log(elmentLink);
    const returns = {
      container,
      symbolAndChngeContainer,
      elmentSymbol,
      elmentChange,
      elmentLogo,
      elmentLink,
    };
    this.appendIt(returns);
  }
  createContainers() {
    const container = document.createElement("div");
    container.classList.add("border-bottom");
    const symbolAndChngeContainer = document.createElement("div");
    symbolAndChngeContainer.classList.add("text-change");
    return {container, symbolAndChngeContainer};
  }
  createSymbol(symbol) {
    const elmentSymbol = document.createElement("span");
    elmentSymbol.innerHTML = `(${symbol})`;
    elmentSymbol.innerHTML = this.highlight(elmentSymbol);
    return elmentSymbol;
  }
  createPercentage(changeNum) {
    const elmentChange = document.createElement("span");
    elmentChange.innerHTML =
      changeNum > 0
        ? `(+${changeNum.toFixed(2)}` + `%)`
        : `(${changeNum.toFixed(2)}` + `%)`;
    elmentChange.classList = changeNum > 0 ? "text-success" : "text-danger";
    return elmentChange;
  }
  createImg(logo) {
    const elmentLogo = document.createElement("img");
    elmentLogo.src = logo;
    return elmentLogo;
  }
  createName(name, symbol) {
    const elmentLink = document.createElement("a");
    elmentLink.href = "./pages/company.html?symbol=" + symbol;
    elmentLink.innerHTML = name;
    elmentLink.innerHTML = this.highlight(elmentLink);
    return elmentLink;
  }
  highlight(text) {
    const put = this.input.value.trim();
    const re = new RegExp(`${put}`, "gi");
    const newText = text.innerHTML.replace(re, `<mark>$&</mark>`);
    return newText;
  }
  appendIt(obj) {
    this.result.append(obj.container);
    obj.container.append(obj.elmentLogo);
    obj.container.append(obj.elmentLink);
    obj.container.append(obj.symbolAndChngeContainer);
    obj.symbolAndChngeContainer.append(obj.elmentSymbol, obj.elmentChange);
    this.spinnerTake.classList.add("visually-hidden");
  }
}
