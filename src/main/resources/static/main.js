var app = angular.module("StudentManagement", []);

// Controller Part
app.controller("StudentController", function($scope, $http) {
    $scope.students = [];
    $scope.studentForm = {
        id: 1,
        fName: "",
        lName: "",
        mName: "",
        sex: "",
        email: "",
        birthday: ""
    };

    // Now load the data from server
    _refreshStudentData();

    // HTTP POST/PUT methods for add/edit employee
    // Call: http://localhost:8080/employee
    $scope.submitStudent = function() {

        var method = "";
        var url = "";

        if ($scope.studentForm.id == -1) {
            method = "POST";
            url = '/student';
        } else {
            method = "PUT";
            url = '/student/' + $scope.studentForm.id;
        }

        $http({
            method: method,
            url: url,
            data: angular.toJson($scope.studentForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_success, _error);
    };

    $scope.createStudent = function() {
        _clearFormData();
    }

    // HTTP DELETE- delete employee by Id
    // Call: http://localhost:8080/student/{empId}
    $scope.deleteStudent = function(student) {
        $http({
            method: 'DELETE',
            url: '/student/' + student.id
        }).then(_success, _error);
    };

    // In case of edit
    $scope.editStudent = function(student) {
        $scope.studentForm.id = student.id;
        $scope.studentForm.fName = student.fName;
        $scope.studentForm.lName = student.lName;
        $scope.studentForm.mName = student.mName;
        $scope.studentForm.sex = student.sex;
        $scope.studentForm.email = student.email;
        $scope.studentForm.birthday = student.birthday;
    };

    // Private Method
    // HTTP GET- get all students collection
    // Call: http://localhost:8080/student/
    function _refreshStudentData() {
        $http({
            method: 'GET',
            url: '/student' //
        }).then(
            function(res) { // success
                $scope.students = res.data;
            },
            function(res) { // error
                console.log("Error: " + res.status + " : " + res.data);
            }
        );
    }

    function _success(res) {
        _refreshStudentData();
        _clearFormData();
    }

    function _error(res) {
        var data = res.data;
        var status = res.status;
        var header = res.header;
        var config = res.config;
        alert("Error: " + status + ":" + data);
    }

    // Clear the form
    function _clearFormData() {
        $scope.studentForm.id = -1;
        $scope.studentForm.fName = "";
        $scope.studentForm.lName = "";
        $scope.studentForm.mName = "";
        $scope.studentForm.sex = "";
        $scope.studentForm.email = "";
        $scope.studentForm.birthday = "";
    };
});