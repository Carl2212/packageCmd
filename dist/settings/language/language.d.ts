import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../config";
import { AuthService } from "../../auth/auth.service";
export declare class Language {
    tlService: TranslateService;
    private stService;
    private authService;
    title: string;
    langList: Array<any>;
    language: string;
    constructor(tlService: TranslateService, stService: SettingsService, authService: AuthService);
    ngOnInit(): void;
    langChange(e: any): void;
}
