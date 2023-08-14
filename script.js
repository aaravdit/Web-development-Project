const quoteText = documentSelector(".quote"),
authorName = document.querySelector(".name"),
quoteBtn = document.querySelector("button"),
speechBtn = document.querySelector("speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;

// random quote function
function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote....";
    // fetching random quotes/data from the API and parsing it into
    fetch("https://api.quotable.io/random").then(response =>response.json()).then(result =>{
    quoteText.innerText = result.content;
    authorName.innerText= result.author;
    quoteBtn.innerText = "NewQuote";
    quoteBtn.classList.remove("loading"); 
});
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new
        SpeechSynthesisUtterance('${quoteText.innerText} by ${authorName.innerText}');
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ?
speechBtn.classList.remove("active"):
speechBtn.classList.add("active");
        },10);
    }
    });

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let TweetUrl = 'https://twitter.com/intent/tweet? url=${quoteText.innerText}';
    window.open(TweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);