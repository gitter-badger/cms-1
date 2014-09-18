'use strict';
/* jshint undef:false */
/*
 * code font: https://github.com/esvit/ng-ckeditor/blob/master/ng-ckeditor.js
 */

var $defer, loaded;
angular.module('cmsApp')
  .run(['$q', '$timeout', function($q, $timeout) {
    $defer = $q.defer();

    if (angular.isUndefined(window.CKEDITOR)) {
      throw new Error('CKEDITOR not found');
    }
    CKEDITOR.disableAutoInline = true;
    function checkLoaded() {
      if (CKEDITOR.status === 'loaded') {
        loaded = true;
        $defer.resolve();
      } else {
        checkLoaded();

      }
    }
    CKEDITOR.on('loaded', checkLoaded);
    $timeout(checkLoaded, 100);
  }])
  .directive('ckEditor', function ($q, $timeout, ENV) {
    return {
      require : '?ngModel',
      link : function($scope, element, attr, ngModel) {
        var form    = null;
        var EMPTY_HTML = '<p></p>',
        data = [],
        isReady = false;

        var onLoad = function () {
          var options = {
            toolbar: 'full',
            /*jshint camelcase: false */
            toolbar_full: [
              { name: 'basicstyles',
                items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
                { name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
                { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ]},
                { name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
                '/',
                { name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
                { name: 'insert', items: [ 'Image', 'Youtube', 'Table', 'SpecialChar' ]},
                { name: 'forms', items: [ 'Outdent', 'Indent' ] },
                { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                { name: 'document', items: [ 'PageBreak', 'Source' ] }
            ],
            disableNativeSpellChecker: false,
            uiColor: '#FAFAFA',
            height: '400px',
            width: '100%'
          };

          var instance = CKEDITOR.replace(element[0], options);
          CKEDITOR.plugins.addExternal('youtube', ENV.basepath+'/ckeditor-plugins/youtube/', 'plugin.js');
          instance.config.extraPlugins = 'youtube,justify,image2';
          instance.config.language = 'pt-BR';
          var configLoaderDef = $q.defer();

          element.bind('$destroy', function () {
            instance.destroy(
              false //If the instance is replacing a DOM element, this parameter indicates whether or not to update the element with the instance contents.
            );
          });
          var setModelData = function(setPristine) {
            var data = instance.getData();
            if (data === '') {
              data = null;
            }
            $timeout(function () { // for key up event
              if(setPristine !== true || data !== ngModel.$viewValue) {
                ngModel.$setViewValue(data);
              }
              if(setPristine === true && form){
                form.$setPristine();
              }
            }, 0);
          }, onUpdateModelData = function(setPristine) {
            if (!data.length) { return; }


            var item = data.pop() || EMPTY_HTML;
            isReady = false;
            instance.setData(item, function () {
              setModelData(setPristine);
              isReady = true;
            });
          };

          instance.on('pasteState',   setModelData);
          instance.on('change',       setModelData);
          instance.on('blur',         setModelData);
          //instance.on('key',          setModelData); // for source view

          instance.on('instanceReady', function() {
            $scope.$broadcast('ckeditor.ready');
            $scope.$apply(function() {
              onUpdateModelData(true);
            });

            instance.document.on('keyup', setModelData);
          });
          instance.on('customConfigLoaded', function() {
            configLoaderDef.resolve();
          });

          ngModel.$render = function() {
            data.push(ngModel.$viewValue);
            if (isReady) {
              onUpdateModelData();
            }
          };
        };

        if (CKEDITOR.status === 'loaded') {
          loaded = true;
        }
        if (loaded) {
          onLoad();
        } else {
          $defer.promise.then(onLoad);
        }
      }
      };
    });
