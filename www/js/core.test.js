// Wait for Cordova to load
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
function onDeviceReady() {
var message = document.getElementById('maanu');
var msg = "hello ";
	printPage("kooooy");

      // var db = window.sqlitePlugin.openDatabase({name: "DB"});

    // Wait for Cordova to load

    // Cordova is ready
      var db = window.sqlitePlugin.openDatabase("Database", "1.0", "Demo", -1);

      db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS test_table');
        tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

        tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
          printPage("insertId: " + res.insertId + " -- probably 1");
          printPage("rowsAffected: " + res.rowsAffected + " -- should be 1");

          tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
            printPage("res.rows.length: " + res.rows.length + " -- should be 1");
            printPage("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
          });

        }, function(e) {
          printPage("ERROR: " + e.message);
        });
      });

	

	function printPage (argument) {
		msg += argument + " <br>";
		message.innerHTML = msg;
	}
}
