var app=angular.module("chatApp",["ui.router"])
.config(function($stateProvider,$urlRouterProvider)
 {
    
        
        
})//end config
.controller("userCreationCtrl", function ($scope,$rootScope) 
{
    var vm=this;
    vm.username=undefined;

    vm.createUser=function(username){
        $rootScope.$emit("new-user",username); 
    }
    
})
.controller("chatCtrl", function ($scope,$rootScope,$window) 
{
    var vm=this;
    vm.username=undefined;
    var newMessage=undefined;
    var socket=io.connect("localhost:3000/");
    vm.messages=[];

    socket.on("receive-message",function(msg){
        $scope.$apply(function(){
            vm.messages.push(msg);
            newMessage=undefined;
        })
        
    })
    vm.sendMessage=function(){
        var newMessage={
            username:vm.username,
            message:vm.newMessage
        }
        socket.emit("new-message",newMessage);
        var newMessage=undefined;
    }

    socket.emit("test","we are sending a message");

    $rootScope.$on("new-user",function(event,username){
        vm.username=username;

    })

    $scope.$watch(function(){
        return vm.username
    },function(){
        if(vm.username){
            console.log("this is the user function2",vm.username);
        }
    })
})
