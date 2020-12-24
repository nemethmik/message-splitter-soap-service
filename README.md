# message-splitter-soap-service
A contract first SOAP service based on Express and node-soap written in TypeScript and deployed on Azure as App Service via GitHub
## Video Series
First of all there is a 5-part video series revolving around this project.
- [Deploying a SOAP Service as Azure App Service (Part 1 - Direct Push Deployment)](https://youtu.be/a-Xb1ou2SVY)
- [Deploying a SOAP Service as Azure App Service (Part 2 - Push Redeployments without Dist Folder)](https://youtu.be/6d9ZyXaN_G8)
- [Deploying a SOAP Service as Azure App Service (Part 3 - CI/CD Pipeline via GitHub without Workflows)](https://youtu.be/Wntdpzegdp4)
- [Developing a SOAP Service with Node JS TypeScript and Deploying It as Azure App Service (Part 4)](https://youtu.be/UNEVOctGbsw)
- [Deploying a SOAP Service with Node JS TypeScript as Azure App Service (Part 5)](https://youtu.be/To9yNFrVyvM)

## Motivation
At a major corporation I am working full time the now 20-year old SOAP services still are the primary, and actually only communications technology, no REST, no gRPC.
SOAP is similar in concept to gRPC, CORBA, and other remote procedure technologies where the contracts are defined upfront, this Contract-First Service Development. In the case of SOAP WSDL is used as the contract, interface definition. WSDL is the same in concepts as Proto Buf for gRPC and IDL for CORBA, and Swagger for REST.
In this the final episode WSDL is introduced, the first four episodes are about the infrastructure: Node JS, Azure App Service, TypeScript, deployment, GitHub.

## Tool-Stack
In the example I used 
- Node JS
- TypeScript
- Visual Studio Code
- Azure App Service
- Azure App Service extension module for Visual Studio Code
- ts-node, nodemon
- WSDL, [Wizdler](https://chrome.google.com/webstore/detail/wizdler/oebpmncolmhiapingjaagmapififiakb) Google Chrome browser extension, Postman for testing SOAP requests
- [Vinay Pulim's SOAP node package](https://github.com/vpulim/node-soap), which is still actively maintained.
- [Nin Pham's wsdl-to-ts tool forked from the original version](https://github.com/ReeganExE/node-soap-example)
- [Marco Galassi's SOAP Node server and client example](https://github.com/officer-rosmarino/node-soap-example) I used his example as the basis for my TypeScript solution.

## Major Points and Attractions
A major attraction here is that I combined WSDL with the elegance of TypeScript. I simply cannot imagine any serious moderately complex application development project without TypeScript. With this series I wabted to give help, how to apply TypeScript with SOAP. Since Azure App Service support for Node (with its blazing fast V8 engine) and TypeScript is first-class, as demonstrated throughout this series, I think this is the easiest to learn and lightest tool-stack for SOA development. Since Microsoft practically abandonned WCF and SOAP, it is not available in dot-net core, unfortunately, so C# is a dead end for SOA development. Python never had any appreciatable support for SOA. Java used to have and still has excellent support for SOA via Spring Boot and Spring WS, but there the learning curve is really steep, far more complex than the technology demonstrated here. I have been working with Java since 1996, and I love it. Java is still very popular in corporate IT world, and using Spring Boot/WS for exactly the same tasks as demonstrated here could be a perfect alternative.

In some of my earlier videos I demonstrated how to deploy SOAP services as low-level (infrastructure) Docker Instances via Docker Hub. App Service is managed platform level service from Azure and a hell lot more convenient than Docker. App Service builds the application with Oryx on the app server itself directly from the TypeScript files using npm run build, that's why including typescript as a dev dependency is important.

