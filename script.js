const apiKey = "7c4582eeafedabcc9f895c14";
const base_url =  `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;


const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (let curCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        
        // Set default selections
        if (select === fromCurr && curCode === "USD") {
            newOption.selected = true;
        } else if (select === toCurr && curCode === "INR") {
            newOption.selected = true;
        }
        
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${base_url}${fromCurr.value}`;
    let response = await fetch(URL);
 
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
