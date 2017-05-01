/**
 *
 *        ____             __  ___          __     __
 *       / __ )____  _  __/  |/  /___  ____/ /__  / /
 *      / __  / __ \| |/_/ /|_/ / __ \/ __  / _ \/ /
 *     / /_/ / /_/ />  </ /  / / /_/ / /_/ /  __/ /
 *    /_____/\____/_/|_/_/  /_/\____/\__,_/\___/_/
 *
 *
 * @name: boxModel - the css box model editor
 * @description: A compact padding/margin/border/dimensions editor for the box-modeled elements
 * @version: 1.0.0
 * @author: Taha PAKSU <tpaksu@gmail.com>
 *
 * // changelog
 *
 * v1.0.0
 * ------
 * - released first version
 *
 * Usage:
 * ------
 * $(".selector").boxModel({options});
 *
 **/
;( function( $, window, document, undefined ) {
    /**
     * the default values of the plugin when before initializing
     * @type object
     */
    var defaults = {
        inputName: null,
        autoText: "-",
        enabledUnits: [ "px", "pt", "em", "rem", "vh", "vw", "vmin", "vmax", "%", "cm", "mm" ],
        defaultUnit: "px",
        usePrecision: true,
        enableMargin: true,
        enablePadding: true,
        enableBorder: true,
        enableDimensions: true,
        onInit: function() {},
        marginLabel: "Margin",
        paddingLabel: "Padding",
        borderLabel: "Border",
        dimensionLabel: "x",
        values: null
    };

    /**
     * The main class
     * @param object element The container element which will include the inputs
     * @param object options The user parameters to modify the default ones
     */
    function BoxModel( element, options ) {
        this.element = element;
        this.$element = $( element );
        this._metadata = this.$element.data("plugin-options");
        this.options = $.extend( {}, defaults, options, this._metadata );
        this.inputs = null;
        this._defaults = defaults;        
        this.init();
    }
    /**
     * Class prototype
     * @type object
     */
    BoxModel.prototype = {
        /**
         * initialization function
         * @return none
         */
        init: function() {
            var template = "<div class='boxmodel-container'>" + ( ( this.options.enableMargin ) ? "<div class='boxmodel-margin'><span class='boxmodel-text boxmodel-header'>" + this.options.marginLabel + "</span><span class='boxmodel-lock boxmodel-lock-margin'>&#128275;</span>" : "" ) + ( ( this.options.enableMargin ) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_margin'></span>" : "" ) + ( ( this.options.enableMargin ) ? "<div class='flex-row'>" : "" ) + ( ( this.options.enableMargin ) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_margin'></span>" : "" ) + ( ( this.options.enableBorder ) ? "<div class='boxmodel-border'><span class='boxmodel-text boxmodel-header'>" + this.options.borderLabel + "</span><span class='boxmodel-lock boxmodel-lock-border'>&#128275;</span>" : "" ) + ( ( this.options.enableBorder ) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_border'></span>" : "" ) + ( ( this.options.enableBorder ) ? "<div class='flex-row'>" : "" ) + ( ( this.options.enableBorder ) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_border'></span>" : "" ) + ( ( this.options.enablePadding ) ? "<div class='boxmodel-padding'><span class='boxmodel-text boxmodel-header'>" + this.options.paddingLabel + "</span><span class='boxmodel-lock boxmodel-lock-padding'>&#128275;</span>" : "" ) + ( ( this.options.enablePadding ) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_padding'></span>" : "" ) + ( ( this.options.enablePadding ) ? "<div class='flex-row'>" : "" ) + ( ( this.options.enablePadding ) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_padding'></span>" : "" ) + "<div class='boxmodel-content'>" + ( ( this.options.enableDimensions ) ? "<input type='text' name='%NAME%_width'>" + this.options.dimensionLabel + "<input type='text' name='%NAME%_height'>" : "" ) + "</div>" + ( ( this.options.enablePadding ) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_padding'></span>" : "" ) + ( ( this.options.enablePadding ) ? "</div>" : "" ) + ( ( this.options.enablePadding ) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_padding'></span>" : "" ) + ( ( this.options.enablePadding ) ? "</div>" : "" ) + ( ( this.options.enableBorder ) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_border'></span>" : "" ) + ( ( this.options.enableBorder ) ? "</div>" : "" ) + ( ( this.options.enableBorder ) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_border'></span>" : "" ) + ( ( this.options.enableBorder ) ? "</div>" : "" ) + ( ( this.options.enableMargin ) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_margin'></span>" : "" ) + ( ( this.options.enableMargin ) ? "</div>" : "" ) + ( ( this.options.enableMargin ) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_margin'></span>" : "" ) + ( ( this.options.enableMargin ) ? "</div>" : "" ) + "<input type='hidden' name='%NAME%_auto_text'>" + ( ( this.options.enableMargin ) ? "<input type='hidden' name='%NAME%_margin'>" : "" ) + ( ( this.options.enablePadding ) ? "<input type='hidden' name='%NAME%_padding'>" : "" ) + ( ( this.options.enableBorder ) ? "<input type='hidden' name='%NAME%_border'>" : "" ) + ( ( this.options.enableDimensions ) ? "<input type='hidden' name='%NAME%_dimensions'>" : "" ) + "</div>";
            this.options.inputName = this.options.inputName === null ? this.$element.data( "name" ) : this.options.inputName;
            this.$element.html( template.replace( /\%NAME\%/g, this.options.inputName ) );
            if ( typeof this.options.onInit == 'function' ) this.options.onInit( this );
            this.bindEvents();
            this.inputs.val( this.options.autoText ).attr( "size", 3 );
            this.setInitialValues();
        },
        /**
         * if the object contains initialization values, this function will validate and apply them to the inputs
         * @return none
         */
        setInitialValues: function() {
            if ( this.options.values && typeof this.options.values === "object" ) {
                var values = this.options.values;
                if ( values.hasOwnProperty( "margins" ) ) {
                    var margins = null;
                    if ( values.margins && typeof values.margins === "object" ) {
                        margins = values.margins;
                    } else if ( values.margins && typeof values.margins === "string" ) {
                        margins = this.parseStringCSS( values.margins );
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
                        paddings = this.parseStringCSS( values.paddings );
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
                        borders = this.parseStringCSS( values.borders );
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
        /**
         * If the user provided string CSS instead of an object, this will parse the string and convert the values to a validated object
         * @param  {string} str input string which contains the values
         * @return {object}     the output object containing parsed values
         */
        parseStringCSS: function( str ) {
            var result = {
                top: "auto",
                bottom: "auto",
                left: "auto",
                right: "auto"
            };
            if ( str === null ) return result;
            var units = str.split( " " );
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
            for(var i in result){
                if(result[i] === "auto") result[i] = this.options.autoText;
            }
            return result;
        },
        /**
         * value validation function
         * @param  {input} elem  the value container whose value will be validated
         * @return {boolean}     whether the input value is valid or not
         */
        validate: function( elem ) {
            var value = elem.val();
            if(value === "auto") value = this.options.autoText;
            if ( value !== this.options.autoText ) {
                var unit = this.getUnit( value );
                var val = parseFloat( value );
                if ( ( unit === value.substr( -1 * unit.length ) ) && ( val + "" + unit === value ) ) {
                    return true;
                } else {
                    this.$element.trigger( "boxmodel:error", [ elem, elem.val(), this.getAllProperties() ] );
                    return false;
                }
            } else {
                return true;
            }
        },
        /**
         * binding events to related inputs, and applying initial values
         * @return {null} null
         */
        bindEvents: function() {
            this.inputs = this.$element.find( "input[type='text']" );
            this.inputs.on( "keyup", $.proxy( this.keyUpEvent, this ) );
            this.inputs.on( "blur", $.proxy( this.blurEvent, this ) );
            this.inputs.on( "mousewheel", $.proxy( this.wheelEvent, this ) );
            this.$element.find( "span.boxmodel-lock" ).on( "click", $.proxy( this.lockEvent, this ) );
            this.$element.find( "input[name='" + this.options.inputName + "_auto_text']" ).val( this.options.autoText );
            this.updateMarginCombined();
            this.updateBorderCombined();
            this.updatePaddingCombined();
            this.updateDimensionsCombined();
        },
        /**
         * event handler for lock buttons
         * @param  {object} event  event object passed directly from the jQuery event
         * @return {null}         null
         */
        lockEvent: function( event ) {
            var elem = $( event.target );
            elem.toggleClass( "boxmodel-locked" );
            if ( elem.hasClass( "boxmodel-locked" ) ) {
                elem.html( "&#x1f512;" );
            } else {
                elem.html( "&#128275;" );
            }
        },
        /**
         * event handler for input key up event
         * @param  {object} event  event object passed directly from the jQuery event
         * @return {null}         null
         */
        keyUpEvent: function( event ) {
            var elem = $( event.target );
            if ( event && ( event.key === 'ArrowUp' || event.key === 'Up' || event.keyCode == 38 || event.which == 38 ) ) {
                this.increaseValue( elem );
            } else if ( event && ( event.key === 'ArrowDown' || event.key === 'Down' || event.keyCode == 40 || event.which == 40 ) ) {
                this.decreaseValue( elem );
            }
            this.$element.trigger( "boxmodel:keyup", [ elem, elem.val() ] );
        },
        /**
         * event handler for input blur event
         * @param  {object} event  event object passed directly from the jQuery event
         * @return {null}         null
         */
        blurEvent: function( event ) {
            var elem = $( event.target );
            var val = elem.val();
            if ( val.trim() === "" || !this.validate( elem ) ) elem.val( this.options.autoText );
            if ( val !== elem.val() ) this.changeEvent( elem );
            this.$element.trigger( "boxmodel:blur", [ event, elem, elem.val(), this.getAllProperties() ] );
        },
        /**
         * event handler for input mousewheel event
         * @param  {object} event  event object passed directly from the jQuery event
         * @return {null}         null
         */
        wheelEvent: function( event ) {
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
        /**
         * Checks locking mode and updates the other inputs with the given input value
         * @param  {input}   input The input that contains the value
         * @param  {string}  scope Input's scope that needs to be updated with the input value
         * @return {nothing}
         */
        checkLockMode: function( input, scope ) {
            var lockState = this.$element.find( ".boxmodel-locked.boxmodel-lock-" + scope ).length > 0;
            if ( lockState ) {
                var inputs = "input[name='%NAME%_left_%SCOPE%'],input[name='%NAME%_right_%SCOPE%'],input[name='%NAME%_top_%SCOPE%'],input[name='%NAME%_bottom_%SCOPE%']";
                inputs = inputs.replace( /\%NAME\%/g, this.options.inputName ).replace( /\%SCOPE\%/g, scope );
                var elems = this.$element.find( inputs );
                elems.not( input ).val( input.val() );
            }
        },
        /**
         * jQuery change event trigger
         * @param  {input} elem the input which is changed
         * @return {nothing}
         */
        changeEvent: function( elem ) {
            var name = elem.attr( "name" );
            elem.attr( 'size', elem.val().length < 3 ? 3 : elem.val().length );
            if ( name.indexOf( "margin" ) > 0 ) this.updateMarginCombined( elem );
            else if ( name.indexOf( "padding" ) > 0 ) this.updatePaddingCombined( elem );
            else if ( name.indexOf( "border" ) > 0 ) this.updateBorderCombined( elem );
            else if ( name.indexOf( "width" ) > 0 || name.indexOf( "height" ) > 0 ) this.updateDimensionsCombined();
            this.$element.trigger( "boxmodel:change", [ elem, elem.val(), this.getAllProperties() ] );
        },
        /**
         * Decrease the input value on down key press/mousewheel down scroll
         * @param  {input} elem the input to be changed
         * @return {nothing}
         */
        decreaseValue: function( elem ) {
            var val = !isNaN( parseFloat( elem.val() ) ) ? parseFloat( elem.val() ) : 0;
            var strval = elem.val().replace( this.getUnit( elem.val() ), "" );
            elem.val( ( val - this.getPrecision( strval ) ).toFixed( this.getPrecisionMultiplier( strval ) ) + this.getUnit( elem.val() ) );
            this.changeEvent( elem );
            elem.select();
        },
        /**
         * Increase the input value on up key press/mousewheel up scroll
         * @param  {input} elem the input to be changed
         * @return {nothing}
         */
        increaseValue: function( elem ) {
            var val = !isNaN( parseFloat( elem.val() ) ) ? parseFloat( elem.val() ) : 0;
            var strval = elem.val().replace( this.getUnit( elem.val() ), "" );
            elem.val( ( val + this.getPrecision( strval ) ).toFixed( this.getPrecisionMultiplier( strval ) ) + this.getUnit( elem.val() ) );
            this.changeEvent( elem );
            elem.select();
        },
        /**
         * returns the lowest precision on the value. For example, 5.2 -> 1, 4 -> 0, 4.0 -> 1
         * @param  {float}      val     value to be checked
         * @return {integer}            the precision value
         */
        getPrecisionMultiplier: function( val ) {
            var s = val + "",
                d = s.indexOf( '.' ) + 1;
            return !d ? 0 : ( s.length - d );
        },
        /**
         * Returns 1/pow(10,precision) when precision is enabled, if not, returns 1.
         * For example, the delta of 5,2 when decreasing/increasing and enabled precision will be 0.1
         * @param  {float} val Value to be checked
         * @return {float}     Returned delta value to use in decrease/increase methods
         */
        getPrecision: function( val ) {
            if ( this.options.usePrecision ) {
                return Math.pow( 10, -1 * this.getPrecisionMultiplier( val ) );
            } else {
                return 1;
            }
        },
        /**
         * Returns the value unit if exists on the enabled units list, else returns the default unit.
         * @param  {string} val Value to be parsed
         * @return {string}     The desired unit
         */
        getUnit: function( val ) {
            var unit = "";
            if ( [ "vmin", "vmax" ].indexOf( val.substr( -4 ) ) >= 0 ) unit = val.substr( -4 );
            else if ( val.substr( -3 ) === "rem" ) unit = "rem";
            else if ( [ "px", "pt", "em", "ex", "cm", "mm", "in", "pc", "vw", "vh", "ch" ].indexOf( val.substr( -2 ) ) >= 0 ) unit = val.substr( -2 );
            else if ( val.substr( -1 ) === "%" ) unit = "%";
            if ( unit !== "" && this.options.enabledUnits.indexOf( unit ) >= 0 ) return unit;
            return this.options.defaultUnit;
        },
        /**
         * Updates the other margin inputs if the lock is on and the combined/optimized inputs with the related input
         * @param  {input} elem The reference input which had triggered this update method
         * @return none
         */
        updateMarginCombined: function( elem ) {
            this.checkLockMode( elem, "margin" );
            this.updateOptimizedInputs( "margin" );
        },
        /**
         * Updates the other border inputs if the lock is on and the combined/optimized inputs with the related input
         * @param  {input} elem The reference input which had triggered this update method
         * @return none
         */
        updateBorderCombined: function( elem ) {
            this.checkLockMode( elem, "border" );
            this.updateOptimizedInputs( "border" );
        },
        /**
         * Updates the other padding inputs if the lock is on and the combined/optimized inputs with the related input
         * @param  {input} elem The reference input which had triggered this update method
         * @return none
         */
        updatePaddingCombined: function( elem ) {
            this.checkLockMode( elem, "padding" );
            this.updateOptimizedInputs( "padding" );
        },
        /**
         * Updates the combined dimension input value with the width and height input         
         * @return none
         */
        updateDimensionsCombined: function() {
            var width = this.getInputValue( "width" );
            var height = this.getInputValue( "height" );
            var output = this.$element.find( "input[name='" + this.options.inputName + "_dimensions']" );
            output.val = width + " x " + height;
        },
        /**
         * gets the desired input value. Syntax: "top_margin", "left_padding", "width" etc
         * @param  {string} property desired input name
         * @return {string}          the input value
         */
        getInputValue: function( property ) {
            var val = this.$element.find( "input[name='" + this.options.inputName + "_" + property + "']" ).val();
            if ( val == this.options.autoText ) return "auto";
            return val;
        },
        /**
         * Optimizes and Updates the combined inputs 
         * @param  {string} key padding margin etc.
         * @return nothing         
         */
        updateOptimizedInputs: function( key ) {
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
        /**
         * Sets one input with the desired value and validates it.
         * @param  {string}  direction top, left, right, bottom or null for width and height
         * @param  {string}  scope     border, padding, margin, width, height
         * @param  {string}  value     desired value with the unit suffix
         * @return {boolean}           true if everything went ok or input doesn't exist, false if validation fails.
         */
        setValue: function( direction, scope, value ) {
            var output = null;
            if ( direction !== null ) {
                output = this.$element.find( "input[name='" + this.options.inputName + "_" + direction + "_" + scope + "']" ).first();
            } else {
                output = this.$element.find( "input[name='" + this.options.inputName + "_" + scope + "']" ).first();
            }
            if ( output.length === 1 ) {
                output.val( value );
                if ( this.validate( output ) ) {
                    output.attr( 'size', output.val().length < 3 ? 3 : output.val().length );
                    return true;
                } else {
                    output.val(this.options.autoText);
                    return false;
                }
            }
            return true;
        },
        /**
         * Shortcut for setting all the margins with a value
         * @param {string} value The desired value
         */
        setMargins: function( value ) {
            this.setValue( "top", "margin", value );
            this.setValue( "left", "margin", value );
            this.setValue( "right", "margin", value );
            this.setValue( "bottom", "margin", value );
        },
        /**
         * Shortcut for setting all the paddings with a value
         * @param {string} value The desired value
         */
        setPaddings: function( value ) {
            this.setValue( "top", "padding", value );
            this.setValue( "left", "padding", value );
            this.setValue( "right", "padding", value );
            this.setValue( "bottom", "padding", value );
        },
        /**
         * Shortcut for setting all the borders with a value
         * @param {string} value The desired value
         */
        setBorders: function( value ) {
            this.setValue( "top", "border", value );
            this.setValue( "left", "border", value );
            this.setValue( "right", "border", value );
            this.setValue( "bottom", "border", value );
        },
        /**
         * Gets all values of the plugin as a single javascript object
         * @return {object} all values with distinct keys
         */
        getAllProperties: function() {
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
    /**
     * The main handler of boxmodel plugin
     * @param  [object] options javascript object which contains element specific
     * @return [boxmodel] plugin reference
     */
    $.fn.boxModel = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "boxModel" ) ) {
                $.data( this, "boxModel", new BoxModel( this, options ) );
            }
        } );
    };
} )( jQuery, window, document );
