function kiemTraRong(value, selectorError, name) {
  if (value === "") {
    document.querySelector(selectorError).innerHTML =
      name + " không được bỏ trống";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
function kiemTraKiTu(value, selectorError, name) {
  var regex = /^[A-Z a-z]+$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " tất cả phải là ký tự!";
  return false;
}
function kiemTraSo(value, selectorError, name) {
  var regex = /^[0-9]+$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + " phải là số!";
  return false;
}
function kiemTraEmail(value, selectorError, name) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không hợp lệ! vd: abc@domain.com";
  return false;
}
function kiemTraDoDai(value, selectorError, name, minLength, maxLength) {
  var regex = /^[0-9]+$/;
  if (regex.test(value)) {
    if (value.length > maxLength || value.length < minLength) {
      document.querySelector(selectorError).innerHTML =
        name + " từ " + minLength + " đến " + maxLength + " kí số";
      return false;
    }
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
}
function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
  if (
    Number(value) < minValue ||
    Number(value) > maxValue ||
    value.trim() === ""
  ) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minValue + " đến " + maxValue;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
function kiemTraPassWord(value, selectorError, name) {
  var regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không hợp lệ! vd: Hieu_2201";
  return false;
}
// function checkOption (value, selectorError, name) {
//   if (value === "") {
//     document.querySelector(selectorError).innerHTML =
//       name + " không được bỏ trống";
//     return false;
//   }
//   document.querySelector(selectorError).innerHTML = "";
//   return true;
// }
function checkOption (value, selectorError, name) {
  if (value === "Chọn chức vụ"){
    document.querySelector(selectorError).innerHTML = name + " không được để trống ";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}