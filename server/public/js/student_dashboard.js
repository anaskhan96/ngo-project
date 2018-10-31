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