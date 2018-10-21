$(function(){
    $.get('/blocks', appendToList);
    
    function appendToList(blocks) {
        var list = [];
        for(var i in blocks){
            block = blocks[i];
             //link to each blocks description
            //adds delete link with image to each block item
            content = '<a href="#" data-block="'+block+'"><img src="del.jpg" width = "20px" height: "auto"></a> '+'<a href="/blocks/' +block+'">'+block+'</a>';
            list.push($('<li>', { html: content }));
        }
        $('.block-list').append(list);
    }
    
    //click events on the delete links
    $('.block-list').on('click', 'a[data-block]', function(event){
        if (!confirm('Are you sure?')) {  //clicking cancel will stop the delete eventhandler
            return false;
        }
        
        var target = $(event.currentTarget); //gets link that triggered the click event
        
        $.ajax({
            type: 'DELETE', url: '/blocks/' + target.data('block')
            }).done(function() {
                target.parents('li').remove();
            });
    });
    
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