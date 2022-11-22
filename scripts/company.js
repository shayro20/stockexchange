const webParameter = new URLSearchParams(window.location.search);
const symbol = webParameter.get("symbol");
const headLine = document.getElementById("title");
const describe = document.getElementById("describe");
const picture = document.getElementById("pic");
const site = document.getElementById("site");
const stock = document.getElementById("price");
const prcntChange = document.getElementById("percentage");
const urlMe =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
const historyUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/";
getFace();
async function getFace() {
  const res = await fetch(urlMe + symbol);
  const data = await res.json();
  console.log(data.profile);
  const name = data.profile.companyName;
  const image = data.profile.image;
  const description = data.profile.description;
  const link = data.profile.website;
  const stockprice = data.profile.price;
  const change = Number(data.profile.changesPercentage);
  const changeD = change.toFixed(2)
  headLine.innerHTML = name;
  picture.src = image;
  site.href = link;
  site.innerHTML = `Company Website`;
  describe.innerHTML = description;
  stock.innerHTML = `Stock Price: $`+stockprice;
  if (changeD > 0) {
    prcntChange.innerHTML = `(+${changeD}` + `%)`;
    prcntChange.classList.add("text-success");
  } else {
    prcntChange.innerHTML = `(${changeD}` + `%)`;
    prcntChange.classList.add("text-danger");
  }
}

async function histroyFetch() {
  const response = await fetch(historyUrl + symbol + `?serietype=line`);
  const historyData = await response.json();
  const history = historyData.historical;
  console.log(historyData);
  setTimeout(() => {chart(history);
    
  }, 2000);
}
histroyFetch();

function chart(arr) {
  const labels = [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Price History",
        fill: 'origin',
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
  document.getElementById("spinner-two").classList.add("visually-hidden")
}
