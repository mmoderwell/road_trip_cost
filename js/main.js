var theForm = document.getElementById('theForm');
var done = false;
new stepsForm(theForm, {
    onSubmit: function() {
        done = setInterval(function() {
            stats();
        }, 100);
    }
});

function clear() {

    const gas = 2.324;
    let mpg = 0;
    let cost = 0;

    // show form
    classie.addClass(theForm.querySelector('.simform-inner'), 'show');

    var messageEl = theForm.querySelector('.final-message');
    messageEl.innerHTML = ``;
    classie.addClass(messageEl, 'hide');
}

function stats() {
    if (dist) {
        const gas = 2.324;
        let mpg = document.getElementById("q1").value;
        let cost = Math.round((dist / mpg) * gas);

        // hide form
        classie.addClass(theForm.querySelector('.simform-inner'), 'hide');

        var messageEl = theForm.querySelector('.final-message');
        messageEl.innerHTML = `This trip will cost you about ${cost} dollars.`;
        classie.addClass(messageEl, 'show');
        clearTimeout(done);
    }
}
