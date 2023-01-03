
//let horizBtn = document.querySelector(".horizontal-btns");

///////////////show more to the right and to the left ////////////////////////////



let sr = document.querySelector(".show-right");

sr.addEventListener('click', () => {



    sr.style.background = "#C0C0C0";



    horizBtn.scrollBy({ top: 0, left: 100, behavior: 'smooth' });


})
sr.addEventListener('mouseout', () => { sr.style.background = "none"; })

sr.addEventListener('mouseover', () => { sr.style.background = "#E0E0E0"; })

let horiz_parent = document.querySelector(".horiz-btn-parent");

horizBtn.onscroll = () => {

    //sr.style.display = "block";

    if (horizBtn.scrollLeft == 0) {

        sl.style.display = "none";

    }
    else {
        sl.style.display = "block";

    }

    if ((horizBtn.scrollLeft + horizBtn.offsetWidth) >= horizBtn.scrollWidth) {

        sr.style.display = "none";

    }
    else {
        sr.style.display = "block";
    }
}

let sl = document.querySelector(".show-left");
sl.addEventListener('click', () => {



    sl.style.background = "#C0C0C0";

    horizBtn.scrollBy({ top: 0, left: -100, behavior: 'smooth' });
})
sl.addEventListener('mouseout', () => { sl.style.background = "none"; })

sl.addEventListener('mouseover', () => { sl.style.background = "#E0E0E0"; })


