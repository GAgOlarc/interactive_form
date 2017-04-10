const $name = $('#name');
const $title = $('#title');
const $tshirtDesign = $('#design');
const $colorOptions = $('#color option');

//Focus on Name
$name.focus();

//Reveal Other Title input field
$('#other-title').hide();
$title.on('change', (e) => {
    if(e.target.value === 'other') {
        $('#other-title').show();  
        $('#other-title').focus();
    } else if(e.target.value != 'other') {
        $('#other-title').hide();
    }
});

//Hide Color section in T-Shirt Info 

$('#colors-js-puns').hide();

$tshirtDesign.on('change', (e) => {
    $('#colors-js-puns').show();
    $('#color option').remove();
    if(e.target.value === 'js puns') {        
        $('#color').append($colorOptions.slice(0, 3));
    } else if (e.target.value === 'heart js') {
        $('#color').append($colorOptions.slice(3, 7));
    } else {
        $('#colors-js-puns').hide();
    }
});


//Activites
const $labels = $('.activities label');
const $total = $('<p id="total">Total: $<span id="cost"></span></p>')
let cost = 0;

for(let i = 0; i < $labels.length; i++) {
    const label = $labels[i];
    label.addEventListener('change', (e) => {  
        const isChecked = e.target.checked; 
        const str = $labels[i].textContent;

        const schedule = str.split("—")[1].split(",")[0];
        const price = str.split("$")[1];

        // const arr = str.split(" ");
        // let price = arr.pop();
        // price = price.slice( 1 );
        // const time = arr.pop();
        // const day = arr.pop();
        // const schedule = day.concat(' ' + time);

        // console.log(str);
        // console.log(arr);
        // console.log(price);
        // console.log(schedule);

        let $result = $('.activities label:contains("' + schedule + '")');        
              
        if(isChecked) {
            cost += parseInt(price); 
            $('.activities').append($total);
            $result.children("input:not(:checked)").prop("disabled", true).parent().addClass('disabled');
        } else {
            cost -= parseInt(price);
            $result.children("input:not(:checked)").prop("disabled", false).parent().removeClass('disabled');
            if(cost === 0) {
                $total.remove();
            } 
        }
        $('#cost').text(cost);       
    });
}

//Payment Info
$('#credit-card, #paypal, #bitcoin').hide();

$('#payment').on('change', (e) => {
    if(e.target.value === 'credit card') {
        $('#paypal, #bitcoin').hide();
        $('#credit-card').show();
    } else if(e.target.value === 'paypal') {
        $('#credit-card, #bitcoin').hide();
        $('#paypal').show();
    } else if(e.target.value === 'bitcoin') {
        $('#credit-card, #paypal').hide();
        $('#bitcoin').show();
    } else {
        $('#credit-card, #paypal, #bitcoin').hide();    
    }
});


















