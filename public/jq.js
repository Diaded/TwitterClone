$(document).ready(function(){
 $(".retweet").submit(function(){
   var username=  $(this).parent().parent().parent().parant.find('.carder').find('.username').val();
    alert('working');

  });

});
