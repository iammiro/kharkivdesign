active = undefined
cl = undefined
widthScreen = undefined
$(window).resize ->
  widthScreen = $(window).width()
  if widthScreen > 1200
    $('.nav_primary').addClass 'active'
    $('[data-toggle]').css display: 'block'
  else
    $('.nav_primary').removeClass 'active'
    $('[data-toggle]').css display: 'none'
  return
$('.nav_primary').on 'click', ->
  active = $(this).hasClass('active')
  cl = $(this).attr('cl')
  if active
    $(this).removeClass 'active'
    $('[data-toggle="' + cl + '"]').css display: 'none'
  else
    $(this).addClass 'active'
    $('[data-toggle="' + cl + '"]').css display: 'block'
  return