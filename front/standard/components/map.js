/*
 * @Author: liuqingling 
 * @Date: 2019-01-10 17:05:44 
 * @Last Modified by: liuqingling
 * @Last Modified time: 2019-01-11 12:09:01
 */

 /**
  * 百度地图必须要在head引入百度地图js
  */
 const BaseComponent = require("./BaseComponent");
class Map extends BaseComponent {
  constructor() {
    super();
  }
  /**
   * [init description]
   *
   * @param   {[type]}  selector  [selector id选择器]
   *
   * @return  {[type]}            [return description]
   */
  init(selector,MapCoordinates) {
    this.el = selector ;
    let latitude = this.$('#'+selector).attr('latitude')
    let longitude = this.$('#'+selector).attr('longitude')
    var addr = this.$('#'+selector).attr("addr");
    console.log(latitude,longitude)
    if(latitude&&longitude){
      MapCoordinates = { lng: longitude, lat : latitude}
      const BMap = window.BMap
      this.map = new BMap.Map(selector)
      this.s = new BMap.LocalSearch(this.map)
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 16)
      this.map.enableScrollWheelZoom()
      this.map.centerAndZoom(new BMap.Point(MapCoordinates.lng, MapCoordinates.lat), 16)
      var point = new BMap.Point(MapCoordinates.lng, MapCoordinates.lat);
      this.map.addOverlay(new BMap.Marker(MapCoordinates))
      let infoWindow = new BMap.InfoWindow(addr); // 创建信息窗口对象
      infoWindow.setWidth(0)
      infoWindow.setHeight(0)

      this.map.openInfoWindow(infoWindow, point);
    }
    
  }
  destroy() {
    this.$(selector).remove()
  }
}
module.exports = Map;