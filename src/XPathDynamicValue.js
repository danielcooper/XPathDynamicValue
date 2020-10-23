const xpath = require('xpath');
const DOMParser = require('xmldom').DOMParser;
const format = require('xml-formatter');

class XPath {
  static identifier = 'com.14lines.Paw.XPathDynamicValue'
  static title = 'XPath Dynamic Value'
  static help = 'https://github.com/danielcooper/XPathDynamicValue'
  static inputs = [
    InputField("req", "Source Request", "Request"),
    InputField("xpath", "XPath", "String"),
    InputField("removexmlns", "Remove namespace from output", "Checkbox"),
    InputField("prettyprint", "Pretty Print", "Checkbox"),
    InputField("namespaces", "Namespaces", "KeyValueList", {"keyName":"namespace", "valueName":"url"})  ]

  evaluate(context) {
    const options = this

    if (this.xpath === ""){
      return ""
    }
    const lastBody = options.req.getLastExchange().responseBody
    const documentNode = new DOMParser().parseFromString(lastBody, 'text/xml')

    var selected = ""
    var namespaces = options.namespaces.reduce(function(map, obj) {
        if (obj[2]){
          map[obj[0]] = obj[1];
        }
        return map;
      }, {});
    
    selected = xpath.useNamespaces(namespaces)(options.xpath, documentNode);

    if (selected){
      mapped = selected.map(function(selectedItem) {
        var selectedString =  selectedItem.toString()
        if (options.removexmlns){
          selectedString = selectedString.replace(/xmlns=".*?"/, '' );
        }
        if (options.prettyprint){
          selectedString = format(selectedString, {collapseContent: true})
        }
        return selectedString
       })
       return mapped.join("\r")
    }
  }

  title(_context){
   return "XPathDynamicValue"
  }

  text(_context){
   return  this.xpath
  }
}

registerDynamicValueClass(XPath)
