$(document).ready(function(){
 $(".retweet").submit(function(){
    var username=  $(this).parent().parent().parent().parent().find('.username').html();
    data={username: username};
    $.ajax({
      type:'POST',
      url:"/retweet",
      data:data,
      success: function(data){
        location.reload();
      }
    });

  });

  $(".like").submit(function(){
    var username=  $(this).parent().parent().parent().parent().find('.username').html();
    var str= $(this).parent().parent().parent().parent().find('.str').html();
    data={username: username, str: str};
    $.ajax({
      type:'POST',
      url:'/like',
      data:data,
      success: function(data){
        location.reload();

      }
    });
  });

});
