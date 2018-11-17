$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});

var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1
    }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 6000);
}

function call_requested() {
    swal("Callback Requested!", "Thank you for your interest, we will call you soon.", "success");
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
}
let loginButton = document.getElementById('request_call');
loginButton.addEventListener('click', call_requested, false);
    var ssbApp = angular.module("ssbApp", []);
    ssbApp.controller('ssbCtrl', function ($scope, $http) {
        $scope.showHideTest = false;
        $scope.showHideTest = true;
    });

var firstName = "";
var lastName = "";
var email = "";
var dType = "";
var receipt = "";
var anon = "";
var list = "";
var amount = "";

/*
    if(isiPad || jQuery.browser.mobile){
        $('#team').hide()
        $('.team-mobile').show();	
    }else{
        $('#team').show()
        $('.team-mobile').hide();
    }
*/

$(".button").click(function() {
    $(".button").removeClass("selected");
    $(this).addClass("selected");

    $(this).find("input").focus();
});

$(".set-amount").keyup(function() {

    if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    }

});


$("input").on("change", function() {
    // $(".donation-box").css("height", "500px");

    firstName = $("#firstName").val();
    lastName = $("#lastName").val();
    email = $("#email").val();

    if ($("#one-time").prop("checked")) {
        dType = "One-Time";
    }
    if ($("#monthly").prop("checked")) {
        dType = "Monthly";
    }

});

var piesiteFired = 0;
$(document).ready(function() {
    var $win = $(window),
        $win_height = $(window).height(),
        windowPercentage = $(window).height() * 0.9;
    $win.on("scroll", scrollReveal);

    function scrollReveal() {
        var scrolled = $win.scrollTop();
        $(".trigger").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                $(this).each(function(key, bar) {
                    var percentage = $(this).data("percentage");
                    $(this).css("height", percentage + "%");

                    $(this).prop("Counter", 0).animate({
                        Counter: $(this).data("percentage")
                    }, {
                        duration: 2000,
                        easing: "swing",
                        step: function(now) {
                            $(this).text(Math.ceil(now));
                        }
                    });

                });

            } else {

                $(this).each(function(key, bar) {
                    $(this).css("height", 0);
                });
            }

        });

        $(".chartBarsHorizontal .bar").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                $(this).each(function(key, bar) {
                    var percentage = $(this).data("percentage");
                    $(this).css("width", percentage + "%");

                    $(this).prop("Counter", 0).animate({
                        Counter: $(this).data("percentage")
                    }, {
                        duration: 2000,
                        easing: "swing",
                        step: function(now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });

            } else {

                $(this).each(function(key, bar) {
                    $(this).css("width", 0);
                });
            }

        });

        $(".piesite").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                if (piesiteFired == 0) {
                    timerSeconds = 3;
                    timerFinish = new Date().getTime() + timerSeconds * 1000;
                    $(".piesite").each(function(a) {
                        pie = $("#pie_" + a).data("pie");
                        timer = setInterval(
                            "stoppie(" + a + ", " + pie + ")",
                            0
                        );
                    });
                    piesiteFired = 1;
                }
            } else {
                $(".piesite").each(function() {
                    piesiteFired = 0;
                });
            }
        });
    }
    scrollReveal();
});

var timer;
var timerFinish;
var timerSeconds;

function drawTimer(c, a) {
    $("#pie_" + c).html(
        '<div class="percent"></div><div id="slice"' +
        (a > 50 ? ' class="gt50"' : "") +
        '><div class="pie"></div>' +
        (a > 50 ? '<div class="pie fill"></div>' : "") +
        "</div>"
    );
    var b = 360 / 100 * a;
    $("#pie_" + c + " #slice .pie").css({
        "-moz-transform": "rotate(" + b + "deg)",
        "-webkit-transform": "rotate(" + b + "deg)",
        "-o-transform": "rotate(" + b + "deg)",
        transform: "rotate(" + b + "deg)"
    });
    a = Math.floor(a * 100) / 100;
    arr = a.toString().split(".");
    intPart = arr[0];
    $("#pie_" + c + " .percent").html(
        '<span class="int">' +
        intPart +
        "</span>" +
        '<span class="symbol">%</span>'
    );
}

function stoppie(d, b) {
    var c = (timerFinish - new Date().getTime()) / 1000;
    var a = 100 - c / timerSeconds * 100;
    a = Math.floor(a * 100) / 100;
    if (a <= b) {
        drawTimer(d, a);
    } else {
        b = $("#pie_" + d).data("pie");
        arr = b.toString().split(".");
        $("#pie_" + d + " .percent .int").html(arr[0]);
    }
}

function set_amount(amount) {
    var field = document.getElementById('donation_amount');
    field.value = amount;
}
function initiatePayment() {
    swal("Transaction Accepted!","You will now be forwarded to the payment gateway.", "success");

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let mobile = document.getElementById('mobile').value;
    let amount = document.getElementById('donation_amount').value;
    fetch('/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            mobile: mobile,
            amount: amount,
            isMonetary: true
        })
    }).then((result) => result.json()).then((res) => {
        if(!res.success) alert('Payment initiation failed');
        else {
            let details = res.details;
            let f1 = document.getElementsByName('f1')[0];
            for(let i in details){
                f1.innerHTML += "<input type='hidden' name='" + i + "' value='" + details[i] + "'>"	
            }
            f1.submit();
        }
    });
}

let initPaymentBtn = document.getElementById('initPayment');
initPaymentBtn.addEventListener('click', initiatePayment, false);

fetch('/donate/received').then((result) => result.json()).then((res) => {
    let monthly_requirement = 5000;
    let moneyReceivedRatio = document.getElementById('moneyRatio');
    moneyReceivedRatio.style.height = (10 + res.amount/monthly_requirement).toString() + "px";
    moneyReceivedRatio.style.top = "-" + (55 + res.amount/monthly_requirement).toString() + "px"; 
    let moneyReceived = document.getElementById('moneyReceived');
    moneyReceived.innerHTML = "₹" + res.amount.toLocaleString('en-IN'); 
});