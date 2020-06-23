var nodeTodo = angular.module("nodeTodo", []);

const ALL = "ALL";
const DONE = "DONE";
const NOTDONE = "NOTDONE";

function mainController($scope, $http) {
  $scope.formData = {};

  $scope.mode = ALL;

  $scope.cos = "Ala ma kota";

  $scope.filteredTodos = (mode) => {
    let copy = [];
    switch(mode) {
      case ALL: {
        return $scope.todos;
      }
      case DONE: {
        for (todo in $scope.todos) {
          if ($scope.todos[todo].done) {
            copy.push($scope.todos[todo]);
          }
        }
        break;
      }
      case NOTDONE: {
        for (todo in $scope.todos) {
          if (!$scope.todos[todo].done) {
            copy.push($scope.todos[todo]);
          }
        }
        break;
      }
    }
    return copy;
  }

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function(data) {
      $scope.todos = data;

    })
    .error(function(data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("/api/todos", $scope.formData)
      .success(function(data) {
        $("input").val("");
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function(id) {};

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("/api/todos/" + id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };
}
