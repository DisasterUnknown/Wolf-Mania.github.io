// Getting the buttons
const bergerBar = document.getElementById("menueIcon");
const cutAndExit = document.getElementById("exit");

const documentNavigationBar = document.getElementById("bergerNavigation");
const documentMainContent = document.getElementById("mainBody");

const topMangaSelect = document.getElementById("topSelection");
const nextPageBtn1 = document.getElementById("nextBtn1");
const nextPageBtn2 = document.getElementById("nextBtn2");

const buttonMangaSelect = document.getElementById("buttonSelection");
const prevPageBtn1 = document.getElementById("prevBtn1");
const prevPageBtn2 = document.getElementById("prevBtn2");


// Loading the page from the last red chapter 
function chapterOnLoad() {
    const mangaTopic = document.getElementById("chapterName");
    let mangaName = (mangaTopic.innerHTML).replace(` Chapter 1`, '');


    // Checking if there is local storage revelent to this mangaName
    try {
        let localData = localStorage.getItem(mangaName);
        localData = JSON.parse(localData);

        let newChapter = localData[0].newChapter;
        let oldChapter = 1;

        pageNavigation(newChapter, oldChapter, mangaTopic);
        updateChapter(newChapter);

    } catch {   // else
        console.log("No Local data Yet!!");
    }
}

window.onload = chapterOnLoad;


// Function to the next page
function pageNavigation(newChapter, oldChapter, mangaTopic) {
    const totalChapters = (document.getElementById("totalChapters")).innerHTML;

    if (newChapter > 0) {
        if (newChapter <= totalChapters) {
            let mangaName = (mangaTopic.innerHTML).replace(` Chapter ${oldChapter}`, '');
            mangaTopic.innerText = `${mangaName} Chapter ${newChapter}`;

            // Making the img section empty
            const images = document.getElementById("mangaImages");
            images.innerHTML = "";

            // Adding the imgs src's to the html img tages
            function imageAdder(data) {
                let htmlTag = '';

                data.forEach(link => {
                    htmlTag += `<img src="${link}" alt="img1">`
                });

                images.innerHTML = htmlTag;
            }

            // Getting the imgs from the JSON files 
            fetch(`../../JSON/${mangaName}/Chapter ${newChapter}.json`)
                .then(res => res.json())
                .then(data => imageAdder(data))

            // Pushing to local storage 
            pageData = []
            pageData.push({ mangaName, newChapter })
            pageData = JSON.stringify(pageData);
            localStorage.setItem(mangaName, pageData);
        }
    }
}

// Funtion to go to the next page 
function nextPage() {
    // Getting the manga chapter
    const mangaTopic = document.getElementById("chapterName");
    let chapter = parseInt((mangaTopic.innerHTML).replace(/\D/g, ''));

    let newChapter = chapter + 1;
    let oldChapter = chapter;

    pageNavigation(newChapter, oldChapter, mangaTopic);
    updateChapter(newChapter);
}

// Funtion to go to the previous page
function prevPage() {
    // Getting the manga chapter
    const mangaTopic = document.getElementById("chapterName");
    let chapter = parseInt((mangaTopic.innerHTML).replace(/\D/g, ''));

    let newChapter = chapter - 1;
    let oldChapter = chapter;

    pageNavigation(newChapter, oldChapter, mangaTopic);
    updateChapter(newChapter);
}

// Changing the selected opption
function mangaSelect() {
    // Geting the selected chapter number 
    const selectedOption = this.options[this.selectedIndex].text;
    let chapter = parseInt(selectedOption.replace(/\D/g, ''));

    // Getting the current chapter number 
    const mangaTopic = document.getElementById("chapterName");
    let oldChapter = parseInt((mangaTopic.innerHTML).replace(/\D/g, ''));

    // Scroling to the top of the web page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });


    // Calling for chapter update and page update funtions
    pageNavigation(chapter, oldChapter, mangaTopic);
    updateChapter(chapter);
}

// Updating the current chapter
function updateChapter(newChapter) {
    const topChapters = document.querySelectorAll("#topSelection option");
    const bottomChapters = document.querySelectorAll("#buttonSelection option");

    // Adding selected for the options 
    function updateChapterOption(chapters) {
        const totalChapters = (document.getElementById("totalChapters")).innerHTML;

        if (newChapter <= totalChapters) {
            chapters.forEach((chapter, index) => {
                chapter.selected = false;
            })

            chapters[newChapter - 1].selected = true;
        }
    }

    updateChapterOption(topChapters);
    updateChapterOption(bottomChapters);
}

// Hamberger bar Navigations
function bergerBarNavigation() {
    // Changing the display settings
    documentMainContent.setAttribute("class", "notDisplay");
    documentNavigationBar.setAttribute("class", "doDisplay");

    cutAndExit.addEventListener("click", function () {
        documentMainContent.setAttribute("class", "");
        documentNavigationBar.setAttribute("class", "notDisplay");
    });
}

// Mouse cussor change 
function cursorShange() {
    bergerBar.style.cursor = 'pointer';
    cutAndExit.style.cursor = 'pointer';
}

// Calling the funtions
bergerBar.addEventListener("click", bergerBarNavigation);

bergerBar.addEventListener("mouseover", cursorShange);
cutAndExit.addEventListener("mouseover", cursorShange);

topMangaSelect.addEventListener("change", mangaSelect);
nextPageBtn1.addEventListener("click", nextPage);
nextPageBtn2.addEventListener("click", nextPage);

buttonMangaSelect.addEventListener("change", mangaSelect);
prevPageBtn1.addEventListener("click", prevPage);
prevPageBtn2.addEventListener("click", prevPage);