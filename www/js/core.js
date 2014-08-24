document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

var message = document.getElementById('maanu');
var msg = "";

	var db = window.sqlitePlugin.openDatabase({name: "database.db"});
	db.transaction(queryDB, errorDB);

	/*db.transaction(
	    function (tx) {
	        tx.executeSql("SELECT name FROM sqlite_master WHERE type='table'", [], function (tx, result) {
	            if (result.rows.length == 1) {
	                //here are no your tables currently
	                printPage("here are no your tables currently");
	                printPage(tx);
	                printPage(result);
	            } else {
	            	printPage("you have no result");
	                printPage(tx);
	                printPage(result);
	            }
	        });
	    }
	);*/

	function queryDB(tx) {

		printPage("Started");

	    tx.executeSql("select * from user_info;", [], function(tx, res) {
	    // tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
	      printPage("res.rows.length: " + res.rows.length + " -- should be 1");
	      printPage("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
	    });
	}

	function querySuccess(tx, results) {
		printPage("Success");

	    printPage("Returned rows = " + results.rows.length);
	    // this will be true since it was a select statement and so rowsAffected was 0
	    if (!results.rowsAffected) {
	        printPage('No rows affected!');
	        return false;
	    }
	    // for an insert statement, this property will return the ID of the last inserted row
	    printPage("Last inserted row ID = " + results.insertId);
	}

	function errorDB(err) {
		printPage("Error processing SQL : "+err.message);
	    // alert("Error processing SQL : "+err.message);
	}

	function printPage (argument) {
		msg += argument + " <br>";
		message.innerHTML = msg;
	}

}
