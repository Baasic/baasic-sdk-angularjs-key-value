/* globals module */
/**
 * @module baasicKeyValueRouteService
 * @description Baasic Key Value Route Service provides Baasic route templates which can be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. `baasicKeyValueService` uses `baasicKeyValueRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicKeyValueRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                /**
                * Parses find key value route which can be expanded with additional options. Supported items are: 
                * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicKeyValueRouteService.find.expand({searchQuery: '<search-phrase>'});               
                **/  			
                find: uriTemplateService.parse("key-values/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                * Parses get key value route which must be expanded with the Id of the previously created key value resource in the system.
                * @method        
                * @example baasicKeyValueRouteService.get.expand({id: '<key-value-id>'});               
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
                * @example baasicKeyValueRouteService.parse('route/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                **/ 				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));