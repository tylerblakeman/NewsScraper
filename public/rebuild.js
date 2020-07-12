$(document).ready(function (){
  $(document).on('click', '.rebuild', rebuild)

  function rebuild(){
    window.location = '/delete'
  }
})