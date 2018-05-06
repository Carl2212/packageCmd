/**
 * Created by Ellen on 9/2/2018.
 */
import { dest, src, task } from 'gulp';
import * as bump from 'gulp-bump';
import { readFileSync } from "fs";
import * as gutil from 'gulp-util';
import { init, commit, tag , push, add } from 'gulp-git';
import { filter } from 'gulp-filter';
import { PACKAGEJSON_ROOT, PROJECT_ROOT } from "./config";
import * as runSequence from "run-sequence";

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
task('publishReleasepackage', (done: (err: any) => void) => {
    runSequence(
        'bump-version',
        'commit-changes',
        'push-changes',
        'create-new-tag',
        (err : any)=>{
            if(err){
                gutil.log(err.message);
            }else{
                gutil.log('PUBLISH SUCCESSFUL~');
            }
            done(err);
        }
    );
});

task('bump-version' , ()=>{
  return src([PACKAGEJSON_ROOT],{base : PROJECT_ROOT})
    .pipe(bump({
      type : argv.branch || 'patch'
    }).on('error', gutil.log))
    .pipe(dest(PROJECT_ROOT));
});
task('commit-changes' ,()=>{
    return src('.')
        .pipe(add())
        .pipe(commit(argv.message));
});

task('push-changes' , (done)=>{
  push('origin','master',{args:'--tags'});
});

task('create-new-tag' , (done)=>{
    let version = getPackageJsonVersion();
    tag(version , 'created Tag for version : '+version ,(err)=>{
        if(err) {
            return done(err);
        }
        push('origin','master', {args:'--tags'},done);
    })
    push('origin','master',{args:'--tags'});
});

function getPackageJsonVersion() {
  return JSON.parse(readFileSync(PACKAGEJSON_ROOT,'utf8')).version;
};