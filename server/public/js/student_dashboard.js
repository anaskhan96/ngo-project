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

  fetch('/student/videos').then((result) => result.json()).then((res) => {
    console.log(res);
    let videosArticle = document.getElementById('videos');
    if(res.success){
      let vids = res.videos;
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
        a.setAttribute('href', '/student/video/' + encodeURIComponent(vids[i].link));
        a.innerHTML = 'Open this video with discussions';
        div.appendChild(a);
        videosArticle.appendChild(div);
      }
    }
    else {
      videosArticle.innerHTML += "<div><h3>No videos to show</h3></div>";
    }
  });

  fetch('/student/details').then((result) => result.json()).then((res) => {
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
});

function show_assignments() {
  var assignments = document.getElementById("assignments");
  assignments.style.display = "block";
  var vids = document.getElementById("videos");
  vids.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display = "none";
}

function show_videos() {
  var assignments = document.getElementById("assignments");
  assignments.style.display = "none";
  var vids = document.getElementById("videos");
  vids.style.display = "block";
  var profile = document.getElementById("profile");
  profile.style.display = "none";
}

function show_profile() {
  var assignments = document.getElementById("assignments");
  assignments.style.display = "none";
  var vids = document.getElementById("videos");
  vids.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display = "block";
}