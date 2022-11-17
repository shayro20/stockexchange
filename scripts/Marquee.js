class Marquee{
    constructor(marquee){
        this.marquee=marquee}
        
        async marqueeFetch() {
    baseUrl =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
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
    this.marquee.append(markS);
    this.marquee.append(markP);
  }
}}


