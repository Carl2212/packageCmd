/**
 * Created by Ellen on 9/2/2018.
 */
import { dest, src, task } from 'gulp';
import * as bump from 'gulp-bump';
import { readFileSync } from "fs";
import * as gutil from 'gulp-util';
import { init, commit, tag , push } from 'gulp-git';
import { filter } from 'gulp-filter';
import { DIST_PACKAGEJSON_ROOT, PACKAGEJSON_ROOT, PROJECT_ROOT, DIST_ROOT } from "./config";

const argv = require('yargs')
  .option(
    'branch',{
      alias :'B',
      choice : ['patch','minor','major'],
    }
  )
  .option(
    'message' ,{
      alias : 'M',
      descripe : 'publish message',
      default : 'publish new version',
      type : 'string'
    }
  )
  .argv;

task('bump' , ()=>{
  return src([PACKAGEJSON_ROOT,DIST_PACKAGEJSON_ROOT],{base : PROJECT_ROOT})
    .pipe(bump({
      type : argv.branch || 'patch'
    }).on('error', gutil.log))
    .pipe(dest(PROJECT_ROOT));
});

task('publishReleasepackage' , ['bump'] ,()=>{
  return dest('./')
      .pipe(commit(argv.message))
      .pipe(filter('package.json'))
      .pipe(push({
          repository : 'origin',
          refspec :'HEAD'
      }))
      .pipe(tag(getPackageJsonVersion()))
      .pipe(push({
          repository : 'origin',
          refspec :'HEAD'
      }))
});

function getPackageJsonVersion() {
  return JSON.parse(readFileSync(DIST_PACKAGEJSON_ROOT,'utf8')).version;
};