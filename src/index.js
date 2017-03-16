const num = [49,85,55,64];

var numMas1 = num.map(function(n){
    return n +1 ;
})

console.log(numMas1);

var numMas1Es6 = num.map((n) => n *2);
console.log(numMas1Es6);