;
(function($, window, document, undefined) {
    var defaults = {
        inputName: null,
        autoText: "-",
        enabledUnits: ["px", "pt", "em", "rem", "vh", "vw", "vmin", "vmax", "%", "cm", "mm"],
        usePrecision: true,
        enableMargin: true,
        enablePadding: true,
        enableBorder: true,
        enableDimensions: true,
        onInit: function() {},
        marginLabel: "Margin",
        paddingLabel: "Padding",
        borderLabel: "Border",
        dimensionLabel: "x"
    };

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
            var template = "<div class='boxmodel-container'>" + ((this.options.enableMargin) ? "<div class='boxmodel-margin'><span class='boxmodel-text boxmodel-header'>" + this.options.marginLabel + "</span><span class='boxmodel-lock boxmodel-lock-margin'>&#128275;</span>" : "") + ((this.options.enableMargin) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_margin'></span>" : "") + ((this.options.enableMargin) ? "<div class='flex-row'>" : "") + ((this.options.enableMargin) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_margin'></span>" : "") + ((this.options.enableBorder) ? "<div class='boxmodel-border'><span class='boxmodel-text boxmodel-header'>" + this.options.borderLabel + "</span><span class='boxmodel-lock boxmodel-lock-border'>&#128275;</span>" : "") + ((this.options.enableBorder) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_border'></span>" : "") + ((this.options.enableBorder) ? "<div class='flex-row'>" : "") + ((this.options.enableBorder) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_border'></span>" : "") + ((this.options.enablePadding) ? "<div class='boxmodel-padding'><span class='boxmodel-text boxmodel-header'>" + this.options.paddingLabel + "</span><span class='boxmodel-lock boxmodel-lock-padding'>&#128275;</span>" : "") + ((this.options.enablePadding) ? "<span class='boxmodel-input-container boxmodel-input-direction-left'><input type='text' name='%NAME%_left_padding'></span>" : "") + ((this.options.enablePadding) ? "<div class='flex-row'>" : "") + ((this.options.enablePadding) ? "<span class='boxmodel-input-container boxmodel-input-direction-top'><input type='text' name='%NAME%_top_padding'></span>" : "") + "<div class='boxmodel-content'>" + ((this.options.enableDimensions) ? "<input type='text' name='%NAME%_width'>" + this.options.dimensionLabel + "<input type='text' name='%NAME%_height'>" : "") + "</div>" + ((this.options.enablePadding) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_padding'></span>" : "") + ((this.options.enablePadding) ? "</div>" : "") + ((this.options.enablePadding) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_padding'></span>" : "") + ((this.options.enablePadding) ? "</div>" : "") + ((this.options.enableBorder) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_border'></span>" : "") + ((this.options.enableBorder) ? "</div>" : "") + ((this.options.enableBorder) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_border'></span>" : "") + ((this.options.enableBorder) ? "</div>" : "") + ((this.options.enableMargin) ? "<span class='boxmodel-input-container boxmodel-input-direction-bottom'><input type='text' name='%NAME%_bottom_margin'></span>" : "") + ((this.options.enableMargin) ? "</div>" : "") + ((this.options.enableMargin) ? "<span class='boxmodel-input-container boxmodel-input-direction-right'><input type='text' name='%NAME%_right_margin'></span>" : "") + ((this.options.enableMargin) ? "</div>" : "") + "<input type='hidden' name='%NAME%_auto_text'>" + ((this.options.enableMargin) ? "<input type='hidden' name='%NAME%_margin'>" : "") + ((this.options.enablePadding) ? "<input type='hidden' name='%NAME%_padding'>" : "") + ((this.options.enableBorder) ? "<input type='hidden' name='%NAME%_border'>" : "") + ((this.options.enableDimensions) ? "<input type='hidden' name='%NAME%_dimensions'>" : "") + "</div>";
            this.options.inputName = this.$element.data("name");
            this.$element.html(template.replace(/\%NAME\%/g, this.options.inputName));
            this.options.onInit(this);
            this.bindEvents();
        },
        validate: function(elem) {
            var value = elem.val();
            if (value !== this.options.autoText) {
                var unit = this.getUnit(value);
                var val = parseFloat(value);
                if (unit === value.substr(-1 * unit.length) && val + unit === value) {
                    return true;
                } else {
                    elem.trigger("boxmodel:error", [elem, elem.val()]);
                    return false;
                }
            } else {
                return true;
            }
        },
        bindEvents: function() {
            this.inputs = this.$element.find("input[type='text']");
            this.inputs.on("keyup", $.proxy(this.keyUpEvent, this));
            this.inputs.on("blur", $.proxy(this.blurEvent, this));
            this.inputs.on("mousewheel", $.proxy(this.wheelEvent, this));
            this.inputs.val(this.options.autoText).attr("size", 3);
            this.$element.find("span.boxmodel-lock").on("click", $.proxy(this.lockEvent, this));
            this.$element.find("input[name='" + this.options.inputName + "_auto_text']").val(this.options.autoText);
            this.updateMargin();
            this.updateBorder();
            this.updatePadding();
            this.updateDimensions();
        },
        lockEvent: function(event) {
            var elem = $(event.target);
            elem.toggleClass("boxmodel-locked");
            if (elem.hasClass("boxmodel-locked")) {
                elem.html("&#x1f512;");
            } else {
                elem.html("&#128275;");
            }
        },
        keyUpEvent: function(event) {
            var elem = $(event.target);
            if (event && (event.key === 'ArrowUp' || event.key === 'Up' || event.keyCode == 38 || event.which == 38)) {
                this.increaseValue(elem);
            } else if (event && (event.key === 'ArrowDown' || event.key === 'Down' || event.keyCode == 40 || event.which == 40)) {
                this.decreaseValue(elem);
            }
            elem.trigger("boxmodel:keyup", [elem, elem.val()]);
        },
        blurEvent: function(event) {
            var elem = $(event.target);
            var val = elem.val();
            if (val.trim() === "" || !this.validate(elem)) elem.val(this.options.autoText);
            if (val !== elem.val()) this.changeEvent(elem);
            elem.trigger("boxmodel:blur", [elem, elem.val()]);
        },
        wheelEvent: function(event) {
            var elem = $(event.target);
            if (elem.is(":focus")) {
                if (event.originalEvent.wheelDelta / 120 > 0) {
                    this.increaseValue(elem);
                } else {
                    this.decreaseValue(elem);
                }
                event.preventDefault();
            }
        },
        checkLockMode: function(input, scope) {
            var lockState = this.$element.find(".boxmodel-locked.boxmodel-lock-" + scope).length > 0;
            if (lockState) {
                var inputs = "input[name='%NAME%_left_%SCOPE%'],input[name='%NAME%_right_%SCOPE%'],input[name='%NAME%_top_%SCOPE%'],input[name='%NAME%_bottom_%SCOPE%']";
                inputs = inputs.replace(/\%NAME\%/g, this.options.inputName).replace(/\%SCOPE\%/g, scope);
                var elems = this.$element.find(inputs);
                elems.not(input).val(input.val());
            }
        },
        changeEvent: function(elem) {
            var name = elem.attr("name");
            elem.attr('size', elem.val().length < 3 ? 3 : elem.val().length);
            if (name.indexOf("margin") > 0) this.updateMargin(elem);
            else if (name.indexOf("padding") > 0) this.updatePadding(elem);
            else if (name.indexOf("border") > 0) this.updateBorder(elem);
            else if (name.indexOf("width") > 0 || name.indexOf("height") > 0) this.updateDimensions();
            elem.trigger("boxmodel:change", [elem, elem.val()]);
        },
        decreaseValue: function(elem) {
            var val = !isNaN(parseFloat(elem.val())) ? parseFloat(elem.val()) : 0;
            var strval = elem.val().replace(this.getUnit(elem.val()), "");
            elem.val((val - this.getPrecision(strval)).toFixed(this.getPrecisionMultiplier(strval)) + this.getUnit(elem.val()));
            this.changeEvent(elem);
            elem.select();
        },
        increaseValue: function(elem) {
            var val = !isNaN(parseFloat(elem.val())) ? parseFloat(elem.val()) : 0;
            var strval = elem.val().replace(this.getUnit(elem.val()), "");
            elem.val((val + this.getPrecision(strval)).toFixed(this.getPrecisionMultiplier(strval)) + this.getUnit(elem.val()));
            this.changeEvent(elem);
            elem.select();
        },
        getPrecisionMultiplier: function(val) {
            var s = val + "",
                d = s.indexOf('.') + 1;
            return !d ? 0 : (s.length - d);
        },
        getPrecision: function(val) {
            if (this.options.usePrecision) {
                return Math.pow(10, -1 * this.getPrecisionMultiplier(val));
            } else {
                return 1;
            }
        },
        getUnit: function(val) {
            var unit = "";
            if (["vmin", "vmax"].indexOf(val.substr(-4)) >= 0) unit = val.substr(-4);
            else if (val.substr(-3) === "rem") unit = "rem";
            else if (["px", "pt", "em", "ex", "cm", "mm", "in", "pc", "vw", "vh", "ch"].indexOf(val.substr(-2)) >= 0) unit = val.substr(-2);
            else if (val.substr(-1) === "%") unit = "%";
            if (unit !== "" && this.options.enabledUnits.indexOf(unit) >= 0) return unit;
            return "px";
        },
        updateMargin: function(elem) {
            this.checkLockMode(elem, "margin");
            this.update4Inputs("margin");
        },
        updateBorder: function(elem) {
            this.checkLockMode(elem, "border");
            this.update4Inputs("border");
        },
        updatePadding: function(elem) {
            this.checkLockMode(elem, "padding");
            this.update4Inputs("padding");
        },
        updateDimensions: function() {
            var width = this.getInputValue("width");
            var height = this.getInputValue("height");
            var output = this.$element.find("input[name='" + this.options.inputName + "_dimensions']");
            output.val = width + " x " + height;
        },
        getInputValue: function(property) {
            var val = this.$element.find("input[name='" + this.options.inputName + "_" + property + "']").val();
            if (val == this.options.autoText) return "auto";
            return val;
        },
        update4Inputs: function(key) {
            var top = this.getInputValue("top_" + key);
            var left = this.getInputValue("left_" + key);
            var right = this.getInputValue("right_" + key);
            var bottom = this.getInputValue("bottom_" + key);
            var output = this.$element.find("input[name='" + this.options.inputName + "_" + key + "']");
            if (top == left && top == right && top == bottom) {
                output.val(top);
            } else {
                output.val(top + " " + right + " " + bottom + " " + left);
            }
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