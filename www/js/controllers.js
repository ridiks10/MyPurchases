angular.module('starter.controllers', [])

    .controller('MainCtrl', ['Samples', function (Samples) {
        this.getEnableSample = function (_scope) {
            _scope.sample = Samples.get_enable();
        };

        this.getSamples = function (_scope) {
            _scope.samples = Samples.all();
        };
    }])

    .controller('PurchasesCtrl', ['$scope', 'Samples', function ($scope, Samples) {
        $scope.select = [];
        $scope.all_sum = 0;
        $scope.close = function () {
            $scope.select = [];
            $scope.all_sum = 0;
            $scope.sample.enable = false;
            var samples = Samples.all();
            samples[$scope.sample.id] =  $scope.sample;
            Samples.save(samples);
        };
        $scope.sum = function () {
            $scope.all_sum = Samples.sum($scope.select);
        };
    }])

    .controller('SamplesCtrl', ['$scope', '$state', 'Samples', function ($scope, $state, Samples) {
        $scope.remove = function (sampleId) {
            $scope.samples.splice(sampleId, 1);
            Samples.save($scope.samples);
            return $state.go('tab.samples');
        };
    }])

    .controller('SampleDetailCtrl', ['$scope', '$stateParams', '$ionicHistory', '$state', 'Samples', function ($scope, $stateParams, $ionicHistory, $state, Samples) {
        var sampleId = $stateParams.sampleId;
        $scope._sample = $scope.samples[sampleId];
        $scope.sampleId = sampleId;
        $scope.setSampleDetail = true;
        $scope.$watch('_sample.enable', function (newValue) {
            if (newValue == true) {
                angular.forEach( $scope.samples, function (sample) {
                    sample.enable = false;
                });
                $scope._sample.enable = newValue;
            }
            $scope.samples[$scope.sampleId] =  $scope._sample;
            Samples.save($scope.samples);
        });
    }])

    .controller('SampleFormCtrl', ['$scope', 'ModalService', 'Samples', function ($scope, ModalService, Samples) {
        ModalService.init('sample-add.html', $scope);
        $scope.showInputCount = true;
        $scope.setSample = true;

        $scope.leaveModal = function () {
            $scope.modal.remove();
            ModalService.init('sample-add.html', $scope);
        };

        $scope.modal_addSample = function () {
            $scope.action = 'add';
            $scope.sample = {name: null, goods: []};
            $scope.openModal();
        };

        $scope.modal_editSample = function (sampleId) {
            $scope.action = 'edit';
            $scope.sample = Samples.getId(sampleId);
            $scope.openModal();
        };

        $scope.remove_ware = function (wareId) {
            $scope.sample.goods.splice(wareId, 1);
        };

        $scope.save = function () {
            if(!$scope.setSampleDetail){
                if($scope.sample.enable) {
                    angular.forEach( $scope.samples, function (sample) {
                        sample.enable = false;
                    });
                }
                $scope.samples.unshift($scope.sample);
            }else {
                $scope.samples[$scope.sampleId] = $scope.sample;
            }
            Samples.save($scope.samples);
            $scope.leaveModal();
        };
    }])

    .controller('SampleGoodsSelectCtrl', ['$scope', 'ModalService', 'Goods', function ($scope, ModalService, Goods) {
        ModalService.init('goods-select.html', $scope);
        $scope.leaveModal = function () {
            $scope.modal.remove();
            ModalService.init('goods-select.html', $scope);
        };

        $scope.modal_selectWare = function () {
            $scope.openModal();
            $scope.selected = [];
            $scope.goods = Goods.all();
        };

        $scope.addGoodsSample = function () {
            angular.forEach($scope.selected, function (mare) {
                if (mare) $scope.sample.goods.unshift(mare);
            });
            $scope.leaveModal();
        }
    }])

    .controller('GoodsCtrl', ['$scope', 'ModalService', 'Goods', function ($scope, ModalService, Goods) {
        $scope.goods = Goods.all();
        ModalService.init('ware-add.html', $scope);

        $scope.saveEmpty = function (form) {
            $scope.form = angular.copy(form);
        };

        $scope.leaveModal = function () {
            $scope.modal.remove();
            ModalService.init('ware-add.html', $scope);
        };

        $scope.modal_addWare = function () {
            $scope.action = 'add';
            $scope.openModal();
        };

        $scope.modal_editWare = function (wareId) {
            $scope.action = 'edit';
            $scope.wareId = wareId;
            if (!$scope.setSample) {
                var ware = $scope.goods[wareId];
            } else {
                var ware = $scope.sample.goods[wareId];
                if (ware.count > 0) {
                    $scope.count = ware.count;
                }
            }
            $scope.form.name.$setViewValue(ware.name);
            $scope.form.name.$render();
            $scope.form.amount.$setViewValue(ware.amount);
            $scope.form.amount.$render();
            $scope.openModal();
        };

        $scope.addWare = function (form, newWare) {
            if (form.name.$modelValue == null || form.amount.$modelValue == null) return;
            var newItem = {};
            newItem.name = form.name.$modelValue;
            newItem.amount = form.amount.$modelValue;
            if (!$scope.setSample) {
                $scope.goods.unshift(newItem);
                Goods.save($scope.goods);
            } else {
                newItem.count = form.count.$modelValue;
                $scope.sample.goods.unshift(newItem);
            }
            if (newWare) {
                form.name.$setViewValue(null);
                form.name.$render();
                form.amount.$setViewValue(null);
                form.amount.$render();
                if ($scope.setSample) {
                    form.count.$setViewValue(null);
                    form.count.$render();
                }
                return;
            }
            $scope.leaveModal();
        };

        $scope.saveWare = function (wareId, form) {
            var item = {};
            item.name = form.name.$modelValue;
            item.amount = form.amount.$modelValue;
            if (!$scope.setSample) {
                $scope.goods[wareId] = item;
                Goods.save($scope.goods);
            } else {
                if (form.count.$modelValue > 1) item.count = form.count.$modelValue;
                $scope.sample.goods[wareId] = item;
            }
            $scope.leaveModal();
        };

        $scope.remove = function (wareId) {
            $scope.goods.splice(wareId, 1);
            Goods.save($scope.goods);
        };
    }]);

    //.controller('DashCtrl', function ($scope, ModalService) {
    //    var deploy = new Ionic.Deploy();
    //
    //    // Update app code with new release from Ionic Deploy
    //    $scope.doUpdate = function () {
    //        deploy.update().then(function (res) {
    //            console.log('Ionic Deploy: Update Success! ', res);
    //        }, function (err) {
    //            console.log('Ionic Deploy: Update error! ', err);
    //        }, function (prog) {
    //            console.log('Ionic Deploy: Progress... ', prog);
    //        });
    //    };
    //
    //    // Check Ionic Deploy for new code
    //    $scope.checkForUpdates = function () {
    //        console.log('Ionic Deploy: Checking for updates');
    //        deploy.check().then(function (hasUpdate) {
    //            console.log('Ionic Deploy: Update available: ' + hasUpdate);
    //            $scope.hasUpdate = hasUpdate;
    //        }, function (err) {
    //            console.error('Ionic Deploy: Unable to check for updates', err);
    //        });
    //    }
    //
    //});
