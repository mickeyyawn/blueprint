var utils={s4:function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},guid:function(){return utils.s4()+utils.s4()+"-"+utils.s4()+"-"+utils.s4()+"-"+utils.s4()+"-"+utils.s4()+utils.s4()+utils.s4()}},ObjectTemplate=function(){var t,e=0,n=function(n){e++;var o=void 0===n?"Unknown":n;t=utils.guid(),this.getId=function(){return t},this.getName=function(){return o},this.setName=function(t){o=t}};return n.instanceCount=function(){return e},n.prototype.announce=function(){console.log("Hello!  My id: "+t)},n}(),Task=function(){this.id=0,this.name="",this.dueDate={}},TaskView=function(){var t=function(){};return t.prototype.render=function(){var t=$("#tasks-template").html();t=Handlebars.compile(t),Handlebars.registerPartial("task",$("#task-partial").html());var e=t(blueprint);$("#content").append(e)},t.prototype.hide=function(){$("#bp-taskview").hide()},t.prototype.show=function(){},t}(),blueprint={tasks:[],taskView:{}};$(document).ready(function(){var t=new ObjectTemplate;t.announce(),console.log("obj1 id: "+t.getId()),console.log("obj1 name: "+t.getName()),console.log("how many instances: "+ObjectTemplate.instanceCount());var e=new ObjectTemplate("custom name");e.announce(),console.log("obj2 id: "+e.getId()),console.log("obj2 name: "+e.getName()),e.setName("this is my new name..."),console.log("obj2 name: "+e.getName()),console.log("how many instances: "+ObjectTemplate.instanceCount());for(var n=({id:utils.guid(),name:"task1",dueDate:moment()},{id:utils.guid(),name:"task2, this is my cool task!",dueDate:moment()},0);20>n;n++){var o=new Task;o.id=n,o.name="this is my name : "+n,blueprint.tasks.push(o)}console.log(blueprint),blueprint.taskView=new TaskView,blueprint.taskView.render()});