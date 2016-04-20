angular.module('starter', ['ionic', 'ionic.service.core', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
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
                        templateUrl: 'templates/samples/main.html',
                        controller: 'SamplesCtrl'
                    }
                }
            })

            /* Перегляд шаблона*/
            .state('tab.sample_detail', {
                url: '/samples:sampleId',
                views: {
                    'tab-samples': {
                        templateUrl: 'templates/samples/detail.html',
                        controller: 'SampleDetailCtrl'
                    }
                }
            })

            .state('tab.sample_add-edit', {
                url: '/samples:sampleId',
                views: {
                    'tab-samples': {
                        templateUrl: 'templates/samples/add-edit.html',
                        controller: 'SampleFormCtrl'
                    }
                }
            })

            .state('tab.sample_ware-add-edit', {
                url: '/samples:sampleId/ware:wareId',
                views: {
                    'tab-samples': {
                        templateUrl: 'templates/goods/add-edit.html',
                        controller: 'SampleWareFormCtrl'
                    }
                }
            })

            /* Виборка товарів */
            .state('tab.sample_goods-select', {
                url: '/samples:sampleId',
                views: {
                    'tab-samples': {
                        templateUrl: 'templates/samples/goods-select.html',
                        controller: 'SampleGoodsSelectCtrl'
                    }
                }
            })

            /* Товари */
            .state('tab.goods', {
                url: '/goods',
                views: {
                    'tab-goods': {
                        templateUrl: 'templates/goods/main.html',
                        controller: 'GoodsCtrl'
                    }
                }
            })

            .state('tab.goods_add-edit', {
                url: '/goods:wareId',
                views: {
                    'tab-goods': {
                        templateUrl: 'templates/goods/add-edit.html',
                        controller: 'WareFormCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/purchases');
    });
