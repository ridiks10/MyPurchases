angular.module('starter.services', [])

    .factory('Samples', function () {
        var samples = [{
            name: 'Сільпо',
            goods: [
                {
                    name: 'Риба',
                    amount: 15.55
                },
                {
                    name: 'Кілька',
                    amount: 15.55,
                    count: 2
                }
            ]
        }, {
            name: 'Базар',
            goods: [
                {
                    name: 'Таранька',
                    amount: 20.00
                },
                {
                    name: 'Картошка',
                    amount: 18.55
                }
            ]
        }];

        return {
            all: function () {
                return samples;
            },
            remove: function (sampleId) {
                samples.splice(sampleId, 1);
            },
            get: function (sampleId) {
                return samples[sampleId];
            },
            'add': function (sample) {
                samples.unshift(sample);
            },
            save: function () {
                console.log(samples);
            },
            add_mare: function (sampleId, mare) {
                this.get(sampleId).goods.unshift(mare);
            },
            get_mare: function (sampleId, mareId) {
                return this.get(sampleId).goods[mareId];
            },
            remove_mare: function (sampleId, mareId) {
                this.get(sampleId).goods.splice(mareId, 1);
            },
            get_enable: function () {
                var sample = null;
                angular.forEach(this.all(), function (item) {
                    if (item.enable) sample = item;
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
    .factory('Goods', function () {
            var goods = [{
                name: 'Хліб',
                amount: 8.85
            }, {
                name: 'Ковбаса',
                amount: 85.90
            }, {
                name: 'Майонез',
                amount: 6.30
            }, {
                name: 'Пиво',
                amount: 10.45
            }];

            return {
                all: function () {
                    return goods;
                },
                remove: function (wareId) {
                    goods.splice(wareId, 1);
                },
                get: function (wareId) {
                    if (!wareId) return null;
                    return goods[wareId];
                },
                'add': function (ware) {
                    goods.unshift(ware);
                },
                save: function () {
                    console.log(goods);
                }
            };
        }
    );
