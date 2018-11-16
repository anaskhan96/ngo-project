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
        var t = document.createTextNode("Remove Student");
        button.appendChild(t);
        button.setAttribute("style", "background-color: red;border:2px solid black;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;");
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
        p.append(button);
        detailsDiv1.appendChild(p);

    });
  }
});

fetch('/management/users/teacher').then((result) => result.json()).then((res) => {
  //console.log(res);
  console.log(res);
  if(res.success){
    let detailsDiv2 = document.getElementById('detailsDiv2');
    res['users'].forEach(function(u){
      let p = document.createElement('div');
      p.innerHTML = "Name:"+u["name"]+"</br>"+"Username:"+u["username"]+"</br>"+"Email:"+u["email"]+"</br>";
      var button = document.createElement('button');
      var t = document.createTextNode("Remove Teacher");
      button.appendChild(t);
      button.setAttribute("style", "background-color: red;border:2px solid black;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;");
      button.addEventListener("click",function(){
        fetch('/management/deleteUser/teacher',{
          method : "POST",
          body: JSON.stringify(
          {
            name : u["username"],
          }),
          headers: {"Content-Type" : "application/json;charset=utf-8"}
        }).then((result) => result.json()).then((res) => {
          console.log(res);
          if(res.success){
            detailsDiv2.removeChild(p);
          }
          });
      })
      p.append(button);
      detailsDiv2.appendChild(p);

  });
  }
});

  fetch('/management/schedules').then((result) => result.json()).then((res) => {
    //console.log(res);
    for(let key in res){
      let p = document.createElement('div');
      p.innerHTML = "Name:"+res[key]["name"]+"</br>"+"Work Description:"+res[key]["workDescription"]+"</br>"+"Class:"+res[key]["class"]+"</br>"+"Subject:"+res[key]["subject"];
      var button = document.createElement('button');
      var t = document.createTextNode("Remove Teacher");
      button.appendChild(t);
      button.setAttribute("style", "background-color: red;border:2px solid black;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;");
      button.addEventListener("click",function(){
        fetch('/management/deleteSchedule',{
          method : "POST",
          body: JSON.stringify(
          {
            name : res[key]["name"],
          }),
          headers: {"Content-Type" : "application/json;charset=utf-8"}
        }).then((result) => result.json()).then((res) => {
          console.log(res);
          if(res.success){
            detailsDiv.removeChild(p);
          }
          });
      })
      p.append(button);
      detailsDiv.appendChild(p);
    }
    });

    fetch('/management/donations').then((result) => result.json()).then((res) => {
      console.log(res);
      res['donations'].forEach(function(u){
        let p = document.createElement('div');
        p.innerHTML = "Name:"+u["name"]+"</br>"+"Email:"+u["email"]+"</br>"+"moblie#:"+u["mobile"]+"</br>"+"Amount Donated:"+u["amountDonated"]+"</br>"+"Transaction Details:"+u["transactionDetails.STATUS"];
        detailsDiv3.appendChild(p);
      });
    });
});


function show_students() {
  var students = document.getElementById("students");
  students.style.display = "block";
  var teachers = document.getElementById("teachers");
  teachers.style.display = "none";
  var schedule = document.getElementById("schedule");
  schedule.style.display = "none";
  var dons = document.getElementById("donations");
  dons.style.display = "none";
}

function show_teachers() {
  var students = document.getElementById("students");
  students.style.display = "none";
  var teachers = document.getElementById("teachers");
  teachers.style.display = "block";
  var schedule = document.getElementById("schedule");
  schedule.style.display = "none";
  var dons = document.getElementById("donations");
  dons.style.display = "none";
}

function show_schedule() {
  var students = document.getElementById("students");
  students.style.display = "none";
  var teachers = document.getElementById("teachers");
  teachers.style.display = "none";
  var schedule = document.getElementById("schedule");
  schedule.style.display = "block";
  var dons = document.getElementById("donations");
  dons.style.display = "none";
}
function show_donations() {
  var students = document.getElementById("students");
  students.style.display = "none";
  var teachers = document.getElementById("teachers");
  teachers.style.display = "none";
  var schedule = document.getElementById("schedule");
  schedule.style.display = "none";
  var dons = document.getElementById("donations");
  dons.style.display = "block";
}




function add_user(){
    //do same as add_schedule and collect input using form
    alert("Hello");
}

function add_teacher(){
    //do same as add_schedule and collect input using form
    alert("Hello");
}

function add_schedule(){
  fetch('/management/addSchedule',{
    method : "POST",
    body: JSON.stringify(
    {
      name : "Ash",
      workDescription : "Stuff",
      class : 6,
      subject: "Math",
    }),
    headers: {"Content-Type" : "application/json;charset=utf-8"}
  }).then((result) => result.json()).then((res) => {
    console.log(res);
    show_schedule();  // ajax call to reload page not working
    });


}
