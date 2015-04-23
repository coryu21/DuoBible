angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });


        var width = document.getElementById('menubar').offsetWidth;
        $scope.width = width;
    })


    .controller('MenuHomeCtrl', function ($scope, $stateParams) {
    })

    .controller('BookmarksCtrl', function ($scope, $stateParams) {
    })

    .controller('MapsCtrl', function ($scope, $stateParams) {
    })

    .controller('ReadCtrl', function ($scope, $stateParams) {

        function gotFS(fileSystem) {
            fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
        }

        function gotFileEntry(fileEntry) {
            fileEntry.file(gotFile, fail);
        }

        function gotFile(file){
            readDataUrl(file);
            readAsText(file);
        }

        function readDataUrl(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                var json = this.result;
                var obj = JSON.parse(json);
                console.log("Read as data URL");
                console.log(evt.target.result);
                return obj;
            };
            console.log(file);
            reader.readAsDataURL(file);
        }

        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                console.log("Read as text");
                console.log(evt.target.result);
            };
            reader.readAsText(file);
        }

        function fail(evt) {
            console.log(evt.target.error.code);
        }

        //readAsText("js/test.txt");
    })


    .controller('SettingCtrl', function ($scope, $stateParams) {

        $scope.name = "Test";
        $scope.size = "36px";
        $scope.change = {};
        $scope.textChange = function (size) {
            var _size = (size == 'large' ? '54px' : '18px');
            console.log('SettingCtrl-textChange function() ' + size);
            $scope.name = size;
            $scope.size = _size;
            $scope.change.style = {"font-size": _size};
        };

        $scope.textSizeUpDown = function (size) {
            var _size = $scope.size[0] + $scope.size[1];
            _size = parseInt(_size, 10) + size;
            _size = _size + 'px';
            $scope.size = _size;
            $scope.change.style = {"font-size": _size};

        }


    });
