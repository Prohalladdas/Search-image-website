let accesskey = 'emrtNfTuDHOSwDmpG4psLX0QWoLuq7U4JHla_wukEJw';
let Searchform = document.querySelector("form");
let imagesContainer = document.querySelector(".images-Container");
let searchInput = document.querySelector(".search-Input");
let loadMore = document.querySelector(".loadMore");

let page = 1;
//fetch API link image
let fetchImage = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imagesContainer.innerHTML = '';
        };

        let ApiLink = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=28&page=${pageNo}&client_id=${accesskey}`);
        let response = await ApiLink.json();

        if (response.results.length > 0) { //agar results hain toh image show karo elese 404 <--

            response.results.forEach(photo => {
                //create div for image store
                let imageElement = document.createElement("div");
                imageElement.classList.add("imageContent");
                imageElement.innerHTML = `<img src="${photo.urls.regular}"/> `;
                imagesContainer.appendChild(imageElement);

                //creating div for hover effect
                let overleyElement = document.createElement("div");
                overleyElement.classList.add("overleyHover");
                imageElement.appendChild(overleyElement);

                //create div for hover text
                let overleyHoverText = document.createElement('h3');
                overleyHoverText.innerText = `${photo.alt_description}`;
                overleyElement.appendChild(overleyHoverText);
            });

            // agar image or nehi hai to load more btn display none
            if (response.total_pages === pageNo) {
                loadMore.style.display = "none"
            } else {
                loadMore.style.display = "block"
            };

        } else {
            imagesContainer.innerHTML = `<h3>Your item is not found</h3>`;
            loadMore.style.display = "none"
        };

    } catch (error) {
        imagesContainer.innerHTML = `<h3>Failed searching,please try again</h3>`;
    };
};

//AddEventListener to search form
Searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = searchInput.value.trim();

    if (inputValue !== '') {
        page = 1;
        fetchImage(inputValue, page);
    } else {
        imagesContainer.innerHTML = `<h3>Please enter your item</h3>`;

        // agar koi value na dekar search kare toh load more btn hide 
        if (loadMore.style.display === 'block') {
            loadMore.style.display = 'none'
        }
    };

});

//Click event loadMore btn + second more images load '++'
loadMore.addEventListener("click", () => {
    fetchImage(searchInput.value.trim(), ++page);
})