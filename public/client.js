$(function(){
    $.get('/blocks', appendToList);
    
    function appendToList(blocks) {
        var list = [];
        for(var i in blocks){
            block = blocks[i];
            content = '<a href="/blocks/' +block+'">'+block+'</a>'; //link to each blocks description
            list.push($('<li>', { html: content }));
        }
        $('.block-list').append(list);
    }
    
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize(); //transforms form data to url encoded notation so that express app can parse back to javascript
        
        $.ajax({
            type: 'POST', url: '/blocks', data: blockData
        }).done(function(blockName){
            appendToList([blockName]);
            form.trigger('reset'); //cleans up form text input fields
        });
    });
});