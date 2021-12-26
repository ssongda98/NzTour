//NAV

let myLink = document.getElementById("myLink");
let nav_hamberger = document.getElementById("nav_hamberger");
let nav_x = document.getElementById("nav_x");

nav_hamberger.addEventListener("click", toggleLink);
nav_x.addEventListener("click", close);

function toggleLink() {
  if (myLink.style.display === "block") {
    myLink.style.display = "none";
  } else {
    myLink.style.display = "block";
    nav_hamberger.style.display = "none";
    nav_x.style.display = "block";
  }
}

function close() {
  myLink.style.display = "none";
  nav_x.style.display = "none";
  nav_hamberger.style.display = "block";
}

//ItemLIsts

let item_lists;

let item_title = document.getElementsByClassName("item_title");
let min_p = document.getElementsByClassName("min_p");
let max_p = document.getElementsByClassName("max_p");
let min_n = document.getElementsByClassName("min_n");
let max_n = document.getElementsByClassName("max_n");
let item_price = document.getElementsByClassName("price");
let item_img = document.getElementsByClassName("item_img");
let mobile_item_price = document.getElementsByClassName("mobile_price");
let mobile_min_p = document.getElementsByClassName("mobile_min_p");
let mobile_max_p = document.getElementsByClassName("mobile_max_p");
let mobile_min_n = document.getElementsByClassName("mobile_min_n");
let mobile_max_n = document.getElementsByClassName("mobile_max_n");

let modal_item_title = document.getElementById("modal_item_title");
let overlay_img = document.getElementById("overlay_img");
let modal_min_p = document.getElementById("modal_min_p");
let modal_max_p = document.getElementById("modal_max_p");
let modal_min_n = document.getElementById("modal_min_n");
let modal_max_n = document.getElementById("modal_max_n");
let modal_price = document.getElementById("modal_price");

$.getJSON("item_lists.json", function (data) {
  item_lists = data;

  for (i = 0; i < item_price.length; i++) {
    item_title[i].innerHTML = item_lists[i].type;
    min_p[i].innerHTML = item_lists[i].min_p;
    max_p[i].innerHTML = item_lists[i].max_p;
    min_n[i].innerHTML = item_lists[i].min_n;
    max_n[i].innerHTML = item_lists[i].max_n;
    item_price[i].innerHTML = item_lists[i].price;
    mobile_item_price[i].innerHTML = item_lists[i].price;
    mobile_min_p[i].innerHTML = item_lists[i].min_p;
    mobile_max_p[i].innerHTML = item_lists[i].max_p;
    mobile_min_n[i].innerHTML = item_lists[i].min_n;
    mobile_max_n[i].innerHTML = item_lists[i].max_n;
    item_img[i].src = item_lists[i].img;

    bt_booking[i].id = item_lists[i].type;
  }
});

//Modal

let modal = document.getElementById("overlay_container");
let modal_x = document.getElementById("modal_x");
let bt_reserve = document.getElementById("bt_reserve");
let bt_booking = document.getElementsByClassName("item_booking");
let bt_m_booking = document.getElementsByClassName("mobile_item_booking");

for (i = 0; i < bt_booking.length; i++) {
  bt_booking[i].addEventListener("click", openModal);
  bt_m_booking[i].addEventListener("click", openModal);
}
modal_x.addEventListener("click", closeModal);
bt_reserve.addEventListener("click", closeModal);

let checkIn = document.getElementById("checkIn");
checkIn.value = "2021-1-1";

function openModal() {
  modal.classList.toggle("hidden");

  for (i = 0; i < item_lists.length; i++) {
    if (item_lists[i].type == this.id) {
      modal_item_title.innerHTML = item_lists[i].type;
      modal_min_p.innerHTML = item_lists[i].min_p;
      modal_max_p.innerHTML = item_lists[i].max_p;
      modal_min_n.innerHTML = item_lists[i].min_n;
      modal_max_n.innerHTML = item_lists[i].max_n;
      overlay_img.src = item_lists[i].img;
      modal_price.innerHTML = item_lists[i].price;
    }
  }
}

function closeModal() {
  modal.classList.toggle("hidden");
  $("form").each(function () {
    this.reset();
  });

  days.innerHTML = 0;
  guests.innerHTML = 0;
  price.innerHTML = 0;
}

//------------pure JS calander

//----Max data------
// document.getElementById('checkIn').oninput = function(){
//   let checkIn = new Date(document.getElementById('checkIn').value);
//   // below function of .getTime() turns date into miliseconds (how many miliseconds passed since a specific date called Unix time)
//   let max_date = new Date(checkIn.getTime() + (1000*3600*24*15));
//   console.log(max_date);
//   document.getElementById('checkOut').max = max_date;
// };

const landing_form = document.getElementById("landing_form");
landing_form.addEventListener("submit", submission_func);
function submission_func(event) {
  var landing_formData = new FormData(landing_form);
  let guest_number = landing_formData.get("guest_number");
  let checkIn_input = landing_formData.get("checkIn");
  let checkOut_input = landing_formData.get("checkOut");
  let number_of_days = calculate_day_difference(checkIn_input, checkOut_input);

  let info_to_store = {
    guest_no_data: guest_number,
    days_no_data: number_of_days,
    checkIn_data: checkIn_input,
    checkOut_data: checkOut_input,
  };
  let info_json_format = JSON.stringify(info_to_store);
  localStorage.setItem("landing_info_JSON", info_json_format);

  console.log(number_of_days);
}

function calculate_day_difference(checkIn_value, checkOut_value) {
  let checkIn = new Date(checkIn_value);
  let checkOut = new Date(checkOut_value);
  // below function of .getTime() turns date into miliseconds (how many miliseconds passed since a specific date called Unix time)
  let date_difference_in_miliseconds = checkOut.getTime() - checkIn.getTime();
  // by dividing it with 1000 we get rid of 'mili' part of seconds
  // by dividing it with 3600 we convert seconds into hours (60 minutes in an hour, 60 seconds in a minute; therefore 3600 seconds in an hour)
  // by dividing it with 24 we convert it into days (24 hours in a day)
  // so if we combine all those; we divide it by 1000*3600*24 to convert into days
  let difference_in_days = date_difference_in_miliseconds / (1000 * 3600 * 24);
  // function now returns the number of days between two dates
  return difference_in_days;
}

//result

$(function () {
  $("form").submit(function () {
    let received_JSONformat_data = localStorage.getItem("landing_info_JSON");
    let landing_form_data = JSON.parse(received_JSONformat_data);
    console.log(landing_form_data);
    document.getElementById("guests").innerHTML =
      landing_form_data.guest_no_data;
    document.getElementById("days").innerHTML = landing_form_data.days_no_data;

    let totalPrice = days.innerHTML * modal_price.innerHTML;
    document.getElementById("price").innerHTML = "$" + totalPrice;

    return false;
  });
});

//------ for define max value
// var myCurrentDate= new Date(checkIn_value);
// var myFutureDate=new Date(myCurrentDate);
//     myFutureDate.setDate(myFutureDate.getDate()+ 8);

//     console.log(myCurrentDate);
//     console.log(myFutureDate);

//--------------MODAL CONTENT FROM JSON

// let modal_item_title = document.getElementsByClassName('modal_item_title');
// let overlay_img = document.getElementsByClassName('overlay_img');
// let modal_min_p = document.getElementsByClassName('modal_min_p');
// let modal_max_p = document.getElementsByClassName('modal_max_p');
// let modal_min_n = document.getElementsByClassName('modal_min_n');
// let modal_max_n = document.getElementsByClassName('modal_max_n');

// console.log(modal_item_title[0].innerHTML);

// $.getJSON("item_lists.json", function(data){
//   item_lists = data;

//   for (i = 0; i < item_price.length; i++){
//     modal_item_title[0].innerHTML = item_lists[i].type;
//     modal_min_p[0].innerHTML = item_lists[i].min_p;
//     modal_max_p[0].innerHTML = item_lists[i].max_p;
//     modal_min_n[0].innerHTML = item_lists[i].min_n;
//     modal_max_n[0].innerHTML = item_lists[i].max_n;
//     overlay_img[0].src = item_lists[i].img;
//   }
// });

//No reload after submit
// $.fn.serializeObject = function(){
//   var o = {};
//   var a = this.serializeArray();
//   $.each(a, function() {
//       if (o[this.name] !== undefined) {
//           if (!o[this.name].push) {
//               o[this.name] = [o[this.name]];
//           }
//           o[this.name].push(this.value || '');
//       } else {
//           o[this.name] = this.value || '';
//       }
//   });
//   return o;
// };
