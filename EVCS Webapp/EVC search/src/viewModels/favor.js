// class를 만들어서 해결해보자 로직처리
function Favor () {
  this.favorArr = []

  this.Getter = function () {
    return this.favorArr
  }
  this.Setter = function (target) {
    for (var i in target) {
      for (var j in this.favorArr) {
        if (target[i].statNm[0] === this.favorArr[j].statNm[0]) {
          target[i].chosen = true
        }
      }
    }
    return target
  }
  this.Delete = function (favorlist) {
    for (var i in this.favorArr) {
      if (this.favorArr[i].statNm[0] === favorlist.statNm[0]) {
        this.favorArr.splice(i, 1)
        return 'success'
      }
    }
  }
  this.Insert = function (favorlist) {
    var flag = true
    for (var i in this.favorArr) {
      if (this.favorArr[i].statNm[0] === favorlist.statNm[0]) {
        flag = false
        break
      }
    }
    if (flag) {
      this.favorArr.push(favorlist)
      return 'success'
    } else {
      return 'fail'
    }
  }
}
module.exports = new Favor()
