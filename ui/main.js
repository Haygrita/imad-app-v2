console.log("all well");
var commentators=[];
document.getElementById('submit-button').onclick=function(){
  var inputs={
    'name':'',
    'comment':''
  }
  var name=document.getElementById('name').value;
  var comment=document.getElementById('comment').value;
  console.log("am in")
  inputs.name=name;
  inputs.comment=comment;
  console.log(JSON.stringify(inputs));
  commentators.push(inputs);
  console.log("here i am ",commentators);
  li='';
for(var i of commentators){
  console.log(i);
  li+=`
  <div id='comment-box'>
       <h4>${i.name}</h4>
       <hr/>
       <p>${i.comment}</p>
       </div>
       `
  document.getElementById('comments').innerHTML=li;

}
document.getElementById('name').value=null;
document.getElementById('comment').value=null;
}
