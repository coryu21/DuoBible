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
        $scope.showContent = function ($fileContent) {
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
                            fn(scope, { $fileContent: onLoadEvent.target.result });
                        });
                    };

                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
    })

    .controller('SettingCtrl', function ($scope, $stateParams,changeCSS) {
        $scope.size = changeCSS.font_size;
        $scope.textSizeChange = function (size) {
            $scope.size = $scope.size + size;
            changeCSS.font_size = $scope.size;
            console.log("SettingCtrl - Font-size : " + $scope.size);
        }
    })

    .service("changeCSS", function changeCSS(){
        var css = this;
        css.font_size = 1;
    })
    /* test */
    //Load bible form text file
    .controller('TextCtrl', function ($scope, $stateParams, $http) {
        console.log("TextCtrl");
        //If using text file, we should save text file inarray and then parse by verses
        var bookname = $stateParams.book;
        $scope.bookName = $stateParams.book;
        var _url = 'file/' + bookname + '.txt';
        $http({
            method: 'GET',
            url: _url

        })
            .success(function (data, status, headers, config) {
                $scope.text = data;
            })
            .error(function (data, status, headers, config) {
                console.log('error');
            });
    })
    //Load bible form Json file
    .controller('JsonCtrl', function ($scope, $stateParams, $http, changeCSS) {
        console.log("JsonCtrl - Font-size : " + changeCSS.font_size);

        $scope.customStyle = function(){
            return "font-size:" + changeCSS.font_size +"em";
        };

        //$stateParams.book is parameter {book} -> genesis
        var bookname = $stateParams.book;
        $scope.bookName = $stateParams.book;    //For Title
        var _url = 'file/' + bookname + '.json';    //File URL
        //Get file, that is same with $http.get(_url)
        $http({
            method: 'GET',
            url: _url

        })
        .success(function (data, status, headers, config) {
            //Parsing Json file
            var _jsonFile = data;
            var _text = '';
            var _chapNum;
            $.each(_jsonFile[$stateParams.book], function (key1, value1) {
                //Key1 = Chaper#
                _chapNum = key1 + ':';
                $.each(value1, function (key2, value2) {
                    //Key2 = Verse#, Value2 = contents
                    _text += _chapNum + key2 + ' ' + value2 + '\n\n';
                })
            });
            $scope.text = _text;
        })
        .error(function (data, status, headers, config) {
            console.log('error');
        });
    })

    .controller('XmlCtrl', function ($scope, $stateParams, $http) {
        console.log("XmlCtrl");
        var bookname = $stateParams.book;
        $scope.bookName = $stateParams.book;    //For Title
        var _url = 'file/' + bookname + '.xml';    //File URL
        var _text = '';
        $http({
            method: 'GET',
            url: _url
        })
        .success(function (data, status, headers, config) {
            //Parsing XML file
            var _text = '';
            var _chapNum;
            $(data).find('CHAPTER').each(function (i) {
                _chapNum = $(this).attr('cnumber');
                $(this).find('VERS').each(function (m) {
                    _text += _chapNum +':'+ $(this).attr('vnumber')+ ' '+ $(this).text()+'\n\n';
                })
                //console.log(_text);
                $scope.text = _text;
            });

        })
        .error(function (data, status, headers, config) {
            console.log('error');
        });
    });

