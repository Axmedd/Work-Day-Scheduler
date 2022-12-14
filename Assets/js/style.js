/// This will make sure the time changes everyday

// $(".time-checking").each(function () {
//   var currentHour = moment().hour();
//   var blockHour = $(this).attr("id");
//   console.log("Current Hour: " + currentHour);
//   console.log("BLock Hour: " + blockHour);

//   if (moment().hour() > blockHour) {
//     $(".hour").addClass(".past");
//   } else if (moment().hour() < blockHour) {
//     $(".hour").addClass(".future");
//   } else {
//     $(".hour").addClass(".present");
//   }
// });

function time() {
  let today = moment();

  $("#currentDay").text(today.format("dddd, MMMM Do YYYY")); // This is the format of the day eg Friday, August 26th 2022

  let now = moment().format("kk");
  for (let i = 0; i < arrayForSchedule.length; i++) {
    arrayForSchedule[i].removeClass("future past present");

    if (now > arrayForSchedule[i].data("hour")) {
      arrayForSchedule[i].addClass("past");
    } else if (now === arrayForSchedule[i].attr("data-hour")) {
      arrayForSchedule[i].addClass("present");
    } else {
      arrayForSchedule[i].addClass("future");
    }
  }
}

// var checkTime = function () {
//   var hour = $(".hour").text().trim();

//   var time = moment(hour, "LT");
//   console.log(time);

//   $(".hour").removeClass(".present .past .future");

//   if (moment().isAfter(time)) {
//     $(".hour").addClass(".past");
//   } else if (moment().isBefore(time)) {
//     $(".hour").addClass(".future");
//   } else {
//     $(".hour").addClass(".present");
//   }
//   };

//   checkTime();
// }

window.addEventListener("load", (event) => {
  // Will make sure the time function is called when page loads
  time();
});

// All ID and Classes for Textarea

let container = $(".container");
let saveBtn = $(".save-btn");
let time9am = $("#9AM");
let time10am = $("#10AM");
let time11am = $("#11AM");
let time12pm = $("#12PM");
let time1pm = $("#1PM");
let time2pm = $("#2PM");
let time3pm = $("#3PM");
let time4pm = $("#4PM");
let time5pm = $("#5PM");

let arrayForSchedule = [
  time9am,
  time10am,
  time11am,
  time12pm,
  time1pm,
  time2pm,
  time3pm,
  time4pm,
  time5pm,
];

renderLastRegistered();
time();
setInterval(time(), 1000);

// render schedule saved in local storage
function renderLastRegistered() {
  for (let el of arrayForSchedule) {
    el.val(localStorage.getItem("time block " + el.data("hour")));
  }
}

function taskSubmitter(event) {
  /// This function will handle things when the save button is clicked
  event.preventDefault();

  let clickedBtn = $(event.currentTarget);

  let textTarget = clickedBtn.siblings("textarea");

  let targetTimeBlock = textTarget.data("hour");

  localStorage.setItem("time block " + targetTimeBlock, textTarget.val());
}

saveBtn.on("click", taskSubmitter);
