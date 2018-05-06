import { isArray } from "rxjs/util/isArray";
export function selectCompany(c) {
    if (c.children) {
        if (!c.isOpen) {
            c.isOpen = true;
        }
        else {
            c.isOpen = !c.isOpen;
        }
    }
}
export function hasChild(c) {
    if (c.children) {
        if (isArray(c.children) && c.children.length === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
export function getIcon(c) {
    switch (c.companyType) {
        case 1:
            return 'company';
        case 2:
            return 'folder';
        case 3:
            return 'comp-profitcenter';
    }
}
//# sourceMappingURL=common.js.map