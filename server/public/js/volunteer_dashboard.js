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

  fetch('/volunteer/details').then((result) => result.json()).then((res) => {
    // console.log(res);
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

function show_my_sched() {
  var assignments = document.getElementById("viewmysched");
  // console.log(fs);
  assignments.style.display = "block";
  var assignments = document.getElementById("viewschedule");
  assignments.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display = "none";


  fetch('/volunteer/schedules/all').then((result) => result.json()).then((res) => {
    console.log(res);
    let schedulearticle = document.getElementById('viewmysched');
    schedulearticle.innerHTML='';
    // if(res.success){
      let fs = res;
      console.log('Final Schedules', fs);
      for(let i = 0; i < fs.length; i++){
        if (fs[i].optedFor==false)
          continue;
        let div = document.createElement("div");
        let namediv = document.createElement("div");
        namediv.id="sname";
        namediv.innerHTML = fs[i].name+"jingalala"; // + "<span class='entypo-down-open'></span>";
        div.appendChild(namediv);
        let workdiv = document.createElement("div");
        workdiv.innerHTML = fs[i].workDescription;
        div.appendChild(workdiv);
        let classdiv = document.createElement("div");
        classdiv.innerHTML = fs[i].class;
        div.appendChild(classdiv);


        div.addEventListener("click", function() {deopt_sched(fs[i].name)}, false);
        schedulearticle.appendChild(div);
      }
    // }
    // else {
    //   videosArticle.innerHTML += "<div><h3>No volunteers to show</h3></div>";
    // }
  });
}

function show_all_sched() {
  var sched = document.getElementById("viewschedule");
  sched.style.display = "block";
  var sched_all = document.getElementById("viewschedule_all");
  sched_all.style.display = "block";
  var sched_pref = document.getElementById("viewschedule_pref");
  sched_pref.style.display = "none";
  var mysched = document.getElementById("viewmysched");
  mysched.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display = "none";

  fetch('/volunteer/schedules/all').then((result) => result.json()).then((res) => {
    console.log(res);
    let schedulearticle = document.getElementById('viewschedule_all');
    schedulearticle.innerHTML='';
    // if(res.success){
      let fs = res;
      console.log('Final Schedules', fs);
      for(let i = 0; i < fs.length; i++){
        if (fs[i].optedFor==true)
          continue;
        let div = document.createElement("div");
        // div.setAttribute("id", "schedele:"+fs[i].name);
        let namediv = document.createElement("div");
        namediv.innerHTML = fs[i].name; // + "<span class='entypo-down-open'></span>";
        namediv.setAttribute("id", "sname");//id="schedname";
        div.appendChild(namediv);
        let workdiv = document.createElement("div");
        workdiv.innerHTML = fs[i].workDescription;
        div.appendChild(workdiv);
        let classdiv = document.createElement("div");
        classdiv.innerHTML = fs[i].class;
        div.appendChild(classdiv);


        div.addEventListener("click", function() {opt_sched(fs[i].name)}, false);
        schedulearticle.appendChild(div);
      }
    // }
    // else {
    //   videosArticle.innerHTML += "<div><h3>No volunteers to show</h3></div>";
    // }
  });
}

function show_pref_sched() {
  var sched_all = document.getElementById("viewschedule_all");
  sched_all.style.display = "none";
  var sched_pref = document.getElementById("viewschedule_pref");
  sched_pref.style.display = "block";
  var mysched = document.getElementById("viewmysched");
  mysched.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display = "none";

  fetch('/volunteer/schedules/preferred').then((result) => result.json()).then((res) => {
    console.log(res);
    let schedulearticle = document.getElementById('viewschedule_pref');
    schedulearticle.innerHTML='';
    // if(res.success){
      let fs = res;
      console.log('Final Schedules', fs);
      for(let i = 0; i < fs.length; i++){
        let div = document.createElement("div");
        let namediv = document.createElement("div");
        namediv.innerHTML = fs[i].name; // + "<span class='entypo-down-open'></span>";
        div.appendChild(namediv);
        let workdiv = document.createElement("div");
        workdiv.innerHTML = fs[i].workDescription;
        div.appendChild(workdiv);
        let classdiv = document.createElement("div");
        classdiv.innerHTML = fs[i].class;
        div.appendChild(classdiv);
        schedulearticle.appendChild(div);
      }
    // }
    // else {
    //   videosArticle.innerHTML += "<div><h3>No volunteers to show</h3></div>";
    // }
  });
}

function show_profile() {
  var assignments = document.getElementById("viewschedule");
  assignments.style.display = "none";
  // var vids = document.getElementById("videos");
  // vids.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display = "block";
}


function opt_sched(sname)
{
  fetch('/volunteer/schedule/opt',{
    method : "POST",
    body: JSON.stringify(
    {
      name : sname,
    }),
    headers: {"Content-Type" : "application/json;charset=utf-8"}
  }).then((result) => result.json()).then((res) => {
    console.log(res);
    if(res.success)
    {
      //Update the Video on the UI
      this.style.background="green";
    }
    else {
      // videosArticle.innerHTML += "<div><h3>No videos to show</h3></div>";
      swal("Failed!", "You couldn't opt the schedule, kindly contact management.", "error");
    }
  });
}


function deopt_sched(sname)
{
  fetch('/volunteer/schedule/deopt',{
    method : "POST",
    body: JSON.stringify(
    {
      name : sname,
    }),
    headers: {"Content-Type" : "application/json;charset=utf-8"}
  }).then((result) => result.json()).then((res) => {
    console.log(res);
    if(res.success)
    {
      //Update the Video on the UI
      this.style.background="blue";
    }
    else {
      // videosArticle.innerHTML += "<div><h3>No videos to show</h3></div>";
      swal("Failed!", "You couldn't opt the schedule, kindly contact management.", "error");
    }
  });
}