$(".replace-form").hide();
$(".delete-form").hide();
$(".replace").css("border-bottom", "none");
$(".delete").css("border-bottom", "none");
$(".replace").click(function(){
  $(".AddQuote-form").hide();
  $(".replace-form").show();
    $(".delete-form").hide();
     $(".AddQuote").css("border-bottom", "none");
    $(".replace").css("border-bottom", "2px solid blue");
  $(".delete").css("border-bottom", "none");

 
});
$(".delete").click(function(){
  $(".AddQuote-form").hide();
  $(".replace-form").hide();
  $(".delete-form").show();
  $(".AddQuote").css("border-bottom", "none");
    $(".replace").css("border-bottom", "none");
  $(".delete").css("border-bottom", "2px solid blue");
});
$(".AddQuote").click(function(){
  $(".AddQuote-form").show();
  $(".replace-form").hide();
  $(".delete-form").hide();
  $(".replace").css("border-bottom", "none");
  $(".AddQuote").css("border-bottom", "2px solid blue");
    $(".delete").css("border-bottom", "none");
});

$(".btn").click(function(){
  $(".input").val("");
});