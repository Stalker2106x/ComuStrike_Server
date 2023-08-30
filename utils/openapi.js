const fs = require('fs')
const { convert } = require("joi-openapi")

const routes = require('../routes')
const xmlLayer = require('../routes/legacy/xmlLayer')

module.exports = {
  generate: () => {
    let openAPI = {
        swagger: "2.0",
        info: {
            version: "1.0.0",
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

    const allRoutes = Object.values(routes)
    allRoutes.push(xmlLayer)
    for (const route of allRoutes) {
        //route params :p needs to become {p}
        if (!openAPI.paths[route.route]) {
            openAPI.paths[route.route] = {}
        }
        let routeSpec = {}
        
        
        if (route.description) routeSpec.description = route.description
        if (route.produces) routeSpec.produces = route.produces
        if (route.schema) routeSpec.parameters = convert(route.schema)

        openAPI.paths[route.route][route.method] = routeSpec
    }

    return openAPI
  }
}