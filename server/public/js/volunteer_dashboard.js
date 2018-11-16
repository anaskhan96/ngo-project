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

//Buttons to handle On click Show the schedule
let allSchedule = document.getElementById('showallsched');
allSchedule.addEventListener('click', show_all_sched, false);

let prefSchedule = document.getElementById('showpreferredsched');
prefSchedule.addEventListener('click',show_pref_sched,false);


   
   
 });

function show_schedules()
{
  var sched = document.getElementById("viewschedule");
  sched.style.display = "block";
  var mysched = document.getElementById("viewmysched");
  mysched.style.display = "none";
  var sched_all = document.getElementById("viewschedule_all");
  sched_all.style.display = "block";
  var sched_pref = document.getElementById("viewschedule_pref");
  sched_pref.style.display = "block";

  var profile = document.getElementById('profile');
  profile.style.display = 'none';
 
}
 function show_my_sched() {
  var assignments = document.getElementById("viewmysched");
  // console.log(fs);
  assignments.style.display = "block";
  var sched = document.getElementById("viewschedule");
  sched.style.display = "none";
  var sched_all = document.getElementById("viewschedule_all");
  sched_all.style.display = "none";
  var sched_pref = document.getElementById("viewschedule_pref");
  sched_pref.style.display = "none";
  var profile = document.getElementById('profile');
  profile.style.display = 'none';

  fetch('/volunteer/schedules/all').then((result) => result.json()).then((res) => {
    console.log(res);
    let schedulearticle = document.getElementById('viewmysched');
    schedulearticle.innerHTML='<div id="myScheduleDiv"><h3>My Schedules</h3>  <!-- <span class="entypo-down-open"></span></h3> --></div>';
    // if(res.success){
      let fs = res;
      
      console.log('Final Schedules', fs);

     myScheduleDiv = document.getElementById('myScheduleDiv');
        for(let key in res)
        {
          if(res[key]["optedFor"]==false)
              continue;
          let p = document.createElement('div');

          p.innerHTML = "Name: "+ res[key]["name"]+"</br>"+"Work Description: "+res[key]["workDescription"]+"</br>"+"Class: "+res[key]["class"]+"</br>";
          var b = document.createElement("button");
          b.innerHTML = "DeOpt This Schedule";
          b.className="deoptbtn";
          b.addEventListener('click',function(e)
            {
              if(e.target==b)
              {
                deopt_sched(res[key]["name"]);
                myScheduleDiv.removeChild(p);
              }
            },false);
           p.appendChild(b); 


          myScheduleDiv.appendChild(p);

        }

  });
}
 function show_all_sched() {

  var sched = document.getElementById("viewschedule");
  sched.style.display = "block";

  var mysched = document.getElementById("viewmysched");
  mysched.style.display = "none";

  var sched_all = document.getElementById("viewschedule_all");
  sched_all.style.display = "block";

  var sched_pref = document.getElementById("viewschedule_pref");
  sched_pref.style.display = "block";

  var profile = document.getElementById("profile");
  profile.style.display="none";
  
   fetch('/volunteer/schedules/all').then((result) => result.json()).then((res) => {
    console.log(res);
    let schedulearticle = document.getElementById('viewschedule_all');
    schedulearticle.innerHTML='<div id="allScheduleDiv"><h3>All Available Schedules</h3>  <!-- <span class="entypo-down-open"></span></h3> --></div>';
    // if(res.success){
      let fs = res;
       //for(let key in res){
        //if (key == "success") continue;
        allScheduleDiv = document.getElementById('allScheduleDiv');
        for(let key in res)
        {
         
          let p = document.createElement('div');
          p.innerHTML = "Name: "+ res[key]["name"]+"</br>"+"Work Description: "+res[key]["workDescription"]+"</br>"+"Class: "+res[key]["class"]+"</br>"+"Subject: "+res[key]["subject"]+"</br>"+"Days: "+res[key]["days"]+"</br>";
          var b = document.createElement("button");
          b.innerHTML = "Opt Schedule";
          b.className="optbtn";
          b.addEventListener('click',function(e)
            {
              if(e.target==b)
              {
                opt_sched(res[key]["name"]);
              }
            },false);
           p.appendChild(b); 
          allScheduleDiv.appendChild(p);

        }

      
  });
}
 function show_pref_sched() {
  var sched = document.getElementById("viewschedule");
  sched.style.display = "block";

  var mysched = document.getElementById("viewmysched");
  mysched.style.display = "none";

  var sched_all = document.getElementById("viewschedule_all");
  sched_all.style.display = "block";

  var sched_pref = document.getElementById("viewschedule_pref");
  sched_pref.style.display = "block";

  var prefsched = document.getElementById("prefScheduleDiv");
  prefsched.style.display = "block"; 

  var profile = document.getElementById("profile");
  profile.style.display="none";
  
   fetch('/volunteer/schedules/preferred').then((result) => result.json()).then((res) => {
    console.log(res);
    let schedulearticle = document.getElementById('viewschedule_pref');
    //schedulearticle.innerHTML='';
    // if(res.success){
      let fs = res;
      prefScheduleDiv = document.getElementById('prefScheduleDiv');
        for(let key in res)
        {
          let p = document.createElement('div');
          p.innerHTML = "Name: "+ res[key]["name"]+"</br>"+"Work Description: "+res[key]["workDescription"]+"</br>"+"Class: "+res[key]["class"]+"</br>";
          prefScheduleDiv.appendChild(p);

        }
  });
}
 function show_profile() {
  var sched = document.getElementById("viewschedule");
  sched.style.display = "none";
  var mysched = document.getElementById("viewmysched");
  mysched.style.display = "none";
  var sched_all = document.getElementById("viewschedule_all");
  sched_all.style.display = "none";
  var sched_pref = document.getElementById("viewschedule_pref");
  sched_pref.style.display = "none";
  var profile = document.getElementById("profile");
  profile.style.display="block";
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
    console.log("Opted");
    console.log(res);
    if(res.success)
    {
      
      swal("Success!", "You have Successfully Opted for this Schedule", "success");
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
    console.log("Deopted");
    console.log(res);
    if(res.success)
    {
      
      swal("Success!", "You have been Deopted from this Schedule","success");


    }
    else {
      // videosArticle.innerHTML += "<div><h3>No videos to show</h3></div>";
      swal("Failed!", "You couldn't deopt the schedule, kindly contact management.", "error");
    }
  });
} 