


copy.addEventListener("click", () => {
    const anchortagtocopytext = document.getElementById("shortenedURL");

    const copytext = anchortagtocopytext.getAttribute("href")
    const missing=document.getElementsByClassName("missing")[0]
    const div=document.createElement("div")
    div.className="line"
    missing.append(div)
    navigator.clipboard.writeText(copytext)
        .then(() => {
            missing.style.opacity = 1

            setTimeout(() => {
                missing.style.opacity = 0

            }, 2000)
        })
        .catch(alert)

})

// Example usage:



