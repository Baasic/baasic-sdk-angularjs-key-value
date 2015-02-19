(function (angular, undefined) {
    /** 
     * @overview The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */

    /**
     * An angular module is a container for the different parts of your app - services, directives etc. In order to use baasic.keyValue module functionality it must be added as a dependency to your app.
     * @module baasic.keyValue
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.appSettings",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.keyValue", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    /* globals module */
    /**
     * @module baasicKeyValueRouteService
     **/

    /** 
     * @overview Key value route service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicKeyValueRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find key value route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicKeyValueRouteService.find.expand({searchQuery: "searchTerm"});               
                 **/
                find: uriTemplateService.parse("key-values/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get key value route which must be expanded with the Id of the previously created key value resource in the system.
                 * @method        
                 * @example baasicKeyValueRouteService.get.expand({id: "uniqueID"});               
                 **/
                get: uriTemplateService.parse("key-values/{id}/{?embed,fields}"),
                /**
                 * Parses create key value route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicKeyValueRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("key-values"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @module baasicKeyValueService
     **/

    /** 
     * @overview Key value service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicKeyValueService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicKeyValueRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, keyValueRouteService) {
            return {
                routeService: keyValueRouteService,
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of key value resources.
                 * @method        
                 * @example 
                 baasicKeyValueService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "key",
                 orderDirection : "desc",
                 search : "searchTerm"
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(keyValueRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the key value resource.
                 * @method        
                 * @example 
                 baasicKeyValueService.get("uniqueID")
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(keyValueRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the create key value action has been performed.
                 * @method        
                 * @example 
                 baasicKeyValueService.create({
                 key : "key",
                 value : "value", 
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(keyValueRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update key value action has been performed.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.value = "updated value";
                 baasicKeyValueService.update(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. If the action is successfully completed the key value resource is permanently removed from the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicKeyValueService.remove(existingResource)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
})(angular);