'use strict';
import * as del from 'del';
import { dest, src, task } from 'gulp';
import * as runSequence from 'run-sequence';
import { exec } from "child_process";
import * as inlineTemplates from 'gulp-inline-ng2-template';
import { TEMP_ROOT, INLINE_TEMPLATES_CONFIG, DIST_ROOT, LIB_TS_ROOT, LIB_SCSS_ROOT, LIB_ASSETS_ROOT, DIST_ASSETS_ROOT } from "./config"

task('prepareReleasePackage', (done: (err: any) => void) => {
  runSequence(
    'clean',
    'inline-templates',
    'compile.release',
    'copy.sass',
    'copy.assets',
    'cleantmp',
    done
  );
});
task('clean', (done: Function) => {
  del([DIST_ROOT, TEMP_ROOT]).then(() => {
    done();
  }).catch(err => {
    done(err);
  });
});
task('inline-templates', function () {
  return src(LIB_TS_ROOT)
    .pipe(inlineTemplates(INLINE_TEMPLATES_CONFIG))
    .pipe(dest(TEMP_ROOT));
});

task('compile.release', function (callback) {
  exec('npm run ngcompile', function (error, stdout, stderr) {
    callback(error)
  });
});
task('copy.sass', function () {
    return src([LIB_SCSS_ROOT]).pipe(dest(DIST_ROOT));
});
task('copy.assets', function () {
    return src([LIB_ASSETS_ROOT]).pipe(dest(DIST_ASSETS_ROOT));
});
task('cleantmp', (done: Function) => {
    del([TEMP_ROOT]).then(() => {
        done();
    }).catch(err => {
        done(err);
    });
});