# BoxModel - CSS Box Model Editor

> BoxModel is a jQuery plugin which helps it's users to create a compact form input for editing box model css in html forms. It can submit several details such as separate values and combined, optimized units ready for use inside CSS blocks. It supports mouse wheel input value increasing/decreasing, up/down keys, locking mechanism for editing the property for all directions, multiple styles, multiple unit support, label translations and more.

## Usage

The main files of this plugin are `boxmodel.min.js` and `boxmodel.min.css`, which are generated by compiling and minifying `boxmodel.js` and `boxmodel.scss`. The plugin relies on **jQuery** library, also needs to be included before including `boxmodel.min.js`.

The example configuration which can be found in the base index file is:

```html

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/jquery-2.1.4.min.js" type="text/javascript"><\/script>')</script>
<!-- .boxmodel includes -->
<link href="build/css/boxmodel.min.css" rel="stylesheet"/>
<script src="build/js/boxmodel.min.js"></script>
<!-- .end boxmodel includes -->
````

Then, to attach a boxmodel object to a container you desire, use this:

```javascript
$(".boxmodel").boxModel();
```

You can customize your plugin with options you provide to the initializing function,
```javascript
$(".boxmodel").boxModel({inputName: "my-box-model", enableDimensions: false});
```
or the element's `data-plugin-options` property.
```javascript
<div class="boxmodel" data-plugin-options='{"inputName":"my-box-model","enableDimensions":false}'></div>
```

Once initalized, you can access the boxmodel object like this:
```javascript
var boxmodel = $(".boxmodel:eq(3)").data("boxmodel");
boxmodel.options.enableDimensions = false;
boxmodel.$element.empty();
boxmodel.init();
```
<br>
<br>
<br>

## Properties

Once you've got the `boxmodel` instance object, you can access these properties:

- `element` [DOM node object]: The HTML dom node which the instance is created on.
- `$element` [jQuery Object]: jQuery object of the dom node. Equals to `$(boxmodel.element)`

For example,

```javascript
	var boxmodel = $("#elem1").boxModel();
	// boxmodel.element will be equal to document.getElementById("elem1") or $("#elem1").get(0);
	// boxmodel.$element will be equal to $("#elem1");
```

- `options` [JS Object]: The instance's configuration object. Consists of merging default values and user defined settings. The details of it is explained in the *Options* section.
- `inputs` [jQuery Object]: This refers to the visible inputs in the boxmodel container.

<br>
<br>
<br>

## Options

These are the options you can set with the javascript plugin initialization object, or with the `data-plugin-options` html attribute on the input element, or within the events by directly modifying the `boxmodel.options` object.

- `inputName` [string]: The input name which will be prepended to the inputs. For example, if this property is set to **my_box**, the left margin input will be posted as **my_box_left_margin**. Can also be set with `data-name` html attribute on the container element. No default.<br><br>
- `autoText` [string]: the string that'll be displayed on empty inputs, the values of it will be posted as __"auto"__. Default: `"-"`<br><br>
- `enabledUnits` [array]: allowed units definition. Default: `[ "px", "pt", "em", "rem", "vh", "vw", "vmin", "vmax", "%", "cm" and "mm" ]`<br><br>
- `defaultUnit` [string]: unit to use when no enabled unit matches the value given. Default: `px`<br><br>
- `usePrecision` [boolean]: If you want the up/down buttons (and mousewheel) to increase using the minimum precision in the input, this needs to be true. Else, the inputs will increase/decrease by 1 unit. Default: `true`<br><br>
- `enableMargin` [boolean]: if you want to disable margin box and inputs, set this to false. Default: `true`<br><br>
- `enablePadding` [boolean]: if you want to disable padding box and inputs, set this to false. Default: `true`<br><br>
- `enableBorder` [boolean]: if you want to disable border box and inputs, set this to false. Default: `true`<br><br>
- `enableDimensions` [boolean]: if you want to disable width and height inputs, set this to false. Default: `true`<br><br>
- `marginLabel` [string]: the label which is displayed inside the margin box. Default: `Margin`<br><br>
- `paddingLabel` [string]: the label which is displayed inside the padding box. Default: `Padding`<br><br>
- `borderLabel` [string]: the label which is displayed inside the border box. Default: `Border`<br><br>
- `dimensionLabel` [string]: the text that'll be displayed in between the width and height inputs if enableDimensions is set to true. Default: `x`<br><br>
- `onInit` [function]: the method that runs on successful plugin initialization. Default: `function() { }`<br><br>
- `values` [object]: the initial values for the plugin. Default: `null`<br><br>
    <br>**example structure:**
    ```javascript
    var initialValues = { margin: "0px 1px 0px 1px", padding: "0px 0px 0px 2px", border: "0 .2em .3em 0"};

    // or

    var initialValues = { margin: { top: "2px", left: "3px", right: "5px"} };

    $("div.boxmodel").boxModel({values: initialValues});
    ```

<br>
<br>
<br>

## Events

- `boxmodel:change` [event handler]: event which is triggered after changing any input on the boxmodel. Attached to the container element itself.

	**Prototype:**

  ```javascript
		$(".boxmodel").on("boxmodel:change", function(element, value, all){
			...
		});

		// parameters : element -> the input which triggered the change event
		// 			 value   -> the input value
		//			  all	 -> all input values on the plugin as an object
  ```
<br>
<br>

- `boxmodel:blur` [event handler]:  event which is triggered after when an input loses focus on the container. Attached to the container element itself.

  **Prototype:**

  ```javascript
		$(".boxmodel").on("boxmodel:blur", function(element, value, all){
			...
		});

		// parameters : element -> the input which triggered the change event
		// 			 value   -> the input value
		//			  all	 -> all input values on the plugin as an object
  ```
<br>
<br>

- `boxmodel:keyup` [event handler]:  event which is triggered after when an input had a key pressed on the container. Attached to the container element itself.

  **Prototype:**

  ```javascript
		$(".boxmodel").on("boxmodel:keyup", function(event, element, value, all){
			...
		});

		// parameters :	event	-> the DOM event
		//				 element  -> the input which triggered the change event
		// 				value	-> the input value
		//				 all	  -> all input values on the plugin as an object
  ```
<br>
<br>

- `boxmodel:error` [event handler]:  event which is triggered after when an user input triggered a validation error on the container. Attached to the container element itself.

  **Prototype:**

	```javascript
		$(".boxmodel").on("boxmodel:error", function(element, value, all){
			...
		});

		// parameters : element -> the input which triggered the change event
		// 			 value   -> the input value
		//			  all	 -> all input values on the plugin as an object
	```
<br>
<br>
<br>

## Methods

- `getAllProperties` [function]: Gets all the inputs as an object.
<br><br>
- `setValue` [function]: Sets a specific value, returns `false` if validation `fails`, does nothing and returns `true` when the related input doesn't exist.

  **Prototype:**
  ```javascript
	var boxmodel = $("#boxmodel").boxModel();
	//  parameters:
	//	string direction (top, left, bottom, right)
	//	string scope (margin, padding, border)
	//	string value
	boxmodel.setValue("top","margin","5px");
	boxmodel.setValue(null, "width", "250px");
  ```
<br><br>
- `setBorders` [function]: Sets all borders to a specific value, returns `false` if validation fails, does nothing and returns `true` when `enableBorder` is set to `false`.
<br>
  **Prototype:**
  ```javascript
	var boxmodel = $("#boxmodel").boxModel();
	//  parameters:
	//	string value
	boxmodel.setBorders("1px");
  ```
<br><br>
- `setPaddings` [function]: Sets all paddings to a specific value, returns `false` if validation fails, does nothing and returns `true` when `enablePadding` is set to `false`.
<br>
  **Prototype:**
  ```javascript
	var boxmodel = $("#boxmodel").boxModel();
	//  parameters:
	//	string value
	boxmodel.setPaddings("8px");
  ```
<br><br>
- `setMargins` [function]: Sets all borders to a specific value, returns `false` if validation fails, does nothing and returns `true` when `enableMargin` is set to `false`.
<br>
  **Prototype:**
  ```javascript
	var boxmodel = $("#boxmodel").boxModel();
	//  parameters:
	//	string value
	boxmodel.setMargins("3px");
  ```
<br><br>
- `setWidth` [function]: Sets the width input, returns `false` if validation `fails`, does nothing and returns `true when `enableDimensions` is set to `false`.
<br>**Prototype:**
```javascript
	var boxmodel = $("#boxmodel").boxModel();
	//  parameters:
	//	string value
	boxmodel.setWidth("250px");
```
<br><br>
- `setHeight` [function]: Sets the height input, returns `false` if validation `fails`, does nothing and returns `true` when `enableDimensions` is set to `false`.
<br>**Prototype:**
```javascript
	var boxmodel = $("#boxmodel").boxModel();
	//  parameters:
	//	string value
	boxmodel.setHeight("75px");
```

<br>
<br>
<br>
## Examples

### Default Box Model Input
---
Add `data-name` property to the container div, and call `.boxModel()` on the container.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-1" data-name="boxmodel-ex-1"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-1").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-1" data-name="boxmodel-ex-1"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-1").boxModel();
  	</script>
  ```
<br>
<br>
<br>

### Setting Initial Values
#### Initialization Object
---
Showing how to implement initialization with object.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-1-1" data-name="boxmodel-ex-1-1"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-1-1").boxModel({values: {margins: {top: "1px", left: "2px", right: "3px", bottom: "4px"}, paddings: {top: "1px", left: "2px", right: "3px", bottom: "4px"}, borders: {top: "1px", left: "2px", right: "3px", bottom: "4px"}, dimensions: { width: "150px", height: "250px" }}});</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-1-1" data-name="boxmodel-ex-1-1"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-1-1").boxModel({
  			values: {
  				margins: {
  					top: "1px",
  					left: "2px",
  					right: "3px",
  					bottom: "4px"
  				},
  				paddings: {
  					top: "1px",
  					left: "2px",
  					right: "3px",
  					bottom: "4px"
  				},
  				borders: {
  					top: "1px",
  					left: "2px",
  					right: "3px",
  					bottom: "4px"
  				},
  				dimensions: {
  					width: "150px",
  					height: "250px"
  				}
  			}
  		});
  	</script>
  ```
<br>
<br>
<br>

#### Incomplete Object Values
---
Showing how to implement initialization using an object with undefined values.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-1-4" data-name="boxmodel-ex-1-4"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-1-4").boxModel({
        values: {
          margins: {
            top: "1px",
            left: "2px"
          },
          paddings: {
            bottom: "4px"
          },
          borders: {
            left: "2px",
            bottom: "4px"
          },
          dimensions: {
            height: "250px"
          }
        }});</script>

  HTML:
  ```html
    <div id="boxmodel-ex-1-4" data-name="boxmodel-ex-1-4"></div>
  ```

  JavaScript:
  ```html
    <script type="text/javascript">
      $("#boxmodel-ex-1-4").boxModel({
        values: {
          margins: {
            top: "1px",
            left: "2px"
          },
          paddings: {
            bottom: "4px"
          },
          borders: {
            left: "2px",
            bottom: "4px"
          },
          dimensions: {
            height: "250px"
          }
        }
      });
    </script>
  ```
<br>
<br>
<br>

#### Invalid Object Values
---
Showing how to implement initialization using an object with invalid values.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-1-5" data-name="boxmodel-ex-1-5"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-1-5").boxModel({
        values: {
          margins: {
            top: "1px",
            left: "2py"
          },
          paddings: {
            top: "1px",
            bottom: "4"
          },
          borders: {
            leftx: "2px",
            bottom: "4px"
          },
          dimensions: {
            height: "250$",
            width: "100%"
          }
        }});</script>

  HTML:
  ```html
    <div id="boxmodel-ex-1-5" data-name="boxmodel-ex-1-5"></div>
  ```

  JavaScript:
  ```html
    <script type="text/javascript">
      $("#boxmodel-ex-1-5").boxModel({
        values: {
          margins: {
            top: "1px",
            left: "2py"
          },
          paddings: {
            top: "1px",
            bottom: "4"
          },
          borders: {
            leftx: "2px",
            bottom: "4px"
          },
          dimensions: {
            height: "250$",
            width: "100%"
          }
        }
      });
    </script>
  ```
<br>
<br>
<br>

#### Object With CSS Strings
---
Showing how to implement initialization with object.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-1-2" data-name="boxmodel-ex-1-2"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-1-2").boxModel({values: {margins: "1px 2px 3px 4px",paddings: "1px 2px 3px 4px",	borders: "1px 2px 3px 4px",	dimensions: { width: "150px", height: "250px"}}});</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-1-2" data-name="boxmodel-ex-1-2"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-1-2").boxModel({
  			values: {
  				margins: "1px 2px 3px 4px",
  				paddings: "1px 2px 3px 4px",
  				borders: "1px 2px 3px 4px",
  				dimensions: {
  					width: "150px",
  					height: "250px"
  				}
  			}
  		});
  	</script>
  ```
<br>
<br>
<br>

#### Optimized CSS Strings
---
Showing how to implement initialization with shortened css strings.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-1-3" data-name="boxmodel-ex-1-3"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-1-3").boxModel({values: {
          margins: "5px auto",
          paddings: "1px 2px 1px",
          borders: "1px auto 3px",
          dimensions: {
            width: "150px"
          }
        }});</script>

  HTML:
  ```html
    <div id="boxmodel-ex-1-3" data-name="boxmodel-ex-1-3"></div>
  ```

  JavaScript:
  ```html
    <script type="text/javascript">
      $("#boxmodel-ex-1-3").boxModel({
        values: {
          margins: "5px auto",
          paddings: "1px 2px 1px",
          borders: "1px auto 3px",
          dimensions: {
            width: "150px"
          }
        }
      });
    </script>
  ```
<br>
<br>
<br>


#### Invalid CSS Strings
---
Showing how to implement initialization with shortened css strings.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-1-6" data-name="boxmodel-ex-1-6"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-1-6").boxModel({
        values: {
          margins: "john doe 25ipx",
          paddings: "1em 2rem 3pem",
          borders: "1px oto 3px",
          dimensions: {
            width: "720p"
          }
        }});</script>

  HTML:
  ```html
    <div id="boxmodel-ex-1-6" data-name="boxmodel-ex-1-6"></div>
  ```

  JavaScript:
  ```html
    <script type="text/javascript">
      $("#boxmodel-ex-1-6").boxModel({
        values: {
          margins: "john doe 25ipx",
          paddings: "1em 2rem 3pem",
          borders: "1px oto 3px",
          dimensions: {
            width: "720p"
          }
        }
      });
    </script>
  ```
<br>
<br>
<br>


### Skins
#### Chrome Skin
---
Just add `boxmodel-chrome-skin` to the container object and the skin will be applied.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-2" data-name="boxmodel-ex-2" class="boxmodel-chrome-skin"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-2").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-2" data-name="boxmodel-ex-2" class="boxmodel-chrome-skin"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-2").boxModel();
  	</script>
  ```
<br>
<br>
<br>

#### FireBug Skin
---
Just add `boxmodel-firebug-skin` to the container object and the skin will be applied.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-3" data-name="boxmodel-ex-3" class="boxmodel-firebug-skin"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-3").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-3" data-name="boxmodel-ex-3" class="boxmodel-firebug-skin"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-3").boxModel();
  	</script>
  ```
<br>
<br>
<br>

#### IE Skin
---
Just add `boxmodel-ie-skin` to the container object and the skin will be applied.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-4" data-name="boxmodel-ex-4" class="boxmodel-ie-skin"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-4").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-4" data-name="boxmodel-ex-4" class="boxmodel-ie-skin"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-4").boxModel();
  	</script>
  ```
<br>
<br>
<br>

#### Rounded Skin
---
Just add `boxmodel-rounded-skin` to the container object and the skin will be applied.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-5" data-name="boxmodel-ex-5" class="boxmodel-rounded-skin"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-5").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-5" data-name="boxmodel-ex-5" class="boxmodel-rounded-skin"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-5").boxModel();
  	</script>
  ```
<br>
<br>
<br>

#### Dark Skin
---
Just add `boxmodel-dark-skin` to the container object and the skin will be applied.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px; background: #111">
<div id="boxmodel-ex-6" data-name="boxmodel-ex-6" class="boxmodel-dark-skin"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-6").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-6" data-name="boxmodel-ex-6" class="boxmodel-dark-skin"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-6").boxModel();
  	</script>
  ```
<br>
<br>
<br>

#### Neo Skin
---
Just add `boxmodel-neo-skin` to the container object and the skin will be applied.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px; background: #111">
<div id="boxmodel-ex-7" data-name="boxmodel-ex-7" class="boxmodel-neo-skin"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-7").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-7" data-name="boxmodel-ex-7" class="boxmodel-neo-skin"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-7").boxModel();
  	</script>
  ```
<br>
<br>
<br>


#### Perspective Skin
---
Just add `boxmodel-perspective-skin` to the container object and the skin will be applied.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px; background: #111">
<div id="boxmodel-ex-8" data-name="boxmodel-ex-8" class="boxmodel-perspective-skin"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-8").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-8" data-name="boxmodel-ex-8" class="boxmodel-perspective-skin"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-8").boxModel();
  	</script>
  ```
<br>
<br>
<br>


#### Metal Skin
---
Just add `boxmodel-metal-skin` to the container object and the skin will be applied.
<br>
<br>
**Preview**

<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px; background: #111">
<div id="boxmodel-ex-9" data-name="boxmodel-ex-9" class="boxmodel-metal-skin"></div>
</div>
<script type="text/javascript">$("#boxmodel-ex-9").boxModel();</script>

  HTML:
  ```html
  	<div id="boxmodel-ex-9" data-name="boxmodel-ex-9" class="boxmodel-metal-skin"></div>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-9").boxModel();
  	</script>
  ```
<br>
<br>
<br>

### Sent Values
---
This is a form submitting test to see which variables this plugin is posting to you.
<br>
<br>
**Preview**

<form onsubmit="call_boxmodel_mock(this); return false;">
<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
<div id="boxmodel-ex-10" data-name="boxmodel-post"></div>
</div>
<input type="submit">&nbsp; <div class="text-muted">Testing with `POST` data sent to "https://httpbin.org/post"</div>
</form>
<style>
	.json_output {display: flex; flex-direction: row;flex-wrap: wrap}
	.json_output div { display: flex; flex-direction: row; margin-top: 1px;}
	.json_output div label { background: #eee; width: 200px; padding: 4px 10px; margin:0; }
	.json_output div p { background: #fff; width: 200px; padding: 4px 10px; margin: 0; }
</style>
<div class="json_output"></div>
<script type="text/javascript">
	function call_boxmodel_mock(form){
		$.ajax({
			url: "https://httpbin.org/post",
			data: $(form).serialize(),
			method: "POST",
			success: function(response){
				$(".json_output").empty();
				for(i in response.form){
					$(".json_output").append("<div><label>"+i+"</label><p>"+response.form[i]+"</p>");
				}
			}
		})
	}
</script>
<script type="text/javascript">$("#boxmodel-ex-10").boxModel();</script>

  HTML:
  ```html
	<form onsubmit="call_boxmodel_mock(this); return false;">
		<div class="well well-sm" style="display: flex; align-items: center; justify-content: center; padding: 20px;">
			<div id="boxmodel-ex-10" data-name="boxmodel-post"></div>
		</div>
		<input type="submit">&nbsp;<div class="text-muted">Testing with `POST` data sent to "https://httpbin.org/post"</div>
	</form>
	<style>
		.json_output {display: flex; flex-direction: row;flex-wrap: wrap}
		.json_output div { display: flex; flex-direction: row; margin-top: 1px;}
		.json_output div label { background: #eee; width: 200px; padding: 4px 10px; margin:0; }
		.json_output div p { background: #fff; width: 200px; padding: 4px 10px; margin: 0; }
	</style>
	<div class="json_output"></div>
	<script type="text/javascript">
		function call_boxmodel_mock(form){
			$.ajax({
				url: "https://httpbin.org/post",
				data: $(form).serialize(),
				method: "POST",
				success: function(response){
					$(".json_output").empty();
					for(i in response.form){
						$(".json_output").append("<div><label>"+i+"</label><p>"+response.form[i]+"</p>");
					}
				}
			})
		}
	</script>
  ```

  JavaScript:
  ```html
  	<script type="text/javascript">
  		$("#boxmodel-ex-10").boxModel();
  	</script>
  ```
<br>
<br>
<br>

## Change Log

- #### v1.0.0
   - Released initial version.


<br>
<br>
<br>
## Copyright & Licenses

* *boxmodel* CSS Box Model Editor

   Copyright (c) Taha PAKSU <http://www.tahapaksu.com>

   All rights reserved.


* Based on *jQuery — New Wave JavaScript* http://www.jquery.org

   Copyright (c) JS Foundation and other contributors, https://js.foundation/

   Released under [jQuery License](https://jquery.org/license/)

   All rights reserved.

<br>
<br>
<br>