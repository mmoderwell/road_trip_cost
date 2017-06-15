var theForm = document.getElementById('theForm');
new stepsForm(theForm, {
    onSubmit: function(form) {
        dist = dist.replace('mi', '');
        dist = dist.replace(/,/g, '');
        dist = dist.replace(' ', '');
        dist2 = parseInt(dist);
        const gas = 2.324;
        let mpg = document.getElementById("q1").value;
        let cost = Math.round((dist2 / mpg) * gas);

        // hide form
        classie.addClass(theForm.querySelector('.simform-inner'), 'hide');

        var messageEl = theForm.querySelector('.final-message');
        messageEl.innerHTML = `This trip will cost you about ${cost} dollars.`;
        classie.addClass(messageEl, 'show');
    }
});
