"use strict";

const $name = $('#name');
const $title = $('#title');
const $tshirtDesign = $('#design');
const $colorOptions = $('#color option');
const $mail = $('#mail');
const $checkbox = $('.activities input:checkbox');
const $select = $('#payment');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');

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
function isNameValid() { 
    return $name.val().length > 3 && (/[a-z \-]+/i).test( $name.val() );  
}

function isMailValid() {
  const emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailReg.test($mail.val());
}

function isChecked() { 
    const $checked = $(".activities input:checked");
    return $checked.length > 0;  
}

function isPaymentSelected() {
    const $selected = $('#payment option:selected');
    return $selected.index() > 0;
}

//CREDIT CARD
function isCcNumValid() {
    return ( /[0-9 \-]+/.test( $ccNum.val() ) && ( $ccNum.val().length > 12 && $ccNum.val().length < 17 ));
}

function isZipValid() {
    return ( /[0-9 \-]+/.test( $zip.val() ) && ( $zip.val().length === 5 ));
}

function isCvvValid() {
    return ( /[0-9 \-]+/.test( $cvv.val() ) && ( $cvv.val().length === 3 ));
}

function isCreditcardValid() {
    return isCcNumValid() && isZipValid() && isCvvValid();
}

//CAN SUBMIT
function canSubmit() {
    return isNameValid() && isMailValid() && isChecked() && isPaymentSelected() && isCreditcardValid();
}

//NAME
function nameEvent() {  
    const nameError = '<h3 class="error" id="name-error">This field is required</h3>'; 
    if(isNameValid()) {
        $('#name-error').remove();   
    } else {
        $('#name-error').remove();
        $name.before(nameError);
    }
}

//EMAIL
function mailEvent() {
    const mailError = '<h3 class="error" id="mail-error">Please provide a valid email address</h3>';    
    if(isMailValid()) {
        $('#mail-error').remove();  
    } else {
        $('#mail-error').remove();
        $mail.before(mailError);
    }
}

//ACTIVITIES
function checkEvenet() { 
        const uncheckedError = '<h3 class="error" id="unchecked-error">Please select at least one activity</h3>';
        if(isChecked()) {
        $('#unchecked-error').remove();   
    } else {
        $('#unchecked-error').remove();
        $('.activities legend').before(uncheckedError);
    }
}

//PAYMENT
function paymentSelect() {
    const unselectedError = '<h3 class="error" id="unselected-error">Please select payment method</h3>';
    if(isPaymentSelected()) {
        $('#unselected-error').remove();
    } else {
        $('#unselected-error').remove();
        $('#payment').prev().before(unselectedError);
    }
}

function creditCardEvent() {
    const creditCardError = '<h3 class="error" id="creditcard-error">Please enter valid credit card information</h3>';
    if(isCreditcardValid()) {
        $('#creditcard-error').remove();
    } else {
        $('#creditcard-error').remove();
        $('#credit-card').prepend(creditCardError);
        switch(isCcNumValid()) {
            case (true):
                $ccNum.prev().removeClass('error');
                break;
            case (false):
                $ccNum.prev().addClass('error');
                break;
        }

        switch(isZipValid()) {
            case (true):
                $zip.prev().removeClass('error');
                break;
            case (false):
                $zip.prev().addClass('error');
                break;
        }

        switch(isCvvValid()) {
            case (true):
                $cvv.prev().removeClass('error');
                break;
            case (false):
                $cvv.prev().addClass('error');
                break;
        }

        // if(isCcNumValid()) {
        //     $ccNum.prev().removeClass('error');
        // } else {
        //     $ccNum.prev().addClass('error');
        // }

        // if(isZipValid()) {
        //     $zip.prev().removeClass('error');
        // } else {
        //     $zip.prev().addClass('error');
        // }

        // if(isCvvValid()) {
        //     $cvv.prev().removeClass('error');
        // } else {
        //     $cvv.prev().addClass('error');
        // }
    }   
}

//SUBMIT
function enableSubmitEvent() {
    $("#submit").prop("disabled", !canSubmit());  
}

$('#submit').click(() => {
    enableSubmitEvent();

    nameEvent();
    $name.keyup(nameEvent).keyup(enableSubmitEvent);

    mailEvent(); 
    $mail.keyup(mailEvent).keyup(enableSubmitEvent);

    checkEvenet();
    $checkbox.change(checkEvenet).change(enableSubmitEvent);

    paymentSelect();
    $select.change(paymentSelect).change(enableSubmitEvent);

    creditCardEvent();
    $ccNum.keyup(creditCardEvent).keyup(enableSubmitEvent);
    $zip.keyup(creditCardEvent).keyup(enableSubmitEvent);
    $cvv.keyup(creditCardEvent).keyup(enableSubmitEvent);

    $("body").animate({scrollTop: 150}, "slow");      
});








