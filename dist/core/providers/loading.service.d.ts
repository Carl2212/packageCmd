import { Loading, LoadingController, LoadingOptions } from "ionic-angular";
export declare class LoadingService {
    private loading;
    private loader;
    constructor(loading: LoadingController);
    create(opt?: LoadingOptions): Loading;
    dismiss(): void;
}
