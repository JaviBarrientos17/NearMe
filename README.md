# NearMe
View Api endpoint with SwaggerUI V2

You can see that it has generated a path called

/v2/api-docs,
so if we access them in the browser (http://localhost:8080/v2/api-docs) we can see the metadata of the API generated by the library springfox-swagger2:

img

However, this documentation is not at all intuitive, which is why we have installed the springfox-swagger-ui library, which takes this metadata and creates the URL: http://localhost:8080/swagger-ui.html

http://localhost:8080/swagger-ui.html
Java Deploy Local Configuration in VSCode

Install Java version specified in maven-compiler-plugin inside pom.xml
Install Java extensions for VSC: Extension Pack for Java - https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack
Install Spring extensions for VSC: Name: Spring Boot Extension Pack - https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-boot-dev-pack
Install Lombok extension for VSC: Lombok Annotations Support for VS Code - https://marketplace.visualstudio.com/items?itemName=GabrielBB.vscode-lombok
run not yet
mvn -Pdev clean install
Use control * shift * D
Create a custom configuration.json
Paste next configuration :
{
    "configurations": [
        {
            "type": "java",
            "name": "Launch NearmeApplication",
            "request": "launch",
            "mainClass": "com.api.nearme.NearmeApplication",
            "projectName": ""
        },
        {
            "type": "java",
            "name": "Launch NearmeApplication",
            "request": "launch",
            "mainClass": "com.nearme.nearme.NearmeApplication",
            "projectName": ""
        },
        {
            "type": "java",
            "name": "Spring Boot-NearmeApplication<nearme>",
            "request": "launch",
            "cwd": "${workspaceFolder}",
            "console": "internalConsole",
            "mainClass": "com.nearme.nearme.NearmeApplication",
            "projectName": "nearme",
            "args": "",
            "envFile": "${workspaceFolder}/.env"
        }
    ]
}
