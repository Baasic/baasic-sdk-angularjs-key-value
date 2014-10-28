(function (angular, module, undefined) {
    "use strict";
    module.service("baasicKeyValueRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("key-values/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("key-values/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("key-values"),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));