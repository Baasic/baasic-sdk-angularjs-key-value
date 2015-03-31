(function (angular, undefined) {
    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.keyValue` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
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
     * @description Baasic Key-Value Route Service provides Baasic route templates which can be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. `baasicKeyValueService` uses `baasicKeyValueRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
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
                 * @example baasicKeyValueRouteService.find.expand({searchQuery: "<search-phrase>"});               
                 **/
                find: uriTemplateService.parse("key-values/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get key value route which must be expanded with the Id of the previously created key value resource in the system.
                 * @method        
                 * @example baasicKeyValueRouteService.get.expand({id: "<key-value-id>"});               
                 **/
                get: uriTemplateService.parse("key-values/{id}/{?embed,fields}"),
                /**
                 * Parses create key value route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicKeyValueRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("key-values"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicKeyValueRouteService.parse("route/{?embed,fields,options}").expand({embed: "<embedded-resource>"});
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @module baasicKeyValueService
     * @description Baasic Key-Value Service provides an easy way to consume Baasic Key-Value REST API.
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicKeyValueService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicKeyValueRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, keyValueRouteService) {
            return {
                /**
                 * Provides direct access to `baasicKeyValueRouteService`.
                 * @method        
                 * @example baasicKeyValueRouteService.routeService.get.expand(expandObject);
                 **/
                routeService: keyValueRouteService,
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of key value resources matching the given criteria.
                 * @method        
                 * @example 
                 baasicKeyValueService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "<key>",
                 orderDirection : "<desc>",
                 search : "<search-phrase>"
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
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified key value resource.
                 * @method        
                 * @example 
                 baasicKeyValueService.get("<key-value-id>")
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
                 * Returns a promise that is resolved once the create key value action has been performed, this action creates a new key value resource.
                 * @method        
                 * @example 
                 baasicKeyValueService.create({
                 key : "<key>",
                 value : "<value>", 
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
                 * Returns a promise that is resolved once the update key value action has been performed, this action updates a key value resource. This function doesn't use `baasicKeyValueRouteService` for obtaining route templates, however `update` route can be obtained from key value resource (HAL enabled) objects like this:
                 ```
                 var params = baasicApiService.removeParams(keyValueObject);
                 var uri = params["model"].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.value = "<new-value>";
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
                 * Returns a promise that is resolved once the remove action has been performed. This action removes a key value resource from the system if successfully compleded. This function doesn't use `baasicKeyValueRouteService` for obtaining route templates, however `remove` route can be obtained from key value resource (HAL enabled) objects like this:
                 ```
                 var params = baasicApiService.removeParams(keyValueObject);
                 var uri = params["model"].links('delete').href;
                 ```
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