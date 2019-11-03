const {fromEvent} = require('rxjs');
const {ajax} = require('rxjs/ajax');
const {debounceTime, map, switchMap, tap, filter, pluck} = require('rxjs/operators');

const notEmpty = input => !!input && input.trim().length > 0;
let inputpaises = document.getElementById('paises');
let urlBase = 'http://restcountries.eu/rest/v2/name/';
let resultados = document.getElementById('resultados');
let getData = (val)=> ajax(urlBase+val).pipe(
        tap(()=> resultados.innerHTML=''),
        map((data)=>data.response)
);
let procesarData = (data, res) => data.forEach(val=> res.innerHTML+=val.name+'<br/>');

 fromEvent(inputpaises,'keyup')
    .pipe(
            debounceTime(1000),
            pluck('target','value'),
            filter(notEmpty),
            switchMap(val=>getData(val))

        ).subscribe(data =>  procesarData(data,resultados)) ;



/* let inputpaises = document.getElementById('paises');
let timeoutId = null;
let urlBase = 'http://restcountries.eu/rest/v2/name/';
let resultados = document.getElementById('resultados');
let ultimaQuery;
inputpaises.addEventListener('keyup',function(event){
    let query = ultimaQuery = event.target.value;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function(query){
        
        if(query && query.length > 0){
            resultados.innerHTML = '';
            let url =urlBase +query;
            fetch(url).then(function(v){
                 return v.json();
            }).then(function(data){
                if(ultimaQuery == query){
                    procesarData(data);
                }
                
            });
        }
    
    },1000,event.target.value)
});
function procesarData(data){
    data.forEach(element => {
        resultados.innerHTML+=element.name + '<br/>';
    });
}
 */