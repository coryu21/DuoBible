// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
                if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/Shared/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: "/menuhome",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Home/menuhome.html",
                        controller: 'MenuHomeCtrl'
                    }
                }
            })

            .state('app.menuoldtestament', {
                url: "/menuoldtestament",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Old/menuoldtestament.html"
                    }
                }
            })

            .state('app.text', {
                url: "/old/text/{book}",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Old/test.html",
                        controller: 'TextCtrl'
                    }
                }
            })

            .state('app.json', {
                url: "/old/json/{book}",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Old/test.html",
                        controller: 'JsonCtrl'
                    }
                }
            })

            .state('app.xml', {
                url: "/old/xml/{book}",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Old/test.html",
                        controller: 'XmlCtrl'
                    }
                }
            })

            .state('app.menunewtestament', {
                url: "/menunewtestament",
                views: {
                    'menuContent': {
                        templateUrl: "templates/New/menunewtestament.html"
                    }
                }
            })

            .state('app.setting', {
                url: "/setting",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Setting/setting.html",
                        controller: 'SettingCtrl'
                    }
                }
            })

            .state('app.maps', {
                url: "/maps",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Map/maps.html",
                        controller: 'MapsCtrl'
                    }
                }
            })

            .state('app.bookmarks', {
                url: "/bookmarks",
                views: {
                    'menuContent': {
                        templateUrl: "templates/Bookmark/bookmarks.html",
                        controller: 'BookmarksCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/menuhome');
    });
