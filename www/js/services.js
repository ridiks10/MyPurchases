angular.module('starter.services', [])
    // сервіс для роботи з шаблонами
    .factory('Samples', function (DataFactory) {
         return {
            all: function () {
                return DataFactory.getData('samples');
            },
            getId: function (sampleId) {
                return this.all()[sampleId];
            },
            save: function (samples) {
                DataFactory.setData('samples', samples);
            },
            get_enable: function () {
                var sample = null;
                angular.forEach(this.all(), function (item, id) {
                    if (item.enable){
                        sample = item;
                        sample.id = id;
                    }
                });
                return sample;
            },
            sum: function (select) {
                var sum = 0;
                angular.forEach(select, function (item) {
                    if (item) sum += item;
                });
                return sum;
            }
        };
    })
    // сервіс для роботи з товарами
    .factory('Goods', function (DataFactory) {
        return {
            all: function () {
                if(localStorage.getItem("goods")) return DataFactory.getData('goods');
                // Товари за замовчення
                return [{
                    name: 'Хліб',
                    amount: 8.85
                }, {
                    name: 'Молоко',
                    amount: 18.20
                }, {
                    name: 'Чай',
                    amount: 6.30
                }];
            },
            save: function (goods) {
                DataFactory.setData('goods', goods);
            }
        };
    })
    // сервіс для роботи з локальним сховищем
    .factory('DataFactory', function() {
        return {
            // метод збереження даних в локальному сховищі
            setData: function (nameData, data) {
                localStorage.setItem(nameData, angular.toJson(data));
            },
            // метод повернення даних з локального сховища
            getData: function(nameData) {
                var dataStore = localStorage.getItem(nameData);
                if (dataStore != null && dataStore != '' && angular.isArray(angular.fromJson(dataStore))) {
                    return angular.fromJson(dataStore);
                }
                return [];
            }
        };
    })
    // сервіс для роботи з модальними вікнами
    .service('ModalService', function ($ionicModal, $rootScope) {
        var init = function (tpl, $scope) {
            var promise;
            $scope = $scope || $rootScope.$new();
            promise = $ionicModal.fromTemplateUrl('templates/modals/' + tpl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                return modal;
            });
            $scope.openModal = function () {
                $scope.modal.show();
            };
            return promise;
        };
        return {
            init: init
        }
    });
