$(document).ready(function(){

$(".like").submit(function(){
    //e.preventDefault();
    var username=  $(this).parent().parent().parent().parent().find('.username').html();
    var str= $(this).parent().parent().parent().parent().find('.str').html();
    data={username: username, str: str};
    $.ajax({
      type:'POST',
      url:'/like',
      data:data,
      success: function(data){
        setTimeout(function(){
        location.reload();
      }, 700);
      }
    });
    return false;
  });

  $('.tweetOut').submit(function(){
      $('.reTWEET').hide();
      username=  $(this).parent().parent().parent().parent().find('.username').html();
      str= $(this).parent().parent().parent().parent().find('.str').html();
      $(this).parent().parent().parent().parent().find('.reTWEET').show();
      return false;
  });


$('.tweeter').submit(function(){
  var str=$(this).find('.tweetStr').val();
  data ={tweet: str}

  $.ajax({
    type:'POST',
    url:'/tweet',
    data:data,
    success: function(data){
      setTimeout(function(){
      location.reload();
    }, 700);
    }
  });
  return false;
});

$('.reTWEET1').click(function(){
  username=  $(this).parent().parent().parent().parent().find('.username').html();
  str= $(this).parent().parent().parent().parent().find('.str').html();
  tweetSTR=$(this).parent().parent().parent().parent().find('.reTWEET2').val();
  var data= {username:username, str:str, tweetString:tweetSTR};

  $.ajax({
    type:'POST',
    url:'/retweet',
    data:data,
    success: function(data){
    setTimeout(function(){
      window.location.reload();
    }, 700);
    }
});
return false;
});

$('.Unlike').submit(function(){
  username= $(this).parent().parent().parent().parent().find('.username').html();
  str=$(this).parent().parent().parent().parent().find('.str').html();
  data= {username: username, str: str};

  $.ajax({
    type:'POST',
    url:'/unlike',
    data:data,
    success: function(data){
      setTimeout(function(){
        window.location.reload();
      }, 700);
    }

  });
return false;
});

});
