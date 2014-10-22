(function (angular, undefined) {
    var module = angular.module("baasic.baasicKeyValue", ["baasic.baasicApi"]);

    module.config(["$provide", function config($provide) {}]);

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicKeyValueRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("keyvalue/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("keyvalue/{key}/{?embed,fields}"),
                create: uriTemplateService.parse("keyvalue"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicKeyValueService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicKeyValueRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, keyValueRouteService) {
            return {
                routeService: keyValueRouteService,
                find: function (data) {
                    return baasicApiHttp.get(keyValueRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(keyValueRouteService.get.expand(baasicApiService.getParams(data)));
                },
                create: function (data) {
                    return baasicApiHttp.post(keyValueRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
})(angular);