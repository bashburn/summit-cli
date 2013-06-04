/**
 *
 * @import funs/create-ds-eap6.js
 *
 */
println("This is a test.");

function runApp(eapName, dsName, jndiName, driverName, connectionUrl) {
  println("DataSource Name: " + dsName);
  println("JNDI Name: " + jndiName);
  println("Driver Name: " + driverName);
  println("Connection URL: " + connectionUrl);
  var configHash = new Object();
  configHash["jndi-name"] = jndiName;
  configHash["driver-name"] = driverName;
  configHash["connection-url"] = connectionUrl;
  var eapResources = findNamedResource(eapName);
  for(var i = 0; i < eapResources.size(); i++) {
    var eapRes = eapResources.get(i);
    println("Res ID:" + eapRes.id);
    var result = createDatasource(eapRes, dsName, configHash);
    println("Resource created");
    pretty.print(result);
  }
}

if(args.length < 5) {
  println("Usage: test.js eap-name ds-name jndi-name driver-name connection-url");
} else {
  var eapName = args[0];
  var dsName = args[1];
  var jndiName = args[2];
  var driverName = args[3];
  var connectionUrl = args[4];
  runApp(eapName, dsName, jndiName, driverName, connectionUrl);
}


