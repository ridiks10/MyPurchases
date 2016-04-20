angular.module('starter.controllers', [])

    .controller('MainCtrl', ['Samples', function (Samples) {
        this.getEnableSample = function (_scope) {
            _scope.sample = Samples.get_enable();
        };
    }])
    .controller('PurchasesCtrl', ['$scope', 'Samples', function ($scope, Samples) {
        $scope.select = [];
        $scope.all_sum = 0;
        $scope.close = function () {
            $scope.sample.enable = false;
            $scope.select = [];
            $scope.all_sum = 0;
        };
        $scope.sum = function () {
            $scope.all_sum = Samples.sum($scope.select);
        };
    }])

    .controller('SamplesCtrl', function ($scope, Samples) {
        $scope.samples = Samples.all();
        $scope.remove = function (sampleId) {
            Samples.remove(sampleId);
        };
    })

    .controller('SampleDetailCtrl', ['$scope', '$stateParams', '$ionicHistory', '$state', 'Samples', function ($scope, $stateParams, $ionicHistory, $state, Samples) {
        var sampleId = $stateParams.sampleId;
        $scope.sample = Samples.get(sampleId);
        $scope.sample.id = sampleId;

        $scope.$watch('sample.enable', function (newValue) {
            if (newValue == true) {
                angular.forEach(Samples.all(), function (sample) {
                    sample.enable = false;
                });
                $scope.sample.enable = newValue;
                return $state.go('tab.purchases');
            }
        });

        $scope.remove = function () {
            Samples.remove(sampleId);
            $ionicHistory.goBack();
        };
    }])

    .controller('SampleFormCtrl', ['$scope', '$stateParams', '$ionicHistory', 'Samples', function ($scope, $stateParams, $ionicHistory, Samples) {
        var sampleId = $stateParams.sampleId;
        if (!sampleId) {
            Samples.add({name: 'Шаблон', goods: []});
            $scope.title = 'Новий шаблон';
            $scope.sample = Samples.get(0);
        } else {
            $scope.sample = Samples.get(sampleId);
            $scope.title = 'Редагування: ' + $scope.sample.name;
        }
        $scope.id = sampleId ? sampleId : 0;

        $scope.remove_mare = function ($mareId) {
            Samples.remove_mare($scope.id, $mareId);
        };

        $scope.save = function () {
            $ionicHistory.goBack();
        };
    }])

    .controller('SampleGoodsSelectCtrl', function ($scope, $stateParams, $ionicHistory, Goods, Samples) {
        $scope.goods = Goods.all();
        $scope.select = [];
        $scope.add = function () {
            angular.forEach($scope.select, function (mare) {
                if (mare) Samples.add_mare($stateParams.sampleId, mare);
            });
            $ionicHistory.goBack();
        }
    })

    .controller('SampleWareFormCtrl', ['$scope', '$stateParams', '$ionicHistory', 'Samples', function ($scope, $stateParams, $ionicHistory, Samples) {
        var wareId = $stateParams.wareId;
        var sampleId = $stateParams.sampleId;
        $scope.showInputCount = true;

        function init() {
            $scope.title = 'Новий товар';
            $scope.ware = {};
        }

        if (!wareId) {
            init();
        } else {
            $scope.ware = Samples.get_mare(sampleId, wareId);
            $scope.title = 'Редагування: ' + $scope.ware.name;
        }
        $scope.save = function (notback) {
            if (!wareId) Samples.add_mare(sampleId, $scope.ware);
            if (notback) {
                wareId = false;
                init();
                return;
            }
            $ionicHistory.goBack();
        }
    }])

    .controller('GoodsCtrl', ['$scope', 'Goods', function ($scope, Goods) {
        $scope.goods = Goods.all();
        $scope.remove = function (wareId) {
            Goods.remove(wareId);
        };
    }])

    .controller('WareFormCtrl', ['$scope', '$stateParams', '$ionicHistory', '$state', 'Goods', function ($scope, $stateParams, $ionicHistory, $state, Goods) {
        var wareId = $stateParams.wareId;

        function init() {
            $scope.title = 'Новий товар';
            $scope.ware = {};
        }

        if (!wareId) {
            init();
        } else {
            $scope.ware = Goods.get(wareId);
            $scope.title = 'Редагування: ' + $scope.ware.name;
        }
        $scope.save = function (notback) {
            if (!wareId) Goods.add($scope.ware);
            Goods.save();
            if (notback) {
                //return $state.go('tab.goods_add-edit',wareId);
                wareId = false;
                init();
                return;
            }
            $ionicHistory.goBack();
        }
    }]);
