const icons = document.querySelectorAll('.icons');
console.log(icons);

window.onload = function() {
    // for (let i = 0; i < icons.length; i++) {
    //     setTimeout(() => {
    //         console.log(i);
    //         icons[i].classList.add('icon--toggle');
    //     }, 3000);
    // }

    for(var i = 0; i < 5; i++){
        (function(i){
            setTimeout(function(){
                icons[i].classList.add('icon--toggle');
            }, 150 * (i + 1));
        })(i);
    }

}