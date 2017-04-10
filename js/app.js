const $name = $('#name');
const $title = $('#title');
const $tshirtDesign = $('#design');
// const $colorDiv = $('#colors-js-puns');
// const $colors = $('#color');

//Focus on Name
$name.focus();

//Reveal Other Title input field
$('#other-title').remove();
$title.on('click', (e) => {
    const $basicInfo = $('fieldset').first();
    const $otherTitle = $('<input type="text" id="other-title" name="user_name" placeholder="Your Job Role">');
    if(e.target.value === 'other' && $('#other-title').length === 0) {
        $basicInfo.append($otherTitle);  
        $('#other-title').focus();
    } else if(e.target.value != 'other') {
        $('#other-title').remove();
    }
});

//Hide Color section in T-Shirt Info 
$('#colors-js-puns').remove();

$tshirtDesign.on('click', (e) => {
    const jsPuns = '<div id="colors-js-puns" class="">' 
                    + '<label for="color">Color:</label>'
                    + '<select id="color">'
                    + '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
                    + '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
                    + '<option value="gold">Gold (JS Puns shirt only)</option>' 
                    + '</select>'
                    + '</div>';

    const jsShirt = '<div id="colors-js-puns" class="">' 
                    + '<label for="color">Color:</label>'
                    + '<select id="color">'
                    + '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
                    + '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
                    + '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> ' 
                    + '</select>'
                    + '</div>';

    if(e.target.value === 'js puns') {
        $('#colors-js-puns').remove();
        $('.shirt').append(jsPuns);
    } else if (e.target.value === 'heart js') {
        $('#colors-js-puns').remove();
        $('.shirt').append(jsShirt);
    } else if(e.target.value != 'js puns' && e.target.value != 'heart js') {
        $('#colors-js-puns').remove();
    }
});

//Activites
let $total = $('<p>Total:</p>')
$('.activities').append($total);

//Payment Info
$('#credit-card, #paypal, #bitcoin').hide();

$('#payment').on('click', (e) => {
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


















