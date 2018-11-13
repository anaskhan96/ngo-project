$(document).ready( function() {
  
  $('body').on("click", "main article div h3", function(){
    if ($(this).children('span').hasClass('close')) {
      $(this).children('span').removeClass('close');
    }
    else {
      $(this).children('span').addClass('close');
    }
    $(this).parent().children('p').slideToggle(250);
    $(this).parent().children('iframe').slideToggle(250);
    $(this).parent().children('form').slideToggle(250);
  });
  
  $('body').on("click", "nav ul li a", function(){
    var title = $(this).data('title');
    $('.title').children('h2').html(title);
  });

  fetch('/teacher/details').then((result) => result.json()).then((res) => {
    console.log(res);
    if(res.success){
      let detailsDiv = document.getElementById('detailsDiv');
      for(let key in res){
        if (key == "success") continue;
        let p = document.createElement('p');
        p.innerHTML = key.charAt(0).toUpperCase() + key.slice(1) + ": " + res[key];
        detailsDiv.appendChild(p);
      }
    }
  });

  fetch('/teacher/videos').then((result) => result.json()).then((res) => {
    console.log(res);
    let videosArticle = document.getElementById('videos');
    if(res.success){
      let vids = res.videos;
      console.log('Videos', vids);
      for(let i = 0; i < vids.length; i++){
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        h3.innerHTML = vids[i].name + "<span class='entypo-down-open'></span>";
        div.appendChild(h3);
        let iframe = document.createElement('iframe');
        iframe.setAttribute('width', '640');
        iframe.setAttribute('height', '480');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('src', vids[i].link);
        div.appendChild(iframe);
        let a = document.createElement('a');
        a.setAttribute('href', '/teacher/video/' + encodeURIComponent(vids[i].link));
        a.innerHTML = 'Open this video with discussions';
        div.appendChild(a);
        let delBtn = document.createElement("button");
        delBtn.id = "delVideo";
        delBtn.className = "delbtn";
        delBtn.innerHTML="DELETE VIDEO";
        delBtn.addEventListener('click',delete_video,false);
        div.appendChild(delBtn);
        videosArticle.appendChild(div);
      }
    }
    else {
      videosArticle.innerHTML += "<div><h3>No videos to show</h3></div>";
    }
  });



let addVideoBtn = document.getElementById('addVideo');
addVideoBtn.addEventListener('click', submit_video, false);

let delVideoBtn = document.getElementById('delVideo');
delVideoBtn.addEventListener('click',delete_video,false);

});


// CHANGE THESE FUNCTIONS TO SUIT THE TEACHER DASHBOARD 
function submit_video()
{
  fetch('/teacher/addVideo',{
    method : "POST",
    body: JSON.stringify(
    {
      name : document.getElementById('video_name').value,
      link : document.getElementById('video_url').value
    }),
    headers: {"Content-Type" : "application/json;charset=utf-8"}
  }).then((result) => result.json()).then((res) => {
    console.log(res);
    if(res.success)
    {
      //Update the Video on the UI
      let videosArticle = document.getElementById('videos');
      console.log(videosArticle);
      let div = document.createElement("div");
      let h3 = document.createElement("h3");
      h3.innerHTML = res.name+ "<span class='entypo-down-open'></span>";
      div.appendChild(h3);
      let iframe = document.createElement('iframe');
      iframe.setAttribute('width', '640');
      iframe.setAttribute('height', '480');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('src', res.link);
      div.appendChild(iframe);
      let delBtn = document.createElement("button");
      delBtn.id = "delVideo";
      delBtn.className = "delbtn";
      delBtn.innerHTML="DELETE VIDEO";
      delBtn.addEventListener('click',delete_video,false);
      div.appendChild(delBtn);
      videosArticle.appendChild(div);
      swal("Added!", res.name+" has been successfully added.", "success");
    }
    else {
      videosArticle.innerHTML += "<div><h3>No videos to show</h3></div>";
      swal("Failed!", "The video couldn't be added, kindly contact management.", "error");
    }
  });
}

function delete_video(e)
{
  fetch('/teacher/deleteVideo',{

    method : "POST",
    body : JSON.stringify(
    {
      link : e.target.previousElementSibling.src
    }),
   headers: {"Content-Type" : "application/json;charset=utf-8"}
  }).then((result) => result.json()).then((res) => {
    console.log(res);
    if(res.success) {
      let divToDel = e.target.parentElement;
      divToDel.parentElement.removeChild(divToDel);
      swal("Deleted!", "Video deleted successfully", "success");
    } else {
      swal("Failed!", "Video could not be deleted, contact management", "error");
    }
  });
}


function add_videos() {
  var assignments = document.getElementById("addVideos");
  assignments.style.display = "block";
  var vids = document.getElementById("videos");
  vids.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display = "none";
}


function show_videos() {
  var assignments = document.getElementById("addVideos");
  assignments.style.display = "none";
  var vids = document.getElementById("videos");
  vids.style.display = "block";
  var profile = document.getElementById("profile");
  profile.style.display = "none";

  
}

function show_profile() {
  var assignments = document.getElementById("addVideos");
  assignments.style.display = "none";
  var vids = document.getElementById("videos");
  vids.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display = "block";
}
