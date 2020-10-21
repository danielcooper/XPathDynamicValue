const xpath = require('xpath');
const DOMParser = require('xmldom').DOMParser;

class XPath {
  static identifier = 'com.14lines.Paw.XPathDynamicValue'
  static title = 'XPath Dynamic Value'
  static help = 'https://github.com/danielcooper/XPathDynamicValue'
  static inputs = [
    InputField("req", "Source Request", "Request"),
    InputField("xpath", "XPath", "String")
  ]

  evaluate(context) {
    if (this.xpath === ""){
      return ""
    }
    const lastBody = this.req.getLastExchange().responseBody
    const documentNode = new DOMParser().parseFromString(lastBody, 'text/xml')
    return xpath.select(this.xpath, documentNode)
  }

  title(_context){
   return "XPathDynamicValue"
  }

  text(_context){
   return  this.xpath
  }
}

registerDynamicValueClass(XPath)
