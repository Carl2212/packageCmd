export declare class TreeNode {
    companies: Array<any>;
    constructor();
    selectCompany(c: any): void;
    hasChild(c: any): boolean;
    getIcon(c: any): "company" | "folder" | "comp-profitcenter";
}
