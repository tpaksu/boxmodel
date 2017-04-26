# Grunstrap

A basic starter container for creating web plugins, apps etc. 

Includes:
- *grunt* for automating tasks, 
- *sass* for compiling Sass files into CSS, 
- *uglify*, for minifying javascript,
- *markdown* for creating HTML documentation using markdown files with:
   - Template for documentation (template.html)
   - Bootstrap
   - jQuery
   - Prism.js for highlighting codes
   - TOC.js for automatic table of contents generation using H1, H2 .. header tags

## How to use
- You need node.js installed and available on PATH in your system. 
  You can get it here: https://nodejs.org/
- Download this package to a folder
- Run `npm install` in that folder (after this you'll see a `node_modules` folder added, keep it and ignore it, but when deploying the final product, dismiss it)
- Then after installation finishes, 
   - You can run "grunt" by hand if you want manual compiling
   - You can run "grunt watch" if you want automatic compiling after a file changes

## License

MIT
