angular.module('portal.directives')
  .directive('fileuploader', ['$timeout',function($timeout){
    var getTemplate = function(accept) {
      var template = '<input style="display:none" name="eventsfile" type="file" id="companyLogoUpload" accept="'+accept+'">';
      return template;
    };
    return {
      restrict: 'E',
      scope: {
        uploadButtonId: '@',
        dropBoxId: '@',
        url: '@',
        multiple: '=',
        resultHandler: "=",
        isReader: "=",
        campaignType: '@',
        accept: '@'
      },
      controller: function($scope, FileUploaderService) {
        $scope.upload = function() {
          //scope.files is set in the linking function below.
          if($scope.isReader) {
            $scope.resultHandler.read($scope.files);
          } else {
            FileUploaderService.beginUpload($scope.files, $scope.url);
          }

        };
        FileUploaderService.setResultHandler($scope.resultHandler);
      },
      link: function($scope, elem, attr, ctrl) {

        elem.html(getTemplate($scope.accept)).show();
        $timeout(function() {
          var uploadButton = angular.element("#"+$scope.uploadButtonId);

          var fileInput = elem.find('input[type="file"]');

          if($scope.multiple) {
            fileInput.attr("multiple", "");
          }

          fileInput.bind('change', function(e) {
            $scope.files = [];
            for(var i = 0; i < e.target.files.length; i++) {
              //set files in the scope
              var file = e.target.files[i];
              $scope.files.push(file);
            }
            $scope.upload();
            fileInput.val('');
          });
          if($scope.dropBoxId) {
            var dropbox = angular.element("#"+$scope.dropBoxId);

            dropbox.bind("dragenter", function(evt) {
              evt.stopPropagation();
              evt.preventDefault();
              if($scope.resultHandler.dragEnterCallback)
                $scope.resultHandler.dragEnterCallback();
            });
            dropbox.bind("dragleave", function(evt) {
              evt.stopPropagation();
              evt.preventDefault();
              if($scope.resultHandler.dragLeaveCallback)
                $scope.resultHandler.dragLeaveCallback();
            });
            dropbox.bind("dragover", function(evt) {
              evt.stopPropagation();
              evt.preventDefault();
              if($scope.resultHandler.dragOverCallback)
                $scope.resultHandler.dragOverCallback();
            });

            dropbox.bind("drop", function(evt) {
              evt.stopPropagation();
              evt.preventDefault();
              var files = evt.originalEvent.dataTransfer.files;
              $scope.files = [];
              for(var i = 0; i < files.length; i++) {
                //set files in the scope
                var file = files[i];
                $scope.files.push(file);
              }
              $scope.upload();
              if($scope.resultHandler.dropCallback)
                $scope.resultHandler.dropCallback();
            });
          }

          uploadButton.bind('click', function() {
            fileInput.click() ;
          });
        });

      }
    }
  }]).directive('fbImageUpload', [function(){
  return {
    restrict: 'E',
    template:'<input style="display:none" type="file" id="fb-image-upload" multiple="true" accept="image/x-png, image/jpeg">',
    scope:{
      "imageFiles": "="
    },
    link: function($scope, elem, attr, ctrl) {
        var uploadButton = angular.element("#"+attr.btnId);
        var fileInput = elem.find('input[type="file"]');

        fileInput.bind('change', function(e) {
          for(var i = 0; i < e.target.files.length; i++) {
            //set files in the scope
            var file = e.target.files[i];
            $scope.imageFiles.push(file);
            $scope.$apply();
          }
          fileInput.val('');
        });
        if(attr.dropboxId) {
          var dropbox = angular.element("#"+attr.dropboxId);

          dropbox.bind("dragenter", function(evt) {
            dropbox.css("border","2px dashed #d3d3d3");
            evt.stopPropagation();
            evt.preventDefault();
          });
          dropbox.bind("dragleave", function(evt) {
            dropbox.css("border","1px solid #e2e2e2");
            evt.stopPropagation();
            evt.preventDefault();
          });
          dropbox.bind("dragover", function(evt) {
            dropbox.css("border","2px dashed #d3d3d3");
            evt.stopPropagation();
            evt.preventDefault();
          });

          dropbox.bind("drop", function(evt) {
            dropbox.css("border","1px solid #e2e2e2");
            evt.stopPropagation();
            evt.preventDefault();
            var files = evt.originalEvent.dataTransfer.files;
            for(var i = 0; i < files.length; i++) {
              //set files in the scope
              var file = files[i];
              $scope.imageFiles.push(file);
              $scope.$apply();
            }
            fileInput.val('');
          });
        }

        uploadButton.bind('click', function() {
          fileInput.click() ;
        });

    }
  }
}]);
