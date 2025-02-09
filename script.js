const newsApiKey = "41bf0f28cf484a23bb39abd7cca431bf";
// The News API only works locally and not on GitHub Pages. Read README.md for a detailed explanation.
const quoteUrl = "https://famous-quotes4.p.rapidapi.com/random?category=all&count=1";
const quoteHeaders = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'da48073ae3mshdef0165ae8ccdcdp10cc1bjsn03e1d1cc685f',
        'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com'
    }
};

document.getElementById("new-quote").addEventListener("click", fetchQuote);
document.getElementById("fetch-news").addEventListener("click", fetchNews);

async function fetchQuote() {
    try {
        const response = await fetch(quoteUrl, quoteHeaders);
        const data = await response.json();
        document.getElementById("quote").innerText = `"${data[0].text}" - ${data[0].author}`;
        document.getElementById("quote").style.opacity = 1;
        document.getElementById("quote").style.transition = "opacity 0.5s ease-in-out";
    } catch (error) {
        document.getElementById("quote").innerText = "Failed to load quote.";
    }
}

async function fetchNews() {
    const category = document.getElementById("news-category").value;
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${newsApiKey}`;
    
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        const newsList = document.getElementById("news-list");
        newsList.innerHTML = "";

        data.articles.slice(0, 5).forEach(article => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${article.title}</strong><br><a href="${article.url}" target="_blank">Read more</a>`;
            newsList.appendChild(li);
        });
    } catch (error) {
        document.getElementById("news-list").innerHTML = "<li>Failed to load news.</li>";
    }
}

fetchQuote();
