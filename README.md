# Baasic Key-Value AngularJS SDK

Baasic AngularJS Key-Value library provides access to key-value resource Baasic Service [REST API](https://api.baasic.com).

## Dependencies

Baasic AngularJS Key-Value library has the following dependencies:

* [Baasic Core AngularJS SDK](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core)

## Usage

This section will describe how to add the Baasic AngularJS Key-Value library to your project. If you prefer learning by example please skip to [Demo Section](#demo).

### Adding the Library to your Project

Please add the _Baasic Key-Value_ include after the _Baasic Angular Core_ include:

```html
<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>
<script src='//cdn.net/js/baasic-angular-key-value-1.0.0.min.js'></script>
```

The recommended way of serving the library is through a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) but note that this is not a requirement. If you prefer adding library files directly to your project instead, please modify the includes accordingly.


### Initialization

To be able to use the library you will need to add the Baasic (_baasic.keyValue_) dependency to your AngularJS module. This will allow you to use library services described in [Modules Section](#baasic-modules).

```javascript
angular.module('my-module', ["baasic.api", "baasic.keyValue"])
```

## Key-Value Module

Explanations of Baasic AngularJS Key-Value services and their functions can be found bellow. For further details please check the [API documentation](#tba)

##### keyValueService

Baasic Key-Value Service provides an easy way to consume Baasic Key-Value REST routes.

* `get` - Gets a single Key-Value item by Id
* `find` - Finds Key-Value items by given criteria
* `create` - Creates a new Key-Value item
* `update` - Updates a Key-Value item
* `remove` - Deletes a Key-Value item
* `routeService` - Provides direct access to `keyValueRouteService`

##### keyValueRouteService

Baasic Key-Value Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. `keyValueService` uses `keyValueRouteService` to obtain all the needed URI's.

* `get` - "Get" Key-Value URI
* `find` - "Find" Key-Value URI
* `create` - "Create" Key-Value URI
* `update` - "Update" Key-Value URI (obtained through HAL)
* `remove` - "Delete" Key-Value URI (obtained through HAL)
* `parse` - Provides direct access to the `uriTemplateService`

URI templates can be expanded manually like this:

```javascript
var params = { searchQuery: "myQuery", page: 4, rpp: 3 };
keyValueRouteService.find.expand(params); // this will yield "/key-values/?searchQuery=myQuery&page=4&rpp=3"
```

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#pull-requests-are-always-welcome)
* Please [report](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#issue-reporting) any issues you might  have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in touch..
