export function MyDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const old = descriptor.value;


    descriptor.value = function (...args: any[]) {
        console.log(`MyDecorator---old:`, old)
        let aaa = descriptor
        // console.log(`调用方法：${propertyKey}`);
        console.log(`MyDecorator---参数：`, args[0]);
        console.log(`MyDecorator---参数：`, args[1]);


        let params = args[0]
        args[0] = {
            ...params,
            name: "namenamenamename"
        }

        const result = old.apply(this, args);

        console.log(`MyDecorator---结果：`, result);
        return result;
    };

    return descriptor;
}
