class SearchForm {
  constructor(formContain) {
    this.result = document.getElementById("results");
    this.formContain = formContain;
    this.form = document.createElement("form");
    this.searchBarContainer = document.createElement("div");
    this.input = document.createElement("input");
    this.button = document.createElement("button");
    this.spin = document.createElement("div");
    this.spinnerStyle = document.createElement("span");
    this.baseUrl =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
    this.searchParm = new URLSearchParams({
      query: "",
      limit: 10,
      exchange: "NASDAQ",
    });
  }
  load() {
    this.setForm();
    this.setButton();
    this.setInput();
    this.setSpinner();
    this.apends();
  }

  setForm() {
    this.searchBarContainer.classList.add("input-group");
    this.searchBarContainer.classList.add("mb-3");
    this.searchBarContainer.classList.add("input-group");
    this.searchBarContainer.classList.add("mb-3");
  }
  setButton() {
    this.button.classList = "btn btn-outline-info";
    this.button.type = "submit";
    this.button.id = "button-addon2";
    this.button.innerText = "Search";
  }
  setInput() {
    this.input.type = "text";
    this.input.value = "";
    this.input.classList.add("form-control");
    this.input.id = "input";
  }
  setSpinner() {
    this.spin.id = "spinner";
    this.spin.classList =
      "spinner-border text-primary d-block m-auto visually-hidden";
    this.spin.role = "status";
    this.spinnerStyle.classList = "visually-hidden";
    this.spinnerStyle.innerText = "Loading...";
  }
  apends() {
    this.spin.append(this.spinnerStyle);
    this.searchBarContainer.append(this.input);
    this.searchBarContainer.append(this.button);
    this.form.append(this.searchBarContainer);
    this.form.append(this.spin);
    this.formContain.append(this.form);
  }
  onSearch(callback) {
    this.formContain.addEventListener("submit", (e) => {
      e.preventDefault();
      const stockSearch =
        this.formContain.getElementsByTagName("input")[0].value;
      console.log(stockSearch);
      this.fetchIt(stockSearch,callback);
      this.spin.classList.remove("visually-hidden");
    });
  }
  async fetchIt(query,callback, term = "search?") {
    this.result.innerHTML = "";
    this.searchParm.set("query", query);
    const res = await fetch(this.baseUrl + term + this.searchParm.toString());
    const data = await res.json();
    if (data.length === 0 || !query) {
      this.spin.classList.add("visually-hidden");
    } else {
      for (let i = 0; i < data.length; i++) {
        callback(data[i].symbol)
      }
    }
  }
}
