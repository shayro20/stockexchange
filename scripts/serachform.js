class SearchForm {
  constructor() {}
  load() {
    // creations
    const fullForm = document.getElementById("form");
    const form = document.createElement("form");
    const searchBarContainer = document.createElement("div");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const spin = document.createElement("div");
    const spinnerStyle = document.createElement("span");

    // form searchBarContainer
    searchBarContainer.classList.add("input-group");
    searchBarContainer.classList.add("mb-3");
    // div
    searchBarContainer.classList.add("input-group");
    searchBarContainer.classList.add("mb-3");
    // button
    button.classList = "btn btn-outline-info";
    button.type = "submit";
    button.id = "button-addon2";
    button.innerText = "Search";
    // input
    input.type = "text";
    input.value = "";
    input.classList.add("form-control");
    // spinner
    spin.id = "spinner";
    spin.classList =
      "spinner-border text-primary d-block m-auto visually-hidden";
    spin.role = "status";
    spinnerStyle.classList = "visually-hidden";
    spinnerStyle.innerText = "Loading...";
    // apends
    spin.append(spinnerStyle);
    searchBarContainer.append(input);
    searchBarContainer.append(button);
    form.append(searchBarContainer);
    form.append(spin);
    fullForm.append(form);
    this.spinner = document.getElementById("spinner");
  }
}
