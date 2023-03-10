      // JavaScript source code
let vid;

let api_key = "AIzaSyCWhlGB129Dya9kzohmOC3h8tQ2ruWW5qA";

async function fetchData() {
  const option = {
    method: "GET",
    "Access-Control-Allow-Origin": "*",
  };

  let response = await fetch(
    "https://www.googleapis.com/youtube/v3/videos?" +
      new URLSearchParams({
        key: api_key,
        part: "snippet,statistics",
        chart: "mostPopular",
        maxResults: 50,
        regionCode: "NG",
      }),
    option
  );

  let data = await response.json();

  //console.log(data);

  await new Promise((resolve, reject) => setTimeout(resolve, 2000));

  new Videos(data.items).getChannelThumb();

  let subResponse = await fetch(
    "https://www.googleapis.com/youtube/v3/videos?" +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        chart: "mostPopular",
        maxResults: 10,
        regionCode: "NG",
      }),
    option
  );

  let subData = await subResponse.json();

  getChannels(subData.items);
}

fetchData();

let menu = document.querySelector(".menu");
let smallLeft = document.querySelector(".small-left-icons");
let leftIcons = document.querySelector(".left-icons-parent");
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
    let length = views.toString().length;
    //if length is 1 or 2 or 3
    length <= 3 ? (refinedView = views + " views") : false;
    //or length is 4 ,5 or 6
    length > 3 && length <= 6
      ? (refinedView = (views / this.th).toFixed(1) + "K views")
      : false;
    // or length is 7, 8,9
    length > 6 && length <= 9
      ? (refinedView = (views / this.ml).toFixed(1) + "M views")
      : false;
    // or more
    length > 9 ? (refinedView = views.toFixed(1) + "B views") : false;

    return refinedView;
  }

  calcDate(date) {
    let dateReleased;

    let dt = new Date(date).getTime();

    let now = new Date().getTime();

    let milliReleased = now - dt;

    let years = Math.floor(milliReleased / (1000 * 60 * 60 * 24 * 365));
    let months = Math.floor(milliReleased / (1000 * 60 * 60 * 24 * 30));
    let weeks = Math.floor(milliReleased / (1000 * 60 * 60 * 24 * 7));
    let days = Math.floor(milliReleased / (1000 * 60 * 60 * 24));

    let hours = Math.floor(
      (milliReleased % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    let min = Math.floor((milliReleased % (1000 * 60 * 60)) / (1000 * 60));

    let sec = Math.floor((milliReleased % (1000 * 60)) / 1000);

    if (years >= 1) {
      years == 1
        ? (dateReleased = years + " year ago")
        : (dateReleased = years + " years ago");
    } else if (months >= 1) {
      months == 1
        ? (dateReleased = months + " month ago")
        : (dateReleased = months + " months ago");
    } else if (weeks >= 1) {
      weeks == 1
        ? (dateReleased = weeks + " week ago")
        : (dateReleased = weeks + " weeks ago");
    } else if (days >= 1) {
      days == 1
        ? (dateReleased = days + " day ago")
        : (dateReleased = days + " days ago");
    } else if (hours >= 1) {
      hours == 1
        ? (dateReleased = hours + " hour ago")
        : (dateReleased = hours + " hours ago");
    } else if (min >= 1) {
      min == 1
        ? (dateReleased = min + " minute ago")
        : (dateReleased = min + " minutes ago");
    } else {
      sec == 1
        ? (dateReleased = sec + " second ago")
        : (dateReleased = sec + " seconds ago");
    }

    return dateReleased;
  }

  getChannelThumb() {
    this.video.forEach((value) => {
      const option = {
        method: "GET",
        "Access-Control-Allow-Origin": "*",
      };
      fetch(
        "https://www.googleapis.com/youtube/v3/channels?" +
          new URLSearchParams({
            key: api_key,
            part: "snippet",
            id: value.snippet.channelId,
          }),
        option
      )
        .then((resp) => {
          if (!resp.ok) {
            console.log("problem");
          }

          return resp.json();
        })
        .then((data) => {
          //console.log(data.items);
          data.items.forEach((da) => {
            value.channelThumb = da.snippet.thumbnails.default.url;

            this.showVideos(value);
          });
          //getData(data.items);
          // ytStorageFn(data.items)
        });
    });
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

    //let images have higher resolution in mobile view
    let vid_image;
    document.body.clientWidth > 450 ? vid_image = vid_data.snippet.thumbnails.medium.url: vid_image = vid_data.snippet.thumbnails.high.url;
    document.querySelector(
      ".videos"
    ).innerHTML += ` <div class="video-container cursor-pointer">
                            <div class="image-box relative w-full">
                              <div class="w-full  max-md:h-[170px] max-[450px]:h-[195px] max-[1000px]:h-[215px] bg-cover max-lg:h-[180px] h-[165px] max-[600px]:h-[230px] max-xl:h-[184px] ">
                                <img class="main-image w-full h-full rounded-[20px] max-[450px]:rounded-[0px] object-cover" src="${vid_image}" />
                                </div>
                                <span style="background:rgba(0,0,0,1)" class="hover-to-play right-[9px] z-10 bottom-[9px] min-w-max text-sm px-1 py-1 rounded text-white absolute">keep hovering to play</span>

                                <div class="display-hover bg-white shadow-xl rounded-t-[20px] z-50 hidden absolute max-xl:left-[-10px] left-[-10px] top-[-1%] w-[400px] pb-4 rounded-b-[20px]">
                                    <div class="img-box relative w-full">
                                        <img class="h-[200px] w-full rounded-t-[20px] object-cover object-center" src="${
                                          vid_data.snippet.thumbnails.high.url
                                        }" />

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
                                        <div style="background-image:url(${
                                          vid_data.channelThumb
                                        })" class="thumb-image cursor-pointer relative mr-3 object-cover object-center max-md:h-[2.5rem] h-[2.5rem] w-[2.5rem] border-2 border-white rounded-full bg-cover">
                                            <span style="border 1px solid black" class="show-name absolute bottom-[-20px] left-[50%] bg-white p-1 z-10 min-w-max border-gray-900 text-[13px]">${
                                              vid_data.snippet.channelTitle
                                            }</span>

                                        </div>

                                        <div class="title-view relative">
                                            <div class="relative title">
                                                <div style="text-overflow:ellipsis;overflow:hidden;" class=" w-[220px] cursor-pointer text-gray-700 h-[50px] max-[600px]:w-[240px] max-[650px]:w-[185px] max-md:w-[210px] max-[1000px]:w-[250px] pr-4 mb-2 text-[17px]">
                                                    ${
                                                      vid_data.snippet.localized
                                                        .title
                                                    }

                                                </div>
                                                <span style="border 1px solid black" class="title-show absolute overflow-auto bottom-[-20%] left-[50%] bg-white p-1 z-10 min-w-max border-2 border-gray-900 text-[13px]">${
                                                  vid_data.snippet.channelTitle
                                                }</span>


                                            </div>

                                            <div class="channel-name relative text-[15px] text-slate-500">
                                                ${vid_data.snippet.channelTitle}
                                                <span style="background:rgba(0,0,0,0.5)" class="channel-description min-w-max left-[-2px] z-10 top-[-50px] text-sm px-1 py-2 rounded text-slate-100 absolute">${
                                                  vid_data.snippet.channelTitle
                                                }</span>

                                            </div>
                                            <div class="view text-[15px] text-slate-500">${this.calcViews(
                                              vid_data.statistics.viewCount
                                            )} &#x2022; ${this.calcDate(
      vid_data.snippet.publishedAt
    )}</div>
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

                            <div class="th-title flex gap-3 ml-2 mt-6 h-30 max-[450px]:w-[100%]">
                            <div class="mr-3 max-[450px]:hidden">
                                <div style="background-image:url(${
                                  vid_data.channelThumb
                                })" class=" thumb-image cursor-pointer relative object-cover object-center max-md:h-[2.5rem] h-[2.5rem] w-[2.5rem] border-2 border-white rounded-full bg-cover">
                                    <span style="border 1px solid black" class="show-name absolute bottom-[-20px] left-[50%] bg-white p-1 z-10 min-w-max border-2 border-gray-900 text-[13px]">${
                                      vid_data.snippet.channelTitle
                                    }</span>

                                </div>
                                </div>

                                <div class="col-span-10 title-view relative ">
                                    <div class="relative title max-[450px]:w-[100%]">
                                        <div class=" cursor-pointer h-[47px] max-[450px]:h-auto leading-7 mb-2 overflow-hidden  text-[14px] max-[450px]:w-[100%] pr-4 w-[200px]">
                                            ${vid_data.snippet.localized.title}

                                        </div>
                                        <span style="border 1px solid black" class="title-show absolute overflow-auto bottom-[-20%] left-[50%] bg-white p-1 z-30 min-w-max border-2 border-gray-900 text-[13px]">${
                                          vid_data.snippet.channelTitle
                                        }</span>


                                    </div>

                                    <div class="max-[450px]:flex">
                                        <div class="channel-name relative text-[13px] max-[450px]:text-[13px] max-[450px]:flex justify-between text-slate-500 mr-1">
                                            ${
                                              vid_data.snippet.channelTitle
                                            }   <span class="ml-1 hidden max-[450px]:block"> &#x2022;</span>
                                            <span style="background:rgba(0,0,0,0.5)" class="channel-description min-w-max left-[-2px] z-10 top-[-50px] text-sm px-1 py-2 rounded text-slate-100 absolute">${
                                              vid_data.snippet.channelTitle
                                            }</span>

                                        </div>

                                        <div class="view text-[13px] max-[450px]:text-[13px] text-slate-500">${this.calcViews(
                                          vid_data.statistics.viewCount
                                        )} &#x2022; ${this.calcDate(
      vid_data.snippet.publishedAt
    )}</div>
                                    </div>

                                </div>

                            </div>
                        </div>`;
  


    this.displayHoverEffect();

    //this.menuFunction();

    //this.windowResize();
  }
}

//let vid = new Videos(ytstore);

function getChannels(data) {
  data.forEach((value) => {
    document.querySelector(
      ".your-subscription"
    ).innerHTML += `<div class="left-icons relative w-[90%] pl-2 flex hover:bg-gray-200 hover:rounded-lg cursor-pointer items-center h-12">

                                                                             <span style="background-image:url(${value.snippet.thumbnails.default.url})" class="channel-thumb mr-5 border-2 border-white rounded-full  w-8 h-8 bg-cover"></span>

                                                                            <span class="truncate w-[80%]">${value.snippet.channelTitle}</span>

                                                                            <span class="toshow hidden absolute bottom-[-15px] left-[20%] bg-white p-1 z-10 border-2 border-gray-900 text-[13px]">${value.snippet.channelTitle}</span>
                                                                             </div>
`;
  });

  leftHoverEffect();
}

let horizBtn = document.querySelector(".horizontal-btns");


////////////////////////////////////////////////////////////////////////////////////////////////

let iconB4 = document.getElementById("bef-search");
let field = document.getElementById("input-field");
document.getElementById("input-field").addEventListener("focusin", () => {
  iconB4.removeAttribute("style", "display:none");

  if (document.body.clientWidth <= 450) {
    field.setAttribute("style", "padding-left:8%");
  } else {
    field.setAttribute("style", "padding-left:6%");
  }
});
let inputField = document.getElementById("input-field");

inputField.addEventListener("focusout", () => {
  iconB4.setAttribute("style", "display:none");
  field.setAttribute("style", "padding-left:3%");
});

inputField.addEventListener("keyup", () => {
  document.querySelector(".close").style.display = "block";

  if (inputField.value == "") {
    document.querySelector(".close").style.display = "none";
  }
});

let searchBox = document.querySelector(".search-box");
let firstDiv = document.querySelector(".first");
let lastDiv = document.querySelector(".last");
document.querySelector(".mobile-searchicon").addEventListener("click", () => {
  searchBox.style.display = "flex";
  firstDiv.style.display = "none";
  lastDiv.style.display = "none";
});
document.querySelector(".back-bar").addEventListener("click", () => {
  searchBox.style.display = "none";
  firstDiv.style.display = "flex";
  lastDiv.style.display = "flex";
});
/////////////////////////////////////////////////////////////

leftIcons.addEventListener("click", () => {
  event.target == leftIcons ? (leftIcons.style.display = "none") : false;
});

let videosGrid = document.querySelector(".videos");





///////////////////////mimicking downloading and watching/////////////////////////////////////////////

let imBox = document.querySelectorAll(".img-box");

function downloadingAwatching(par, track, watch, load) {
  let loading, watching, dTrack;

  watching = watch.clientWidth;
  loading = load.clientWidth;
  dTrack = track.clientWidth;

  par.addEventListener("mouseover", async () => {
    //console.log(track.clientWidth);

    //let watching = watch.clientWidth;

    //let dTrack = track.clientWidth;

    const int = setInterval(() => {
      watching = watching + 10;
      watch.style.width = watching + "px";

      if (watching === 400) {
        clearInterval(int);
        watch.style.width = "0px";
      }
    }, 1000);

    const intB = setInterval(() => {
      loading = loading + 40;
      load.style.width = loading + "px";

      if (loading === 400) {
        clearInterval(intB);

        load.style.width = "0px";
      }
    }, 1000);

    par.addEventListener("mouseout", () => {
      clearInterval(int);
      clearInterval(intB);
    });
  });
}

displayHoverEffect();
///////////////stylishly avoiding overflow hidden effect//////////////////////////
function displayHoverEffect() {
  let imgBoxes = document.querySelectorAll(".image-box");
  //let x = 0;
  let dispHover = document.querySelectorAll(".display-hover");

  Array.prototype.forEach.call(imgBoxes, (elem, index) => {
    elem.addEventListener("mouseenter", () => {
      if (event.clientX >= window.innerWidth / 2) {
        elem.children[2].style.left = "-50%";
      }

      elem.children[2].style.opacity = 0;
      let count = 1;

      const x = setInterval(() => {
        count++;

        //console.log(count);

        if (count <= 3) {
          elem.children[2].style.opacity = 0;
        } else {
          setTimeout(() => {
            elem.children[2].style.opacity = 1;
          }, 500);
        }
      }, 200);

      //console.log(count);

      downloadingAwatching(
        elem.children[2].children[0],

        elem.children[2].children[0].children[1].children[0],

        elem.children[2].children[0].children[1].children[0].children[0],

        elem.children[2].children[0].children[1].children[0].children[1]
      );
      if (document.body.clientWidth > 450) {
        elem.children[2].classList.remove("hidden");
      }

      elem.addEventListener("mouseleave", () => {
        elem.children[2].classList.add("hidden");

        clearInterval(x);

        //set opacity back to zero
        elem.children[2].style.opacity = 0;

        //console.log(elem.children[2].style.opacity);
      });

      elem.children[2].addEventListener("mouseleave", () => {
        elem.children[2].classList.add("hidden");

        clearInterval(x);
        //set opacity back to zero
        elem.children[2].style.opacity = 0;
      });
    });
  });
}

///////////////////////////////hover effects///////////////////////////

function leftHoverEffect() {
  let left = document.querySelectorAll(".left-icons");

  Array.prototype.forEach.call(left, (elem, index) => {
    elem.addEventListener("mouseover", () => {
      //console.log(event.clientX);

      if (document.body.clientWidth > 450) {
        //hmmm
        elem.children[2].style.opacity = 0;

        setTimeout(() => {
          elem.children[2].style.opacity = 1;
          elem.children[2].style.border = "1px solid black";
        }, 1000);

        elem.children[2].classList.remove("hidden");
      }
    });

    elem.addEventListener("mouseout", () => {
      elem.children[2].classList.add("hidden");
    });
  });
}

let right = document.querySelectorAll(".right-btns");

Array.prototype.forEach.call(right, (elem, index) => {
  elem.addEventListener("mouseover", () => {
    //console.log(event.clientX);

    if (document.body.clientWidth > 450) {
      //hmmm
      elem.children[0].style.opacity = 0;

      setTimeout(() => {
        elem.children[0].style.opacity = 1;
        elem.children[0].style.border = "1px solid black";
      }, 1000);

      elem.children[0].classList.remove("hidden");
    }
  });

  elem.addEventListener("mouseout", () => {
    elem.children[0].classList.add("hidden");
  });
});

////////////////////////toggle class style////////////////////////

function select(x) {
  let btns = document.querySelectorAll(".right-btns");

  Array.prototype.forEach.call(btns, (element) => {
    element.style.background = "#E0E0E0";
    element.style.color = "black";
  });

  x.style.background = "black";
  x.style.color = "#fff";
}
/////////////////////show more and show less/////////////////
let el = document.querySelector(".toggle-channels");
el.addEventListener("click", () => {
  if (el.children[1].textContent == "Show more") {
    document.querySelector(".your-subscription").style.height = "max-content";

    el.children[1].textContent = "Show less";

    el.children[0].style.backgroundImage = "url(icons/show-l.png)";
  } else {
    document.querySelector(".your-subscription").style.height = "297px";

    el.children[1].textContent = "Show more";

    el.children[0].style.backgroundImage = "url(icons/show-m.png)";
  }
});



/*

windowResize();

function windowResize() {
  
  let mainImage = document.querySelectorAll(".main-image");

  window.addEventListener("resize", () => {
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

    //console.log(window.innerWidth);

    if (window.innerWidth > 1230 && smallLeft.style.display === "block") {
      horiz_parent.style.width = "90%";
      leftIcons.style.display = "none";
      //videosGrid.removeAttribute("style", "grid-column-gap:2em");

      if (leftIcons.style.display === "block") {
        leftIcons.style.display = "block";
      }

    
      Array.prototype.forEach.call(mainImage, (el) => {
        //console.log("inside the class");
        el.removeAttribute("style", "height:170px");
      });
    } else if (
      window.innerWidth < 1230 &&
      smallLeft.style.display === "block"
    ) {
      //horiz_parent.style.width = "87%";
      leftIcons.style.display = "none";
      //videosGrid.setAttribute("style", "grid-column-gap:2em");

      if (leftIcons.style.display === "block") {
        leftIcons.style.display = "block";
      }

     
      Array.prototype.forEach.call(mainImage, (el) => {
        //console.log("inside the class");
        el.style.height = "170px";
      });
    } else if (window.innerWidth < 1230 && smallLeft.style.display === "block")
      if (window.innerWidth > 1289 && smallLeft.style.display === "none") {
        horiz_parent.style.width = "90%";
        smallLeft.style.display = "block";
      } else if (window.innerWidth > 1289) {
        //horiz_parent.style.width = "83%";
      } else if (window.innerWidth < 1289 && window.innerWidth > 1024) {
        smallLeft.style.display = "block";
        //leftIcons.style.display = "block";
        if (leftIcons.style.display === "block") {
          leftIcons.style.display = "block";
        }
      } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
        smallLeft.style.display = "block";
        //leftIcons.style.display = "block";
        if (leftIcons.style.display === "block") {
          leftIcons.style.display = "block";
        }
      } else if (window.innerWidth < 768) {
        smallLeft.style.display = "none";
        //leftIcons.style.display = "block";

        if (leftIcons.style.display === "block") {
          leftIcons.style.display = "block";
        }
      }
  });
}
*/