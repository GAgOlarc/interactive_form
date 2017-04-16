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

        // pull out day, time and cost for activity from full activity label
        const schedule = str.split("—")[1].split(",")[0];
        const price = str.split("$")[1];

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

//VALIDATION
//Name
function isNameValid() {   
    if($name.val().length > 3) {
        $name.prev().show();   
        return true; 
    } else {
        $name.prev().hide();       
        $name.before('<h3 class="error">Name: (please provide your name)</h3>');
        return false;  
    }
}

//Email
function validateEmail(email) {
  const emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailReg.test(email);
}

function ismailValid() {     
    const $mail = $('#mail');
    if(validateEmail($mail.val())) {
         $mail.prev().show();   
        return true;
    } else {
        $mail.prev().hide();       
        $mail.before('<h3 class="error">Email: (please provide a valid email address)</h3>');
        return false;          
    }
}

//Activites
function isChecked() {   
    const $checked = $("input:checked").length;
    if($checked != 0) {
        $('.activities legend').show();   
        return true; 
    } else {
        $('.activities legend').before('<h3 class="error" id="legend">Register for Activities (please select at least one activity)</h3>');
        $('.activities legend').hide();       
        return false;  
    }
}

//Payment
function creditCard() {
    const $option = $('#payment option:selected').index();
    if($option < 2) {
        if($option === 0) {
            $('#payment').prev().before('<h3 class="error">Please select payment method</h3>');
        } if($option === 1) {
            $('#credit-card').prepend('<h3 class="error">Please enter valid credit card information</h3>');
            const $ccNum = $('#cc-num');
            const $zip = $('#zip');
            const $cvv = $('#cvv');
            // ($ccNum >= 13 || $ccNum <=16) && 
            if($.isNumeric($ccNum.val())) {
                $ccNum.prev().show();
                // return true;
            } else {
                $ccNum.prev().hide();
                $ccNum.before('<label class="error" for="cc-num">Card Number:</label>')
                // return false;
            }
            if($.isNumeric($zip.val) && $zip < 6) {
                $zip.prev().show();
                // return true;
            } else {
                $zip.prev().hide();
                $zip.before('<label class="error" for="zip">Zip Code:</label>');
                // return false;
            }
            if($.isNumeric($cvv.val()) && $cvv === 3) {
                $cvv.prev().show()
                // return true;;
            } else {
                $cvv.prev().hide();
                $cvv.before('<label class="error" for="cvv">CVV:</label>');
                // return false;
            }
            return false;
        } 
        
    } else {
        return true;
    }   
}

//Submit
$('#submit').click(() => {
    $(".error").remove();
    if(!isNameValid() || !isEmailValid() || !isChecked() || !creditCard()) {
        $('form').first().prepend('<h2 class="error">Please review the fields in red below.</h2>');
        isNameValid();
        ismailValid();
        isChecked()
        creditCard();
        $("body").animate({scrollTop: 150}, "slow");
        return false;        
    }        
});








