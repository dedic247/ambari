/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = require('app');

App.MainDashboardController = Em.Controller.extend({
  name:'mainDashboardController',
  alerts: function(){
    return App.router.get('clusterController.alerts');
  }.property('App.router.clusterController.alerts'),
  data: {
    MAPREDUCE: {
      "jobtracker_addr": "jobtracker:50030",
      "jobtracker_starttime": 1348935243,
      "running_jobs": 1,
      "waiting_jobs": 0,
      "trackers_total": "1",
      "trackers_live": 1,
      "trackers_graylisted": 0,
      "trackers_blacklisted": 0,
      "chart": [4,8,7,2,1,4,3,3,3],
      // additionals
      "map_slots_occuped": 4,
      "map_slots_reserved": 8,
      "map_slots_total": 12,

      "reduce_slots_occuped": 3,
      "reduce_slots_reserved": 7,
      "reduce_slots_total": 11,

      "completed_jobs": 3,
      "failed_jobs": 2,

      "trackers_heap_used": 1348935243,
      "trackers_heap_total": 6648935243
    },
    hbase : {
      "hbasemaster_addr": "hbasemaster:60010",
      "total_regionservers": "1",
      "hbasemaster_starttime": 1348935496,
      "live_regionservers": 1,
      "dead_regionservers": 0,
      "regions_in_transition_count": 0,
      "chart": [3,7,7,5,5,3,5,3,7],

      "master_server_heap_used": 2348935243,
      "master_server_heap_total": 5648935243,
      "average_load": 1.4
    }
  },

  services:function(){
    return App.router.get('mainServiceController.content');
  }.property('App.router.mainServiceController.content'),
  alertsFilteredBy: 'All',
  alertsFilter: function(event) {
    if (event.context)
      this.set('alertsFilteredBy', event.context.get('serviceName'));
    else
      this.set('alertsFilteredBy', 'All');
  },
  /**
   * We do not want to re-get all the data everytime the filter
   * is changed. Hence we just filtered the alerts got during page
   * load.
   */
  displayAlerts: function(){
    if(this.get('alertsFilteredBy')=='All')
      return this.get('alerts');
    else
      var type = this.get('alertsFilteredBy').toLowerCase();
      return this.get('alerts').filter(function(item){
        var serviceType = item.get('serviceType');
        return serviceType && serviceType.toLowerCase()==type.toLowerCase();
      });
  }.property('alerts', 'alertsFilteredBy'),
  
  nagiosUrl: function(){
    return App.router.get('clusterController.nagiosUrl');
  }.property('App.router.clusterController.nagiosUrl'),
  
  isNagiosInstalled: function(){
    return App.router.get('clusterController.isNagiosInstalled');
  }.property('App.router.clusterController.isNagiosInstalled'),
  
  alertsCount: function() {
    var alerts = this.get('alerts');
    return alerts ? alerts.filterProperty('status', 'corrupt').length : 0;
  }.property('alerts')
});