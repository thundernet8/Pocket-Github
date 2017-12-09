declare module "*.graphql" {
    const value: any;
    export default value;
}

interface Promise<T> {
    finally: (callback) => Promise<T>;
}
