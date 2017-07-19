var form = document.getElementById('theForm');

new stepsForm(theForm, {
    onSubmit: function() {
        distance().then((d) => {
            dist = d;
            stats();
        });
    }
});

function clear() {

    const gas = 2.324;
    let mpg = 0;
    let cost = 0;

    // show form
    classie.addClass(form.querySelector('.form-inner'), 'show');

    var messageEl = form.querySelector('.final-message');
    messageEl.innerHTML = ``;
    classie.addClass(messageEl, 'hide');
}

function stats() {

    const gas = 2.324;
    let mpg = document.getElementById("q1").value;
    let cost = Math.round((dist / mpg) * gas);

    // hide form
    classie.addClass(form.querySelector('.form-inner'), 'hide');

    var messageEl = form.querySelector('.final-message');
    if (cost == 0) {
        messageEl.innerHTML = `This trip will cost you less than a dollar.`;
    } else {
        messageEl.innerHTML = `This trip will cost you about ${cost} dollars.`;
    }
    classie.addClass(messageEl, 'show');
}