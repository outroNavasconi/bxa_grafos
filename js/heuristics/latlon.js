class LatLon {

  calc(a, b) {
    const lat1 = new Number(a.info.split(',')[0])
    const lon1 = new Number(a.info.split(',')[1])
    const lat2 = new Number(b.info.split(',')[0])
    const lon2 = new Number(b.info.split(',')[1])
    const R = 6371 // Radius of the earth in km
    const dLat = this.deg2rad(lat2-lat1) // deg2rad below
    const dLon = this.deg2rad(lon2-lon1) 
    const e = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1-e));
    return R * c
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}