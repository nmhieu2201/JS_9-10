function Staff(
  account,
  name,
  email,
  passWord,
  workDay,
  basicSalary,
  position,
  workTime
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.passWord = passWord;
  this.workDay = workDay;
  this.basicSalary = basicSalary;
  this.position = position;
  this.workTime = workTime;
  this.assessment = function(){
    if (Number(this.workTime) < 160 ) {
      return "Trung bình";
    }
    else if (Number(this.workTime) < 176){
      return "Khá";
    }
    else
    if (Number(this.workTime) < 192){
      return "Giỏi";
    }
    else {
      return "Xuất sắc";
    }
  }
  this.calcSalary = function () {
    if (this.position === "Giám đốc") {
      return Number(this.basicSalary) * Number(this.workTime) * 3;
    }else
    if (this.position === "Trưởng phòng"){
      return Number(this.basicSalary) * Number(this.workTime) * 2;
    }
    else {
      return Number(this.basicSalary) * Number(this.workTime); 
    }
}}
