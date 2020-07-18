$(document).ready(function (){
  $(document).on('click', '.rebuild', rebuild)
  
  function rebuild(){
    window.location = '/rebuild'
  }

  $(document).on('click', '.delete', deleteRoute)
  
  function deleteRoute(){
    window.location = '/delete'
  }
})