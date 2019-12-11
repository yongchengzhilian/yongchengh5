export function LiftEffect(json) {
  var array = []

  for (var i = 0; i < json.target.length; i++) {
    var t = $(json.target[i]).offset().top
    array.push(t)
  }

  function Selected(index) {
    $(json.control2).children().eq(index).addClass(json.current).siblings().removeClass(json.current)
  }

  $(window).on('scroll', Check)

  function Check() {
    var wst = $(window).scrollTop()

    // if(wst >= $(json.target[0]).offset().top-100){
    //   $(json.control1).fadeIn(500);
    // }else{
    //   $(json.control1).fadeOut(500);
    // }

    var key = 0
    var flag = true
    for (var i = 0; i < array.length; i++) {
      key++
      if (flag) {
        if (wst >= array[array.length - key] - 300) {
          var index = array.length - key
          flag = false
        } else {
          flag = true
        }
      }
    }
    Selected(index)
  }

  $(json.control2).children().on('click', function() {
    $(window).off('scroll')
    var index = $(this).index()
    Selected(index)

    var flag = true
    for (var i = 0; i < array.length; i++) {
      if (flag) {
        if (index == i) {
          $('html,body').stop().animate({
            'scrollTop': array[i] - 50
          }, 500, function() {
            $(window).on('scroll', Check)
          })
          flag = false
        } else {
          flag = true
        }
      }
    }
  })
}
export function getQueryVariable(variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) { return pair[1] }
  }
  return (false)
}
export function getParameterByName(name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
