$(function(){
  color_picked = false;
  type_picked = false;
  $('#color_main').change(function(){
    if(!type_picked){
      less.modifyVars({'@color_main' : $(this).val()})
    }else{
      less.modifyVars({'@color_main' : $(this).val(), '@color_type' : type_picked})
    }
    color_picked = $(this).val();
  });
  $('#color_type').change(function(){
    if(!color_picked){
      less.modifyVars({'@color_type' : $(this).val()})
    }else{
      less.modifyVars({'@color_type' : $(this).val(), '@color_main' : color_picked})
    }
    type_picked = $(this).val();
  });
  $('q').hover(function(){
    current_content= $(this).html();
    $(this).html(current_content+' <a href="'+$(this).attr('cite')+'" target="_blank"><img src="images/external.png" /></a>');
  },
  function(){
   $(this).html(current_content);
  }
  );
});
