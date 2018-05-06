import {join} from "path";
/**
 * Created by itwo on 21/3/2018.
 */
export const TEMPNAME = 'tmp';
export const PACKAGEJSON = 'package.json';
export const README = 'README.md';
export const REPOSITORYNAME = 'dist';
export const SCRIPT_NAME = 'scripts';
export const ASSETS_NAME = 'assets';
export const SRC_NAME ='src';

export const TS_FILE = '*.ts';
export const SCSS_FILE = '*.scss';

export const ES6_NAME = 'es6';

//project
export const PROJECT_ROOT = join(__dirname , '..','..');
export const PACKAGEJSON_ROOT = join(PROJECT_ROOT,PACKAGEJSON);

export const SCRIPT_PACKAGEJSON_ROOT = join(PROJECT_ROOT,SCRIPT_NAME,PACKAGEJSON);

//temp
export const TEMP_ROOT = join(PROJECT_ROOT,TEMPNAME);


//lib
export const LIB_ORIGINAL_ROOT = join(PROJECT_ROOT , SRC_NAME);
export const LIB_ASSETS_ROOT = join(LIB_ORIGINAL_ROOT ,  ASSETS_NAME , '**' , '*');
export const LIB_READ_ROOT = join(LIB_ORIGINAL_ROOT,README);
export const LIB_TS_ROOT = join(LIB_ORIGINAL_ROOT , '**' ,TS_FILE);
export const LIB_SCSS_ROOT = join(LIB_ORIGINAL_ROOT , '**' , SCSS_FILE);


//dist
export const DIST_ROOT = join(PROJECT_ROOT,REPOSITORYNAME);
export const DIST_PACKAGEJSON_ROOT = join(DIST_ROOT,PACKAGEJSON);
export const DIST_ASSETS_ROOT = join(DIST_ROOT , ASSETS_NAME);


export const INLINE_TEMPLATES_CONFIG = {
  base: LIB_ORIGINAL_ROOT,
  target: ES6_NAME,
  useRelativePaths: true,
}

export const RESPOSITORY_URL = "ssh://git@116.6.216.43:84/IMobility/mobilityLab.git";
