# Matrix Manipulation
A sample project built with NodeJS using Express and GraphQl. 
Jest was used to write the Unit test.

Requirements
1) NodeJS environment must be setup

To run the project
 1) run npm install on the main folder to install the necessary node modules
 2) run npm start

To run the test
 1) ensure your command line points to the test directory
 2) run npm test

Postman test
1) open the file 'postman_collection' in the code directory
2) use postman to import the collection
3) ensure the server is up and running 
4) create a csv file in any folder location on your PC and add sample values for a square matrix
5) select any of the api call and test with the location of the file created in step 4

GraphQL GUI Test
 1) ensure the server is up and running
 2) create a csv file in any folder location on your PC and add sample values for a square matrix
 3) append /graphql to the base url to display the GUI
 4) happy testing with the location of the file created in step 2

Note
 The graphQL endpoints takes string as the file variable while Rest api endpoints takes the csv as the file variable
 

