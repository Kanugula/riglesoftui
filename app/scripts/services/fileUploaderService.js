angular.module('reverApp.services').factory('FileUploaderService',
    ['$location','$rootScope','ToasterService','Session','Assets',
        function($location,$rootScope,ToasterService,Session,Assets){
            var resultHandlerObj = null;
            var resultHandler = function() {
                this.setProgressCallback = function(callback){
                    this.progressCallback = callback;
                }
                this.setSuccessCallback = function(callback){
                    this.successCallback = callback;
                }
                this.setErrorCallback = function(callback){
                    this.errorCallback = callback;
                }
                this.setDragEnterCallback = function(callback){
                    this.dragEnterCallback = callback;
                }
                this.setDragLeaveCallback = function(callback){
                    this.dragLeaveCallback = callback;
                }
                this.setDragOverCallback = function(callback){
                    this.dragOverCallback = callback;
                }
                this.setDropCallback = function(callback){
                    this.dropCallback = callback;
                }

            }

            return {
                beginUpload: function($files, $url){
                    var url = Assets.apiurl + $url ;


                    var formData = new FormData();
                    for (var i = 0; i < $files.length; i++) {
                        formData.append("file" + i, $files[i]);
                    }
                    var xhr = new XMLHttpRequest;

                    xhr.upload.onprogress = function(e) {
                        if (e.lengthComputable) {
                            percentCompleted = Math.round(e.loaded / e.total * 100);
                            var progressObj = {
                                state: "uploading",
                                percent: percentCompleted
                            };
                            if(resultHandlerObj.progressCallback)
                                resultHandlerObj.progressCallback(progressObj);
                        }
                    };

                    xhr.onreadystatechange = function(){
                        if(xhr.readyState === 4){
                            if(xhr.status === 200) {
                                if(resultHandlerObj.successCallback) {
                                    resultHandlerObj.successCallback(JSON.parse(xhr.responseText));
                                    if(JSON.parse(xhr.responseText).responseCode === 401) {
                                        $location.path("/login");
                                        ToasterService.showErrorMessage('file upload',JSON.parse(xhr.responseText).responseData.message);
                                    }
                                    ToasterService.showErrorMessage(JSON.parse(xhr.responseText).responseData.message);
                                }
                            } else{
                                if(resultHandlerObj.errorCallback){
                                    var progressObj = {
                                        state: "failed",
                                        percent: 0
                                    };
                                    if(resultHandlerObj.progressCallback){
                                        resultHandlerObj.progressCallback(progressObj);
                                    }

                                    resultHandlerObj.errorCallback(xhr.status);
                                }
                                $rootScope.http500ErrorMessage = JSON.parse(xhr.responseText).message;
                            }

                        }
                    };

                    xhr.upload.onload = function(e) {
                        var progressObj = {
                            state: "finished",
                            percent: 100
                        };
                        if(resultHandlerObj.progressCallback)
                            resultHandlerObj.progressCallback(progressObj);
                    };
                    xhr.open('POST',url);
                    xhr.setRequestHeader('Authorization',Session.get('regus_token'));
                    xhr.setRequestHeader("Content-type", "multipart/form-data");
                    xhr.withCredentials = "true";
                    xhr.send(formData);
                },
                createResultHandler: function() {
                    return new resultHandler();
                },
                setResultHandler: function(resultHandler){
                    resultHandlerObj = resultHandler;
                }
            };
        }]);
