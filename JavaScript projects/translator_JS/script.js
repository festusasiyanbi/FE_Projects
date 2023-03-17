// Declaring all the required variables with a single 'const' keyword and seperating them with comma. The semi colon indicates the end of my delcaration

const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
           // selecting English as default as From language and Spanish as To language 
         let selected;
        if(id == 0 && country_code == "en-US") {
        selected = "selected";
        } else if( id == 1 && country_code == "fr-DZ") {
            selected = "selected";
        }
       let option = `<option value="${country_code}" ${selected} >${countries[country_code]}</option>`;
       tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
    }
});

exchangeIcon.addEventListener("click", () => {
    //exchanging(swapping) textarea and select tag values 
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
    fromText.value = toText.value;
    toText.value = tempText;
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value, // getting fromSelect Tag value
    translateTo = selectTag[1].value;  // getting toSelect Tag value
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // fetching api response and returning it with parsing into JS obj notation
    // and in another then method receiving that obj
        fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icons => {
    icons.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")) {
        // if clicked icon has from id, copy fromTextarea value else copy toTextarea value
            if(target.id == "from") {
            navigator.clipboard.writeText(fromText.value);
            } else {
            navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
        // if clicked icon has from id, speak the fromTextarea value else speak the toTextarea value
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // setting the utterance value to  the fromTextarea value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // setting the utterance value to  the toTextarea value
            } speechSynthesis.speak(utterance); // speak the passed utterance
        }
    });
});