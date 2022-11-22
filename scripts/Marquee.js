class Marquee {
  constructor(marquee) {
    this.marquee = marquee;
  }

  async load() {
    const baseUrl =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
    const markPonse = await fetch(baseUrl + "quotes/nyse");
    const markData = await markPonse.json();
    this.createMarquee(markData)
  }

  createMarquee(arr) {
    for (let z = 0; z < 200; z++) {
      const mSymbol = arr[z].symbol;
      const mPrice = arr[z].price;
      const markP = document.createElement("span");
      markP.innerHTML = `(${mPrice}$)`;
      markP.classList = "text-success";
      markP.setAttribute("id", "marge");
      const markS = document.createElement("span");
      markS.innerHTML = mSymbol;
      this.marquee.append(markS);
      this.marquee.append(markP);
    }
  }
}
