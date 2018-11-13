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

  fetch('/management/users/student').then((result) => result.json()).then((res) => {
    console.log(res);
    if(res.success){
      let detailsDiv1 = document.getElementById('detailsDiv1');
      res['users'].forEach(function(u){
        let p = document.createElement('div');
        p.innerHTML = "Name:"+u["name"]+"</br>"+"Username:"+u["username"]+"</br>"+"Email:"+u["email"]+"</br>";
        var button = document.createElement('button');
        button.addEventListener("click",function(){
          fetch('/management/deleteUser/student',{
            method : "POST",
            body: JSON.stringify(
            {
              name : u["username"],
            }),
            headers: {"Content-Type" : "application/json;charset=utf-8"}
          }).then((result) => result.json()).then((res) => {
            console.log(res);
            if(res.success){
              detailsDiv1.removeChild(p);
            }
            });
        })
        p.append(button)
        detailsDiv1.appendChild(p);

    });
  }
});

fetch('/management/users/teacher').then((result) => result.json()).then((res) => {
  //console.log(res);
  if(res.success){
    let detailsDiv2 = document.getElementById('detailsDiv2');
    res['users'].forEach(function(u){
      let p = document.createElement('div');
      p.innerHTML = "Name:"+u["name"]+"</br>"+"Username:"+u["username"]+"</br>"+"Email:"+u["email"]+"</br>";
      detailsDiv2.appendChild(p);
  });
}
});

  fetch('/management/schedules').then((result) => result.json()).then((res) => {
    //console.log(res);
    for(let key in res){
      let p = document.createElement('div');
      p.innerHTML = "Name:"+res[key]["name"]+"</br>"+"Work Description:"+res[key]["workDescription"]+"</br>"+"Class:"+res[key]["class"]+"</br>"+"Subject:"+res[key]["subject"];
      detailsDiv.appendChild(p);
    }
    });
});



function show_students() {
  var students = document.getElementById("students");
  students.style.display = "block";
  var teachers = document.getElementById("teachers");
  teachers.style.display = "none";
  var schedule = document.getElementById("schedule");
  schedule.style.display = "none";
}

function show_teachers() {
  var students = document.getElementById("students");
  students.style.display = "none";
  var teachers = document.getElementById("teachers");
  teachers.style.display = "block";
  var schedule = document.getElementById("schedule");
  schedule.style.display = "none";
}

function show_schedule() {
  var students = document.getElementById("students");
  students.style.display = "none";
  var teachers = document.getElementById("teachers");
  teachers.style.display = "none";
  var schedule = document.getElementById("schedule");
  schedule.style.display = "block";
}
