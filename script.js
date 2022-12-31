// JavaScript source code
let vid;

let api_key = 'AIzaSyCWhlGB129Dya9kzohmOC3h8tQ2ruWW5qA';

async function fetchData() {

    const option = {

        'method': 'GET',
        'Access-Control-Allow-Origin': '*'
    }

    let response = await fetch('https://www.googleapis.com/youtube/v3/videos?' + new URLSearchParams({

        key: api_key,
        part: 'snippet,statistics',
        chart: 'mostPopular',
        maxResults: 50,
        regionCode: 'NG'
    }), option)

    let data = await response.json();

    //console.log(data);

    await new Promise((resolve, reject) => setTimeout(resolve, 2000));

    new Videos(data.items).getChannelThumb();


    let subResponse = await fetch('https://www.googleapis.com/youtube/v3/videos?' + new URLSearchParams({

        key: api_key,
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 10,
        regionCode: 'NG'
    }), option)

    let subData = await subResponse.json();

    getChannels(subData.items);





}

fetchData();



//vid.showVideos();

class Videos {

    th = 1000;
    ml = 1000000;
    displayHoverEffect = displayHoverEffect;
    constructor(video) {
        this.th;
        this.ml;
        this.video = video;
    }

    calcViews(views) {
        //123456789
        let refinedView;
        //count length
        let length = views.toString().length
        //if length is 1 or 2 or 3
        length <= 3 ? refinedView = views + " views" : false
        //or length is 4 ,5 or 6
        length > 3 && length <= 6 ? refinedView = (views / this.th).toFixed(1) + "K views" : false;
        // or length is 7, 8,9
        length > 6 && length <= 9 ? refinedView = (views / this.ml).toFixed(1) + "M views" : false;
        // or more
        length > 9 ? refinedView = views.toFixed(1) + "B views" : false;

        return refinedView;
    };


    calcDate(date) {

        let dateReleased;

        let dt = new Date(date).getTime()

        let now = new Date().getTime();

        let milliReleased = now - dt


        let years = Math.floor(milliReleased / (1000 * 60 * 60 * 24 * 365));
        let months = Math.floor(milliReleased / (1000 * 60 * 60 * 24 * 30));
        let weeks = Math.floor(milliReleased / (1000 * 60 * 60 * 24 * 7));
        let days = Math.floor(milliReleased / (1000 * 60 * 60 * 24));

        let hours = Math.floor((milliReleased % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        let min = Math.floor((milliReleased % (1000 * 60 * 60)) / (1000 * 60));

        let sec = Math.floor((milliReleased % (1000 * 60)) / 1000);

        if (years >= 1) {
            
            years == 1? dateReleased = years + " year ago": dateReleased = years + " years ago";
            
        } else if (months >= 1) {
            
            months == 1? dateReleased = months + " month ago": dateReleased = months + " months ago";
            
        } else if (weeks >= 1) {
            
            weeks == 1?  dateReleased = weeks + " week ago":  dateReleased = weeks + " weeks ago";
           
        } else if (days >= 1) {
            
            days == 1? dateReleased = days + " day ago": dateReleased = days + " days ago";
            
        } else if (hours >= 1) {
            
            hours == 1?  dateReleased = hours + " hour ago":  dateReleased = hours + " hours ago";
           
        } else if (min >= 1) {
            
            min == 1? dateReleased = min + " minute ago": dateReleased = min + " minutes ago";
            
        } else {
            
            sec == 1?  dateReleased = sec + " second ago":  dateReleased = sec + " seconds ago";
           
        }

        return dateReleased;
    }

    getChannelThumb() {
        this.video.forEach((value) => {

            const option = {

                'method': 'GET',
                'Access-Control-Allow-Origin': '*'
            }
            fetch('https://www.googleapis.com/youtube/v3/channels?' + new URLSearchParams({

                key: api_key,
                part: 'snippet',
                id: value.snippet.channelId
            }), option)
                .then((resp) => {

                    if (!resp.ok) {
                        console.log("problem")
                    }

                    return resp.json()

                })
                .then((data) => {
                    console.log(data.items);
                    data.items.forEach((da) => {
                        value.channelThumb = da.snippet.thumbnails.default.url;

                        this.showVideos(value);
                    })
                    //getData(data.items);
                    // ytStorageFn(data.items)



                })
        })
    }


    showVideos(vid_data) {
        //console.log(vid_data);
        //console.log(vid_data.snippet.channelTitle);
        //console.log(vid_data.snippet.localized.description);
        //console.log(vid_data.snippet.localized.title);
        //console.log(vid_data.snippet.channelId);
        //console.log(vid_data.snippet.thumbnails.high.url);
        //console.log(vid_data.channelThumb);
        //console.log(this.calcDate(vid_data.snippet.publishedAt));
        //console.log(this.calcViews(vid_data.statistics.viewCount));
        document.querySelector('.videos').innerHTML += ` <div class="video-container cursor-pointer max-[450px]:w-[100%]">
                            <div class="image-box relative max-2xl:w-[255px]">
                                <img class="h-[170px] max-[450px]:w-[100%] max-[450px]:rounded-none  max-2xl:w-full max-[450px]:h-[200px]  max-[1000px]:w-[385px] max-md:h-[170px] max-[1000px]:h-[215px] max-lg:h-[180px]  max-xl:h-[210px] max-xl:[287px] rounded-[20px] object-cover object-center" src="${vid_data.snippet.thumbnails.high.url}" />
                                <span style="background:rgba(0,0,0,1)" class="hover-to-play right-[9px] z-10 bottom-[9px] min-w-max text-sm px-1 py-1 rounded text-white absolute">keep hovering to play</span>

                                <div class="display-hover bg-white shadow-xl rounded-t-[20px] z-50 hidden absolute max-xl:left-[-10px] left-[-10px] top-[-1%] w-[400px] pb-4 rounded-b-[20px]">
                                    <div class="img-box relative w-full">
                                        <img class="h-[200px] w-full rounded-t-[20px] object-cover object-center" src="${vid_data.snippet.thumbnails.high.url}" />

                                        <div class="w-full absolute max-lg:left-0 bottom-[2px]">
                                            <div style="background:rgba(0,0,0,0.6);" class="track h-[3px] relative w-full">

                                                <div style="background:red" class="top-0 w-[0px] h-[3px] absolute left-0 z-50 watch">

                                                </div>
                                                <div style="background:grey" class="load h-[3px] absolute w-[0px] top-0 left-0">

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div class="th-title flex space-between ml-4 mt-6 h-30 mb-3">
                                        <div style="background-image:url(${vid_data.channelThumb})" class="thumb-image rounded-full cursor-pointer relative mr-3 object-cover object-center max-md:h-[2.5rem] max-md:h-[2.5rem] h-[2.5rem] w-[2.5rem] border-2 border-white rounded-full bg-cover">
                                            <span class="show-name absolute bottom-[-20px] left-[50%] bg-white p-1 z-10 min-w-max border-2 border-gray-900 text-[13px]">${vid_data.snippet.channelTitle}</span>

                                        </div>

                                        <div class="title-view relative">
                                            <div class="relative title">
                                                <div style="text-overflow:ellipsis;overflow:hidden;" class=" w-[220px] cursor-pointer text-gray-700 h-[50px] max-[600px]:w-[240px] max-[650px]:w-[185px] max-md:w-[210px] max-[1000px]:w-[250px] pr-4 mb-2 text-[17px]">
                                                    ${vid_data.snippet.localized.title}

                                                </div>
                                                <span class="title-show absolute overflow-auto bottom-[-20%] left-[50%] bg-white p-1 z-10 min-w-max border-2 border-gray-900 text-[13px]">${vid_data.snippet.channelTitle}</span>


                                            </div>

                                            <div class="channel-name relative text-[15px] text-slate-500">
                                                ${vid_data.snippet.channelTitle}
                                                <span style="background:rgba(0,0,0,0.5)" class="channel-description min-w-max left-[-2px] z-10 top-[-50px] text-sm px-1 py-2 rounded text-slate-100 absolute">${vid_data.snippet.channelTitle}</span>

                                            </div>
                                            <div class="view text-[15px] text-slate-500">${this.calcViews(vid_data.statistics.viewCount)} &#x2022; ${this.calcDate(vid_data.snippet.publishedAt)}</div>
                                        </div>

                                    </div>
                                    <button style="margin:0 auto 3px auto" class="w-[90%] bg-gray-200 rounded-[20px] hover:bg-gray-300 justify-center cursor-pointer flex items-center h-12 mb-4">

                                        <span style="background-image:url('icons/watch.png')" class="mr-2 bg-[url('/icons/watch.png')] w-8 h-8  bg-cover"></span>

                                        <span>Watch later</span>


                                    </button>
                                    <button style="margin:0 auto" class="w-[90%] rounded-[20px] bg-gray-200 hover:bg-gray-300 justify-center cursor-pointer flex items-center h-12 ">

                                        <span style="background-image:url('icons/play.png')" class="mr-2 bg-[url('/icons/play.png')] w-8 h-8 bg-cover"></span>

                                        <span>Add to playlist</span>


                                    </button>


                                </div>
                            </div>

                            <div class="th-title flex space-between ml-2 mt-6 h-30 ">
                                <div style="background-image:url(${vid_data.channelThumb})" class="thumb-image max-[450px]:hidden cursor-pointer relative mr-3 object-cover object-center max-md:h-[2.5rem] max-md:h-[2.5rem] h-[2.5rem] w-[2.5rem] rounded-full border-2 border-white rounded-full bg-cover">
                                    <span class="show-name absolute bottom-[-20px] left-[50%] bg-white p-1 z-10 min-w-max border-2 border-gray-900 text-[13px]">${vid_data.snippet.channelTitle}</span>

                                </div>

                                <div class="title-view relative max-[450px]:w-[90%]">
                                    <div class="relative title max-[450px]:w-[100%]">
                                        <div style="text-overflow:ellipsis;overflow:hidden;" class="max-[450px]:w-[95%] w-[210px] cursor-pointer h-[50px] max-[600px]:w-[240px] max-[650px]:w-[185px] max-md:w-[210px] max-[1000px]:w-[250px] pr-4 mb-2 text-[17px]">
                                            ${vid_data.snippet.localized.title}

                                        </div>
                                        <span class="title-show absolute overflow-auto bottom-[-20%] left-[50%] bg-white p-1 z-30 min-w-max border-2 border-gray-900 text-[13px]">${vid_data.snippet.channelTitle}</span>


                                    </div>

                                    <div class="max-[450px]:flex">
                                        <div class="channel-name relative text-[15px] max-[450px]:text-[13px] max-[450px]:flex justify-between text-slate-500 mr-1">
                                            ${vid_data.snippet.channelTitle}   <span class="ml-1 hidden max-[450px]:block"> &#x2022;</span>
                                            <span style="background:rgba(0,0,0,0.5)" class="channel-description min-w-max left-[-2px] z-10 top-[-50px] text-sm px-1 py-2 rounded text-slate-100 absolute">${vid_data.snippet.channelTitle}</span>

                                        </div>

                                        <div class="view text-[15px] max-[450px]:text-[13px] text-slate-500">${this.calcViews(vid_data.statistics.viewCount)} &#x2022; ${this.calcDate(vid_data.snippet.publishedAt)}</div>
                                    </div>

                                </div>

                            </div>
                        </div>`

        this.displayHoverEffect();

    }



}

//let vid = new Videos(ytstore);



function getChannels(data) {

    data.forEach((value) => {

        document.querySelector(".your-subscription").innerHTML += `<div class="left-icons relative w-[90%] pl-2 w-[90%] flex hover:bg-gray-200 hover:rounded-lg cursor-pointer items-center h-12">

                                                                             <span style="background-image:url(${value.snippet.thumbnails.default.url})" class="channel-thumb mr-5 border-2 border-white rounded-full  w-8 h-8 bg-cover"></span>

                                                                            <span class="truncate w-[80%]">${value.snippet.channelTitle}</span>

                                                                            <span class="toshow hidden absolute bottom-[-15px] left-[20%] bg-white p-1 z-10 border-2 border-gray-900 text-[13px]">${value.snippet.channelTitle}</span>
                                                                             </div>
`

    })

    leftHoverEffect();

}
////////////////////////////scrolling effects in mobile view////////////////////////////////////
let horizBtn = document.querySelector(".horizontal-btns");

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


    if (document.body.clientWidth <= 450 && newScroll > (initialScroll + 50)) {



        head.classList.add("hidden");
        horizBtn.classList.add("hidden");
    }
    else {




        head.classList.remove("hidden");
        horizBtn.classList.remove("hidden");
    }

})


////////////////////////////////////////////////////////////////////////////////////////////////

let iconB4 = document.getElementById("bef-search");
let field = document.getElementById("input-field");
document.getElementById("input-field").addEventListener('focusin', () => {



    iconB4.removeAttribute("style", "display:none");

    if (document.body.clientWidth <= 450) {

        field.setAttribute("style", "padding-left:8%");
    }
    else {

        field.setAttribute("style", "padding-left:6%");
    }

})
let inputField = document.getElementById("input-field");

inputField.addEventListener('focusout', () => {



    iconB4.setAttribute("style", "display:none");
    field.setAttribute("style", "padding-left:3%");
})

inputField.addEventListener('keyup', () => {

    document.querySelector(".close").style.display = "block";

    if (inputField.value == "") {
        document.querySelector(".close").style.display = "none";
    }
})

let searchBox = document.querySelector(".search-box");
let firstDiv = document.querySelector(".first");
let lastDiv = document.querySelector(".last");
document.querySelector(".mobile-searchicon").addEventListener('click', () => {


    searchBox.style.display = "flex";
    firstDiv.style.display = "none";
    lastDiv.style.display = "none";



})
document.querySelector(".back-bar").addEventListener('click', () => {

    searchBox.style.display = "none";
    firstDiv.style.display = "flex";
    lastDiv.style.display = "flex";

})
/////////////////////////////////////////////////////////////

let menu = document.querySelector(".menu");
let smallLeft = document.querySelector(".small-left-icons");
let leftIcons = document.querySelector(".left-icons-parent");

leftIcons.addEventListener('click', () => {

    event.target == leftIcons ? leftIcons.style.display = "none" : false;
})

window.addEventListener('resize', () => {

    if (leftIcons.style.display !== "none") {

        leftIcons.style.width = "block";

    }

    if (window.innerWidth > 650) {
        searchBox.style.display = "flex";
        firstDiv.style.display = "flex";
        lastDiv.style.display = "flex";
    } else {
        searchBox.style.display = "none";
        firstDiv.style.display = "flex";
        lastDiv.style.display = "flex";
    }


    console.log(window.innerWidth);

    if ((window.innerWidth > 1289 && smallLeft.style.display === "block")) {

        horiz_parent.style.width = "87%";
        leftIcons.style.display = "none";

        if (leftIcons.style.display === "block") {
            leftIcons.style.display = "block"
        }

    }
    else if ((window.innerWidth < 1289 && smallLeft.style.display === "block")) {

        horiz_parent.style.width = "87%";
        leftIcons.style.display = "none";

        if (leftIcons.style.display === "block") {
            leftIcons.style.display = "block"
        }

    }
    if (window.innerWidth > 1289 && smallLeft.style.display === "none") {

        horiz_parent.style.width = "87%";
        smallLeft.style.display = "block";

    }
    else if (window.innerWidth > 1289) {

        //horiz_parent.style.width = "83%";

    }


    else if (window.innerWidth < 1289 && window.innerWidth > 1024) {


        smallLeft.style.display = "block";
        //leftIcons.style.display = "block";
        if (leftIcons.style.display === "block") {
            leftIcons.style.display = "block"
        }
    } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
        smallLeft.style.display = "block";
        //leftIcons.style.display = "block";
        if (leftIcons.style.display === "block") {
            leftIcons.style.display = "block"
        }

    }
    else if (window.innerWidth < 768) {
        smallLeft.style.display = "none";
        //leftIcons.style.display = "block";

        if (leftIcons.style.display === "block") {
            leftIcons.style.display = "block"
        }

    }




})


///////////////show more to the right and to the left ////////////////////////////

let count = 1;

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

    // console.log(horizBtn.scrollLeft);


    // console.log(horizBtn.scrollWidth);

    sl.style.background = "#C0C0C0";

    horizBtn.scrollBy({ top: 0, left: -100, behavior: 'smooth' });
})
sl.addEventListener('mouseout', () => { sl.style.background = "none"; })

sl.addEventListener('mouseover', () => { sl.style.background = "#E0E0E0"; })




///////////////////////////////////menu button clicks/////////////////////////////////



menu.addEventListener('click', () => {

    console.log("b4 if");


    if (leftIcons.style.display !== "none") {
        //console.log("inside if");
        horiz_parent.style.width = "93%";
        leftIcons.style.display = "none";
        smallLeft.style.display = "block";
    }

    else {
        console.log("inside else");
        leftIcons.style.display = "block";
        smallLeft.style.display = "none";
        horiz_parent.style.width = "83%";
    }

    if (window.innerWidth <= 1289) {

        console.log("inside else");
        leftIcons.style.display = "block";
        smallLeft.style.display = "none";
        //horiz_parent.style.width = "93%";



    }


})

let menuInLeftIcons = document.querySelector(".menu-in-left-icons");
menuInLeftIcons.addEventListener('click', () => {

    if (leftIcons.style.display === "block") {

        leftIcons.style.display = "none";
        smallLeft.style.display = "block";
        horiz_parent.style.width = "87%";
    }

})

///////////////////////mimicking downloading and watching/////////////////////////////////////////////


let imBox = document.querySelectorAll(".img-box");

// let watch = document.querySelectorAll(".watch");
//let load = document.querySelectorAll(".load");
// let track = document.querySelectorAll(".track");

function downloadingAwatching(par, track, watch, load) {



    let loading, watching, dTrack;

    watching = watch.clientWidth;
    loading = load.clientWidth
    dTrack = track.clientWidth

    par.addEventListener('mouseover', async () => {


        //console.log(track.clientWidth);



        //let watching = watch.clientWidth;

        //let dTrack = track.clientWidth;



        const int = setInterval(() => {

            watching = watching + 10;
            watch.style.width = watching + "px"

            if (watching === 400) {


                clearInterval(int);
                watch.style.width = "0px";
            }



        }, 1000)

        const intB = setInterval(() => {

            loading = loading + 40;
            load.style.width = loading + "px"

            if (loading === 400) {


                clearInterval(intB);

                load.style.width = "0px";

            }




        }, 1000)


        par.addEventListener('mouseout', () => {

            clearInterval(int);
            clearInterval(intB);

        })

    })

}

displayHoverEffect();
///////////////stylishly avoiding overflow hidden effect//////////////////////////
async function displayHoverEffect() {

    let imgBoxes = document.querySelectorAll(".image-box");


    //let dispHover = document.querySelectorAll(".display-hover");

    Array.prototype.forEach.call(imgBoxes, (elem, index) => {

        elem.addEventListener('mouseover', () => {

            //displayHoverEffect();

            //console.log(event.clientX);

            if (event.clientX >= window.innerWidth / 2) {

                elem.children[2].style.left = "-50%";
            }


            //hmmm
            elem.children[2].style.opacity !== 1 ? elem.children[2].style.opacity = 0 : false;

            setTimeout(() => {
                elem.children[2].style.opacity = 1;

                //resolve(1);
            }, 1000);




            downloadingAwatching(
                elem.children[2].children[0],

                elem.children[2].children[0].children[1].children[0],

                elem.children[2].children[0].children[1].children[0].children[0],

                elem.children[2].children[0].children[1].children[0].children[1]
            )
            if (document.body.clientWidth > 450) {

                elem.children[2].classList.remove("hidden");

            }



        })


        elem.addEventListener('mouseout', () => {


            elem.children[2].classList.add("hidden");

        })
    })
}


///////////////////////////////hover effects///////////////////////////


function leftHoverEffect() {
    let left = document.querySelectorAll(".left-icons");



    Array.prototype.forEach.call(left, (elem, index) => {

        elem.addEventListener('mouseover', () => {

            //console.log(event.clientX);

            if (document.body.clientWidth > 450) {
                //hmmm
                elem.children[2].style.opacity = 0;

                setTimeout(() => {
                    elem.children[2].style.opacity = 1;
                }, 1000)

                elem.children[2].classList.remove("hidden");
            }



        })


        elem.addEventListener('mouseout', () => {


            elem.children[2].classList.add("hidden");

        })
    })
}


let right = document.querySelectorAll(".right-btns");



Array.prototype.forEach.call(right, (elem, index) => {

    elem.addEventListener('mouseover', () => {

        //console.log(event.clientX);


        if (document.body.clientWidth > 450) {

            //hmmm
            elem.children[0].style.opacity = 0;

            setTimeout(() => {
                elem.children[0].style.opacity = 1;
            }, 1000)

            elem.children[0].classList.remove("hidden");
        }



    })


    elem.addEventListener('mouseout', () => {


        elem.children[0].classList.add("hidden");

    })
})

////////////////////////toggle class style////////////////////////

function select(x) {

    let btns = document.querySelectorAll('.right-btns');

    Array.prototype.forEach.call(btns, (element) => {

        element.style.background = "#E0E0E0";
        element.style.color = "black";
    })

    x.style.background = "black";
    x.style.color = "#fff";
}
/////////////////////show more and show less/////////////////
let el = document.querySelector(".toggle-channels");
el.addEventListener('click', () => {

    if (el.children[1].textContent == "Show more") {

        document.querySelector(".your-subscription").style.height = "max-content";

        el.children[1].textContent = "Show less";

        el.children[0].style.backgroundImage = "url(icons/show-l.png)";
    }
    else {
        document.querySelector(".your-subscription").style.height = "297px";

        el.children[1].textContent = "Show more";

        el.children[0].style.backgroundImage = "url(icons/show-m.png)";

    }

})
                        ///////////////////
