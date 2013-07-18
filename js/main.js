var app = angular.module("problemSwitcher",[]);
app.factory("data",function(){
	return {
        problems : [
		{
				"id":1,
				"body":"1选哪个呢？",	
				"choices":[	
						{id:0,"body":"1ya1","is_correct":true},
						{id:1,"body":"1ya2","is_correct":false},
						{id:2,"body":"1ya3","is_correct":false},
						{id:3,"body":"1ya4","is_correct":false}
				]
		},
        {
                "id":2,
                "body":"2选哪个呢？",	
                "choices":[
                        {id:0,"body":"2ya1","is_correct":false},
                        {id:1,"body":"2ya2","is_correct":false},
                        {id:2,"body":"2ya3","is_correct":true},
                        {id:3,"body":"2ya4","is_correct":false}
                ]
        },
        {
                "id":3,
                "body":"3选哪个呢？",	
                "choices":[
                        {id:0,"body":"3ya1","is_correct":true},
                        {id:1,"body":"3ya2","is_correct":false},
                        {id:2,"body":"3ya3","is_correct":false},
                        {id:3,"body":"3ya4","is_correct":false}
                ]
        },
        {
                "id":4,
                "body":"4选哪个呢？",	
                "choices":[
                        {id:0,"body":"4ya1","is_correct":false},
                        {id:1,"body":"4ya2","is_correct":false},
                        {id:2,"body":"4ya3","is_correct":false},
                        {id:3,"body":"4ya4","is_correct":true}
                ]
        }]
    }
});

USERDATA = {};

var switchCtrl = app.controller("SwitchCtrl",function($scope,data) {
	$scope.problems = data.problems;

    $scope.show = [];
    for(i=0;i<$scope.problems.length;i++){
        $scope.show.push(false);
    }

    //initial settings
	$scope.initData = function(){
		$scope.start=true;
        $scope.show[0] = true;
	}

    //whether to show this problem
    $scope.shouldShow = function(pid){
        if($scope.show[pid]){
            return true;
        }else{
            return false;
        }

    }

    //show next problem
    $scope.showNext = function(pid){
        if($scope.show[pid] !== undefined || $scope.show[pid] !== null){
            $scope.show[pid-1] = false;
            if(pid == $scope.problems.length){
                $scope.summary = true;
            }else{
                $scope.show[pid] = true;
            }
        }
    }

    $scope.result = function(){
        var correctNum = 0;

        for(var i=1;i<=$scope.problems.length;i++){
            if(USERDATA[i]!==undefined && USERDATA[i]!==null && USERDATA[i].is_correct){
                correctNum++;
            }
        }

        return correctNum;
    }

});

app.directive("lesson",function(){
	return {
		restrict:"E"
	};
});

app.directive("problem",function(data){
	return {
		restrict:"E",
		templateUrl:"partials/problemShow.html",
        link:function(scope,element){
             scope.$watch('answer',function(value){
                 if(scope.problem.choices[value] !== undefined && scope.problem.choices[value] !== null){
                     if(scope.problem.choices[value].is_correct){;
                         USERDATA[scope.problem.id] = {"is_correct":true};
                     } else{
                         USERDATA[scope.problem.id] = {"is_correct":false};
                     }
                     //console.log(USERDATA);
                 }
             })
        }
	};
});

app.directive("result",function(){
	return {
		restrict:"E",
		templateUrl:"partials/problemResult.html"
	}
});
