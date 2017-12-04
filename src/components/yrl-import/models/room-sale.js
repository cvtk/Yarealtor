const roomSale = {
  author: 'required',
  key: 'required',
  company: 'required',
  created: 'required',
  modified: 'required',
  type: 'required',
  object: 'required',
  price: 'required',
  agent_pay: 'optional',
  images: 'optional',
  description: 'optional',
  locality: 'required',
  localityType: 'required',
  localityId: 'optional',
  street: 'required',
  streetType: 'required',
  streetId: 'optional',
  building: 'required',
  buildingId: 'optional',
  buildingType: 'required',
  district : 'required', 
  waymark: 'optional',
  material: 'required',
  rooms: 'optional',
  floor: 'required',
  floors: 'required',
  area_full: 'required',
  bath: 'required',
  placement_type: 'required',
  condition_room: 'optional',
  condition_bath: 'optional'
}

export default roomSale;