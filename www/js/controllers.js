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
        $scope.showContent = function($fileContent){
            $scope.content = $fileContent;
        };
    })

    .directive('onReadFile', function ($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var fn = $parse(attrs.onReadFile);

                element.on('change', function (onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function (onLoadEvent) {
                        scope.$apply(function () {
                            fn(scope, {$fileContent: onLoadEvent.target.result});
                        });
                    };

                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
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
