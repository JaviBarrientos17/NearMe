#### Java Deploy Local Configuration in VSCode


* Install Java version specified in maven-compiler-plugin inside pom.xml
* Install Java extensions for VSC: Extension Pack for Java - https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack
* Install Spring extensions for VSC: Name: Spring Boot Extension Pack - https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-boot-dev-pack
* Install Lombok extension for VSC: Lombok Annotations Support for VS Code - https://marketplace.visualstudio.com/items?itemName=GabrielBB.vscode-lombok
* run mvn -Pdev clean install
* Use `control * shift * D `
* Create a custom configuration.json
* Paste next configuration

```
{
    "configurations": [
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
```
