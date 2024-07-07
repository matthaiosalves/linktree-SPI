const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');

// Tarefa para minificar e renomear o CSS
function minifyCSS() {
    return gulp.src('style.css')  // Caminho para o seu style.css na raiz do projeto
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename('style.min.css'))  // Renomeia o arquivo para style.min.css
        .pipe(gulp.dest('.'));  // Salva na raiz do projeto
}

// Tarefa para minificar e renomear o JavaScript
function minifyJS() {
    return gulp.src('script.js')  // Caminho para o seu script.js na raiz do projeto
        .pipe(uglify())
        .pipe(rename('script.min.js'))  // Renomeia o arquivo para script.min.js
        .pipe(gulp.dest('.'));  // Salva na raiz do projeto
}

// Função de observação para CSS e JavaScript
function watchFiles() {
    watch('style.css', minifyCSS);  // Caminho para o seu style.css na raiz do projeto
    watch('script.js', minifyJS);  // Caminho para o seu script.js na raiz do projeto
}

// Tarefas padrão
gulp.task('minifyCSS', minifyCSS);
gulp.task('minifyJS', minifyJS);
gulp.task('default', watchFiles);

