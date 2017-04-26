;
(function($, window, document, undefined) {
    var defaults = {
        inputName: null
    };
    var template = "<div class='boxmodel-container'>" + "<div class='boxmodel-margin'><span class='boxmodel-text boxmodel-header'>margin</span>" + "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_margin'></span>" + "<div class='flex-row'>" + "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_margin'></span>" + "<div class='boxmodel-border'><span class='boxmodel-text boxmodel-header'>border</span>" + "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_border'></span>" + "<div class='flex-row'>" + "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_border'></span>" + "<div class='boxmodel-padding'><span class='boxmodel-text boxmodel-header'>padding</span>" + "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_padding'></span>" + "<div class='flex-row'>" + "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_padding'></span>" + "<div class='boxmodel-content'></div>" + "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_padding'></span>" + "</div>" + "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_padding'></span>" + "</div>" + "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_border'></span>" + "</div>" + "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_border'></span>" + "</div>" + "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_margin'></span>" + "</div>" + "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_margin'></span>" + "</div>" + "</div>";

    function BoxModel(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this.inputs = null;
        this._defaults = defaults;
        this.init();
    }
    BoxModel.prototype = {
        init: function() {
            this.options.inputName = this.$element.data("name");
            this.$element.html(template.replace(/\%NAME\%/g, this.options.inputName));
            this.bindEvents();
        },
        validate: function(input) {},
        bindEvents: function() {
            this.inputs = this.$element.find("input[type='text']");
            this.inputs.on("keyup", $.proxy(this.keyUpEvent, this));
            this.inputs.on("blur", $.proxy(this.blurEvent, this));
            this.inputs.val("auto");
        },
        keyUpEvent: function(event) {
            var elem = $(event.target);
            console.log(this.getUnit(elem.val()));
            if (event && event.key === 'ArrowUp') {
                this.increaseValue(elem);
            } else if (event && event.key === 'ArrowDown') {
                this.decreaseValue(elem);
            }            
        },
        blurEvent: function(event) {
            var elem = $(event.target);
            //console.log(elem);
        },
        decreaseValue: function(elem) {            
            var val = !isNaN(parseFloat(elem.val())) ? parseFloat(elem.val()) : 0;
            elem.val((val - 1) + this.getUnit(elem.val()));
        },
        increaseValue: function(elem) {
            var val = !isNaN(parseFloat(elem.val())) ? parseFloat(elem.val()) : 0;            
            elem.val((val + 1) + this.getUnit(elem.val()));
        },
        getUnit: function(val) {                   
            if (val.substr(-1) === "%") return "%";
            else if (["px", "pt", "em", "ex", "cm", "mm", "in", "pc", "vw", "vh", "ch"].indexOf(val.substr(-2)) >= 0) return val.substr(-2);
            else if (val.substr(-3) === "rem") return "rem";
            else if (["vmin", "vmax"].indexOf(val.substr(-4)) >= 0) return val.substr(-4);
            return "px";
        }
    };
    $.fn.boxModel = function(options) {
        return this.each(function() {
            if (!$.data(this, "boxModel")) {
                $.data(this, "boxModel", new BoxModel(this, options));
            }
        });
    };
})(jQuery, window, document);