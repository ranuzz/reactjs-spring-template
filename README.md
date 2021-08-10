---
title: "ReactJS plus Spring Project Scaffold"
date: 2021-08-01T23:27:20+05:30
toc: true
featured_image: '/images/hero/project-scaffolding.jpg'
featured_image_display: false
show_reading_time: true
summary: 'ReactJS Spring boot project Scaffold'
tags: ["react", "spring", "java"]
edits: [
    "01/Aug/2021 : First Draft"
]
showedits: true
---

## The Project

This post is about setting up a web application project with ReactJS frontend and Spring boot backend. The project will compile as a single fat jar which will include both frontend and backend components. Maven will handle both UI and API builds.
Choose a name for the project `reactjs-spring-template`, write a little readme in the project directory and create a folder for the project, then follow up.

Finished code is [here](https://github.com/ranuzz/reactjs-spring-template)


## ReactJS Scaffold

* Make sure you have latest version of `node` installed, I suggest using nvm to manage multiple version

```sh
# default -> v14.16.1
nvm list
```

* Create webapp for the project

```sh
cd project
npx create-react-app webapp --template redux
```

## Clean up Code

* `src/app.js`: Remove all HTML and add an empty div `<div>It Works!</div>`
* `App.css`: Remove everything but keep the file for custom CSS
* `app/store.js`: remove counter feature references
* `features\counter`: You can delete this folder but it's better to keep it for reference

## Update Branding

* `public\index.html`: Update `title` and `description` tags
* `public`: remove existing favicon and logo files, you don't have to replace them right away
* `public\manifest.json`: update `short_name` and `name`

## Setup test

update `App.test.js`

```js
expect(getByText(/works/i)).toBeInTheDocument();
```
run `npm test`
make sure everything passes. You might receive an error saying that the reducer is invalid but that's ok.

## Install Bootstrap

```sh
# https://react-bootstrap.github.io/getting-started/introduction
npm install react-bootstrap bootstrap@4.6.0 --save
```
add `import 'bootstrap/dist/css/bootstrap.min.css';` in `App.js`

## Add routing

```sh
npm install react-router-dom --save
```

Add the following code instead of `<div>It Works!</div>` and import relevant references from react-bootstrap and react-router.

```html
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Title.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/about">About</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        <Switch>
          <Route path="/about">
            <div>About</div>
          </Route>
          <Route path="/">
            <div>Home</div>
          </Route>
        </Switch>
    </Router>
```

## Spring Boot Scaffold

* Make sure java version is 11+
```sh
java -version
```

* Go to `https://start.spring.io/`. Use the preselected versions and project setting (Maven, Spring 2.5.3, Java 11) and fill up the required fields.
* give your project a name `api`
* add `Spring Data JPA` and `Spring Web` Dependency
* Export the scaffold and copy the folder in project directory

## Project Directory

At this point your project directory should look like this.

```sh
├── README.md
└── project
    ├── api
    └── webapp
```

Since this whole project will be built using `maven`, it's time to move some files and make sure that `pom` files are managing all aspects of build and publishing.
* go to `api` directory
* move `.mvn`, `mvnw`, `mvnw.cmd` and `pom.xml` from `api` directory to the project root
* Create `pom.xml` in `webapp` and `api` folder

We have `three` `pom.xml` files now and we will edit them one-by-one. The project directory should now be looking like this.

```sh
.
├── README.md
└── project
    ├── api
    │   ├── HELP.md
    │   ├── pom.xml
    │   └── src
    ├── mvnw
    ├── mvnw.cmd
    ├── pom.xml
    └── webapp
        ├── README.md
        ├── node_modules
        ├── package-lock.json
        ├── package.json
        ├── pom.xml
        ├── public
        └── src
```

## Project `pom.xml`

* Remove `build`, `dependencies` and `properties` section
* Add the `module` section that points to `webapp` and `api` projects.
* make sure packaging is pom : `<packaging>pom</packaging>`
* Artifact Id is project name

[Final pom.xml](https://github.com/ranuzz/reactjs-spring-template/blob/main/project/pom.xml)

## WebApp `pom.xml`

* This is going to be blank at the start.
* `<parent>` tag will refer to the project `pom`
* We will be using `https://github.com/eirslett/frontend-maven-plugin` to compile the ReactJS project.

[Final pom.xml](https://github.com/ranuzz/reactjs-spring-template/blob/main/project/webapp/pom.xml)

## API `pom.xml`

* `<parent>` tag will refer to the project `pom`
* Most of the component will remain the same from the initial version
* Use `maven-resources-plugin` to copy ReactJS build files
```xml
<plugin>
    <artifactId>maven-resources-plugin</artifactId>
    <executions>
        <execution>
        <id>copy ReactJS frontend content</id>
        <phase>generate-resources</phase>
        <goals>
            <goal>copy-resources</goal>
        </goals>
        <configuration>
            <outputDirectory>src/main/resources/public</outputDirectory>
            <overwrite>true</overwrite>
            <resources>
            <resource>
                <directory>${project.parent.basedir}/webapp/build</directory>
                <includes>
                <include>static/</include>
                <include>index.html</include>
                <include>asset-manifest.json</include>
                <include>manifest.json</include>
                <include>robots.txt</include>
                </includes>
            </resource>
            </resources>
        </configuration>
        </execution>
    </executions>
    </plugin>
```
* `H2` will be used for DB

[Final pom.xml](https://github.com/ranuzz/reactjs-spring-template/blob/main/project/api/pom.xml)

## Compile and Run

* mvn clean install
* java -jar api/target/api-0.0.1-SNAPSHOT.jar

This will display the ReactJS generated web app at the root url `http://localhost:8080.`

## API

This was just the build and integration stuff. To make a real application I'll create an API endpoint and add some dummy data to it then I'll use ReactJS frontend to call that API to fetch and display that data.

Since the `jar` build is for production and deploy everything from the same domain the `API` calls don't need any special handling.

## Dev Setup

But for development with fast reload and everything it is ideal to run the frontend and backend build separately. To do that add proxy configuration in `package.json`

```json
{
    "proxy": "http://localhost:8080"
}
```

And run backend and frontend separately.

```sh
cd api
mvn clean install
java -jar target/api-0.0.1-SNAPSHOT.jar
```

```sh
cd webapp
npm run serve
```
