export default interface ICommit {
    sha: string;
    author: {
        email: string;
        name: string;
    };
    message: string;
    distinct: boolean;
    url: string;
}
