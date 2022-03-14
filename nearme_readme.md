#### Java Deploy Local Configuration in VSCode

1. Install Java version specified in maven-compiler-plugin inside pom.xml
2. Install Java extensions for VSC: Extension Pack for Java - https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack
3. Install Spring extensions for VSC: Name: Spring Boot Extension Pack - https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-boot-dev-pack
4. Install Lombok extension for VSC: Lombok Annotations Support for VS Code - https://marketplace.visualstudio.com/items?itemName=GabrielBB.vscode-lombok
5. run **************not yet**************
   ```
   mvn -Pdev clean install
   ```
6. Use `control * shift * D `
7. Create a custom configuration.json
8. Paste next configuration :

```
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
```
