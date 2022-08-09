var staffList = [];

// function uniqueId() {
//   return Math.floor((1 + Math.random()) * 0x100000)
//     .toString(16)
//     .substring(Math.random() * 3);
// }
function createStaff() {
  var staffAccount = document.getElementById("tknv").value;
  var staffName = document.getElementById("name").value;
  var staffEmail = document.getElementById("email").value;
  var staffPassWord = document.getElementById("password").value;
  var staffDayPicker = document.getElementById("datepicker").value;
  var staffBasicSalary = document.getElementById("luongCB").value;
  var staffPosition = document.getElementById("chucvu").value;
  var staffWorkTime = document.getElementById("gioLam").value;
  //Tạo đối tượng nhân viên
  var staff = new Staff(
    staffAccount,
    staffName,
    staffEmail,
    staffPassWord,
    staffDayPicker,
    staffBasicSalary,
    staffPosition,
    staffWorkTime
  );
  var valid = true;
  valid &=
    kiemTraRong(staff.account, "#tbTKNV", "Tài khoản") &
    kiemTraRong(staff.name, "#tbTen", "Tên") &
    kiemTraRong(staff.email, "#tbEmail", "Email") &
    kiemTraRong(staff.passWord, "#tbMatKhau", "Mật khẩu") &
    kiemTraRong(staff.workDay, "#tbNgay", "Ngày làm") &
    kiemTraRong(staff.basicSalary, "#tbLuongCB", "Lương") &
    kiemTraRong(staff.workTime, "#tbGiolam", "Giờ làm");
  valid &= kiemTraDoDai(staff.account, "#tbTKNV", "Tài khoản", 4, 6);
  valid &= kiemTraKiTu(staff.name, "#tbTen", "Tên nhân viên");
  valid &= kiemTraEmail(staff.email, "#tbEmail", "Email");
  valid &= kiemTraPassWord(staff.passWord, "#tbMatKhau", "Mật Khẩu");
  valid &= checkOption(staff.position, "#tbChucVu", "Chức vụ");
  valid &=
    kiemTraGiaTri(staff.basicSalary, "#tbLuongCB", "Lương", 1000000, 20000000) &
    kiemTraGiaTri(staff.workTime, "#tbGiolam", "Giờ làm", 80, 200);
  if (!valid) {
    return;
  }
  staffList.push(staff);
  renderStaffList(staffList);
  saveLocalStorage(staffList, "staff");
}
function renderStaffList(staffList) {
  var output = "";
  for (var i = 0; i < staffList.length; i++) {
    var obStaff = staffList[i];
    obStaff.assessment = function () {
      if (Number(this.workTime) < 160) {
        return "Trung bình";
      } else if (Number(this.workTime) < 176) {
        return "Khá";
      } else if (Number(this.workTime) < 192) {
        return "Giỏi";
      } else {
        return "Xuất sắc";
      }
    };
    obStaff.calcSalary = function () {
      if (this.position === "Giám đốc") {
        return Number(this.basicSalary) * Number(this.workTime) * 3;
      } else if (this.position === "Trưởng phòng") {
        return Number(this.basicSalary) * Number(this.workTime) * 2;
      } else {
        return Number(this.basicSalary) * Number(this.workTime);
      }
    };
    var trStaff = `
        <tr>
            <td>${obStaff.account}</td>
            <td>${obStaff.name}</td>
            <td>${obStaff.email}</td>
            <td>${obStaff.workDay}</td>
            <td>${obStaff.position}</td>
            <td>${obStaff.calcSalary()}</td>
            <td>${obStaff.assessment()}</td>
            <td>
              <button class="btn btn-danger" onclick="delStaff('${
                obStaff.account
              }')" >Delele</button>
              <button class="btn btn-primary mt-2"data-toggle="modal" data-target="#myModal" onclick="editStaff('${
                obStaff.account
              }')" >Editt</button>
            </td>
        </tr>
    `;
    output += trStaff;
  }
  document.getElementById("tableDanhSach").innerHTML = output;
  return output;
}
function delStaff(account, e) {
  for (var i = staffList.length - 1; i >= 0; i--) {
    if (staffList[i].account === account) {
      staffList.splice(i, 1);
    }
  }
  renderStaffList(staffList);
}
function editStaff(account) {
  // console.log(!!account);
  if (account) {
    var staffEdit = null;
    for (var index = 0; index < staffList.length; index++) {
      if (staffList[index].account === account) {
        staffEdit = staffList[index];
        break;
      }
    }
    if (staffEdit !== null) {
      document.getElementById("tknv").value = staffEdit.account;
      document.getElementById("name").value = staffEdit.name;
      document.getElementById("email").value = staffEdit.email;
      document.getElementById("password").value = staffEdit.passWord;
      document.getElementById("datepicker").value = staffEdit.workDay;
      document.getElementById("luongCB").value = staffEdit.basicSalary;
      document.getElementById("chucvu").value = staffEdit.position;
      document.getElementById("gioLam").value = staffEdit.workTime;
      // document.getElementById("tknv").disabled = true;
    }
  } else {
    // document.getElementById("tknv").disabled = true;
    document.getElementById("tknv").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("luongCB").value = "";
    document.getElementById("chucvu").value = "";
    document.getElementById("gioLam").value = "";
  }
}
// function editStaff(account) {
//   var staffEdit = null;
//   for (var index = 0; index < staffList.length; index++) {
//     if (staffList[index].account === account) {
//       staffEdit = staffList[index];
//       break;
//     }
//   }
//   if (staffEdit !== null) {
//     document.getElementById("tknv").value = staffEdit.account;
//     document.getElementById("name").value = staffEdit.name;
//     document.getElementById("email").value = staffEdit.email;
//     document.getElementById("password").value = staffEdit.password;
//     document.getElementById("datepicker").value = staffEdit.workDay;
//     document.getElementById("luongCB").value = staffEdit.basicSalary;
//     document.getElementById("chucvu").value = staffEdit.position;
//     document.getElementById("gioLam").value = staffEdit.workTime;
//   }
// }
function updateStaff() {
  var staffUpdate = new Staff();
  staffUpdate.account = document.getElementById("tknv").value;
  staffUpdate.name = document.getElementById("name").value;
  staffUpdate.email = document.getElementById("email").value;
  staffUpdate.passWord = document.getElementById("password").value;
  staffUpdate.workDay = document.getElementById("datepicker").value;
  staffUpdate.basicSalary = document.getElementById("luongCB").value;
  staffUpdate.position = document.getElementById("chucvu").value;
  staffUpdate.workTime = document.getElementById("gioLam").value;
  console.log(staffUpdate);
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].account === staffUpdate.account) {
      staffList[i] = staffUpdate;
      break;
    }
  }
  renderStaffList(staffList);
}
function btnSearch() {
  var tuKhoa = document.getElementById("searchName").value;
  var output = [];
  for (var index = 0; index < staffList.length; index++) {
    if (staffList[index].assessment().search(tuKhoa) !== -1) {
      output.push(staffList[index]);
    }
  }
  renderStaffList(output);
}
document.querySelector("#btnTimNV").onclick = btnSearch;
function saveLocalStorage(ob, key) {
  var str = JSON.stringify(ob);
  localStorage.setItem(key, str);
}
function getLocalStorage(key) {
  var str = localStorage.getItem(key);
  if (str) {
    var ob = JSON.parse(str);
    return ob;
  }
  return undefined;
}
window.onload = function () {
  staffList = getLocalStorage("staff");
  if (staffList === undefined) {
    staffList = [];
  }
  renderStaffList(staffList);
};
