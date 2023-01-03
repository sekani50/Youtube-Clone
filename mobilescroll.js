////////////////////////////scrolling effects in mobile view////////////////////////////////////

let vidBox = document.querySelector(".videos-box");

let initialScroll = window.scrollY;
//console.log(initialScroll);
vidBox.addEventListener('scroll', () => {

    let newScroll = vidBox.scrollTop;

    let footer = document.querySelector(".footer");

    if (document.body.clientWidth <= 450 && newScroll > initialScroll) {


        footer.classList.remove('max-\[450px\]\:block');


    }
    else {

        footer.classList.add('max-\[450px\]\:block');
    }

    let head = document.querySelector(".top-head");


    if (document.body.clientWidth <= 450 && newScroll > (initialScroll + 150)) {



        head.classList.add("hidden");
        horizBtn.classList.add("hidden");
    }
    else {




        head.classList.remove("hidden");
        horizBtn.classList.remove("hidden");
    }

})

