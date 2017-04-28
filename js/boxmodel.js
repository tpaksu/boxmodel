;
( function ( $, window, document, undefined ) {
    var defaults = {
        inputName: null,
        autoText: "-",
        enabledUnits: [ "px", "pt", "em", "rem", "vh", "vw", "vmin", "vmax", "%", "cm", "mm" ],
        usePrecision: true,
        enableMargin: true,
        enablePadding: true,
        enableBorder: true,
        enableDimensions: true,
        onInit: function () {},
        marginLabel: "Margin",
        paddingLabel: "Padding",
        borderLabel: "Border",
        dimensionLabel: "x",
        values: null
    };

    function BoxModel( element, options ) {
        this.element = element;
        this.$element = $( element );
        this.options = $.extend( {}, defaults, options );
        this.inputs = null;
        this._defaults = defaults;
        this.init();
    }
    BoxModel.prototype = {
        init: function () {
            var template = "<div class='boxmodel-container'>" + ( ( this.options.enableMargin ) ? "<div class='boxmodel-margin'><span class='boxmodel-text boxmodel-header'>" + this.options.marginLabel + "</span><span class='boxmodel-lock boxmodel-lock-margin'>&#128275;</span>" : "" ) + ( ( this.options.enableMargin ) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_margin'></span>" : "" ) + ( ( this.options.enableMargin ) ? "<div class='flex-row'>" : "" ) + ( ( this.options.enableMargin ) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_margin'></span>" : "" ) + ( ( this.options.enableBorder ) ? "<div class='boxmodel-border'><span class='boxmodel-text boxmodel-header'>" + this.options.borderLabel + "</span><span class='boxmodel-lock boxmodel-lock-border'>&#128275;</span>" : "" ) + ( ( this.options.enableBorder ) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_border'></span>" : "" ) + ( ( this.options.enableBorder ) ? "<div class='flex-row'>" : "" ) + ( ( this.options.enableBorder ) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_border'></span>" : "" ) + ( ( this.options.enablePadding ) ? "<div class='boxmodel-padding'><span class='boxmodel-text boxmodel-header'>" + this.options.paddingLabel + "</span><span class='boxmodel-lock boxmodel-lock-padding'>&#128275;</span>" : "" ) + ( ( this.options.enablePadding ) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_padding'></span>" : "" ) + ( ( this.options.enablePadding ) ? "<div class='flex-row'>" : "" ) + ( ( this.options.enablePadding ) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_padding'></span>" : "" ) + "<div class='boxmodel-content'>" + ( ( this.options.enableDimensions ) ? "<input type='text' name='%NAME%_width'>" + this.options.dimensionLabel + "<input type='text' name='%NAME%_height'>" : "" ) + "</div>" + ( ( this.options.enablePadding ) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_padding'></span>" : "" ) + ( ( this.options.enablePadding ) ? "</div>" : "" ) + ( ( this.options.enablePadding ) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_padding'></span>" : "" ) + ( ( this.options.enablePadding ) ? "</div>" : "" ) + ( ( this.options.enableBorder ) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_border'></span>" : "" ) + ( ( this.options.enableBorder ) ? "</div>" : "" ) + ( ( this.options.enableBorder ) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_border'></span>" : "" ) + ( ( this.options.enableBorder ) ? "</div>" : "" ) + ( ( this.options.enableMargin ) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_margin'></span>" : "" ) + ( ( this.options.enableMargin ) ? "</div>" : "" ) + ( ( this.options.enableMargin ) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_margin'></span>" : "" ) + ( ( this.options.enableMargin ) ? "</div>" : "" ) + "<input type='hidden' name='%NAME%_auto_text'>" + ( ( this.options.enableMargin ) ? "<input type='hidden' name='%NAME%_margin'>" : "" ) + ( ( this.options.enablePadding ) ? "<input type='hidden' name='%NAME%_padding'>" : "" ) + ( ( this.options.enableBorder ) ? "<input type='hidden' name='%NAME%_border'>" : "" ) + ( ( this.options.enableDimensions ) ? "<input type='hidden' name='%NAME%_dimensions'>" : "" ) + "</div>";
            this.options.inputName = this.options.inputName === null ? this.$element.data( "name" ) : this.options.inputName;
            this.$element.html( template.replace( /\%NAME\%/g, this.options.inputName ) );
            if ( typeof this.options.onInit == 'function' ) this.options.onInit( this );
            this.bindEvents();
            this.inputs.val( this.options.autoText ).attr( "size", 3 );
            this.setInitialValues();
        },
        setInitialValues: function () {
            if ( this.options.values && typeof this.options.values === "object" ) {
                var values = this.options.values;
                if ( values.hasOwnProperty( "margins" ) ) {
                    var margins = null;
                    if ( this.options.values.margins && typeof this.options.values.margins === "object" ) {
                        margins = this.options.values.margins;
                    } else if ( this.options.values.margins && typeof this.options.values.margins === "string" ) {
                        margins = this.parseStringCSS( margins );
                    }
                    if ( margins.hasOwnProperty( "top" ) ) this.setValue( "top", "margin", margins.top );
                    if ( margins.hasOwnProperty( "left" ) ) this.setValue( "left", "margin", margins.left );
                    if ( margins.hasOwnProperty( "right" ) ) this.setValue( "right", "margin", margins.right );
                    if ( margins.hasOwnProperty( "bottom" ) ) this.setValue( "bottom", "margin", margins.bottom );
                }
                if ( values.hasOwnProperty( "paddings" ) ) {
                    var paddings = null;
                    if ( this.options.values.paddings && typeof this.options.values.paddings === "object" ) {
                        paddings = this.options.values.paddings;
                    } else if ( this.options.values.paddings && typeof this.options.values.paddings === "string" ) {
                        paddings = this.parseStringCSS( paddings );
                    }
                    if ( paddings.hasOwnProperty( "top" ) ) this.setValue( "top", "padding", paddings.top );
                    if ( paddings.hasOwnProperty( "left" ) ) this.setValue( "left", "padding", paddings.left );
                    if ( paddings.hasOwnProperty( "right" ) ) this.setValue( "right", "padding", paddings.right );
                    if ( paddings.hasOwnProperty( "bottom" ) ) this.setValue( "bottom", "padding", paddings.bottom );
                }
                if ( values.hasOwnProperty( "borders" ) ) {
                    var borders = null;
                    if ( this.options.values.borders && typeof this.options.values.borders === "object" ) {
                        borders = this.options.values.borders;
                    } else if ( this.options.values.borders && typeof this.options.values.borders === "string" ) {
                        borders = this.parseStringCSS( borders );
                    }
                    if ( borders.hasOwnProperty( "top" ) ) this.setValue( "top", "border", borders.top );
                    if ( borders.hasOwnProperty( "left" ) ) this.setValue( "left", "border", borders.left );
                    if ( borders.hasOwnProperty( "right" ) ) this.setValue( "right", "border", borders.right );
                    if ( borders.hasOwnProperty( "bottom" ) ) this.setValue( "bottom", "border", borders.bottom );
                }
                if ( values.hasOwnProperty( "dimensions" ) ) {
                    var dimensions = this.options.values.dimensions;
                    if ( dimensions.hasOwnProperty( "width" ) ) this.setValue( null, "width", dimensions.width );
                    if ( dimensions.hasOwnProperty( "height" ) ) this.setValue( null, "height", dimensions.height );
                }
            }
        },
        parseStringCSS: function ( str ) {
            var units = str.split( " " );
            var result = {
                top: "auto",
                bottom: "auto",
                left: "auto",
                right: "auto"
            };
            if ( units.length == 4 ) {
                result.top = units[ 0 ];
                result.right = units[ 1 ];
                result.bottom = units[ 2 ];
                result.left = units[ 3 ];
            } else if ( units.length == 3 ) {
                result.top = units[ 0 ];
                result.right = units[ 1 ];
                result.bottom = units[ 2 ];
                result.left = units[ 1 ];
            } else if ( units.length == 2 ) {
                result.top = units[ 0 ];
                result.right = units[ 1 ];
                result.bottom = units[ 0 ];
                result.left = units[ 1 ];
            } else if ( units.length == 1 ) {
                result.top = units[ 0 ];
                result.right = units[ 0 ];
                result.bottom = units[ 0 ];
                result.left = units[ 0 ];
            }
            return result;
        },
        validate: function ( elem ) {
            var value = elem.val();
            if ( value !== this.options.autoText ) {
                var unit = this.getUnit( value );
                var val = parseFloat( value );
                if ( (unit === value.substr( -1 * unit.length )) && (val + "" + unit === value) ) {
                    return true;
                } else {
                    this.$element.trigger( "boxmodel:error", [ elem, elem.val(), this.getAllProperties() ] );
                    return false;
                }
            } else {
                return true;
            }
        },
        bindEvents: function () {
            this.inputs = this.$element.find( "input[type='text']" );
            this.inputs.on( "keyup", $.proxy( this.keyUpEvent, this ) );
            this.inputs.on( "blur", $.proxy( this.blurEvent, this ) );
            this.inputs.on( "mousewheel", $.proxy( this.wheelEvent, this ) );            
            this.$element.find( "span.boxmodel-lock" ).on( "click", $.proxy( this.lockEvent, this ) );
            this.$element.find( "input[name='" + this.options.inputName + "_auto_text']" ).val( this.options.autoText );
            this.updateMargin();
            this.updateBorder();
            this.updatePadding();
            this.updateDimensions();
        },
        lockEvent: function ( event ) {
            var elem = $( event.target );
            elem.toggleClass( "boxmodel-locked" );
            if ( elem.hasClass( "boxmodel-locked" ) ) {
                elem.html( "&#x1f512;" );
            } else {
                elem.html( "&#128275;" );
            }
        },
        keyUpEvent: function ( event ) {
            var elem = $( event.target );
            if ( event && ( event.key === 'ArrowUp' || event.key === 'Up' || event.keyCode == 38 || event.which == 38 ) ) {
                this.increaseValue( elem );
            } else if ( event && ( event.key === 'ArrowDown' || event.key === 'Down' || event.keyCode == 40 || event.which == 40 ) ) {
                this.decreaseValue( elem );
            }
            this.$element.trigger( "boxmodel:keyup", [ elem, elem.val() ] );
        },
        blurEvent: function ( event ) {
            var elem = $( event.target );
            var val = elem.val();
            if ( val.trim() === "" || !this.validate( elem ) ) elem.val( this.options.autoText );
            if ( val !== elem.val() ) this.changeEvent( elem );
            this.$element.trigger( "boxmodel:blur", [ event, elem, elem.val(), this.getAllProperties() ] );
        },
        wheelEvent: function ( event ) {
            var elem = $( event.target );
            if ( elem.is( ":focus" ) ) {
                if ( event.originalEvent.wheelDelta / 120 > 0 ) {
                    this.increaseValue( elem );
                } else {
                    this.decreaseValue( elem );
                }
                event.preventDefault();
            }
        },
        checkLockMode: function ( input, scope ) {
            var lockState = this.$element.find( ".boxmodel-locked.boxmodel-lock-" + scope ).length > 0;
            if ( lockState ) {
                var inputs = "input[name='%NAME%_left_%SCOPE%'],input[name='%NAME%_right_%SCOPE%'],input[name='%NAME%_top_%SCOPE%'],input[name='%NAME%_bottom_%SCOPE%']";
                inputs = inputs.replace( /\%NAME\%/g, this.options.inputName ).replace( /\%SCOPE\%/g, scope );
                var elems = this.$element.find( inputs );
                elems.not( input ).val( input.val() );
            }
        },
        changeEvent: function ( elem ) {
            var name = elem.attr( "name" );
            elem.attr( 'size', elem.val().length < 3 ? 3 : elem.val().length );
            if ( name.indexOf( "margin" ) > 0 ) this.updateMargin( elem );
            else if ( name.indexOf( "padding" ) > 0 ) this.updatePadding( elem );
            else if ( name.indexOf( "border" ) > 0 ) this.updateBorder( elem );
            else if ( name.indexOf( "width" ) > 0 || name.indexOf( "height" ) > 0 ) this.updateDimensions();
            this.$element.trigger( "boxmodel:change", [ elem, elem.val(), this.getAllProperties() ] );
        },
        decreaseValue: function ( elem ) {
            var val = !isNaN( parseFloat( elem.val() ) ) ? parseFloat( elem.val() ) : 0;
            var strval = elem.val().replace( this.getUnit( elem.val() ), "" );
            elem.val( ( val - this.getPrecision( strval ) ).toFixed( this.getPrecisionMultiplier( strval ) ) + this.getUnit( elem.val() ) );
            this.changeEvent( elem );
            elem.select();
        },
        increaseValue: function ( elem ) {
            var val = !isNaN( parseFloat( elem.val() ) ) ? parseFloat( elem.val() ) : 0;
            var strval = elem.val().replace( this.getUnit( elem.val() ), "" );
            elem.val( ( val + this.getPrecision( strval ) ).toFixed( this.getPrecisionMultiplier( strval ) ) + this.getUnit( elem.val() ) );
            this.changeEvent( elem );
            elem.select();
        },
        getPrecisionMultiplier: function ( val ) {
            var s = val + "",
                d = s.indexOf( '.' ) + 1;
            return !d ? 0 : ( s.length - d );
        },
        getPrecision: function ( val ) {
            if ( this.options.usePrecision ) {
                return Math.pow( 10, -1 * this.getPrecisionMultiplier( val ) );
            } else {
                return 1;
            }
        },
        getUnit: function ( val ) {
            var unit = "";
            if ( [ "vmin", "vmax" ].indexOf( val.substr( -4 ) ) >= 0 ) unit = val.substr( -4 );
            else if ( val.substr( -3 ) === "rem" ) unit = "rem";
            else if ( [ "px", "pt", "em", "ex", "cm", "mm", "in", "pc", "vw", "vh", "ch" ].indexOf( val.substr( -2 ) ) >= 0 ) unit = val.substr( -2 );
            else if ( val.substr( -1 ) === "%" ) unit = "%";
            if ( unit !== "" && this.options.enabledUnits.indexOf( unit ) >= 0 ) return unit;
            return "px";
        },
        updateMargin: function ( elem ) {
            this.checkLockMode( elem, "margin" );
            this.update4Inputs( "margin" );
        },
        updateBorder: function ( elem ) {
            this.checkLockMode( elem, "border" );
            this.update4Inputs( "border" );
        },
        updatePadding: function ( elem ) {
            this.checkLockMode( elem, "padding" );
            this.update4Inputs( "padding" );
        },
        updateDimensions: function () {
            var width = this.getInputValue( "width" );
            var height = this.getInputValue( "height" );
            var output = this.$element.find( "input[name='" + this.options.inputName + "_dimensions']" );
            output.val = width + " x " + height;
        },
        getInputValue: function ( property ) {
            var val = this.$element.find( "input[name='" + this.options.inputName + "_" + property + "']" ).val();
            if ( val == this.options.autoText ) return "auto";
            return val;
        },
        update4Inputs: function ( key ) {
            var top = this.getInputValue( "top_" + key );
            var left = this.getInputValue( "left_" + key );
            var right = this.getInputValue( "right_" + key );
            var bottom = this.getInputValue( "bottom_" + key );
            var output = this.$element.find( "input[name='" + this.options.inputName + "_" + key + "']" );
            if ( top == left && top == right && top == bottom ) {
                output.val( top );
            } else {
                output.val( top + " " + right + " " + bottom + " " + left );
            }
        },
        setValue: function ( direction, scope, value ) {
            var output = null;        
            if ( direction !== null ) {
                output = this.$element.find( "input[name='" + this.options.inputName + "_" + direction + "_" + scope + "']" ).first();
            } else {
                output = this.$element.find( "input[name='" + this.options.inputName + "_" + scope + "']" ).first();
            }            
            if ( output.length === 1 ){
                output.val( value );
                if(this.validate( output )){
                    output.attr( 'size', output.val().length < 3 ? 3 : output.val().length );
                    return true;
                }
                return false;
            }
            return true;
        },
        setMargins: function ( value ) {
            this.setValue( "top", "margin", value );
            this.setValue( "left", "margin", value );
            this.setValue( "right", "margin", value );
            this.setValue( "bottom", "margin", value );
        },
        setPaddings: function ( value ) {
            this.setValue( "top", "padding", value );
            this.setValue( "left", "padding", value );
            this.setValue( "right", "padding", value );
            this.setValue( "bottom", "padding", value );
        },
        setBorders: function ( value ) {
            this.setValue( "top", "border", value );
            this.setValue( "left", "border", value );
            this.setValue( "right", "border", value );
            this.setValue( "bottom", "border", value );
        },
        getAllProperties: function () {
            var output = {};
            output.optimized = {};
            if ( this.options.enableBorder ) {
                output.borders = {
                    top: this.getInputValue( "top_border" ),
                    right: this.getInputValue( "right_border" ),
                    bottom: this.getInputValue( "bottom_border" ),
                    left: this.getInputValue( "left_border" )
                };
                output.optimized.borders = this.getInputValue( "border" );
            }
            if ( this.options.enablePadding ) {
                output.paddings = {
                    top: this.getInputValue( "top_padding" ),
                    right: this.getInputValue( "right_padding" ),
                    bottom: this.getInputValue( "bottom_padding" ),
                    left: this.getInputValue( "left_padding" )
                };
                output.optimized.paddings = this.getInputValue( "padding" );
            }
            if ( this.options.enableMargin ) {
                output.margins = {
                    top: this.getInputValue( "top_margin" ),
                    right: this.getInputValue( "right_margin" ),
                    bottom: this.getInputValue( "bottom_margin" ),
                    left: this.getInputValue( "left_margin" )
                };
                output.optimized.margins = this.getInputValue( "margin" );
            }
            if ( this.options.enableDimensions ) {
                output.dimensions = {
                    width: this.getInputValue( "width" ),
                    height: this.getInputValue( "height" ),
                };
            }
            return output;
        }
    };
    $.fn.boxModel = function ( options ) {
        return this.each( function () {
            if ( !$.data( this, "boxModel" ) ) {
                $.data( this, "boxModel", new BoxModel( this, options ) );
            }
        } );
    };
} )( jQuery, window, document );