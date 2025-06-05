"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Animal = function () {
    var _classDecorators = [Reflect.metadata("Class", "Animal metadata")];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _static_type_decorators;
    var _static_type_initializers = [];
    var _static_type_extraInitializers = [];
    var _eat_decorators;
    var Animal = _classThis = /** @class */ (function () {
        function Animal_1() {
            __runInitializers(this, _instanceExtraInitializers);
        }
        Animal_1.prototype.eat = function (a) {
            return a + "123";
        };
        return Animal_1;
    }());
    __setFunctionName(_classThis, "Animal");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _static_type_decorators = [Reflect.metadata("Class Property", "type metadata")];
        _eat_decorators = [Reflect.metadata("Class method", "eat metadata")];
        __esDecorate(_classThis, null, _eat_decorators, { kind: "method", name: "eat", static: false, private: false, access: { has: function (obj) { return "eat" in obj; }, get: function (obj) { return obj.eat; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _static_type_decorators, { kind: "field", name: "type", static: true, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _static_type_initializers, _static_type_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Animal = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.type = __runInitializers(_classThis, _static_type_initializers, "动物");
    (function () {
        __runInitializers(_classThis, _static_type_extraInitializers);
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Animal = _classThis;
}();
//WeakMap
Reflect.defineMetadata("Class", "Animal metadata", Animal); //Animal.Class = "Animal metadata"
Reflect.defineMetadata("Class Property", "type metadata", Animal, "type"); //Animal.type.Class Property = "type metadata"
Reflect.defineMetadata("Class method", "eat metadata", Animal.prototype, "eat"); //
Reflect.defineMetadata("key", "key_value", Animal, "key"); //
Reflect.defineMetadata("fun1", "fun1_value", Animal.prototype, "fun1"); //
/*

weakMap = {
    Animal:{
            undefiend: {"Class"          : "Animal metadata"},
            "type"   : {"Class Property" : "type metadata" }
    },
    Animal.prototype:{
         "eat"       : {"Class method"   : "eat metadata"}
    }
}
*/
// tsc a04_reflect.ts
console.log("111---222:", Reflect.getMetadata('Class', Animal));
console.log("111---222:", Reflect.getMetadata('Class Property', Animal, "type"));
console.log("111---222:", Reflect.getMetadata('Class method', Animal.prototype, "eat"));
console.log("111---222:", Reflect.getMetadata('key', Animal, "key"));
console.log("111---222:", Reflect.getMetadata('fun1', Animal.prototype, "fun1"));
console.log("type---222:", Reflect.getMetadata('design:type', Animal.prototype, "eat"));
console.log("paramtypes---222:", Reflect.getMetadata('design:paramtypes', Animal.prototype, "eat"));
console.log("returntype---222:", Reflect.getMetadata('design:returntype', Animal.prototype, "eat"));
