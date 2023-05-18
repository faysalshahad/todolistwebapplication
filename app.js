// console.log ("Testing the app.js file");

/*Creating a new node app. To do that we are requiring an express module. */
const express = require ("express");

//requiring mongoose modules
const mongoose = require ("mongoose");

/*Requiring a https module. It is a native module inside node.js. Therefore it does not require external
installation process. */
const https = require ("https");

const lodash = require ("lodash");

/**To catch the data from user input we need to install bodyparser module */
const bodyParser = require ("body-parser");



const { log, Console, error } = require("console");

/**Locating date.js file which is inside the views */
const todayDate = require(__dirname + "/date.js");

// consol loggin todays date in two language such as english and bengali.
console.log(todayDate.getDateInEnglishFunction());
console.log(todayDate.getDateInBengaliFunction());

/**Locating date.js file which is inside the views */
//const todayDate2 = require(__dirname + "/date2.js");

//console.log(todayDate2.getDateInBengaliFunction());

//const request = require ("request");

//let ejs = require("ejs");

/* The variable name app is being used because it is the best practice 
to use app as a name to represent express modules or express app.*/
const app = express();

/*This code will help our server to serve static files such as CSS and Images, we need
to use a special function of Express module. That is known as static. Here the public 
is the folder name where our static files like CSS and images will reside.*/
app.use(express.static("public"));

/**This is a must necessary code to declare to use the body-parser module to capture user input. */
app.use(bodyParser.urlencoded({extended: true}));

/**Must requirement code to set up ejs. The code is found from 
 https://github.com/mde/ejs/wiki/Using-EJS-with-Express */
app.set("view engine", "ejs");

// connection URL to MongoDB Atlas Cloud Server database where todolistDB is the database name
mongoose.connect("mongodb+srv://faysalshahad:<put your password. for safety i did not put it in public folder>@faysalshahad.nbqqn3d.mongodb.net/todolistDB", {useNewUrlParser:true, useUnifiedTopology:true});

// connection URL to mongoose database locally where todolistDB is the database name
//mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser:true, useUnifiedTopology:true});

//creating itemschema for todolistDB database
const taskschema = new mongoose.Schema ({ // taskschema start

    taskName:

     { 
        //creating javascript object
        type: String,
        //making this taskName field mandatory for the user by using required validator
        required: [true, "Please check the input entry as no task name has been entered"]
    }
    

}); // taskschema end

/**creating mongoose model. Here Task is the name of our collection for todolistDB database.
 * Mongoose requires always use singluar form. Such as instead of calling it Tasks we are simply 
 * calling it Task which a singluar form. Mongoose will cleverly convert this singular form
 * into a plural form when creating the collection. 
 * by following this procedure we have created a new collection called Tasks and the Tasks
 * have to stick to the structure we have specified in the taskschema. After following this rule
 * we are ready to create new documents for Task collection.*/ 
const Task = mongoose.model("Task", taskschema);

/**Creating document called taskDocument1, taskDocument2, taskDocument3, taskDocument3
 *  from the model called Task  which will stick to the taskchema*/
const taskDocument1 = new Task ({

     /**The taskName variable is a reference to the taskschema. Therefore, this variable 
         * name has to be written exactly same way everytime as per mongoose rule.*/
    taskName: "Welcome to your To-Do-List"

});

const taskDocument2 = new Task ({

     /**The taskName variable is a reference to the taskschema. Therefore, this variable 
         * name has to be written exactly same way everytime as per mongoose rule.*/
    taskName: "Press on the + icon to add a new item"
});

const taskDocument3 = new Task ({

     /**The taskName variable is a reference to the taskschema. Therefore, this variable 
         * name has to be written exactly same way everytime as per mongoose rule.*/
    taskName: "<-- Hit the Back icon to delete an item"
});

const taskDocument4 = new Task ({

     /**The taskName variable is a reference to the taskschema. Therefore, this variable 
         * name has to be written exactly same way everytime as per mongoose rule.*/
    taskName: "Eat something i.e."
});

/**The array to hold the default tasks. */
const listOfNewlyAddedItemsArray = [taskDocument1, taskDocument2, taskDocument3, taskDocument4];

/**Inserting Multiple documents at the same time inside Task collection in todolistDB*/
// Task.insertMany(listOfNewlyAddedItemsArray).then(()=> {
//     console.log("All the default documents have been inserted inside the database todolistDB.")
// }).catch((error)=>{
//     console.log("There is an Error while inserting new task " + error)}); 

/**Creating a roadrouteschema inside todolistDB database */
const roadrouteschema = new mongoose.Schema ({

    routeName: String,
    routeTask: [taskschema]


});

 /**Creating a new model pr collection called Road who will stick to roadrouteschema*/
 const Road = mongoose.model ("Road", roadrouteschema);

/*We will modify the code here so that if a browser gets in touch with us 
from port 3000 then it can get a response back. "/" The forward slash inside
the app.get is representing the homepage or home-root. */
app.get("/", function (req, res) {

    let displayTodayInEnglish = todayDate.getDateInEnglishFunction();

    let displayTodayInBengali = todayDate.getDateInBengaliFunction();

    /**Reading the data from Mongodb Database from collections tasks by using Task.find({})*/
    
     Task.find({}).then((tasks)=> {

/**Checking if the tasks collection inside mongoDB database is empty or not. If empty 
 * then the following code will execute inside if statement.
 */
        if (tasks.length === 0) {

    /**Inserting Multiple documents at the same time inside Task collection in todolistDB*/

            Task.insertMany(listOfNewlyAddedItemsArray).then(()=> {
    console.log("Used insertmany method to insert the default values.") // Giving feedback if the code above is susccessful
}).catch((error)=>{ // checking for an error
    console.log("There is an Error while inserting new task " + error)}); 
            
    res.redirect("/"); // redirecting routes to the root page or main page

        }      

 /**If the Task collection is not empty then the following code will get executed inside else statement */
        else{

               /**This code has been collected from https://github.com/mde/ejs/wiki/Using-EJS-with-Express
 * this is a must use code to be used after setting up app.set("view engine", "ejs"); above.
 * Here the list represents list.js file inside views folder. listTitle is being copied 
 * exactly as same as the variable listTitle declared inside list.ejs file. day is the 
 * variable declared above.
 * Here we are creating a response by rendering a file called list which has to exist inside
 * the views folder and has to have the extension called .ejs. Then inside the list file we
 * are passing in a single variable that has the name whatDayIsToday and the value we are giving
 * it is the value of our variable called dayInEnglish.
 * newlyAddedItembyUser has been collected from list.ejs and listOfNewlyAddedItems variable has been
 * defined on the top section.*/

            res.render("list", {
                listTitle: "Start",
             newlyAddedItembyUser: tasks, 
             listDisplayDateInEnglish: displayTodayInEnglish, 
             listDisplayDateInBengali: displayTodayInBengali
            });

        }
        
       
/**Logging the array value inside the console */
        //console.log("Documents inside tasks collection are " + tasks)
    }).catch(function(error){ // cathing an error if there is any
            console.log("There is an Error while inserting new task " + error)}); 

    
});

/**Creating a Custom List Route Name so that whenever user types an URl address in the bowser then
 * that address route can get created as per user request or input.
 */
app.get("/:customListRouteName", (req, res)=>{

    let displayTodayInEnglish = todayDate.getDateInEnglishFunction();

    let displayTodayInBengali = todayDate.getDateInBengaliFunction();


/**Capturing Route name given by user (customListRouteName) and saving it inside the variable called listRouteNameByUser */
    const listRouteNameByUser = lodash.capitalize(req.params.customListRouteName);

// logging the clients URL address request.
    console.log("Route " +  listRouteNameByUser + " has been requested by the customer." ); 

    /**Reading a partiular document from the collection roads inside mongodb database by using findOne method */
    Road.findOne({routeName: listRouteNameByUser}).then((passingTheRouteName)=> {

/**  checking if the route name already exists or not. ! means does not match or found or not equal*/

        if (!passingTheRouteName){ 

            console.log(listRouteNameByUser + " is a brand new route."); // Giving feedback to the user

             /** Creating a document called routeNameDocuments inside collection called Road under todolistDB*/
    const routeNameDocument = new Road ({
        routeName: listRouteNameByUser,
        routeTask: listOfNewlyAddedItemsArray

    });

      /**This is mongoose shortcut to save item inside a collections instead of 
     * using insertMany or other insert methods */
    routeNameDocument.save();

    res.redirect("/" + listRouteNameByUser);    

        }

        else{

/**Giving feedback if the route requested by the clint already exists. */
            console.log("The route " + passingTheRouteName+ " already exists in our roads collection.");

              /**This code has been collected from https://github.com/mde/ejs/wiki/Using-EJS-with-Express
 * this is a must use code to be used after setting up app.set("view engine", "ejs"); above.
 * Here the list represents list.js file inside views folder. listTitle is being copied 
 * exactly as same as the variable listTitle declared inside list.ejs file. day is the 
 * variable declared above.
 * Here we are creating a response by rendering a file called list which has to exist inside
 * the views folder and has to have the extension called .ejs. Then inside the list file we
 * are passing in a single variable that has the name whatDayIsToday and the value we are giving
 * it is the value of our variable called dayInEnglish.
 * newlyAddedItembyUser has been collected from list.ejs and listOfNewlyAddedItems variable has been
 * defined on the top section.*/
//let roadsvariable = roads;
            res.render("list", {
                listTitle: passingTheRouteName.routeName,
             newlyAddedItembyUser: passingTheRouteName.routeTask, 
             listDisplayDateInEnglish: displayTodayInEnglish, 
             listDisplayDateInBengali: displayTodayInBengali
            });

        }

    }).catch((error)=>{ // checking for an error
        console.log("There is an Error while finding route name " + error)}); 
                
    
    
                

   

   
});

/**This another way of writing funtion (req, res) {}. This process is more efficient and short way. */
app.post ("/", (req, res) => {

     /** Here the addNewItemToDoList has been collected from input type variable name from list.ejs page.
     * both of them are identical so that we can fetch the value when user gives and input 
     * and press submit button. */
     const itemFromUser = req.body.addNewItemTextBox;

     /** Here the listButton has been collected from button variable name from list.ejs page.*/
     const plusButtonFromListPage = req.body.listButton;

    /**Consol Logging the value to track it's source */
    console.log("New Task has been added and the button was pressed " + itemFromUser + " " + plusButtonFromListPage);

    /**Creating a new document inside Task model or collections in mongoose */
    const taskGet = new Task ({

        /**The taskName variable is a reference to the taskschema. Therefore, this variable 
         * name has to be written exactly same way everytime as per mongoose rule.*/
        taskName: itemFromUser

    });

    
/** Checking If the button was pressed from the default first page called "Quick Start" or not. 
 * If yes then save the new documents in the tasks collection */
   if ( plusButtonFromListPage === "Start") {

// /**Appending and populating the empty array with new items every time user is giving a new input. */
//         workListItemsArray.push(itemFromUser);

//         res.redirect ("/work");

/**This is mongoose shortcut to save document inside a collections instead of 
     * using insertMany or other insert methods */
taskGet.save();

res.redirect("/"); // redirecting to the home page

   } else {

     /** If the button was pressed from a different page then save the documents in a new collection*/

    Road.findOne({routeName: plusButtonFromListPage}).then((buttonClickedInListPage)=>{

        // saving the value inside the routetask property inside the custom documents in roads collection
        buttonClickedInListPage.routeTask.push(taskGet);
//saving document inside the custom documents in road collection
        buttonClickedInListPage.save();
        res.redirect("/" + plusButtonFromListPage); // redirecting to the custom page

    }).catch((error)=>{ // checking for an error
        console.log("There is an error occured after the button was pressed " + error)});
    


//       /**Appending and populating the empty array with new items every time user is giving a new input. */
// listOfNewlyAddedItemsArray.push(itemFromUser);

// /**When a new post requenst is triggered on our home route, we will save the value of new item into 
//  * the variable itemFromUser and it will redirect to the home route which then goes to the app.get
//  * method and pass both value in res.render. */
// res.redirect("/");

}


/*logging the user value in our command prompt.
    console.log(itemFromUser); 
    */

});

app.post("/delete", function (req, res) {

    /**Collecting the Checkbox ID from list.js and storing it inside checkboxClickedTaskID variable*/
const checkboxClickedTaskID = req.body.checkboxClicked;

/** Collecting the value of Hidden input type from list.js and storing it inside the varibale named inputHiddenName*/
const inputHiddenName = req.body.hiddenInputTypeName;

/**Checking whether the inputHiddenName is equal to the default page title named "Start" or not */
if (inputHiddenName === "Start") {

    /**Finding out the ID of that item from Task collection and removing it */
    Task.findByIdAndRemove(checkboxClickedTaskID).then(()=>{
        console.log("Task has been deleted. ID is " + checkboxClickedTaskID)
        res.redirect("/");
    }).catch((error)=>{ //Catching the error.
    console.log("There is an error while deleteing. Error "+ error);
    });

} else{

    Road.findOneAndUpdate({routeName: inputHiddenName},
        {$pull: {routeTask: {_id: checkboxClickedTaskID}}}).then((deleteTheTasksFromCustomArray)=>{
            console.log("Task has been deleted from custom task list. ID is " + checkboxClickedTaskID)
            res.redirect("/" + inputHiddenName);

        }).catch((error)=>{ //Catching the error.
            console.log("There is an error to delete tasks from Array. Error "+ error);
            });

}



});

app.get("/work", (req, res) => {

    let displayTodayInEnglish = todayDate.getDateInEnglishFunction();

    let displayTodayInBengali = todayDate.getDateInBengaliFunction();

    res.render("list", {listTitle: "Work List", newlyAddedItembyUser:  workListItemsArray, listDisplayDateInEnglish: displayTodayInEnglish, listDisplayDateInBengali: displayTodayInBengali });
});

app.post("/work", function (req, res) {

    

    let workItems = req.body.addNewItemTextBox;

    workListItemsArray.push(workItems);

    res.redirect ("/work");

    
    
});

app.get("/about", (req, res) => {
    res.render("about");
});

/*After this code we have literally just built our very first own server
this is the barebone of any express server.the callback function will give 
us feedback to verify whether the server is running or not. 
also process.env.port has been written when we upload our files to an external server like heroku
then this code will help our file to identify and use the available any random port 
on that particular external server company like heroku.*/

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000 locally on getting a dynamic port from Heroku server. This is a test message.");
});


    



