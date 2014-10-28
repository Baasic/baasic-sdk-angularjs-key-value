(function (angular, module, undefined) {
    "use strict";
    module.service("baasicKeyValueService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicKeyValueRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, keyValueRouteService) {
            return {
                routeService: keyValueRouteService,
                find: function (options) {
                    return baasicApiHttp.get(keyValueRouteService.find.expand(baasicApiService.findParams(options)));
                },
                get: function (id, options) {
                    return baasicApiHttp.get(keyValueRouteService.get.expand(baasicApiService.getParams(id, options)));
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