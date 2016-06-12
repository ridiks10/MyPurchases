angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.analytics', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform, $ionicAnalytics) {
        $ionicPlatform.ready(function () {
            $ionicAnalytics.register();
            //var deploy = new Ionic.Deploy();
            //if(deploy) {
            //    deploy.check().then(function(hasUpdate) {
            //        alert(hasUpdate);
            //        if(hasUpdate){}
            //    }, function(err) {
            //        console.error('Ionic Deploy: Unable to check for updates', err);
            //    });
            //}
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            /* Мої покупки */
            .state('tab.purchases', {
                url: '/purchases',
                views: {
                    'tab-purchases': {
                        templateUrl: 'templates/purchases.html',
                        controller: 'PurchasesCtrl'
                    }
                }
            })

            /* Шаблони */
            .state('tab.samples', {
                url: '/samples',
                views: {
                    'tab-samples': {
                        templateUrl: 'templates/samples.html',
                        controller: 'SamplesCtrl'
                    }
                }
            })

            /* Перегляд шаблона*/
            .state('tab.sample_detail', {
                url: '/samples:sampleId',
                views: {
                    'tab-samples': {
                        templateUrl: 'templates/sample-detail.html',
                        controller: 'SampleDetailCtrl'
                    }
                }
            })

            /* Товари */
            .state('tab.goods', {
                url: '/goods',
                views: {
                    'tab-goods': {
                        templateUrl: 'templates/goods.html',
                        controller: 'GoodsCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/purchases');
    });
