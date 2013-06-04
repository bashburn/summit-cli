/**
 * Script for restarting all EAP6 servers on a specific machine
 *
 */
var criteria = new ResourceCriteria();
criteria.addFilterParentResourceCategory(ResourceCategory.PLATFORM);
criteria.addFilterParentResourceName("bashburn.redhat.com");
criteria.addFilterResourceTypeName("JBossAS7");
var resources = ResourceManager.findResourcesByCriteria(criteria);
for(var i = 0; i < resources.size(); i++) {
  var eapRes = resources.get(i);
  eapProxy = ProxyFactory.getResource(eapRes.id);
  eapProxy.restart();
}
