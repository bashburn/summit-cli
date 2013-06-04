/**
 *
 * Functions for creating a datasource on an EAP6 server.
 *
 */

/**
 * Name: findNamedResource
 * Args:
 *   resourceName: Resource Name or part of name to match
 *
 */
function findNamedResource(resourceName) {
  var resourceType = "JBossAS7";
  var criteria = new ResourceCriteria();
  criteria.addFilterName(resourceName);
  criteria.addFilterResourceTypeName(resourceType);
  return ResourceManager.findResourcesByCriteria(criteria);
}

/**
 * Name: lookupDatasourceSubsystem
 * Args:
 *   resource: Parent EAP Resource to find the datasource subysytem for
 *
 */
function lookupDatasourceSubsystem(resource) {
  var criteria = new ResourceCriteria();
  criteria.addFilterName("datasources");
  criteria.addFilterParentResourceId(resource.id);
  return ResourceManager.findResourcesByCriteria(criteria);
}

/**
 * Name: createDatasource
 * Args:
 *   resource: EAP Resource to add datasource to
 *   dsName: Name of the datasource
 *   configs: Hash of configuration parameters for datasource
 */
function createDatasource(resource, dsName, configs) {
  var dssubsys = lookupDatasourceSubsystem(resource);
  var appType = ResourceTypeManager.getResourceTypeByNameAndPlugin("DataSource (Standalone)",
    "JBossAS7");
  return ResourceFactoryManager.createResource(
    dssubsys.id, 
    appType.id,
    dsName + "-res", 
    dssubsys.pluginConfiguration, 
    asConfiguration(configs),
    null);
}

