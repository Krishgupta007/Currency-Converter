let dropdown = document.querySelectorAll(".selectoptions select");
let fromcur = document.querySelector("#from");
let tocurr = document.querySelector("#to");
// console.log(fromcurr);

for (let select of dropdown) {
  for (country in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = country;
    newoption.value = country;
    if ((select.name === "from") & (country === "USD")) {
      newoption.selected = true;
    } else if ((select.name === "to") & (country === "INR")) {
      newoption.selected = true;
    }
    select.append(newoption);
  }

  select.addEventListener("change", (e) => {
    updateflag(e.target);
  });
}

let updateflag = (selected) => {
  let countrycode = selected.value;
  let country = countryList[countrycode];
  let flagimg = selected.parentElement.querySelector("img");
  flagimg.src = `https://flagsapi.com/${country}/flat/32.png`;
};

let baseurl =
  "https://v6.exchangerate-api.com/v6/4fd9c54719f1627db5f0b711/latest/";

let exchangerate = async () => {
  let input = document.querySelector("#amount").value;
  if (input === "" || input <= 0) {
    input = 1;
  }
  let url = `${baseurl}${fromcur.value}`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data.conversion_rates[tocurr.value];
  let result = document.querySelector(".result p");
  result.innerText = `${input} ${fromcur.value} = ${(input * rate).toFixed(
    2
  )} ${tocurr.value}`;
  // console.log(result);
};

let btn = document.querySelector("#convert");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  exchangerate();
});

window.addEventListener("load", () => {
  exchangerate();
});
