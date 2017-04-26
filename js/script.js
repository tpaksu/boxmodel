;
( function ( $, window, document, undefined ) {
    var defaults = {
        inputName: null
    };
    var template = "<div class='boxmodel-container'>" +
        "<div class='boxmodel-margin'><span class='boxmodel-text boxmodel-header'>margin</span>" +
            "<input type='text' name='%NAME%_top_margin'>" +
            "<div class='flex-row'>" +
                "<input type='text' name='%NAME%_left_margin'>" +
                "<div class='boxmodel-border'><span class='boxmodel-text boxmodel-header'>border</span>" +
                    "<input type='text' name='%NAME%_top_border'>" +
                    "<div class='flex-row'>" +
                        "<input type='text' name='%NAME%_left_border'>" +
                        "<div class='boxmodel-padding'><span class='boxmodel-text boxmodel-header'>padding</span>" +
                            "<input type='text' name='%NAME%_top_padding'>" +
                            "<div class='flex-row'>" +
                                "<input type='text' name='%NAME%_left_padding'>" +
                                "<div class='boxmodel-content'></div>" +
                                "<input type='text' name='%NAME%_right_padding'>" +
                            "</div>" +
                            "<input type='text' name='%NAME%_bottom_padding'>" +                            
                        "</div>" +
                        "<input type='text' name='%NAME%_right_border'>" +
                    "</div>" +
                    "<input type='text' name='%NAME%_bottom_border'>" +
                "</div>" +
                "<input type='text' name='%NAME%_right_margin'>" +
            "</div>" +
            "<input type='text' name='%NAME%_bottom_margin'>" +
        "</div>" +
    "</div>";

    function BoxModel( element, options ) {
        this.element = element;
        this.$element = $( element );
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this.init();
    }

    BoxModel.prototype = {
        init: function () {
            this.options.inputName = this.$element.data( "name" );
            this.$element.html( template.replace( /\%NAME\%/g, this.options.inputName ) );
        },
    };

    $.fn.boxModel = function ( options ) {
        return this.each( function () {
            if ( !$.data( this, "boxModel" ) ) {
                $.data( this, "boxModel", new BoxModel( this, options ) );
            }
        } );
    };

} )( jQuery, window, document );