class CompanyInfo {
  constructor(container, symbol) {
    // div and the symbol from the call
    this.container = container;
    this.symbol = symbol;
    // picture and headline
    this.picAndHead = document.createElement("div");
    this.icon = document.createElement("img");
    this.head = document.createElement("div");
    // stock price and percentage
    this.stockContain = document.createElement("div");
    this.stockPrice = document.createElement("span");
    this.stockPercent = document.createElement("span");
    // description
    this.paragraph = document.createElement("p");
    // website link
    this.linkContainer = document.createElement("div");
    this.linkBtn = document.createElement("button");
    this.webLink = document.createElement("a");
    // chart
    this.chartContainer = document.createElement("div");
    this.chartCanvas = document.createElement("canvas");
    //spinner
    this.spinner = document.createElement("div");
    this.spinnerSpan = document.createElement("span");

    this.urlMe =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
    this.historyUrl =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/";
  }
  load() {
    this.setHeader();
    this.setStock();
    this.setParagraph();
    this.setWebLink();
    this.setChart();
    this.setSpinner();
    this.appendIt();
  }
  // picture and headline
  setHeader() {
    this.picAndHead.classList = "d-flex justify-content-start mb-5";
    this.icon.id = "pic";
    this.head.classList = "text-center display-4 ms-5";
    this.head.id = "title";
    this.picAndHead.append(this.icon);
    this.picAndHead.append(this.head);
  }
  // stock price and percentage
  setStock() {
    this.stockContain.classList = "fs-3 mb-5";
    this.stockPrice.id = "price";
    this.stockPercent.id = "percentage";
    this.stockContain.append(this.stockPrice);
    this.stockContain.append(this.stockPercent);
  }
  // description
  setParagraph() {
    this.paragraph.classList = "fs-5";
    this.paragraph.id = "describe";
  }
  // website link
  setWebLink() {
    this.linkContainer.classList = "d-flex justify-content-center";
    this.linkBtn.type = "button";
    this.linkBtn.classList = "btn btn-info";
    this.webLink.classList =
      "text-decoration-none text-center text-light border border-info fs-5";
    this.webLink.id = "site";
    this.linkBtn.append(this.webLink);
    this.linkContainer.append(this.linkBtn);
  }
  // chart
  setChart() {
    this.chartCanvas.id = "myChart";
    this.chartContainer.append(this.chartCanvas);
  }
  //spinner
  setSpinner() {
    this.spinner.id = "spinner-two";
    this.spinner.classList = "d-block m-auto spinner-grow text-info";
    this.spinner.role = "status";
    this.spinnerSpan.classList = "visually-hidden";
    this.spinnerSpan.innerText = "Loading...";
    this.spinner.append(this.spinnerSpan);
  }
  appendIt() {
    this.container.append(this.picAndHead);
    this.container.append(this.stockContain);
    this.container.append(this.paragraph);
    this.container.append(this.linkContainer);
    this.container.append(this.chartContainer);
    this.container.append(this.spinner);
    this.getFace();
  }

  // -----FETCH--------------------------------
  async getFace() {
    const res = await fetch(this.urlMe + this.symbol);
    const data = await res.json();
    const {
      companyName: name,
      image,
      description,
      website: link,
      price: stockPrice,
    } = data.profile;
    const change = Number(data.profile.changesPercentage);
    const changeD = change.toFixed(2);
    this.head.innerHTML = name;
    this.icon.src = image;
    this.webLink.href = link;
    this.webLink.innerHTML = `Company Website`;
    this.paragraph.innerHTML = description;
    this.stockPrice.innerHTML = `Stock Price: $` + stockPrice;
    if (changeD > 0) {
      this.stockPercent.innerHTML = `(+${changeD}` + `%)`;
      this.stockPercent.classList.add("text-success");
    } else {
      this.stockPercent.innerHTML = `(${changeD}` + `%)`;
      this.stockPercent.classList.add("text-danger");
    }
  }

  // // -------CHART------------------------------------------------

  async addChart() {
    const response = await fetch(
      this.historyUrl + this.symbol + `?serietype=line`
    );
    const historyData = await response.json();
    const history = historyData.historical;
    setTimeout(() => {
      this.chart(history);
    }, 1500);
  }
  chart(arr) {
    const labels = [];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Stock Price History",
          fill: "origin",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [],
        },
      ],
    };
    const scale = data.datasets[0].data;
    for (let i = 0; i < arr.length; i++) {
      labels.push(arr[i].date);
      scale.push(arr[i].close);
    }

    const config = {
      type: "line",
      data: data,
      options: {},
    };
    const myChart = new Chart(document.getElementById("myChart"), config);
    this.spinner.classList.add("visually-hidden");
  }
}
