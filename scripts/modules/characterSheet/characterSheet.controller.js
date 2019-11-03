(function() {
    'use strict';

    angular
        .module('characterSheet')
        .controller('characterSheetController', characterSheetController);

        characterSheetController.$inject = [
        '$scope',
        '$window'
    ];

    function characterSheetController($scope, $window) {
        $scope.showActiveSkills = false;
        $scope.isMobile = false;
        $scope.activateHeroicFeat = false;

        $scope.hero = $scope.$parent.$parent.characterSelected.hero;
        $scope.skills = $scope.$parent.$parent.characterSelected.class.skills;
        $scope.skills.map(x => x.active = false);

        $scope.maxHeroHealth = $scope.hero.heroHealth;
        $scope.crntHeroHealth = $scope.hero.heroHealth;
        $scope.maxHeroStamina = $scope.hero.heroStamina;
        $scope.crntHeroStamina = 0;

        $scope.statAdd = statAdd;
        $scope.statMinus = statMinus
        $scope.changeFilter = changeFilter;

        _addBindings();
        activate();

        ///////////

        function activate() {
            var width = Math.max($($window).innerWidth(), $window.innerWidth);
            $scope.isMobile = (width < 576);
        }

        function statAdd(crntVal, maxVal, statType = null) {
            if (crntVal === maxVal) {
                if (statType === 'stamina') {
                    $scope.crntHeroHealth = statMinus($scope.crntHeroHealth, $scope.maxHeroHealth)
                } 

                return crntVal;
            } else {
                return crntVal + 1;
            }
        }

        function statMinus(crntVal, statType = null) {
            if (crntVal === 0) {
                return crntVal;
            } else {
                if (statType === 'health' && crntVal === 1) {
                    $scope.crntHeroStamina = $scope.maxHeroStamina;
                }

                return crntVal - 1;
            }
        }

        function changeFilter() {
            if($scope.showActiveSkills) {
                return '';
            } else {
                return true;
            }
        }

        function _addBindings() {
            $scope.$on('window-size', function(_evt, data) {
                $scope.isMobile = data.isMobile;
            })
        }
    }
})();