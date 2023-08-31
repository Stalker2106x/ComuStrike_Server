const fs = require('fs')
const { convert } = require("joi-openapi")

function convertSchema(schema) {
  let parameters = []
  for (const [source, params] of Object.entries(schema)) {
    const openapiSchema = convert(params)
    for (const [paramName, paramData] of Object.entries(openapiSchema.properties)) {
      parameters.push({
        "name": paramName,
        "in": source,
        ...paramData
      })
    }
  }
  return (parameters)
}

module.exports = {
  generate: () => {
    const config = require('../config')
    let openAPI = {
        swagger: "2.0",
        info: {
            version: config.serverVersion,
            title: "Comustrike Server",
            description: "Unofficial Romustrike master server API",
            contact: {
                name: "Stalker2106"
            },
            license: {
                name: "MIT"
            }
        },
        basePath: "/",
        schemes: [
          "http"
        ],
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json",
          "application/xml"
        ],
        paths: {}
    }

    const xmlLayer = require('../routes/legacy/xmlLayer')
    const allRoutes = Object.values(require('../routes'))
    allRoutes.push(xmlLayer)
    for (const route of allRoutes) {
        //route params :p needs to become {p}
        if (!openAPI.paths[route.route]) {
            openAPI.paths[route.route] = {}
        }
        let routeSpec = {}
        
        
        if (route.description) routeSpec.description = route.description
        if (route.produces) routeSpec.produces = route.produces
        if (route.schema) routeSpec.parameters = convertSchema(route.schema)

        openAPI.paths[route.route][route.method] = routeSpec
    }

    return openAPI
  }
}